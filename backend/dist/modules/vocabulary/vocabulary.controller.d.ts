import { VocabularyService } from './vocabulary.service';
export declare class VocabularyController {
    private vocabularyService;
    constructor(vocabularyService: VocabularyService);
    lookup(word: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: import(".prisma/client").$Enums.Level;
        word: string;
        definition: string;
        exampleSentence: string | null;
        phonetic: string | null;
        audioUrl: string | null;
    }>;
    getUserVocabulary(user: any, page?: number, limit?: number): Promise<{
        data: ({
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
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            updatedAt: Date;
            vocabularyId: string;
            learned: boolean;
            reviewCount: number;
            lastReviewedAt: Date | null;
            nextReviewAt: Date | null;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    saveWord(user: any, vocabularyId: string): Promise<({
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
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        updatedAt: Date;
        vocabularyId: string;
        learned: boolean;
        reviewCount: number;
        lastReviewedAt: Date | null;
        nextReviewAt: Date | null;
    }) | null>;
    markLearned(user: any, id: string): Promise<{
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
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        updatedAt: Date;
        vocabularyId: string;
        learned: boolean;
        reviewCount: number;
        lastReviewedAt: Date | null;
        nextReviewAt: Date | null;
    }>;
    deleteUserWord(user: any, id: string): Promise<{
        message: string;
    }>;
    getWordsForReview(user: any): Promise<({
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
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        updatedAt: Date;
        vocabularyId: string;
        learned: boolean;
        reviewCount: number;
        lastReviewedAt: Date | null;
        nextReviewAt: Date | null;
    })[]>;
}
