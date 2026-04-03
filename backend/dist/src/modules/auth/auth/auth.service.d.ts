import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../../core/database/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            level: number;
            username: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            avatarUrl: string | null;
            bio: string | null;
            xp: number;
            streakDays: number;
        } | null;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            level: number;
            username: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            avatarUrl: string | null;
            bio: string | null;
            xp: number;
            streakDays: number;
        } | null;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            level: number;
            username: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            avatarUrl: string | null;
            bio: string | null;
            xp: number;
            streakDays: number;
        } | null;
    }>;
    logout(refreshToken: string): Promise<void>;
    validateUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        level: number;
        username: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        bio: string | null;
        xp: number;
        streakDays: number;
    } | null>;
    private generateTokens;
}
