import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StoryRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    return this.prisma.story.findUnique({
      where: { id },
      include: {
        author: { select: { id: true, username: true, avatarUrl: true } },
        content: true,
        chapters: true,
        _count: {
          select: { progress: true, favorites: true, reviews: true },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.story.findUnique({
      where: { slug },
      include: {
        author: true,
        content: true,
        chapters: true,
      },
    });
  }

  async findAll(
    skip: number = 0,
    take: number = 20,
    filters?: { level?: string; published?: boolean },
  ) {
    const where: any = {};
    if (filters?.level) where.level = filters.level;
    if (filters?.published !== undefined) where.published = filters.published;

    const [data, total] = await Promise.all([
      this.prisma.story.findMany({
        where,
        skip,
        take,
        include: {
          author: { select: { id: true, username: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.story.count({ where }),
    ]);

    return { data, total };
  }

  async create(data: {
    title: string;
    slug: string;
    level: string;
    wordCount: number;
    readingTimeMinutes: number;
    authorId: string;
    content: string;
  }) {
    return this.prisma.story.create({
      data: {
        title: data.title,
        slug: data.slug,
        level: data.level as any,
        wordCount: data.wordCount,
        readingTimeMinutes: data.readingTimeMinutes,
        authorId: data.authorId,
        content: {
          create: {
            content: data.content,
          },
        },
      },
      include: { content: true },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.story.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.story.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getByAuthor(authorId: string) {
    return this.prisma.story.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
