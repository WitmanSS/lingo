import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private favoritesService: FavoritesService) {}

  @Get()
  getAll(@CurrentUser() user: any, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.favoritesService.getAll(user.id, page, limit);
  }

  @Post()
  toggle(@CurrentUser() user: any, @Body('storyId') storyId: string) {
    return this.favoritesService.toggle(user.id, storyId);
  }
}
