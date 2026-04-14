"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_repository_1 = require("./auth.repository");
const two_factor_service_1 = require("./two-factor.service");
const prisma_service_1 = require("../../core/database/prisma.service");
const config_service_1 = require("../../core/config/config.service");
const bcrypt = __importStar(require("bcrypt"));
let AuthService = class AuthService {
    authRepository;
    jwtService;
    twoFactorService;
    prisma;
    configService;
    constructor(authRepository, jwtService, twoFactorService, prisma, configService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.twoFactorService = twoFactorService;
        this.prisma = prisma;
        this.configService = configService;
    }
    async register(email, username, password) {
        const existingUser = await this.authRepository.findByEmail(email);
        if (existingUser) {
            throw new common_1.BadRequestException('Email already registered');
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await this.authRepository.create({
            email,
            username,
            passwordHash,
        });
        return {
            id: user.id,
            email: user.email,
            username: user.username,
        };
    }
    async login(email, password) {
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.twoFactorEnabled) {
            const tempToken = this.jwtService.sign({ sub: user.id, type: '2fa_temp' }, { expiresIn: '5m' });
            return {
                requires2FA: true,
                tempToken,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
            };
        }
        const tokens = await this.generateTokens(user.id);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
            },
        };
    }
    async refreshToken(refreshToken) {
        try {
            const decoded = this.jwtService.verify(refreshToken, {
                secret: this.configService.getJwtRefreshSecret(),
            });
            const tokens = await this.generateTokens(decoded.sub);
            return {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async validateUser(userId) {
        const user = await this.authRepository.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return user;
    }
    async generateTokens(userId) {
        const accessToken = this.jwtService.sign({ sub: userId }, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign({ sub: userId }, {
            secret: this.configService.getJwtRefreshSecret(),
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
    async logout(userId) {
        await this.authRepository.deleteSessions(userId);
        return { success: true };
    }
    async enable2FA(userId, secret) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorEnabled: true,
                twoFactorSecret: secret,
            },
        });
    }
    async disable2FA(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: {
                twoFactorEnabled: false,
                twoFactorSecret: null,
            },
        });
    }
    async verify2FA(tempToken, token) {
        try {
            const decoded = this.jwtService.verify(tempToken, {
                secret: this.configService.getJwtSecret(),
            });
            const user = await this.authRepository.findById(decoded.sub);
            if (!user || !user.twoFactorEnabled || !user.twoFactorSecret) {
                throw new common_1.UnauthorizedException('2FA not enabled for this user');
            }
            const isValid = this.twoFactorService.verifyToken(user.twoFactorSecret, token);
            if (!isValid) {
                throw new common_1.UnauthorizedException('Invalid 2FA token');
            }
            const tokens = await this.generateTokens(user.id);
            return {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                },
            };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid 2FA verification');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService,
        two_factor_service_1.TwoFactorService,
        prisma_service_1.PrismaService,
        config_service_1.AppConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map