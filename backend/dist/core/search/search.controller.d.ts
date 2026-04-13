import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    searchStories(query: string, level?: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        data: ({
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
        })[];
        query: string;
        count: number;
    }>;
    searchVocabulary(query: string, level?: string, limit?: string, offset?: string): Promise<{
        success: boolean;
        data: {
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
        query: string;
        count: number;
    }>;
    getSearchSuggestions(query: string): Promise<{
        success: boolean;
        data: {
            stories: string[];
            vocabulary: string[];
        };
    }>;
    getTrendingStories(limit?: string): Promise<{
        success: boolean;
        data: ({
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
        })[];
        count: number;
    }>;
    getRelatedStories(storyId: string, limit?: string): Promise<{
        success: boolean;
        data: {
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
        }[];
        count: number;
    }>;
}
