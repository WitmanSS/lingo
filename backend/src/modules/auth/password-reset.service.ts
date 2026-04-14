import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordResetService {
  constructor(private prisma: PrismaService) {}

  async createResetToken(email: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // Don't reveal if email exists - prevent user enumeration
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      return 'If an account with this email exists, a reset link has been sent.';
    }

    // Clean up expired tokens
    await this.prisma.passwordReset.deleteMany({
      where: {
        userId: user.id,
        expiresAt: { lt: new Date() }
      }
    });

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Store hashed token
    await this.prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
      },
    });

    // TODO: Send email with reset link
    // await this.emailService.sendPasswordResetEmail(user.email, token);

    return token; // In production, this would be sent via email
  }

  async verifyResetToken(token: string): Promise<string | null> {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const resetRecord = await this.prisma.passwordReset.findFirst({
      where: {
        token: hashedToken,
        used: false,
        expiresAt: { gt: new Date() }
      },
      include: { user: true }
    });

    if (!resetRecord) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    return resetRecord.userId;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const userId = await this.verifyResetToken(token);

    if (!userId) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password and mark token as used
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: userId },
        data: { passwordHash: hashedPassword }
      }),
      this.prisma.passwordReset.updateMany({
        where: { userId, used: false },
        data: { used: true }
      })
    ]);
  }
}
