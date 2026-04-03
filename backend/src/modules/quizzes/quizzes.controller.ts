import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { QuizzesService } from './quizzes.service';

@Controller()
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Get('stories/:storyId/quiz')
  @UseGuards(JwtGuard)
  getForStory(@Param('storyId') storyId: string) {
    return this.quizzesService.getForStory(storyId);
  }

  @Post('quiz/submit')
  @UseGuards(JwtGuard)
  submit(
    @CurrentUser() user: any,
    @Body() data: { quizId: string; selectedOptionId: string },
  ) {
    return this.quizzesService.submit(user.id, data.quizId, data.selectedOptionId);
  }
}
