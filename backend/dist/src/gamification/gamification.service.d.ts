import { PrismaService } from '../prisma/prisma.service';
export declare class GamificationService {
    private prisma;
    constructor(prisma: PrismaService);
    getLeaderboard(page?: number, limit?: number): Promise<{
        data: {
            rank: number;
            username: string;
            id: string;
            avatarUrl: string | null;
            xp: number;
            level: number;
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
        name: string;
        description: string;
        icon: string;
        xpReward: number;
    }[]>;
    checkAndAwardAchievements(userId: string): Promise<void>;
}
