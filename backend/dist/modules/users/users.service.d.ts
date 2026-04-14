import { PrismaService } from '../../core/database/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        level: number;
        username: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        bio: string | null;
        xp: number;
        streakDays: number;
        lastLoginAt: Date | null;
    }>;
    updateProfile(userId: string, data: {
        username?: string;
        bio?: string;
        avatarUrl?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        level: number;
        username: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        bio: string | null;
        xp: number;
        streakDays: number;
    }>;
    deleteAccount(userId: string): Promise<{
        message: string;
    }>;
}
