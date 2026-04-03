import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalUsers, totalStories, activeUsers] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.story.count(),
      this.prisma.user.count({
        where: {
          lastActiveAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
          },
        },
      }),
    ]);

    return {
      totalUsers,
      totalStories,
      activeUsers24h: activeUsers,
      revenue: 0, // Placeholder
    };
  }

  async getAllStories() {
    return this.prisma.story.findMany({
      include: {
        author: {
          select: { id: true, username: true },
        },
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
  }
}
