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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_repository_1 = require("./auth.repository");
const prisma_service_1 = require("../../core/database/prisma.service");
const config_service_1 = require("../../core/config/config.service");
const bcrypt = __importStar(require("bcrypt"));
const uuid_1 = require("uuid");
let AuthService = AuthService_1 = class AuthService {
    authRepository;
    jwtService;
    prisma;
    configService;
    logger = new common_1.Logger(AuthService_1.name);
    constructor(authRepository, jwtService, prisma, configService) {
        this.authRepository = authRepository;
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.configService = configService;
    }
    async register(dto) {
        const existingEmail = await this.authRepository.findByEmail(dto.email);
        if (existingEmail) {
            throw new common_1.BadRequestException('Email already registered');
        }
        const existingUsername = await this.prisma.user.findUnique({
            where: { username: dto.username },
        });
        if (existingUsername) {
            throw new common_1.BadRequestException('Username already taken');
        }
        const passwordHash = await bcrypt.hash(dto.password, this.configService.bcryptRounds);
        const user = await this.authRepository.create({
            email: dto.email,
            username: dto.username,
            passwordHash,
        });
        const tokens = await this.generateTokens(user.id, user.role);
        await this.storeRefreshToken(user.id, tokens.refreshToken);
        this.logger.log(`User registered: ${user.email}`);
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
            },
        };
    }
    async login(email, password) {
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (user.deletedAt) {
            throw new common_1.UnauthorizedException('Account has been deactivated');
        }
        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.generateTokens(user.id, user.role);
        await this.storeRefreshToken(user.id, tokens.refreshToken);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { lastLoginAt: new Date() },
        });
        this.logger.log(`User logged in: ${user.email}`);
        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                role: user.role,
                avatarUrl: user.avatarUrl,
                xp: user.xp,
                level: user.level,
            },
        };
    }
    async refreshToken(token) {
        try {
            const decoded = this.jwtService.verify(token, {
                secret: this.configService.getJwtRefreshSecret(),
            });
            const storedToken = await this.prisma.refreshToken.findUnique({
                where: { token },
            });
            if (!storedToken || storedToken.expiresAt < new Date()) {
                throw new common_1.UnauthorizedException('Refresh token expired or revoked');
            }
            await this.prisma.refreshToken.delete({ where: { id: storedToken.id } });
            const user = await this.authRepository.findById(decoded.sub);
            if (!user || user.deletedAt) {
                throw new common_1.UnauthorizedException('User not found or deactivated');
            }
            const tokens = await this.generateTokens(decoded.sub, user.role);
            await this.storeRefreshToken(decoded.sub, tokens.refreshToken);
            return {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
            };
        }
        catch (error) {
            if (error instanceof common_1.UnauthorizedException)
                throw error;
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async validateUser(userId) {
        const user = await this.authRepository.findById(userId);
        if (!user || user.deletedAt) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const { passwordHash, ...safeUser } = user;
        return safeUser;
    }
    async logout(userId) {
        await this.prisma.refreshToken.deleteMany({ where: { userId } });
        await this.authRepository.deleteSessions(userId);
        this.logger.log(`User logged out: ${userId}`);
        return { success: true };
    }
    async generateTokens(userId, role) {
        const accessToken = this.jwtService.sign({ sub: userId, role }, { expiresIn: '15m' });
        const refreshToken = this.jwtService.sign({ sub: userId }, {
            secret: this.configService.getJwtRefreshSecret(),
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
    async storeRefreshToken(userId, token) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        await this.prisma.refreshToken.create({
            data: {
                id: (0, uuid_1.v4)(),
                token,
                userId,
                expiresAt,
            },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_repository_1.AuthRepository,
        jwt_1.JwtService,
        prisma_service_1.PrismaService,
        config_service_1.AppConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map