import { PrismaService } from '../../core/database/prisma.service';
import { XpService } from '../gamification/xp.service';
export declare class ProgressService {
    private prisma;
    private xpService;
    constructor(prisma: PrismaService, xpService: XpService);
    getProgress(userId: string, storyId: string): Promise<{
        id: string;
        userId: string;
        updatedAt: Date;
        storyId: string;
        progressPercentage: number;
        lastPosition: number;
        completed: boolean;
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
        progressPercentage: number;
        lastPosition: number;
        completed: boolean;
        readingTimeSeconds: number;
        startedAt: Date;
        completedAt: Date | null;
    }>;
}
