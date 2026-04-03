import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE, APP_GUARD } from '@nestjs/core';

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
import { ValidationPipe } from './common/pipes/validation.pipe';
import { JwtGuard } from './common/guards/jwt.guard';
import { RolesGuard } from './common/guards/roles.guard';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { StoriesModule } from './modules/stories/stories.module';
import { AdminModule } from './modules/admin/admin.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { VocabularyModule } from './modules/vocabulary/vocabulary.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { BookmarksModule } from './modules/bookmarks/bookmarks.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { ProgressModule } from './modules/progress/progress.module';
import { QuizzesModule } from './modules/quizzes/quizzes.module';

@Module({
  imports: [
    AppConfigModule,
    PrismaModule,
    RedisModule,
    AIModule,
    PaymentModule,
    SearchModule,
    AuthModule,
    UsersModule,
    StoriesModule,
    AdminModule,
    NotificationsModule,
    VocabularyModule,
    GamificationModule,
    AnalyticsModule,
    BookmarksModule,
    FavoritesModule,
    ProgressModule,
    QuizzesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
