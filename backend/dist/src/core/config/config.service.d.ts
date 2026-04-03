import { ConfigService } from '@nestjs/config';
export declare class AppConfigService {
    private configService;
    constructor(configService: ConfigService);
    get databaseUrl(): string;
    getJwtSecret(): string;
    getJwtRefreshSecret(): string;
    getRedisUrl(): string;
    get port(): number;
    get corsOrigin(): string;
    get openaiApiKey(): string;
    getGoogleClientId(): string;
    getGoogleClientSecret(): string;
    getGoogleCallbackUrl(): string;
    get nodeEnv(): string;
    get bcryptRounds(): number;
    get rateLimitTtl(): number;
    get rateLimitLimit(): number;
}
