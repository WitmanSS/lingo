import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async getProgress(userId: string, storyId: string) {
    return this.prisma.userProgress.findUnique({
      where: { userId_storyId: { userId, storyId } },
    });
  }

  async updateProgress(userId: string, data: {
    storyId: string;
    progressPercentage: number;
    lastPosition: number;
    readingTimeSeconds: number;
  }) {
    const completed = data.progressPercentage >= 100;

    const progress = await this.prisma.userProgress.upsert({
      where: { userId_storyId: { userId, storyId: data.storyId } },
      update: {
        progressPercentage: data.progressPercentage,
        lastPosition: data.lastPosition,
        readingTimeSeconds: { increment: data.readingTimeSeconds },
        completed,
      },
      create: {
        userId,
        storyId: data.storyId,
        progressPercentage: data.progressPercentage,
        lastPosition: data.lastPosition,
        readingTimeSeconds: data.readingTimeSeconds,
        completed,
      },
    });

    // Update reading stats
    if (data.readingTimeSeconds > 0) {
      await this.prisma.readingStats.upsert({
        where: { userId },
        update: {
          totalReadingTime: { increment: data.readingTimeSeconds },
          ...(completed ? { storiesCompleted: { increment: 1 } } : {}),
        },
        create: {
          userId,
          totalReadingTime: data.readingTimeSeconds,
          storiesCompleted: completed ? 1 : 0,
        },
      });
    }

    // Award XP for completion
    if (completed) {
      await this.prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: 50 } },
      });
    }

    return progress;
  }
}
