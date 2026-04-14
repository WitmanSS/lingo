import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  BadRequestException,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TwoFactorService } from './two-factor.service';
import { PasswordResetService } from './password-reset.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { Public } from '../../auth/decorators/public.decorator';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private twoFactorService: TwoFactorService,
    private passwordResetService: PasswordResetService,
  ) {}

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

  // 2FA Endpoints
  @Post('2fa/setup')
  @UseGuards(JwtGuard)
  async setup2FA(@CurrentUser() user: any) {
    const result = await this.twoFactorService.generateSecret(user.id);

    return {
      success: true,
      data: result,
    };
  }

  @Post('2fa/enable')
  @UseGuards(JwtGuard)
  async enable2FA(
    @CurrentUser() user: any,
    @Body() body: { secret: string; token: string },
  ) {
    const { secret, token } = body;

    if (!secret || !token) {
      throw new BadRequestException('Secret and token are required');
    }

    const isValid = this.twoFactorService.verifyToken(secret, token);
    if (!isValid) {
      throw new BadRequestException('Invalid 2FA token');
    }

    // Store the secret and enable 2FA for the user
    await this.authService.enable2FA(user.id, secret);

    return {
      success: true,
      message: '2FA enabled successfully',
    };
  }

  @Post('2fa/verify')
  @Public()
  async verify2FA(@Body() body: { tempToken: string; token: string }) {
    const { tempToken, token } = body;

    if (!tempToken || !token) {
      throw new BadRequestException('Temp token and 2FA token are required');
    }

    const result = await this.authService.verify2FA(tempToken, token);

    return {
      success: true,
      data: result,
    };
  }

  @Post('2fa/disable')
  @UseGuards(JwtGuard)
  async disable2FA(@CurrentUser() user: any) {
    await this.authService.disable2FA(user.id);

    return {
      success: true,
      message: '2FA disabled successfully',
    };
  }

  @Get('csrf-token')
  async getCsrfToken(req: any) {
    return {
      success: true,
      data: {
        csrfToken: req.session.csrfToken
      }
    };
  }

  // Password Reset Endpoints
  @Post('forgot-password')
  @Public()
  async forgotPassword(@Body() body: { email: string }) {
    if (!body.email) {
      throw new BadRequestException('Email is required');
    }

    const result = await this.passwordResetService.createResetToken(body.email);

    return {
      success: true,
      message: 'If an account with this email exists, a reset link has been sent.',
    };
  }

  @Post('reset-password')
  @Public()
  async resetPassword(@Body() body: { token: string; newPassword: string }) {
    if (!body.token || !body.newPassword) {
      throw new BadRequestException('Token and new password are required');
    }

    await this.passwordResetService.resetPassword(body.token, body.newPassword);

    return {
      success: true,
      message: 'Password reset successfully',
    };
  }
}
