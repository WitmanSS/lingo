import { Controller, Get, Put, Delete, Body, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(JwtGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  getProfile(@CurrentUser() user: any) {
    return this.usersService.getProfile(user.id);
  }

  @Put('profile')
  updateProfile(@CurrentUser() user: any, @Body() data: { username?: string; bio?: string; avatarUrl?: string }) {
    return this.usersService.updateProfile(user.id, data);
  }

  @Delete('account')
  deleteAccount(@CurrentUser() user: any) {
    return this.usersService.deleteAccount(user.id);
  }
}
