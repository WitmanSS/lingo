import { Module } from '@nestjs/common';
import { GamificationController } from './gamification.controller';
import { GamificationService } from './gamification.service';
import { XpService } from './xp.service';
import { LevelService } from './level.service';
import { LeaderboardService } from './leaderboard.service';
import { LeaderboardsController } from './leaderboards.controller';
import { RedisModule } from '../../core/cache/redis.module';
import { XpValidationService } from './xp-validation.service';

@Module({
  imports: [RedisModule],
  controllers: [GamificationController, LeaderboardsController],
  providers: [GamificationService, XpValidationService, XpService, LevelService, LeaderboardService],
  exports: [GamificationService, XpService, LevelService, LeaderboardService],
})
export class GamificationModule {}
