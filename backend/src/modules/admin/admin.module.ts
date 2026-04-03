import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { AdminStoriesController } from './admin-stories.controller';
import { AdminStoriesService } from './admin-stories.service';

@Module({
  controllers: [AdminController, AdminUsersController, AdminStoriesController],
  providers: [AdminService, AdminUsersService, AdminStoriesService],
  exports: [AdminService],
})
export class AdminModule {}
