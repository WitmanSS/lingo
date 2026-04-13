import { QuizzesService } from './quizzes.service';
export declare class QuizzesController {
    private quizzesService;
    constructor(quizzesService: QuizzesService);
    getForStory(storyId: string): Promise<({
        options: {
            id: string;
            text: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        storyId: string;
        question: string;
        explanation: string | null;
    })[]>;
    submit(user: any, data: {
        quizId: string;
        selectedOptionId: string;
    }): Promise<{
        correct: boolean;
        correctOptionId: string | undefined;
        explanation: string | null;
        id: string;
        createdAt: Date;
        userId: string;
        quizId: string;
        score: number;
        answers: string;
    }>;
}
