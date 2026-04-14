import { PrismaService } from '../prisma.service';
export declare class StoryRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<({
        _count: {
            progress: number;
            favorites: number;
            reviews: number;
        };
        author: {
            id: string;
            username: string;
            avatarUrl: string | null;
        };
        content: {
            id: string;
            content: string;
            storyId: string;
        } | null;
        chapters: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            wordCount: number;
            content: string;
            storyId: string;
            order: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import(".prisma/client").$Enums.Level;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        isAIGenerated: boolean;
        deletedAt: Date | null;
    }) | null>;
    findBySlug(slug: string): Promise<({
        author: {
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
        content: {
            id: string;
            content: string;
            storyId: string;
        } | null;
        chapters: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            wordCount: number;
            content: string;
            storyId: string;
            order: number;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import(".prisma/client").$Enums.Level;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        isAIGenerated: boolean;
        deletedAt: Date | null;
    }) | null>;
    findAll(skip?: number, take?: number, filters?: {
        level?: string;
        published?: boolean;
    }): Promise<{
        data: ({
            author: {
                id: string;
                username: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            level: import(".prisma/client").$Enums.Level;
            title: string;
            slug: string;
            difficultyScore: number | null;
            readingTimeMinutes: number;
            wordCount: number;
            coverImage: string | null;
            authorId: string;
            published: boolean;
            isAIGenerated: boolean;
            deletedAt: Date | null;
        })[];
        total: number;
    }>;
    create(data: {
        title: string;
        slug: string;
        level: string;
        wordCount: number;
        readingTimeMinutes: number;
        authorId: string;
        content: string;
    }): Promise<{
        content: {
            id: string;
            content: string;
            storyId: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import(".prisma/client").$Enums.Level;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        isAIGenerated: boolean;
        deletedAt: Date | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import(".prisma/client").$Enums.Level;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        isAIGenerated: boolean;
        deletedAt: Date | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import(".prisma/client").$Enums.Level;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        isAIGenerated: boolean;
        deletedAt: Date | null;
    }>;
    getByAuthor(authorId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import(".prisma/client").$Enums.Level;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        isAIGenerated: boolean;
        deletedAt: Date | null;
    }[]>;
}
