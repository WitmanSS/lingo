import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  async register(
    @Body() body: { email: string; username: string; password: string },
  ) {
    if (!body.email || !body.username || !body.password) {
      throw new BadRequestException('Missing required fields');
    }

    const user = await this.authService.register(
      body.email,
      body.username,
      body.password,
    );

    return {
      success: true,
      message: 'User registered successfully',
      data: user,
    };
  }

  @Post('login')
  @Public()
  async login(@Body() body: { email: string; password: string }) {
    if (!body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }

    const result = await this.authService.login(body.email, body.password);

    return {
      success: true,
      message: 'Login successful',
      data: result,
    };
  }

  @Post('refresh')
  @Public()
  async refreshToken(@Body() body: { refreshToken: string }) {
    if (!body.refreshToken) {
      throw new BadRequestException('Refresh token is required');
    }

    const tokens = await this.authService.refreshToken(body.refreshToken);

    return {
      success: true,
      data: tokens,
    };
  }

  @Post('logout')
  @UseGuards(JwtGuard)
  async logout(@CurrentUser() user: any) {
    const result = await this.authService.logout(user.id);

    return {
      success: true,
      message: 'Logged out successfully',
      data: result,
    };
  }

  @Get('me')
  @UseGuards(JwtGuard)
  async getCurrentUser(@CurrentUser() user: any) {
    return {
      success: true,
      data: user,
    };
  }
}
