import { AdminUsersService } from './admin-users.service';
export declare class AdminUsersController {
    private readonly usersService;
    constructor(usersService: AdminUsersService);
    getUsers(q?: string, skip?: string, take?: string): Promise<{
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
            reason: string;
            adminId: string;
            expiresAt: Date | null;
        }[];
    } & {
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
    }>;
    blockUser(userId: string, reason: string, admin: any): Promise<{
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
    }>;
    warnUser(userId: string, reason: string, admin: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        reason: string;
        adminId: string;
    }>;
}
