import { PrismaService } from '../database/prisma.service';
interface SearchOptions {
    query: string;
    level?: string;
    limit?: number;
    offset?: number;
}
export declare class SearchService {
    private prisma;
    constructor(prisma: PrismaService);
    searchStories(options: SearchOptions): Promise<({
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
    })[]>;
    searchVocabulary(options: SearchOptions): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import(".prisma/client").$Enums.Level;
        word: string;
        definition: string;
        exampleSentence: string | null;
        phonetic: string | null;
        audioUrl: string | null;
    }[]>;
    advancedSearch(query: string, filters: any): Promise<{
        stories: never[];
        vocabulary: never[];
        users: never[];
    }>;
    getSearchSuggestions(query: string): Promise<{
        stories: string[];
        vocabulary: string[];
    }>;
    getTrendingStories(limit?: number): Promise<({
        _count: {
            progress: number;
            favorites: number;
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
    })[]>;
    getRelatedStories(storyId: string, limit?: number): Promise<{
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
export {};
