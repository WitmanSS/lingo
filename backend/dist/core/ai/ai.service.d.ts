import { AppConfigService } from '../config/config.service';
import { PrismaService } from '../database/prisma.service';
interface GenerateStoryOptions {
    title: string;
    level: string;
    prompt: string;
    wordCount?: number;
}
interface GenerateVocabularyOptions {
    word: string;
    level: string;
}
export declare class AIService {
    private config;
    private prisma;
    constructor(config: AppConfigService, prisma: PrismaService);
    generateStory(options: GenerateStoryOptions): Promise<{
        title: string;
        content: string;
        wordCount: number;
        tokensUsed: number;
        generationTime: number;
    }>;
    generateVocabulary(options: GenerateVocabularyOptions): Promise<{
        word: string;
        definition: string;
        exampleSentence: string;
        phonetic: string;
        level: string;
    }>;
    improveStoryContent(storyId: string, feedback: string): Promise<{
        success: boolean;
        message: string;
        storyId: string;
    }>;
    generateQuizzes(storyId: string, questionCount?: number): Promise<{
        question: string;
        options: {
            text: string;
            isCorrect: boolean;
        }[];
        explanation: string;
    }[]>;
}
export {};
