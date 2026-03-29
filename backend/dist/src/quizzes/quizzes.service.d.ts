import { PrismaService } from '../prisma/prisma.service';
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
    }>;
}
