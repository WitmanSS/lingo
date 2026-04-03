import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../core/database/prisma.service';
import { RedisService } from '../../core/cache/redis.service';

export enum LeaderboardType {
  WEEKLY_READERS = 'leaderboard:weekly:readers',
  MONTHLY_READERS = 'leaderboard:monthly:readers',
  ALL_TIME_XP = 'leaderboard:alltime:xp',
}

@Injectable()
export class LeaderboardService {
  private readonly logger = new Logger(LeaderboardService.name);

  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}

  /**
   * Run every hour to recalculate the all-time XP leaderboard into Redis
   */
  @Cron(CronExpression.EVERY_HOUR)
  async aggregateAllTimeXp() {
    this.logger.log('Aggregating all-time XP leaderboard...');
    // We only take the top 1000 to keep redis clean
    const users = await this.prisma.user.findMany({
      orderBy: { xp: 'desc' },
      take: 1000,
      select: { id: true, xp: true },
    });

    const pipeline = this.redis.getClient().pipeline();
    pipeline.del(LeaderboardType.ALL_TIME_XP);

    for (const u of users) {
      pipeline.zadd(LeaderboardType.ALL_TIME_XP, u.xp, u.id);
    }
    await pipeline.exec();
    this.logger.log(`Aggregated ${users.length} users into all-time XP leaderboard.`);
  }

  /**
   * Run every midnight to calculate weekly readers (by readingTime or storiesCompleted)
   * This looks at reading progress completed in the last 7 days.
   */
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async aggregateWeeklyReaders() {
    this.logger.log('Aggregating weekly readers leaderboard...');
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Group by userId, count stories completed where completedAt is >= oneWeekAgo
    const progressGroup = await this.prisma.readingProgress.groupBy({
      by: ['userId'],
      _count: { storyId: true },
      where: {
        completed: true,
        completedAt: { gte: oneWeekAgo },
      },
    });

    const pipeline = this.redis.getClient().pipeline();
    pipeline.del(LeaderboardType.WEEKLY_READERS);

    for (const group of progressGroup) {
      pipeline.zadd(LeaderboardType.WEEKLY_READERS, group._count.storyId, group.userId);
    }
    await pipeline.exec();
    this.logger.log(`Aggregated ${progressGroup.length} weekly readers.`);
  }

  /**
   * Fetch a specific leaderboard from Redis (sorted descending)
   */
  async getTopUsers(type: LeaderboardType, limit: number = 10) {
    // zrevrange with WITHSCORES returns [member1, score1, member2, score2, ...]
    const data = await this.redis.zrevrange(type, 0, limit - 1, true);

    if (!data || data.length === 0) return [];

    const results: { userId: string; score: number }[] = [];
    for (let i = 0; i < data.length; i += 2) {
      results.push({ userId: data[i], score: parseInt(data[i + 1], 10) });
    }

    // Fetch user details for these users
    const userIds = results.map(r => r.userId);
    const users = await this.prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, username: true, avatarUrl: true, level: true },
    });
    
    const userMap = new Map(users.map(u => [u.id, u]));

    // Join with Redis scores and preserve exact sorted order
    return results.map((result, index) => {
      const u = userMap.get(result.userId);
      return {
        rank: index + 1,
        score: result.score,
        user: u ? {
          id: u.id,
          username: u.username,
          avatarUrl: u.avatarUrl,
          level: u.level,
        } : null,
      };
    }).filter(r => r.user !== null); // Remove if user somehow got deleted
  }
}
