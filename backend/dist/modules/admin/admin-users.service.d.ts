import { PrismaService } from '../../core/database/prisma.service';
export declare class AdminUsersService {
    private prisma;
    constructor(prisma: PrismaService);
    searchUsers(query?: string, skip?: number, take?: number): Promise<{
        data: {
            id: string;
            createdAt: Date;
            level: number;
            deletedAt: Date | null;
            username: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            xp: number;
        }[];
        total: number;
    }>;
    getUserDetails(id: string): Promise<{
        stories: {
            id: string;
            createdAt: Date;
            title: string;
            published: boolean;
        }[];
        xpLogs: {
            id: string;
            createdAt: Date;
            userId: string;
            amount: number;
            reason: string;
        }[];
        warnings: {
            id: string;
            createdAt: Date;
            userId: string;
            reason: string;
            adminId: string;
        }[];
        blocks: {
            id: string;
            createdAt: Date;
            userId: string;
            expiresAt: Date | null;
            reason: string;
            adminId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
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
    }>;
    blockUser(adminId: string, userId: string, reason: string): Promise<{
        id: string;
        createdAt: Date;
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
    }>;
    warnUser(adminId: string, userId: string, reason: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        reason: string;
        adminId: string;
    }>;
}
