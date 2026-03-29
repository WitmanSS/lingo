import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { QuizzesService } from './quizzes.service';

@Controller()
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Get('stories/:storyId/quiz')
  @UseGuards(JwtAuthGuard)
  getForStory(@Param('storyId') storyId: string) {
    return this.quizzesService.getForStory(storyId);
  }

  @Post('quiz/submit')
  @UseGuards(JwtAuthGuard)
  submit(
    @CurrentUser() user: any,
    @Body() data: { quizId: string; selectedOptionId: string },
  ) {
    return this.quizzesService.submit(user.id, data.quizId, data.selectedOptionId);
  }
}
