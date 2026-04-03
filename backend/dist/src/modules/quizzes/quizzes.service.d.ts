import { PrismaService } from '../../core/database/prisma.service';
export declare class QuizzesService {
    private prisma;
    constructor(prisma: PrismaService);
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
    submit(userId: string, quizId: string, selectedOptionId: string): Promise<{
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
