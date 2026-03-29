import { PrismaService } from '../prisma/prisma.service';
export declare class VocabularyService {
    private prisma;
    constructor(prisma: PrismaService);
    lookup(word: string): Promise<{
        id: string;
        level: import(".prisma/client").$Enums.Level;
        word: string;
        definition: string;
        exampleSentence: string | null;
        phonetic: string | null;
    }>;
    getUserVocabulary(userId: string, page?: number, limit?: number): Promise<{
        data: ({
            vocabulary: {
                id: string;
                level: import(".prisma/client").$Enums.Level;
                word: string;
                definition: string;
                exampleSentence: string | null;
                phonetic: string | null;
            };
        } & {
            id: string;
            userId: string;
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
    saveWord(userId: string, vocabularyId: string): Promise<{
        vocabulary: {
            id: string;
            level: import(".prisma/client").$Enums.Level;
            word: string;
            definition: string;
            exampleSentence: string | null;
            phonetic: string | null;
        };
    } & {
        id: string;
        userId: string;
        vocabularyId: string;
        learned: boolean;
        reviewCount: number;
        lastReviewedAt: Date | null;
        nextReviewAt: Date | null;
    }>;
    markLearned(userId: string, id: string): Promise<{
        vocabulary: {
            id: string;
            level: import(".prisma/client").$Enums.Level;
            word: string;
            definition: string;
            exampleSentence: string | null;
            phonetic: string | null;
        };
    } & {
        id: string;
        userId: string;
        vocabularyId: string;
        learned: boolean;
        reviewCount: number;
        lastReviewedAt: Date | null;
        nextReviewAt: Date | null;
    }>;
    deleteUserWord(userId: string, id: string): Promise<{
        message: string;
    }>;
    getWordsForReview(userId: string): Promise<({
        vocabulary: {
            id: string;
            level: import(".prisma/client").$Enums.Level;
            word: string;
            definition: string;
            exampleSentence: string | null;
            phonetic: string | null;
        };
    } & {
        id: string;
        userId: string;
        vocabularyId: string;
        learned: boolean;
        reviewCount: number;
        lastReviewedAt: Date | null;
        nextReviewAt: Date | null;
    })[]>;
}
