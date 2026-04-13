import { PrismaService } from '../../core/database/prisma.service';
export declare class AdminAnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    getPlatformDashboardData(): Promise<{
        totalUsers: number;
        totalStories: number;
        totalProgress: number;
        systemHealth: string;
        retentionRate: number;
        engagementRate: number;
    }>;
    getGrowthTimeseries(): Promise<{
        date: any;
        newUsers: any;
    }[]>;
}
