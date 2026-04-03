import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async getLeaderboard(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { xp: 'desc' },
        select: { id: true, username: true, avatarUrl: true, xp: true, level: true },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: data.map((user, idx) => ({ ...user, rank: skip + idx + 1 })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserAchievements(userId: string) {
    const all = await this.prisma.achievement.findMany();
    const earned = await this.prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true, earnedAt: true },
    });
    const earnedMap = new Map(earned.map((e) => [e.achievementId, e.earnedAt]));

    return all.map((a) => ({
      ...a,
      earned: earnedMap.has(a.id),
      earnedAt: earnedMap.get(a.id) || null,
    }));
  }

  async checkAndAwardAchievements(userId: string) {
    const stats = await this.prisma.readingStats.findUnique({ where: { userId } });
    if (!stats) return;

    const achievements = await this.prisma.achievement.findMany();
    const earned = await this.prisma.userAchievement.findMany({
      where: { userId },
      select: { achievementId: true },
    });
    const earnedIds = new Set(earned.map((e) => e.achievementId));

    // Auto-award based on stats
    for (const achievement of achievements) {
      if (earnedIds.has(achievement.id)) continue;

      let shouldAward = false;
      if (achievement.name === 'First Story' && stats.storiesCompleted >= 1) shouldAward = true;
      if (achievement.name === 'Bookworm' && stats.storiesCompleted >= 10) shouldAward = true;
      if (achievement.name === 'Word Collector' && stats.vocabularyLearned >= 100) shouldAward = true;
      if (achievement.name === 'Speed Reader' && stats.totalWordsRead >= 10000) shouldAward = true;

      if (shouldAward) {
        await this.prisma.userAchievement.create({
          data: { userId, achievementId: achievement.id },
        });
        await this.prisma.user.update({
          where: { id: userId },
          data: { xp: { increment: achievement.xpReward } },
        });
      }
    }
  }
}
