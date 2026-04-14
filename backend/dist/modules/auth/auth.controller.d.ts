import { AuthService } from './auth.service';
import { TwoFactorService } from './two-factor.service';
import { PasswordResetService } from './password-reset.service';
export declare class AuthController {
    private authService;
    private twoFactorService;
    private passwordResetService;
    constructor(authService: AuthService, twoFactorService: TwoFactorService, passwordResetService: PasswordResetService);
    register(body: {
        email: string;
        username: string;
        password: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            id: string;
            email: string;
            username: string;
        };
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
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
        };
    }>;
    refreshToken(body: {
        refreshToken: string;
    }): Promise<{
        success: boolean;
        data: {
            accessToken: string;
            refreshToken: string;
        };
    }>;
    logout(user: any): Promise<{
        success: boolean;
        message: string;
        data: {
            success: boolean;
        };
    }>;
    getCurrentUser(user: any): Promise<{
        success: boolean;
        data: any;
    }>;
    setup2FA(user: any): Promise<{
        success: boolean;
        data: {
            secret: string;
            qrCode: string;
        };
    }>;
    enable2FA(user: any, body: {
        secret: string;
        token: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    verify2FA(body: {
        tempToken: string;
        token: string;
    }): Promise<{
        success: boolean;
        data: {
            accessToken: string;
            refreshToken: string;
            user: {
                id: string;
                email: string;
                username: string;
            };
        };
    }>;
    disable2FA(user: any): Promise<{
        success: boolean;
        message: string;
    }>;
    getCsrfToken(req: any): Promise<{
        success: boolean;
        data: {
            csrfToken: any;
        };
    }>;
    forgotPassword(body: {
        email: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(body: {
        token: string;
        newPassword: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
