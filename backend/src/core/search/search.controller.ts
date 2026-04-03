import { Controller, Get, Query, UseGuards, BadRequestException } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtGuard } from '../../common/guards/jwt.guard';

@Controller('api/v1/search')
@UseGuards(JwtGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('stories')
  async searchStories(
    @Query('q') query: string,
    @Query('level') level?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException('Search query is required');
    }

    const stories = await this.searchService.searchStories({
      query,
      level,
      limit: limit ? parseInt(limit) : 20,
      offset: offset ? parseInt(offset) : 0,
    });

    return {
      success: true,
      data: stories,
      query,
      count: stories.length,
    };
  }

  @Get('vocabulary')
  async searchVocabulary(
    @Query('q') query: string,
    @Query('level') level?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException('Search query is required');
    }

    const vocabulary = await this.searchService.searchVocabulary({
      query,
      level,
      limit: limit ? parseInt(limit) : 20,
      offset: offset ? parseInt(offset) : 0,
    });

    return {
      success: true,
      data: vocabulary,
      query,
      count: vocabulary.length,
    };
  }

  @Get('suggestions')
  async getSearchSuggestions(@Query('q') query: string) {
    if (!query || query.trim().length < 2) {
      return {
        success: true,
        data: { stories: [], vocabulary: [] },
      };
    }

    const suggestions = await this.searchService.getSearchSuggestions(query);

    return {
      success: true,
      data: suggestions,
    };
  }

  @Get('trending')
  async getTrendingStories(@Query('limit') limit?: string) {
    const stories = await this.searchService.getTrendingStories(
      limit ? parseInt(limit) : 10,
    );

    return {
      success: true,
      data: stories,
      count: stories.length,
    };
  }

  @Get('related/:storyId')
  async getRelatedStories(
    @Query('storyId') storyId: string,
    @Query('limit') limit?: string,
  ) {
    if (!storyId) {
      throw new BadRequestException('Story ID is required');
    }

    const stories = await this.searchService.getRelatedStories(
      storyId,
      limit ? parseInt(limit) : 5,
    );

    return {
      success: true,
      data: stories,
      count: stories.length,
    };
  }
}
