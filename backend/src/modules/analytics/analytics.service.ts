import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getUserStats(userId: string) {
    const stats = await this.prisma.readingStats.findUnique({ where: { userId } });
    return stats || { totalWordsRead: 0, totalReadingTime: 0, storiesCompleted: 0, vocabularyLearned: 0 };
  }

  async getAdminStats() {
    const [totalUsers, totalStories, totalComments, levelDistribution] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.story.count({ where: { published: true } }),
      this.prisma.comment.count(),
      this.prisma.story.groupBy({ by: ['level'], _count: true, where: { published: true } }),
    ]);

    const popularStories = await this.prisma.story.findMany({
      take: 10,
      where: { published: true },
      orderBy: { favorites: { _count: 'desc' } },
      select: {
        id: true, title: true, slug: true, level: true,
        _count: { select: { favorites: true, progress: true, comments: true } },
      },
    });

    return { totalUsers, totalStories, totalComments, levelDistribution, popularStories };
  }
}
