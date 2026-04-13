import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getDashboard(): Promise<{
        totalUsers: number;
        totalStories: number;
        activeUsers24h: number;
        revenue: number;
    }>;
    getStories(): Promise<({
        author: {
            id: string;
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
    })[]>;
    getUsers(): Promise<{
        id: string;
        createdAt: Date;
        username: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
}
