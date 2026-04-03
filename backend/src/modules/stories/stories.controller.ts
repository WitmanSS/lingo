import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Public } from '../../auth/decorators/public.decorator';
import { StoriesService } from './stories.service';
import { Level } from '@prisma/client';

@Controller()
export class StoriesController {
  constructor(private storiesService: StoriesService) {}

  // Public endpoints
  @Get('stories')
  @Public()
  findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('level') level?: Level,
    @Query('tag') tag?: string,
    @Query('search') search?: string,
    @Query('sort') sort?: string,
  ) {
    return this.storiesService.findAll({ page, limit, level, tag, search, sort });
  }

  @Get('stories/:slug')
  @Public()
  findBySlug(@Param('slug') slug: string) {
    return this.storiesService.findBySlug(slug);
  }

  // Admin endpoints
  @Post('stories')
  createPublic(
    @Body() data: { username: string; title: string; content: string; level: Level; coverImage?: string; tagIds?: string[] },
  ) {
    return this.storiesService.createByUsername(data);
  }

  @Post('admin/stories')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  create(
    @CurrentUser() user: any,
    @Body() data: { title: string; content: string; level: Level; coverImage?: string; tagIds?: string[] },
  ) {
    return this.storiesService.create(user.id, data);
  }

  @Put('admin/stories/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  update(@Param('id') id: string, @Body() data: any) {
    return this.storiesService.update(id, data);
  }

  @Delete('admin/stories/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  delete(@Param('id') id: string) {
    return this.storiesService.delete(id);
  }
}
