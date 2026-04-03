import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
      select: {
        id: true, username: true, email: true, role: true,
        avatarUrl: true, bio: true, xp: true, level: true,
        streakDays: true, createdAt: true, lastLoginAt: true,
        emailVerified: true,
        profile: true,
        readingStats: true,
        _count: {
          select: {
            stories: true,
            favorites: true,
            achievements: true,
            userVocabulary: true,
          },
        },
      },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async updateProfile(userId: string, data: { username?: string; bio?: string; avatarUrl?: string }) {
    const user = await this.prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
    });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true, username: true, email: true, role: true,
        avatarUrl: true, bio: true, xp: true, level: true,
        streakDays: true, createdAt: true,
      },
    });
  }

  async deleteAccount(userId: string) {
    // Soft delete instead of hard delete
    const user = await this.prisma.user.findFirst({
      where: { id: userId, deletedAt: null },
    });
    if (!user) throw new NotFoundException('User not found');

    await this.prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });

    this.logger.log(`User account soft-deleted: ${userId}`);
    return { message: 'Account deleted successfully' };
  }
}
