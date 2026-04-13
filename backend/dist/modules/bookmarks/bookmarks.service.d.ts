import { PrismaService } from '../../core/database/prisma.service';
export declare class BookmarksService {
    private prisma;
    constructor(prisma: PrismaService);
    getAll(userId: string): Promise<({
        story: {
            id: string;
            level: import(".prisma/client").$Enums.Level;
            title: string;
            slug: string;
            readingTimeMinutes: number;
        };
    } & {
        note: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        storyId: string;
        position: number;
    })[]>;
    create(userId: string, storyId: string, position?: number): Promise<{
        note: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        storyId: string;
        position: number;
    }>;
    delete(userId: string, id: string): Promise<{
        message: string;
    }>;
}
