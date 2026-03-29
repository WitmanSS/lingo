import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ProgressService } from './progress.service';

@Controller('progress')
@UseGuards(JwtAuthGuard)
export class ProgressController {
  constructor(private progressService: ProgressService) {}

  @Get(':storyId')
  getProgress(@CurrentUser() user: any, @Param('storyId') storyId: string) {
    return this.progressService.getProgress(user.id, storyId);
  }

  @Post('update')
  updateProgress(@CurrentUser() user: any, @Body() data: {
    storyId: string;
    progressPercentage: number;
    lastPosition: number;
    readingTimeSeconds: number;
  }) {
    return this.progressService.updateProgress(user.id, data);
  }
}
