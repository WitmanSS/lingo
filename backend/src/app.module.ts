import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StoriesModule } from './stories/stories.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { ProgressModule } from './progress/progress.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { FavoritesModule } from './favorites/favorites.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { GamificationModule } from './gamification/gamification.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Rate limiting: 60 requests per minute
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 60 }]),
    PrismaModule,
    AuthModule,
    UsersModule,
    StoriesModule,
    VocabularyModule,
    ProgressModule,
    BookmarksModule,
    FavoritesModule,
    QuizzesModule,
    AnalyticsModule,
    GamificationModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
