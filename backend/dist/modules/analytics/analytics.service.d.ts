import { PrismaService } from '../../core/database/prisma.service';
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getUserStats(userId: string): Promise<{
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
