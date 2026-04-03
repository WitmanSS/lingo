import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string, page = 1, limit = 12) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.favorite.findMany({
        where: { userId },
        skip,
        take: limit,
        include: {
          story: { select: { id: true, title: true, slug: true, level: true, readingTimeMinutes: true, wordCount: true } },
        },
      }),
      this.prisma.favorite.count({ where: { userId } }),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async toggle(userId: string, storyId: string) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_storyId: { userId, storyId } },
    });
    if (existing) {
      await this.prisma.favorite.delete({ where: { id: existing.id } });
      return { favorited: false };
    }
    await this.prisma.favorite.create({ data: { userId, storyId } });
    return { favorited: true };
  }
}
