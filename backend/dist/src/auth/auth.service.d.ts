import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            username: string;
            email: string;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            avatarUrl: string | null;
            bio: string | null;
            xp: number;
            level: number;
            streakDays: number;
            createdAt: Date;
        } | null;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            username: string;
            email: string;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            avatarUrl: string | null;
            bio: string | null;
            xp: number;
            level: number;
            streakDays: number;
            createdAt: Date;
        } | null;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            username: string;
            email: string;
            id: string;
            role: import(".prisma/client").$Enums.Role;
            avatarUrl: string | null;
            bio: string | null;
            xp: number;
            level: number;
            streakDays: number;
            createdAt: Date;
        } | null;
    }>;
    logout(refreshToken: string): Promise<void>;
    validateUser(userId: string): Promise<{
        username: string;
        email: string;
        id: string;
        role: import(".prisma/client").$Enums.Role;
        avatarUrl: string | null;
        bio: string | null;
        xp: number;
        level: number;
        streakDays: number;
        createdAt: Date;
    } | null>;
    private generateTokens;
}
