import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { AdminStoriesController } from './admin-stories.controller';
import { AdminStoriesService } from './admin-stories.service';
import { AdminAnalyticsService } from './admin-analytics.service';
import { AdminAnalyticsController } from './admin-analytics.controller';
import { ModerationPriorityService } from './moderation-priority.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SecurityAuditInterceptor } from '../../common/interceptors/security-audit.interceptor';

@Module({
  controllers: [AdminController, AdminUsersController, AdminStoriesController, AdminAnalyticsController],
  providers: [
     AdminService, AdminUsersService, AdminStoriesService, AdminAnalyticsService, ModerationPriorityService,
     { provide: APP_INTERCEPTOR, useClass: SecurityAuditInterceptor }
  ],
  exports: [AdminService, ModerationPriorityService],
})
export class AdminModule {}
