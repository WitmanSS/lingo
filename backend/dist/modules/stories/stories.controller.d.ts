import { StoriesService } from './stories.service';
import { CreateStoryDto, UpdateStoryDto, QueryStoriesDto } from './dto';
export declare class StoriesController {
    private storiesService;
    constructor(storiesService: StoriesService);
    findAll(query: QueryStoriesDto): Promise<{
        data: {
            tags: {
                id: string;
                name: string;
            }[];
            id: string;
            createdAt: Date;
            updatedAt: Date;
            _count: {
                favorites: number;
                comments: number;
                ratings: number;
            };
            level: import(".prisma/client").$Enums.Level;
            title: string;
            slug: string;
            difficultyScore: number | null;
            readingTimeMinutes: number;
            wordCount: number;
            coverImage: string | null;
            isAIGenerated: boolean;
            author: {
                id: string;
                username: string;
                avatarUrl: string | null;
            };
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
            hasNextPage: boolean;
            hasPrevPage: boolean;
        };
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
        _count: {
            favorites: number;
            comments: number;
            ratings: number;
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
        translations: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            content: string;
            storyId: string;
            languageCode: string;
        }[];
        audio: {
            id: string;
            createdAt: Date;
            audioUrl: string;
            storyId: string;
            duration: number;
        } | null;
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
    create(userId: string, dto: CreateStoryDto): Promise<{
        tags: {
            id: string;
            name: string;
        }[];
        author: {
            id: string;
            username: string;
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
    update(id: string, dto: UpdateStoryDto): Promise<{
        tags: {
            id: string;
            name: string;
        }[];
        author: {
            id: string;
            username: string;
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
    delete(id: string): Promise<{
        message: string;
    }>;
}
