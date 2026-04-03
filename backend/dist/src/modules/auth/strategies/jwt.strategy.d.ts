import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(payload: {
        sub: string;
    }): Promise<{
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
}
export {};
