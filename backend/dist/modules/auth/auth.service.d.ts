import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { TwoFactorService } from './two-factor.service';
import { PrismaService } from '../../core/database/prisma.service';
import { AppConfigService } from '../../core/config/config.service';
export declare class AuthService {
    private authRepository;
    private jwtService;
    private twoFactorService;
    private prisma;
    private configService;
    constructor(authRepository: AuthRepository, jwtService: JwtService, twoFactorService: TwoFactorService, prisma: PrismaService, configService: AppConfigService);
    register(email: string, username: string, password: string): Promise<{
        id: string;
        email: string;
        username: string;
    }>;
    login(email: string, password: string): Promise<{
        requires2FA: boolean;
        tempToken: string;
        user: {
            id: string;
            email: string;
            username: string;
        };
        accessToken?: undefined;
        refreshToken?: undefined;
    } | {
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            username: string;
        };
        requires2FA?: undefined;
        tempToken?: undefined;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        level: number;
        deletedAt: Date | null;
        username: string;
        email: string;
        passwordHash: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        bio: string | null;
        xp: number;
        streakDays: number;
        lastActiveAt: Date | null;
        lastLoginAt: Date | null;
        emailVerified: boolean;
        twoFactorEnabled: boolean;
        twoFactorSecret: string | null;
    }>;
    private generateTokens;
    logout(userId: string): Promise<{
        success: boolean;
    }>;
    enable2FA(userId: string, secret: string): Promise<void>;
    disable2FA(userId: string): Promise<void>;
    verify2FA(tempToken: string, token: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            username: string;
        };
    }>;
}
