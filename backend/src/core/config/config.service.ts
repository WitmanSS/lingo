import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  private readonly logger = new Logger(AppConfigService.name);

  constructor(private configService: ConfigService) {
    this.validateRequiredConfig();
  }

  private validateRequiredConfig() {
    if (this.nodeEnv === 'production') {
      const required = ['JWT_SECRET', 'JWT_REFRESH_SECRET', 'DATABASE_URL'];
      const missing = required.filter(
        (key) => !this.configService.get<string>(key) || this.configService.get<string>(key)?.includes('dev-'),
      );
      if (missing.length > 0) {
        throw new Error(
          `Missing or insecure environment variables for production: ${missing.join(', ')}`,
        );
      }
    }
  }

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL') || 'postgresql://linguaread:linguaread_pass@localhost:5432/linguaread';
  }

  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET') || 'dev-secret-key';
  }

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET') || 'dev-refresh-secret';
  }

  getRedisUrl(): string {
    return this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379';
  }

  get port(): number {
    return this.configService.get<number>('PORT', 3000);
  }

  get corsOrigin(): string {
    return this.configService.get<string>('CORS_ORIGIN', 'http://localhost:5173');
  }

  get openaiApiKey(): string {
    return this.configService.get<string>('OPENAI_API_KEY') || '';
  }

  getGoogleClientId(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_ID') || '';
  }

  getGoogleClientSecret(): string {
    return this.configService.get<string>('GOOGLE_CLIENT_SECRET') || '';
  }

  getGoogleCallbackUrl(): string {
    return this.configService.get<string>('GOOGLE_CALLBACK_URL') || 'http://localhost:3000/api/v1/auth/google/callback';
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get bcryptRounds(): number {
    return this.configService.get<number>('BCRYPT_ROUNDS', 12);
  }

  get rateLimitTtl(): number {
    return this.configService.get<number>('RATE_LIMIT_TTL', 60000);
  }

  get rateLimitLimit(): number {
    return this.configService.get<number>('RATE_LIMIT_LIMIT', 100);
  }
}
