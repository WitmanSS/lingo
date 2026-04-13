import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(user: any): Promise<{
        profile: {
            language: string | null;
            id: string;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            country: string | null;
            timezone: string | null;
        } | null;
        readingStats: {
            id: string;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            totalWordsRead: number;
            totalReadingTime: number;
            storiesCompleted: number;
            vocabularyLearned: number;
            currentStreak: number;
            longestStreak: number;
            lastActivityAt: Date | null;
        } | null;
        id: string;
        createdAt: Date;
        _count: {
            userVocabulary: number;
            favorites: number;
            stories: number;
            achievements: number;
        };
        level: number;
        username: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        bio: string | null;
        xp: number;
        streakDays: number;
        lastLoginAt: Date | null;
        emailVerified: boolean;
    }>;
    updateProfile(user: any, data: {
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
    deleteAccount(user: any): Promise<{
        message: string;
    }>;
}
