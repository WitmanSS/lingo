import { PrismaService } from '../../core/database/prisma.service';
import { LevelService } from './level.service';
import { XpValidationService } from './xp-validation.service';
export declare enum XpReason {
    READ_STORY = "READ_STORY",
    WRITE_STORY = "WRITE_STORY",
    DAILY_STREAK = "DAILY_STREAK",
    WEEKLY_STREAK = "WEEKLY_STREAK",
    STORY_APPROVED = "STORY_APPROVED",
    VOCABULARY_LEARNED = "VOCABULARY_LEARNED",
    COMMENT_ADDED = "COMMENT_ADDED",
    STORY_LIKED = "STORY_LIKED"
}
export declare const XP_AWARDS: {
    READ_STORY: number;
    WRITE_STORY: number;
    DAILY_STREAK: number;
    WEEKLY_STREAK: number;
    STORY_APPROVED: number;
    VOCABULARY_LEARNED: number;
    COMMENT_ADDED: number;
    STORY_LIKED: number;
};
export declare class XpService {
    private prisma;
    private levelService;
    private xpValidator;
    private readonly logger;
    constructor(prisma: PrismaService, levelService: LevelService, xpValidator: XpValidationService);
    grantXp(userId: string, reason: XpReason, customAmount?: number, contextId?: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: number;
        deletedAt: Date | null;
        username: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        bio: string | null;
        xp: number;
        streakDays: number;
        lastActiveAt: Date | null;
        lastLoginAt: Date | null;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        twoFactorSecret: string | null;
    } | null | undefined>;
}
