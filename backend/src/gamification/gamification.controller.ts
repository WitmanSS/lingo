import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { GamificationService } from './gamification.service';

@Controller('gamification')
export class GamificationController {
  constructor(private gamificationService: GamificationService) {}

  @Get('leaderboard')
  getLeaderboard(@Query('page') page?: number, @Query('limit') limit?: number) {
    return this.gamificationService.getLeaderboard(page, limit);
  }

  @Get('achievements')
  @UseGuards(JwtAuthGuard)
  getAchievements(@CurrentUser() user: any) {
    return this.gamificationService.getUserAchievements(user.id);
  }
}
