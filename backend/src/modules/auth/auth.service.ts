import { Injectable, BadRequestException, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { PrismaService } from '../../core/database/prisma.service';
import { AppConfigService } from '../../core/config/config.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private authRepository: AuthRepository,
    private jwtService: JwtService,
    private prisma: PrismaService,
    private configService: AppConfigService,
  ) {}

  async register(dto: RegisterDto) {
    // Check for existing email
    const existingEmail = await this.authRepository.findByEmail(dto.email);
    if (existingEmail) {
      throw new BadRequestException('Email already registered');
    }

    // Check for existing username
    const existingUsername = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });
    if (existingUsername) {
      throw new BadRequestException('Username already taken');
    }

    const passwordHash = await bcrypt.hash(dto.password, this.configService.bcryptRounds);

    const user = await this.authRepository.create({
      email: dto.email,
      username: dto.username,
      passwordHash,
    });

    // Generate tokens on registration so user is immediately logged in
    const tokens = await this.generateTokens(user.id, user.role);

    // Store refresh token
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    this.logger.log(`User registered: ${user.email}`);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    };
  }

  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check soft delete
    if (user.deletedAt) {
      throw new UnauthorizedException('Account has been deactivated');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const tokens = await this.generateTokens(user.id, user.role);

    // Store refresh token
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    // Update last login
    await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    this.logger.log(`User logged in: ${user.email}`);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        avatarUrl: user.avatarUrl,
        xp: user.xp,
        level: user.level,
      },
    };
  }

  async refreshToken(token: string) {
    try {
      // Verify the refresh token JWT
      const decoded = this.jwtService.verify(token, {
        secret: this.configService.getJwtRefreshSecret(),
      });

      // Check if refresh token exists in DB (not revoked)
      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { token },
      });

      if (!storedToken || storedToken.expiresAt < new Date()) {
        throw new UnauthorizedException('Refresh token expired or revoked');
      }

      // Revoke old refresh token (token rotation)
      await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });

      // Get user to include role in new token
      const user = await this.authRepository.findById(decoded.sub);
      if (!user || user.deletedAt) {
        throw new UnauthorizedException('User not found or deactivated');
      }

      // Generate new token pair
      const tokens = await this.generateTokens(decoded.sub, user.role);

      // Store new refresh token
      await this.storeRefreshToken(decoded.sub, tokens.refreshToken);

      return {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(userId: string) {
    const user = await this.authRepository.findById(userId);
    if (!user || user.deletedAt) {
      throw new UnauthorizedException('User not found');
    }
    // Return user without passwordHash
    const { passwordHash, ...safeUser } = user;
    return safeUser;
  }

  async logout(userId: string) {
    // Revoke all refresh tokens for user
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
    // Delete all sessions
    await this.authRepository.deleteSessions(userId);
    this.logger.log(`User logged out: ${userId}`);
    return { success: true };
  }

  private async generateTokens(userId: string, role: string) {
    const accessToken = this.jwtService.sign(
      { sub: userId, role },
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

  private async storeRefreshToken(userId: string, token: string): Promise<void> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await this.prisma.refreshToken.create({
      data: {
        id: uuidv4(),
        token,
        userId,
        expiresAt,
      },
    });
  }
}
