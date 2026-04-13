import { LeaderboardService } from './leaderboard.service';
export declare class LeaderboardsController {
    private leaderboardService;
    constructor(leaderboardService: LeaderboardService);
    getAllTimeXp(limitStr?: string): Promise<{
        rank: number;
        score: number;
        user: {
            id: string;
            username: string;
            avatarUrl: string | null;
            level: number;
        } | null;
    }[]>;
    getWeeklyReaders(limitStr?: string): Promise<{
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
