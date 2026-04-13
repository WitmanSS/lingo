import { PrismaService } from '../../core/database/prisma.service';
export declare class ModerationPriorityService {
    private prisma;
    private readonly logger;
    private readonly spamKeywords;
    private readonly badWords;
    constructor(prisma: PrismaService);
    scanStoryContent(storyId: string, content: string): Promise<{
        flag: boolean;
        reason?: string;
        priority: 'HIGH' | 'MEDIUM' | 'LOW';
    }>;
}
