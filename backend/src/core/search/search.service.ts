import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

interface SearchOptions {
  query: string;
  level?: string;
  limit?: number;
  offset?: number;
}

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async searchStories(options: SearchOptions) {
    const { query, level, limit = 20, offset = 0 } = options;

    const stories = await this.prisma.story.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: query } },
            ],
          },
          level ? { level: level as any } : {},
        ],
      },
      include: {
        author: { select: { id: true, username: true, avatarUrl: true } },
        _count: {
          select: { progress: true, favorites: true, reviews: true },
        },
      },
      take: limit,
      skip: offset,
    });

    return stories;
  }

  async searchVocabulary(options: SearchOptions) {
    const { query, level, limit = 20, offset = 0 } = options;

    const vocabulary = await this.prisma.vocabulary.findMany({
      where: {
        AND: [
          {
            OR: [
              { word: { contains: query } },
              { definition: { contains: query } },
            ],
          },
          level ? { level: level as any } : {},
        ],
      },
      take: limit,
      skip: offset,
    });

    return vocabulary;
  }

  async advancedSearch(query: string, filters: any) {
    // Implement advanced search with filters
    // This can include level, author, date range, etc.
    return {
      stories: [],
      vocabulary: [],
      users: [],
    };
  }

  async getSearchSuggestions(query: string) {
    const stories = await this.prisma.story.findMany({
      where: {
        title: { contains: query },
      },
      select: { title: true },
      take: 5,
    });

    const vocabulary = await this.prisma.vocabulary.findMany({
      where: {
        word: { contains: query },
      },
      select: { word: true },
      take: 5,
    });

    return {
      stories: stories.map(s => s.title),
      vocabulary: vocabulary.map(v => v.word),
    };
  }

  async getTrendingStories(limit: number = 10) {
    // Get trending stories based on views and ratings
    const stories = await this.prisma.story.findMany({
      where: { published: true },
      include: {
        _count: { select: { progress: true, favorites: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return stories;
  }

  async getRelatedStories(storyId: string, limit: number = 5) {
    const story = await this.prisma.story.findUnique({
      where: { id: storyId },
      include: { tags: { include: { tag: true } } },
    });

    if (!story) return [];

    // Find stories with similar tags
    const tagIds = story.tags.map(st => st.tagId);

    const relatedStories = await this.prisma.story.findMany({
      where: {
        AND: [
          { id: { not: storyId } },
          { level: story.level },
          { tags: { some: { tagId: { in: tagIds } } } },
        ],
      },
      take: limit,
    });

    return relatedStories;
  }
}
