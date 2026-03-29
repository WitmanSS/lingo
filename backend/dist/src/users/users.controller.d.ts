import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(user: any): Promise<{
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
    updateProfile(user: any, data: {
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
    deleteAccount(user: any): Promise<{
        message: string;
    }>;
}
