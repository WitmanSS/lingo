import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { Level, Prisma } from '@prisma/client';
import { CreateStoryDto, UpdateStoryDto, QueryStoriesDto } from './dto';
import { XpService, XpReason } from '../gamification/xp.service';
import { ModerationPriorityService } from '../admin/moderation-priority.service';

@Injectable()
export class StoriesService {
  private readonly logger = new Logger(StoriesService.name);

  constructor(
    private prisma: PrismaService,
    private xpService: XpService,
    private moderationPriorityService: ModerationPriorityService,
  ) {}

  async findAll(params: QueryStoriesDto) {
    const { page = 1, limit = 12, level, tag, search, sort = 'newest' } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.StoryWhereInput = {
      published: true,
      deletedAt: null, // Soft delete filter
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
          difficultyScore: true, isAIGenerated: true,
          createdAt: true, updatedAt: true,
          author: { select: { id: true, username: true, avatarUrl: true } },
          tags: { include: { tag: true } },
          _count: { select: { favorites: true, comments: true, ratings: true } },
        },
      }),
      this.prisma.story.count({ where }),
    ]);

    return {
      data: stories.map((s) => ({
        ...s,
        tags: s.tags.map((st) => st.tag),
      })),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    };
  }

  async findBySlug(slug: string) {
    const story = await this.prisma.story.findUnique({
      where: { slug, deletedAt: null },
      include: {
        author: { select: { id: true, username: true, avatarUrl: true } },
        content: true,
        chapters: { orderBy: { order: 'asc' } },
        tags: { include: { tag: true } },
        vocabulary: { include: { vocabulary: true } },
        audio: true,
        translations: true,
        _count: { select: { favorites: true, comments: true, ratings: true } },
      },
    });

    if (!story) {
      throw new NotFoundException('Story not found');
    }

    return {
      ...story,
      tags: story.tags.map((st) => st.tag),
      vocabulary: story.vocabulary.map((sv) => sv.vocabulary),
    };
  }

  async create(authorId: string, dto: CreateStoryDto) {
    const slug = this.generateSlug(dto.title);
    const wordCount = dto.content.split(/\s+/).filter(Boolean).length;
    const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    // Basic creation with initially published = false if moderation triggers later
    let story = await this.prisma.story.create({
      data: {
        title: dto.title,
        slug,
        content: {
          create: { content: dto.content },
        },
        level: dto.level,
        wordCount,
        readingTimeMinutes,
        coverImage: dto.coverImage,
        authorId,
        published: true, // Optimistically publish
        tags: dto.tagIds ? {
          create: dto.tagIds.map((tagId) => ({ tagId })),
        } : undefined,
      },
      include: {
        author: { select: { id: true, username: true } },
        tags: { include: { tag: true } },
      },
    });

    // Run Moderation Priority Scan
    const scanResult = await this.moderationPriorityService.scanStoryContent(story.id, dto.content);
    
    if (scanResult.flag) {
      this.logger.warn(`Story ${story.id} auto-flagged [${scanResult.priority}]`);
      
      story = await this.prisma.story.update({
         where: { id: story.id },
         data: { published: false }, // Unpublish high-risk stories automatically
         include: {
            author: { select: { id: true, username: true } },
            tags: { include: { tag: true } },
         }
      });

      // Systemic Report insertion
      await this.prisma.storyReport.create({
         data: {
            storyId: story.id,
            reporterId: authorId, // Mark author as reporter for systemic triggers
            reason: `[SYSTEM AUTO-FLAG] Priority: ${scanResult.priority} | Reason: ${scanResult.reason}`,
         }
      });
    }

    // Grant XP to author (Only if not flagged or maybe we give it anyway and retract later?? Let's say we only give XP if published)
    if (!scanResult.flag) {
       await this.xpService.grantXp(authorId, XpReason.WRITE_STORY);
    }

    this.logger.log(`Story created: ${story.title} (${story.id})`);
    return {
      ...story,
      tags: story.tags.map((st) => st.tag),
    };
  }

  async update(id: string, dto: UpdateStoryDto) {
    // Verify story exists and is not soft-deleted
    const existing = await this.prisma.story.findFirst({
      where: { id, deletedAt: null },
    });
    if (!existing) {
      throw new NotFoundException('Story not found');
    }

    const updateData: Prisma.StoryUpdateInput = {};

    if (dto.title) {
      updateData.title = dto.title;
      updateData.slug = this.generateSlug(dto.title);
    }
    if (dto.content) {
      const wordCount = dto.content.split(/\s+/).filter(Boolean).length;
      updateData.wordCount = wordCount;
      updateData.readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
      updateData.content = {
        update: { content: dto.content },
      };
    }
    if (dto.level) {
      updateData.level = dto.level;
    }
    if (dto.coverImage !== undefined) {
      updateData.coverImage = dto.coverImage;
    }
    if (dto.published !== undefined) {
      updateData.published = dto.published;
    }

    // Handle tags separately
    if (dto.tagIds) {
      await this.prisma.storyTag.deleteMany({ where: { storyId: id } });
      updateData.tags = { create: dto.tagIds.map((tagId) => ({ tagId })) };
    }

    const updated = await this.prisma.story.update({
      where: { id },
      data: updateData,
      include: {
        author: { select: { id: true, username: true } },
        tags: { include: { tag: true } },
      },
    });

    this.logger.log(`Story updated: ${updated.title} (${id})`);
    return {
      ...updated,
      tags: updated.tags.map((st) => st.tag),
    };
  }

  async delete(id: string) {
    // Soft delete instead of hard delete
    const existing = await this.prisma.story.findFirst({
      where: { id, deletedAt: null },
    });
    if (!existing) {
      throw new NotFoundException('Story not found');
    }

    await this.prisma.story.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    this.logger.log(`Story soft-deleted: ${id}`);
    return { message: 'Story deleted successfully' };
  }

  private generateSlug(title: string): string {
    return (
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') +
      '-' +
      Date.now().toString(36)
    );
  }
}
