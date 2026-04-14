import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminAnalyticsService } from './admin-analytics.service';
import { AdminGuard } from '../../common/guards/admin.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('admin')
@UseGuards(AdminGuard, RolesGuard)
@Roles(Role.ADMIN, Role.MODERATOR)
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
