import { Module } from '@nestjs/common';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { GamificationModule } from '../gamification/gamification.module';

@Module({
  imports: [GamificationModule],
  controllers: [StoriesController],
  providers: [StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}
