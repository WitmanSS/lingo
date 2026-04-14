import { Controller, Get, Post, Put, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Public } from '../../auth/decorators/public.decorator';
import { VocabularyService } from './vocabulary.service';

@Controller('vocabulary')
export class VocabularyController {
  constructor(private vocabularyService: VocabularyService) {}

  @Get(':word')
  @Public()
  lookup(@Param('word') word: string) {
    return this.vocabularyService.lookup(word);
  }

  @Get()
  @UseGuards(JwtGuard)
  getUserVocabulary(
    @CurrentUser() user: any,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.vocabularyService.getUserVocabulary(user.id, page, limit);
  }

  @Post('save')
  @UseGuards(JwtGuard)
  saveWord(@CurrentUser() user: any, @Body('vocabularyId') vocabularyId: string) {
    return this.vocabularyService.saveWord(user.id, vocabularyId);
  }

  @Put(':id/learned')
  @UseGuards(JwtGuard)
  markLearned(@CurrentUser() user: any, @Param('id') id: string) {
    return this.vocabularyService.markLearned(user.id, id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  deleteUserWord(@CurrentUser() user: any, @Param('id') id: string) {
    return this.vocabularyService.deleteUserWord(user.id, id);
  }

  @Get('review/due')
  @UseGuards(JwtGuard)
  getWordsForReview(@CurrentUser() user: any) {
    return this.vocabularyService.getWordsForReview(user.id);
  }
}
