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
var AppConfigService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AppConfigService = AppConfigService_1 = class AppConfigService {
    configService;
    logger = new common_1.Logger(AppConfigService_1.name);
    constructor(configService) {
        this.configService = configService;
        this.validateRequiredConfig();
    }
    validateRequiredConfig() {
        if (this.nodeEnv === 'production') {
            const required = ['JWT_SECRET', 'JWT_REFRESH_SECRET', 'DATABASE_URL'];
            const missing = required.filter((key) => !this.configService.get(key) || this.configService.get(key)?.includes('dev-'));
            if (missing.length > 0) {
                throw new Error(`Missing or insecure environment variables for production: ${missing.join(', ')}`);
            }
        }
    }
    get databaseUrl() {
        return this.configService.get('DATABASE_URL') || 'postgresql://linguaread:linguaread_pass@localhost:5432/linguaread';
    }
    getJwtSecret() {
        return this.configService.get('JWT_SECRET') || 'dev-secret-key';
    }
    getJwtRefreshSecret() {
        return this.configService.get('JWT_REFRESH_SECRET') || 'dev-refresh-secret';
    }
    getRedisUrl() {
        return this.configService.get('REDIS_URL') || 'redis://localhost:6379';
    }
    get port() {
        return this.configService.get('PORT', 3000);
    }
    get corsOrigin() {
        return this.configService.get('CORS_ORIGIN', 'http://localhost:5173');
    }
    get openaiApiKey() {
        return this.configService.get('OPENAI_API_KEY') || '';
    }
    getGoogleClientId() {
        return this.configService.get('GOOGLE_CLIENT_ID') || '';
    }
    getGoogleClientSecret() {
        return this.configService.get('GOOGLE_CLIENT_SECRET') || '';
    }
    getGoogleCallbackUrl() {
        return this.configService.get('GOOGLE_CALLBACK_URL') || 'http://localhost:3000/api/v1/auth/google/callback';
    }
    get nodeEnv() {
        return this.configService.get('NODE_ENV', 'development');
    }
    get isProduction() {
        return this.nodeEnv === 'production';
    }
    get isDevelopment() {
        return this.nodeEnv === 'development';
    }
    get bcryptRounds() {
        return this.configService.get('BCRYPT_ROUNDS', 12);
    }
    get rateLimitTtl() {
        return this.configService.get('RATE_LIMIT_TTL', 60000);
    }
    get rateLimitLimit() {
        return this.configService.get('RATE_LIMIT_LIMIT', 100);
    }
};
exports.AppConfigService = AppConfigService;
exports.AppConfigService = AppConfigService = AppConfigService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AppConfigService);
//# sourceMappingURL=config.service.js.map