import { StoriesService } from './stories.service';
import { Level } from '@prisma/client';
export declare class StoriesController {
    private storiesService;
    constructor(storiesService: StoriesService);
    findAll(page?: number, limit?: number, level?: Level, tag?: string, search?: string, sort?: string): Promise<{
        data: {
            tags: {
                id: string;
                name: string;
            }[];
            id: string;
            level: import(".prisma/client").$Enums.Level;
            createdAt: Date;
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
            level: import(".prisma/client").$Enums.Level;
            word: string;
            definition: string;
            exampleSentence: string | null;
            phonetic: string | null;
        }[];
        author: {
            username: string;
            id: string;
            avatarUrl: string | null;
        };
        id: string;
        level: import(".prisma/client").$Enums.Level;
        createdAt: Date;
        content: string;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        updatedAt: Date;
    }>;
    createPublic(data: {
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
        level: import(".prisma/client").$Enums.Level;
        createdAt: Date;
        content: string;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        updatedAt: Date;
    }>;
    create(user: any, data: {
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
        level: import(".prisma/client").$Enums.Level;
        createdAt: Date;
        content: string;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        updatedAt: Date;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        level: import(".prisma/client").$Enums.Level;
        createdAt: Date;
        content: string;
        title: string;
        slug: string;
        difficultyScore: number | null;
        readingTimeMinutes: number;
        wordCount: number;
        coverImage: string | null;
        authorId: string;
        published: boolean;
        updatedAt: Date;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
