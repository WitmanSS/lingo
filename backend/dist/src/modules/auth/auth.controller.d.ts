import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
            accessToken: string;
            refreshToken: string;
            user: {
                id: string;
                email: string;
                username: string;
            };
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
}
