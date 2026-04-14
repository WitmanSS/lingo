import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async createSession(userId: string, deviceId: string, ipAddress: string) {
    return this.prisma.session.create({
      data: {
        userId,
        deviceId,
        token: this.generateToken(),
        ipAddress,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });
  }

  async getSession(sessionId: string) {
    return this.prisma.session.findUnique({
      where: { id: sessionId },
    });
  }

  async deleteSessions(userId: string) {
    await this.prisma.session.deleteMany({
      where: { userId },
    });
  }

  async deleteSession(sessionId: string) {
    await this.prisma.session.delete({
      where: { id: sessionId },
    });
  }

  private generateToken(): string {
    // Use crypto.randomBytes for cryptographically secure tokens
    return require('crypto').randomBytes(32).toString('hex');
  }
}
