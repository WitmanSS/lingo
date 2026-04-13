import { PrismaService } from '../../core/database/prisma.service';
export declare class FavoritesService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(userId: string, page?: number, limit?: number): Promise<{
        data: ({
            story: {
                id: string;
                level: import(".prisma/client").$Enums.Level;
                title: string;
                slug: string;
                readingTimeMinutes: number;
                wordCount: number;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            storyId: string;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    toggle(userId: string, storyId: string): Promise<{
        favorited: boolean;
    }>;
}
