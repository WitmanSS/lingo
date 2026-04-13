import { PrismaService } from '../../core/database/prisma.service';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getDashboardStats(): Promise<{
        totalUsers: number;
        totalStories: number;
        activeUsers24h: number;
        revenue: number;
    }>;
    getAllStories(): Promise<({
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
    getAllUsers(): Promise<{
        id: string;
        createdAt: Date;
        username: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
}
