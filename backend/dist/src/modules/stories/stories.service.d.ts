import { PrismaService } from '../../core/database/prisma.service';
import { Level } from '@prisma/client';
export declare class StoriesService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(params: {
        page?: number;
        limit?: number;
        level?: Level;
        tag?: string;
        search?: string;
        sort?: string;
    }): Promise<{
        data: {
            tags: {
                id: string;
                name: string;
            }[];
            id: string;
            createdAt: Date;
            level: import(".prisma/client").$Enums.Level;
            title: string;
            slug: string;
            readingTimeMinutes: number;
            wordCount: number;
            coverImage: string | null;
            author: {
                username: string;
            };
        }[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findBySlug(slug: string): Promise<{
        tags: {
            id: string;
            name: string;
        }[];
        vocabulary: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            level: import(".prisma/client").$Enums.Level;
            word: string;
            definition: string;
            exampleSentence: string | null;
            phonetic: string | null;
            audioUrl: string | null;
        }[];
        author: {
            id: string;
            username: string;
            avatarUrl: string | null;
        };
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
    createByUsername(data: {
        username: string;
        title: string;
        content: string;
        level: Level;
        coverImage?: string;
        tagIds?: string[];
    }): Promise<{
        author: {
            username: string;
        };
        tags: ({
            tag: {
                id: string;
                name: string;
            };
        } & {
            storyId: string;
            tagId: string;
        })[];
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
    create(authorId: string, data: {
        title: string;
        content: string;
        level: Level;
        coverImage?: string;
        tagIds?: string[];
    }): Promise<{
        author: {
            username: string;
        };
        tags: ({
            tag: {
                id: string;
                name: string;
            };
        } & {
            storyId: string;
            tagId: string;
        })[];
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
    update(id: string, data: Partial<{
        title: string;
        content: string;
        level: Level;
        coverImage: string;
        published: boolean;
        tagIds: string[];
    }>): Promise<{
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
        message: string;
    }>;
    private generateSlug;
}
