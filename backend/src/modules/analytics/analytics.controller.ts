import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('user')
  @UseGuards(JwtGuard)
  getUserStats(@CurrentUser() user: any) {
    return this.analyticsService.getUserStats(user.id);
  }

  @Get('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  getAdminStats() {
    return this.analyticsService.getAdminStats();
  }
}
