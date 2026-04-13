import { PrismaService } from '../../core/database/prisma.service';
import { RedisService } from '../../core/cache/redis.service';
export declare enum LeaderboardType {
    WEEKLY_READERS = "leaderboard:weekly:readers",
    MONTHLY_READERS = "leaderboard:monthly:readers",
    ALL_TIME_XP = "leaderboard:alltime:xp"
}
export declare class LeaderboardService {
    private prisma;
    private redis;
    private readonly logger;
    constructor(prisma: PrismaService, redis: RedisService);
    aggregateAllTimeXp(): Promise<void>;
    aggregateWeeklyReaders(): Promise<void>;
    getTopUsers(type: LeaderboardType, limit?: number): Promise<{
        rank: number;
        score: number;
        user: {
            id: string;
            username: string;
            avatarUrl: string | null;
            level: number;
        } | null;
    }[]>;
}
