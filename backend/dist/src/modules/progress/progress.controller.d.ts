import { ProgressService } from './progress.service';
export declare class ProgressController {
    private progressService;
    constructor(progressService: ProgressService);
    getProgress(user: any, storyId: string): Promise<{
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
    updateProgress(user: any, data: {
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
