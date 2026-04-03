import { Controller, Get, Put, Body, Param, Query, UseGuards, Delete } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AdminGuard } from '../../common/guards/admin.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('admin/users')
@UseGuards(AdminGuard)
export class AdminUsersController {
  constructor(private readonly usersService: AdminUsersService) {}

  @Get()
  getUsers(@Query('q') q?: string, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.usersService.searchUsers(q, parseInt(skip || '0', 10), Math.min(100, parseInt(take || '50', 10)));
  }

  @Put(':id/block')
  blockUser(@Param('id') userId: string, @Body('reason') reason: string, @CurrentUser() admin: any) {
    return this.usersService.blockUser(admin.id, userId, reason || 'No reason provided');
  }

  @Put(':id/warn')
  warnUser(@Param('id') userId: string, @Body('reason') reason: string, @CurrentUser() admin: any) {
    return this.usersService.warnUser(admin.id, userId, reason || 'No reason provided');
  }
}
