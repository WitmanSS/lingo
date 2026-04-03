import { AIService } from './ai.service';
export declare class AIController {
    private readonly aiService;
    constructor(aiService: AIService);
    generateStory(body: {
        title: string;
        level: string;
        prompt: string;
        wordCount?: number;
    }): Promise<{
        success: boolean;
        data: {
            title: string;
            content: string;
            wordCount: number;
            tokensUsed: number;
            generationTime: number;
        };
        message: string;
    }>;
    generateVocabulary(body: {
        word: string;
        level: string;
    }): Promise<{
        success: boolean;
        data: {
            word: string;
            definition: string;
            exampleSentence: string;
            phonetic: string;
            level: string;
        };
        message: string;
    }>;
    generateQuizzes(body: {
        storyId: string;
        questionCount?: number;
    }): Promise<{
        success: boolean;
        data: {
            question: string;
            options: {
                text: string;
                isCorrect: boolean;
            }[];
            explanation: string;
        }[];
        message: string;
    }>;
    improveStory(body: {
        storyId: string;
        feedback: string;
    }): Promise<{
        success: boolean;
        data: {
            success: boolean;
            message: string;
            storyId: string;
        };
        message: string;
    }>;
    getStatus(): {
        status: string;
        models: string[];
    };
}
