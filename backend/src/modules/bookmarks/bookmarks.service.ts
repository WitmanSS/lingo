import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

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
    const existing = await this.prisma.bookmark.findFirst({
      where: { userId, storyId },
    });
    
    if (existing) {
      return this.prisma.bookmark.update({
        where: { id: existing.id },
        data: { position },
      });
    }
    
    return this.prisma.bookmark.create({
      data: { userId, storyId, position },
    });
  }

  async delete(userId: string, id: string) {
    await this.prisma.bookmark.delete({ where: { id, userId } });
    return { message: 'Bookmark removed' };
  }
}
