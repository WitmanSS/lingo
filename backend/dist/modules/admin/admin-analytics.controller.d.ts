import { AdminAnalyticsService } from './admin-analytics.service';
export declare class AdminAnalyticsController {
    private analyticsService;
    constructor(analyticsService: AdminAnalyticsService);
    getDashboard(): Promise<{
        totalUsers: number;
        totalStories: number;
        totalProgress: number;
        systemHealth: string;
        retentionRate: number;
        engagementRate: number;
    }>;
    getGrowthChart(): Promise<{
        date: any;
        newUsers: any;
    }[]>;
}
