import { Module } from '@nestjs/common';
import { StoriesController } from './stories.controller';
import { StoriesService } from './stories.service';
import { GamificationModule } from '../gamification/gamification.module';
import { AdminModule } from '../admin/admin.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [GamificationModule, forwardRef(() => AdminModule)],
  controllers: [StoriesController],
  providers: [StoriesService],
  exports: [StoriesService],
})
export class StoriesModule {}
