import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { PrismaService } from '../../core/database/prisma.service';
import { AppConfigService } from '../../core/config/config.service';
export declare class AuthService {
    private authRepository;
    private jwtService;
    private prisma;
    private configService;
    constructor(authRepository: AuthRepository, jwtService: JwtService, prisma: PrismaService, configService: AppConfigService);
    register(email: string, username: string, password: string): Promise<{
        id: string;
        email: string;
        username: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            username: string;
        };
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    validateUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
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
    }>;
    private generateTokens;
    logout(userId: string): Promise<{
        success: boolean;
    }>;
}
