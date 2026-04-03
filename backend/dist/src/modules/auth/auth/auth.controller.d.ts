import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    refresh(dto: RefreshTokenDto): Promise<{
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
    logout(dto: RefreshTokenDto): Promise<{
        message: string;
    }>;
}
