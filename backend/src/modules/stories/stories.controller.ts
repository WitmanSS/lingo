import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { StoriesService } from './stories.service';
import { CreateStoryDto, UpdateStoryDto, QueryStoriesDto } from './dto';

@Controller('stories')
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  // ─── Public Endpoints ─────────────────────────────

  @Get()
  @Public()
  findAll(@Query() query: QueryStoriesDto) {
    return this.storiesService.findAll(query);
  }

  @Get(':slug')
  @Public()
  findBySlug(@Param('slug') slug: string) {
    return this.storiesService.findBySlug(slug);
  }

  // ─── Authenticated Endpoints ──────────────────────

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'MODERATOR')
  create(
    @CurrentUser('id') userId: string,
    @Body() dto: CreateStoryDto,
  ) {
    return this.storiesService.create(userId, dto);
  }

  @Put(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'MODERATOR')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateStoryDto,
  ) {
    return this.storiesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  delete(@Param('id') id: string) {
    return this.storiesService.delete(id);
  }
}
