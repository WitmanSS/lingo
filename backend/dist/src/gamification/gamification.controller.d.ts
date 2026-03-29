import { GamificationService } from './gamification.service';
export declare class GamificationController {
    private gamificationService;
    constructor(gamificationService: GamificationService);
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
    getAchievements(user: any): Promise<{
        earned: boolean;
        earnedAt: Date | null;
        id: string;
        name: string;
        description: string;
        icon: string;
        xpReward: number;
    }[]>;
}
