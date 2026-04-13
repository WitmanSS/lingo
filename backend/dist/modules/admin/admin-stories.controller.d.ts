import { AdminStoriesService } from './admin-stories.service';
export declare class AdminStoriesController {
    private readonly storiesService;
    constructor(storiesService: AdminStoriesService);
    getStories(q?: string, skip?: string, take?: string): Promise<{
        data: ({
            _count: {
                storyReports: number;
            };
            author: {
                username: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            level: import(".prisma/client").$Enums.Level;
            title: string;
            slug: string;
            difficultyScore: number | null;
            readingTimeMinutes: number;
            wordCount: number;
            coverImage: string | null;
            authorId: string;
            published: boolean;
            isAIGenerated: boolean;
            deletedAt: Date | null;
        })[];
        total: number;
    }>;
    getReports(skip?: string, take?: string): Promise<{
        data: ({
            story: {
                title: string;
                slug: string;
            };
            reporter: {
                username: string;
            };
        } & {
            id: string;
            createdAt: Date;
            status: string;
            updatedAt: Date;
            storyId: string;
            reason: string;
            reporterId: string;
        })[];
        total: number;
    }>;
    setPublishStatus(storyId: string, published: boolean): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import(".prisma/client").$Enums.Level;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        isAIGenerated: boolean;
        deletedAt: Date | null;
    }>;
    dismissReport(reportId: string): Promise<{
        id: string;
        createdAt: Date;
        status: string;
        updatedAt: Date;
        storyId: string;
        reason: string;
        reporterId: string;
    }>;
}
