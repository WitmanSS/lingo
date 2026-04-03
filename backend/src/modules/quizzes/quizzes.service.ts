import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class QuizzesService {
  constructor(private prisma: PrismaService) {}

  async getForStory(storyId: string) {
    return this.prisma.quiz.findMany({
      where: { storyId },
      include: {
        options: { select: { id: true, text: true } }, // hide isCorrect from client
      },
    });
  }

  async submit(userId: string, quizId: string, selectedOptionId: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id: quizId },
      include: { options: true },
    });
    if (!quiz) throw new NotFoundException('Quiz not found');

    const selectedOption = quiz.options.find((o) => o.id === selectedOptionId);
    const score = selectedOption?.isCorrect ? 100 : 0;

    const result = await this.prisma.quizResult.create({
      data: { userId, quizId, score, answers: JSON.stringify({ selectedOptionId }) },
    });

    // Award XP for correct answer
    if (score > 0) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: 10 } },
      });
    }

    return {
      ...result,
      correct: score > 0,
      correctOptionId: quiz.options.find((o) => o.isCorrect)?.id,
      explanation: quiz.explanation,
    };
  }
}
