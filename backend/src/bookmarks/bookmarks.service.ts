import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return this.prisma.bookmark.findMany({
      where: { userId },
      include: {
        story: { select: { id: true, title: true, slug: true, level: true, readingTimeMinutes: true } },
      },
    });
  }

  async create(userId: string, storyId: string, position = 0) {
    return this.prisma.bookmark.upsert({
      where: { userId_storyId: { userId, storyId } },
      update: { position },
      create: { userId, storyId, position },
    });
  }

  async delete(userId: string, id: string) {
    await this.prisma.bookmark.delete({ where: { id, userId } });
    return { message: 'Bookmark removed' };
  }
}
