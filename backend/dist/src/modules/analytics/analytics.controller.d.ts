import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private analyticsService;
    constructor(analyticsService: AnalyticsService);
    getUserStats(user: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        updatedAt: Date;
        totalWordsRead: number;
        totalReadingTime: number;
        storiesCompleted: number;
        vocabularyLearned: number;
        currentStreak: number;
        longestStreak: number;
        lastActivityAt: Date | null;
    } | {
        totalWordsRead: number;
        totalReadingTime: number;
        storiesCompleted: number;
        vocabularyLearned: number;
    }>;
    getAdminStats(): Promise<{
        totalUsers: number;
        totalStories: number;
        totalComments: number;
        levelDistribution: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.StoryGroupByOutputType, "level"[]> & {
            _count: number;
        })[];
        popularStories: {
            id: string;
            _count: {
                progress: number;
                favorites: number;
                comments: number;
            };
            level: import(".prisma/client").$Enums.Level;
            title: string;
            slug: string;
        }[];
    }>;
}
