import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { TerminusModule } from '@nestjs/terminus';
import { ScheduleModule } from '@nestjs/schedule';

// Core
import { AppConfigModule } from './core/config/config.module';
import { PrismaModule } from './core/database/prisma.module';
import { RedisModule } from './core/cache/redis.module';
import { AIModule } from './core/ai/ai.module';
import { PaymentModule } from './core/payments/payment.module';
import { SearchModule } from './core/search/search.module';

// Common
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { JwtGuard } from './common/guards/jwt.guard';
import { RolesGuard } from './common/guards/roles.guard';

// Health
import { HealthController } from './core/health/health.controller';

// Clean Architecture Modules
import { DomainModule } from './domain/domain.module';
import { ApplicationModule } from './application/application.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { PresentationModule } from './presentation/presentation.module';

// Legacy Modules (gradual migration to Clean Architecture)
// import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/users/users.module';
// import { StoriesModule } from './modules/stories/stories.module';
// import { AdminModule } from './modules/admin/admin.module';
// import { NotificationsModule } from './modules/notifications/notifications.module';
// import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
// import { GamificationModule } from './modules/gamification/gamification.module';
// import { AnalyticsModule } from './modules/analytics/analytics.module';
// import { BookmarksModule } from './modules/bookmarks/bookmarks.module';
// import { FavoritesModule } from './modules/favorites/favorites.module';
// import { ProgressModule } from './modules/progress/progress.module';
// import { QuizzesModule } from './modules/quizzes/quizzes.module';

@Module({
  imports: [
    // Scheduling
    ScheduleModule.forRoot(),

    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000,   // 1 minute window
      limit: 100,   // 100 requests per minute
    }]),

    // Health checks
    TerminusModule,

    // Core
    AppConfigModule,
    PrismaModule,
    RedisModule,
    AIModule,
    PaymentModule,
    SearchModule,

    // Clean Architecture
    DomainModule,
    ApplicationModule,
    InfrastructureModule,
    PresentationModule,

    // Feature modules (gradually migrating to Clean Architecture)
    // AuthModule,
    // UsersModule,
    // StoriesModule,
    // AdminModule,
    // NotificationsModule,
    // VocabularyModule,
    // GamificationModule,
    // AnalyticsModule,
    // BookmarksModule,
    // FavoritesModule,
    // ProgressModule,
    // QuizzesModule,
  ],
  controllers: [HealthController],
  providers: [
    // Global exception filter
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    // Request logging
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    // Standardized response format
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    // Rate limiting guard
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // JWT authentication guard (global)
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    // Role-based access control guard
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
