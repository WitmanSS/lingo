import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AdminUsersService {
  constructor(private prisma: PrismaService) {}

  async searchUsers(query?: string, skip = 0, take = 50) {
    const where = query ? {
      OR: [
        { username: { contains: query, mode: 'insensitive' as const } },
        { email: { contains: query, mode: 'insensitive' as const } }
      ]
    } : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where, skip, take,
        select: { id: true, username: true, email: true, role: true, xp: true, level: true, createdAt: true, deletedAt: true }
      }),
      this.prisma.user.count({ where })
    ]);

    return { data: users, total };
  }

  async getUserDetails(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        xpLogs: { orderBy: { createdAt: 'desc' }, take: 20 },
        warnings: { orderBy: { createdAt: 'desc' } },
        blocks: { orderBy: { createdAt: 'desc' } },
        stories: { orderBy: { createdAt: 'desc' }, take: 10, select: { id: true, title: true, published: true, createdAt: true } },
      }
    });

    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async blockUser(adminId: string, userId: string, reason: string) {
    return this.prisma.$transaction(async (tx) => {
      await tx.userBlock.create({
        data: { userId, adminId, reason }
      });
      return tx.user.update({
        where: { id: userId },
        data: { deletedAt: new Date() } // We'll use soft-delete as the banning mechanism
      });
    });
  }

  async warnUser(adminId: string, userId: string, reason: string) {
    return this.prisma.userWarning.create({
      data: { userId, adminId, reason }
    });
  }
}
