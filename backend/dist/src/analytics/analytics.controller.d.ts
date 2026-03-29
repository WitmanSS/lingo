import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private analyticsService;
    constructor(analyticsService: AnalyticsService);
    getUserStats(user: any): Promise<{
        id: string;
        totalWordsRead: number;
        totalReadingTime: number;
        storiesCompleted: number;
        vocabularyLearned: number;
        userId: string;
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
            level: import(".prisma/client").$Enums.Level;
            _count: {
                progress: number;
                favorites: number;
                comments: number;
            };
            title: string;
            slug: string;
        }[];
    }>;
}
