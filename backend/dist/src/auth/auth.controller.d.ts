import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshTokenDto } from './dto/auth.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    refresh(dto: RefreshTokenDto): Promise<{
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
    logout(dto: RefreshTokenDto): Promise<{
        message: string;
    }>;
}
