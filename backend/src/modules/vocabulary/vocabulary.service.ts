import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class VocabularyService {
  constructor(private prisma: PrismaService) {}

  async lookup(word: string) {
    const vocab = await this.prisma.vocabulary.findFirst({ where: { word: word.toLowerCase() } });
    if (!vocab) throw new NotFoundException(`Word "${word}" not found`);
    return vocab;
  }

  async getUserVocabulary(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      this.prisma.userVocabulary.findMany({
        where: { userId },
        skip,
        take: limit,
        include: { vocabulary: true },
        orderBy: { lastReviewedAt: 'desc' },
      }),
      this.prisma.userVocabulary.count({ where: { userId } }),
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async saveWord(userId: string, vocabularyId: string) {
    const existing = await this.prisma.userVocabulary.findFirst({
      where: { userId, vocabularyId },
    });
    
    if (existing) {
      return this.prisma.userVocabulary.findUnique({
        where: { id: existing.id },
        include: { vocabulary: true },
      });
    }
    
    return this.prisma.userVocabulary.create({
      data: { userId, vocabularyId },
      include: { vocabulary: true },
    });
  }

  async markLearned(userId: string, id: string) {
    return this.prisma.userVocabulary.update({
      where: { id, userId },
      data: { learned: true, reviewCount: { increment: 1 }, lastReviewedAt: new Date() },
      include: { vocabulary: true },
    });
  }

  async deleteUserWord(userId: string, id: string) {
    await this.prisma.userVocabulary.delete({ where: { id, userId } });
    return { message: 'Word removed' };
  }

  async getWordsForReview(userId: string) {
    return this.prisma.userVocabulary.findMany({
      where: {
        userId,
        learned: false,
        OR: [
          { nextReviewAt: null },
          { nextReviewAt: { lte: new Date() } },
        ],
      },
      include: { vocabulary: true },
      take: 20,
    });
  }
}
