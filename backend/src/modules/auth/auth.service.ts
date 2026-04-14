import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { TwoFactorService } from './two-factor.service';
import { PrismaService } from '../../core/database/prisma.service';
import { AppConfigService } from '../../core/config/config.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private twoFactorService: TwoFactorService,
    private prisma: PrismaService,
    private configService: AppConfigService,
  ) {}

  async register(email: string, username: string, password: string) {
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.authRepository.create({
      email,
      username,
      passwordHash,
    });

    return {
      id: user.id,
      email: user.email,
      username: user.username,
    };
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      // Generate temporary token for 2FA verification
      const tempToken = this.jwtService.sign(
        { sub: user.id, type: '2fa_temp' },
        { expiresIn: '5m' } // Short-lived temp token
      );

      return {
        requires2FA: true,
        tempToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      };
    }

    const tokens = await this.generateTokens(user.id);

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: this.configService.getJwtRefreshSecret(),
      });

      const tokens = await this.generateTokens(decoded.sub);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(userId: string) {
    const user = await this.authRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }

  private async generateTokens(userId: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId },
      { expiresIn: '15m' },
    );

    const refreshToken = this.jwtService.sign(
      { sub: userId },
      {
        secret: this.configService.getJwtRefreshSecret(),
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken };
  }

  async logout(userId: string) {
    await this.authRepository.deleteSessions(userId);
    return { success: true };
  }

  // 2FA Methods
  async enable2FA(userId: string, secret: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: true,
        twoFactorSecret: secret,
      },
    });
  }

  async disable2FA(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
      },
    });
  }

  async verify2FA(tempToken: string, token: string) {
    // For now, we'll use a simple approach - in production you'd store temp tokens in Redis
    try {
      const decoded = this.jwtService.verify(tempToken, {
        secret: this.configService.getJwtSecret(),
      });

      const user = await this.authRepository.findById(decoded.sub);
      if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
        throw new UnauthorizedException('2FA not enabled for this user');
      }

      const isValid = this.twoFactorService.verifyToken(user.twoFactorSecret, token);
      if (!isValid) {
        throw new UnauthorizedException('Invalid 2FA token');
      }

      const tokens = await this.generateTokens(user.id);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid 2FA verification');
    }
  }
}
