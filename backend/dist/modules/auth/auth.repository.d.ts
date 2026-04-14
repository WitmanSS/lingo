import { PrismaService } from '../../core/database/prisma.service';
import { User } from '@prisma/client';
export declare class AuthRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(data: {
        username: string;
        email: string;
        passwordHash: string;
    }): Promise<User>;
    updateLastLogin(id: string): Promise<void>;
    createSession(data: {
        userId: string;
        token: string;
        ipAddress?: string;
        userAgent?: string;
        deviceId?: string;
        expiresAt: Date;
    }): Promise<{
        id: string;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        deviceId: string | null;
    }>;
    findSessionByToken(token: string): Promise<({
        user: {
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
        };
    } & {
        id: string;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: Date;
        userId: string;
        expiresAt: Date;
        token: string;
        deviceId: string | null;
    }) | null>;
    invalidateUserSessions(userId: string): Promise<void>;
    deleteSessions(userId: string): Promise<void>;
}
