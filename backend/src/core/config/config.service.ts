import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get databaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL') || 'file:./dev.db';
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
    return this.configService.get<string>('GOOGLE_CALLBACK_URL') || 'http://localhost:3000/auth/google/callback';
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV', 'development');
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
