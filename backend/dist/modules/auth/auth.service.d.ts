import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from './auth.repository';
import { PrismaService } from '../../core/database/prisma.service';
import { AppConfigService } from '../../core/config/config.service';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private authRepository;
    private jwtService;
    private prisma;
    private configService;
    private readonly logger;
    constructor(authRepository: AuthRepository, jwtService: JwtService, prisma: PrismaService, configService: AppConfigService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            username: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            username: string;
            role: import(".prisma/client").$Enums.Role;
            avatarUrl: string | null;
            xp: number;
            level: number;
        };
    }>;
    refreshToken(token: string): Promise<{
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
    logout(userId: string): Promise<{
        success: boolean;
    }>;
    private generateTokens;
    private storeRefreshToken;
}
