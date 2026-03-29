import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        username: string;
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        bio: string | null;
        xp: number;
        level: number;
        streakDays: number;
        createdAt: Date;
        lastLoginAt: Date | null;
    }>;
    updateProfile(userId: string, data: {
        username?: string;
        bio?: string;
        avatarUrl?: string;
    }): Promise<{
        username: string;
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        bio: string | null;
        xp: number;
        level: number;
        streakDays: number;
        createdAt: Date;
    }>;
    deleteAccount(userId: string): Promise<{
        message: string;
    }>;
}
