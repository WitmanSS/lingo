import { PrismaService } from '../../core/database/prisma.service';
export declare class ProgressService {
    private prisma;
    constructor(prisma: PrismaService);
    getProgress(userId: string, storyId: string): Promise<{
        id: string;
        userId: string;
        updatedAt: Date;
        storyId: string;
        completed: boolean;
        progressPercentage: number;
        lastPosition: number;
        readingTimeSeconds: number;
        startedAt: Date;
        completedAt: Date | null;
    } | null>;
    updateProgress(userId: string, data: {
        storyId: string;
        progressPercentage: number;
        lastPosition: number;
        readingTimeSeconds: number;
    }): Promise<{
        id: string;
        userId: string;
        updatedAt: Date;
        storyId: string;
        completed: boolean;
        progressPercentage: number;
        lastPosition: number;
        readingTimeSeconds: number;
        startedAt: Date;
        completedAt: Date | null;
    }>;
}
