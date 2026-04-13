import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminAnalyticsService } from './admin-analytics.service';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('admin')
@UseGuards(AdminGuard)
export class AdminAnalyticsController {
  constructor(private analyticsService: AdminAnalyticsService) {}

  @Get('dashboard')
  getDashboard() {
    return this.analyticsService.getPlatformDashboardData();
  }

  @Get('growth')
  getGrowthChart() {
    return this.analyticsService.getGrowthTimeseries();
  }
}
