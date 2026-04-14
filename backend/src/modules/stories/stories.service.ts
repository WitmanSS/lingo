import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Level, Prisma } from '@prisma/client';

@Injectable()
export class StoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: {
    page?: number;
    limit?: number;
    level?: Level;
    tag?: string;
    search?: string;
    sort?: string;
  }) {
    const { page = 1, limit = 12, level, tag, search, sort = 'newest' } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.StoryWhereInput = {
      published: true,
      ...(level && { level }),
      ...(tag && { tags: { some: { tag: { name: tag } } } }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { content: { content: { contains: search, mode: 'insensitive' } } },
        ],
      }),
    };

    const orderBy: Prisma.StoryOrderByWithRelationInput =
      sort === 'popular' ? { favorites: { _count: 'desc' } } :
      sort === 'oldest' ? { createdAt: 'asc' } :
      { createdAt: 'desc' };

    const [stories, total] = await Promise.all([
      this.prisma.story.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        select: {
          id: true, title: true, slug: true, level: true,
          readingTimeMinutes: true, wordCount: true, coverImage: true,
          createdAt: true,
          author: { select: { username: true } },
          tags: { include: { tag: true } },
        },
      }),
      this.prisma.story.count({ where }),
    ]);

    return {
      data: stories.map((s) => ({
        ...s,
        tags: s.tags.map((st) => st.tag),
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findBySlug(slug: string) {
    const story = await this.prisma.story.findUnique({
      where: { slug },
      include: {
        author: { select: { id: true, username: true, avatarUrl: true } },
        tags: { include: { tag: true } },
        vocabulary: { include: { vocabulary: true } },
      },
    });
    if (!story) throw new NotFoundException('Story not found');
    return {
      ...story,
      tags: story.tags.map((st) => st.tag),
      vocabulary: story.vocabulary.map((sv) => sv.vocabulary),
    };
  }

  async createByUsername(data: {
    username: string;
    title: string;
    content: string;
    level: Level;
    coverImage?: string;
    tagIds?: string[];
  }) {
    if (!data.username?.trim()) {
      throw new BadRequestException('Username is required');
    }

    const normalizedUsername = data.username.trim();
    let user = await this.prisma.user.findUnique({ where: { username: normalizedUsername } });

    if (!user) {
      const normalizedEmail = `${normalizedUsername.toLowerCase().replace(/\s+/g, '.').replace(/[^a-z0-9.]/g, '') || 'guest'}@guest.linguaread.local`;
      user = await this.prisma.user.create({
        data: {
          username: normalizedUsername,
          email: normalizedEmail,
          passwordHash: 'guest-placeholder',
        },
      });
    }

    return this.create(user.id, data);
  }

  async create(authorId: string, data: {
    title: string; content: string; level: Level;
    coverImage?: string; tagIds?: string[];
  }) {
    const slug = this.generateSlug(data.title);
    const wordCount = data.content.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200);

    return this.prisma.story.create({
      data: {
        title: data.title,
        slug,
        content: {
          create: {
            content: data.content,
          },
        },
        level: data.level,
        wordCount,
        readingTimeMinutes,
        coverImage: data.coverImage,
        authorId,
        published: true,
        tags: data.tagIds ? {
          create: data.tagIds.map((tagId) => ({ tagId })),
        } : undefined,
      },
      include: {
        author: { select: { username: true } },
        tags: { include: { tag: true } },
      },
    });
  }

  async update(id: string, data: Partial<{
    title: string; content: string; level: Level;
    coverImage: string; published: boolean; tagIds: string[];
  }>) {
    const updateData: any = { ...data };
    delete updateData.tagIds;

    if (data.title) {
      updateData.slug = this.generateSlug(data.title);
    }
    if (data.content) {
      updateData.wordCount = data.content.split(/\s+/).length;
      updateData.readingTimeMinutes = Math.ceil(updateData.wordCount / 200);
    }

    if (data.tagIds) {
      await this.prisma.storyTag.deleteMany({ where: { storyId: id } });
      updateData.tags = { create: data.tagIds.map((tagId) => ({ tagId })) };
    }

    return this.prisma.story.update({
      where: { id },
      data: updateData,
    });
  }

  async delete(id: string) {
    await this.prisma.story.delete({ where: { id } });
    return { message: 'Story deleted' };
  }

  private generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now().toString(36);
  }

  async searchStories(query: string, options: { limit?: number; offset?: number } = {}) {
    const { limit = 20, offset = 0 } = options;
    const searchQuery = query.trim();

    if (!searchQuery) {
      return this.findAll({ page: 1, limit });
    }

    // Use PostgreSQL full-text search with ILIKE for better performance
    const stories = await this.prisma.$queryRaw`
      SELECT
        s.id, s.title, s.slug, s.level, s."readingTimeMinutes", s."wordCount",
        s."coverImage", s."createdAt",
        json_build_object('username', u.username) as author,
        COALESCE(json_agg(json_build_object('name', t.name)) FILTER (WHERE t.id IS NOT NULL), '[]') as tags
      FROM stories s
      JOIN users u ON s."authorId" = u.id
      LEFT JOIN "_StoryTags" st ON s.id = st."A"
      LEFT JOIN tags t ON st."B" = t.id
      LEFT JOIN story_contents sc ON s.id = sc."storyId"
      WHERE s.published = true
        AND (
          s.title ILIKE ${`%${searchQuery}%`}
          OR sc.content ILIKE ${`%${searchQuery}%`}
        )
      GROUP BY s.id, s.title, s.slug, s.level, s."readingTimeMinutes",
               s."wordCount", s."coverImage", s."createdAt", u.username
      ORDER BY s."createdAt" DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    return stories;
  }
}
