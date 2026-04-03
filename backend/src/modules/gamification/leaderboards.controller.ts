import { Controller, Get, Query } from '@nestjs/common';
import { LeaderboardService, LeaderboardType } from './leaderboard.service';

@Controller('leaderboards')
export class LeaderboardsController {
  constructor(private leaderboardService: LeaderboardService) {}

  @Get('alltime')
  getAllTimeXp(@Query('limit') limitStr?: string) {
    const limit = parseInt(limitStr || '10', 10);
    return this.leaderboardService.getTopUsers(LeaderboardType.ALL_TIME_XP, limit);
  }

  @Get('weekly')
  getWeeklyReaders(@Query('limit') limitStr?: string) {
    const limit = parseInt(limitStr || '10', 10);
    return this.leaderboardService.getTopUsers(LeaderboardType.WEEKLY_READERS, Math.min(20, limit));
  }
}
