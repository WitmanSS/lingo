import { Module } from '@nestjs/common';
import { AIService } from './ai.service';
import { AppConfigService } from '../config/config.service';
import { PrismaService } from '../database/prisma.service';

@Module({
  providers: [AIService, AppConfigService, PrismaService],
  exports: [AIService],
})
export class AIModule {}
