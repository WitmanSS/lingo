import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { BookmarksService } from './bookmarks.service';

@Controller('bookmarks')
@UseGuards(JwtGuard)
export class BookmarksController {
  constructor(private bookmarksService: BookmarksService) {}

  @Get()
  getAll(@CurrentUser() user: any) {
    return this.bookmarksService.getAll(user.id);
  }

  @Post()
  create(@CurrentUser() user: any, @Body() data: { storyId: string; position?: number }) {
    return this.bookmarksService.create(user.id, data.storyId, data.position);
  }

  @Delete(':id')
  delete(@CurrentUser() user: any, @Param('id') id: string) {
    return this.bookmarksService.delete(user.id, id);
  }
}
