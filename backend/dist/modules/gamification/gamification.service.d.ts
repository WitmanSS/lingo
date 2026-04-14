import { PrismaService } from '../../core/database/prisma.service';
import { CacheService } from '../../core/cache/cache.service';
export declare class GamificationService {
    private prisma;
    private cacheService;
    constructor(prisma: PrismaService, cacheService: CacheService);
    getLeaderboard(page?: number, limit?: number): Promise<{
        data: {
            rank: number;
            id: string;
            level: number;
            username: string;
            avatarUrl: string | null;
            xp: number;
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    getUserAchievements(userId: string): Promise<{
        earned: boolean;
        earnedAt: Date | null;
        id: string;
        createdAt: Date;
        name: string;
        description: string;
        icon: string;
        xpReward: number;
        category: string;
    }[]>;
    checkAndAwardAchievements(userId: string): Promise<void>;
}
