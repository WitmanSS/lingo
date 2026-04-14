"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const two_factor_service_1 = require("./two-factor.service");
const password_reset_service_1 = require("./password-reset.service");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
const public_decorator_1 = require("../../auth/decorators/public.decorator");
let AuthController = class AuthController {
    authService;
    twoFactorService;
    passwordResetService;
    constructor(authService, twoFactorService, passwordResetService) {
        this.authService = authService;
        this.twoFactorService = twoFactorService;
        this.passwordResetService = passwordResetService;
    }
    async register(body) {
        if (!body.email || !body.username || !body.password) {
            throw new common_1.BadRequestException('Missing required fields');
        }
        const user = await this.authService.register(body.email, body.username, body.password);
        return {
            success: true,
            message: 'User registered successfully',
            data: user,
        };
    }
    async login(body) {
        if (!body.email || !body.password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        const result = await this.authService.login(body.email, body.password);
        return {
            success: true,
            message: 'Login successful',
            data: result,
        };
    }
    async refreshToken(body) {
        if (!body.refreshToken) {
            throw new common_1.BadRequestException('Refresh token is required');
        }
        const tokens = await this.authService.refreshToken(body.refreshToken);
        return {
            success: true,
            data: tokens,
        };
    }
    async logout(user) {
        const result = await this.authService.logout(user.id);
        return {
            success: true,
            message: 'Logged out successfully',
            data: result,
        };
    }
    async getCurrentUser(user) {
        return {
            success: true,
            data: user,
        };
    }
    async setup2FA(user) {
        const result = await this.twoFactorService.generateSecret(user.id);
        return {
            success: true,
            data: result,
        };
    }
    async enable2FA(user, body) {
        const { secret, token } = body;
        if (!secret || !token) {
            throw new common_1.BadRequestException('Secret and token are required');
        }
        const isValid = this.twoFactorService.verifyToken(secret, token);
        if (!isValid) {
            throw new common_1.BadRequestException('Invalid 2FA token');
        }
        await this.authService.enable2FA(user.id, secret);
        return {
            success: true,
            message: '2FA enabled successfully',
        };
    }
    async verify2FA(body) {
        const { tempToken, token } = body;
        if (!tempToken || !token) {
            throw new common_1.BadRequestException('Temp token and 2FA token are required');
        }
        const result = await this.authService.verify2FA(tempToken, token);
        return {
            success: true,
            data: result,
        };
    }
    async disable2FA(user) {
        await this.authService.disable2FA(user.id);
        return {
            success: true,
            message: '2FA disabled successfully',
        };
    }
    async getCsrfToken(req) {
        return {
            success: true,
            data: {
                csrfToken: req.session.csrfToken
            }
        };
    }
    async forgotPassword(body) {
        if (!body.email) {
            throw new common_1.BadRequestException('Email is required');
        }
        const result = await this.passwordResetService.createResetToken(body.email);
        return {
            success: true,
            message: 'If an account with this email exists, a reset link has been sent.',
        };
    }
    async resetPassword(body) {
        if (!body.token || !body.newPassword) {
            throw new common_1.BadRequestException('Token and new password are required');
        }
        await this.passwordResetService.resetPassword(body.token, body.newPassword);
        return {
            success: true,
            message: 'Password reset successfully',
        };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('me'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCurrentUser", null);
__decorate([
    (0, common_1.Post)('2fa/setup'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "setup2FA", null);
__decorate([
    (0, common_1.Post)('2fa/enable'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "enable2FA", null);
__decorate([
    (0, common_1.Post)('2fa/verify'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify2FA", null);
__decorate([
    (0, common_1.Post)('2fa/disable'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "disable2FA", null);
__decorate([
    (0, common_1.Get)('csrf-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getCsrfToken", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, public_decorator_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('api/v1/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        two_factor_service_1.TwoFactorService,
        password_reset_service_1.PasswordResetService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map