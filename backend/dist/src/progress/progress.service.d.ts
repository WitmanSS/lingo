import { PrismaService } from '../prisma/prisma.service';
export declare class ProgressService {
    private prisma;
    constructor(prisma: PrismaService);
    getProgress(userId: string, storyId: string): Promise<{
        id: string;
        userId: string;
        updatedAt: Date;
        storyId: string;
        progressPercentage: number;
        lastPosition: number;
        completed: boolean;
        readingTimeSeconds: number;
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
        progressPercentage: number;
        lastPosition: number;
        completed: boolean;
        readingTimeSeconds: number;
    }>;
}
