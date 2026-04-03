import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { LevelService } from './level.service';

export enum XpReason {
  READ_STORY = 'READ_STORY',
  WRITE_STORY = 'WRITE_STORY',
  DAILY_STREAK = 'DAILY_STREAK',
  WEEKLY_STREAK = 'WEEKLY_STREAK',
  STORY_APPROVED = 'STORY_APPROVED',
  VOCABULARY_LEARNED = 'VOCABULARY_LEARNED',
}

export const XP_AWARDS = {
  [XpReason.READ_STORY]: 50,
  [XpReason.WRITE_STORY]: 100,
  [XpReason.DAILY_STREAK]: 20,
  [XpReason.WEEKLY_STREAK]: 100,
  [XpReason.STORY_APPROVED]: 30,
  [XpReason.VOCABULARY_LEARNED]: 10,
};

@Injectable()
export class XpService {
  private readonly logger = new Logger(XpService.name);

  constructor(
    private prisma: PrismaService,
    private levelService: LevelService,
  ) {}

  /**
   * Grant XP to a user and check for level ups
   */
  async grantXp(userId: string, reason: XpReason, customAmount?: number) {
    const amount = customAmount ?? XP_AWARDS[reason];
    if (!amount || amount <= 0) return;

    // Run within a transaction to ensure data integrity
    return this.prisma.$transaction(async (tx) => {
      // 1. Log the XP gain
      await tx.xpLog.create({
        data: { userId, amount, reason },
      });

      // 2. Read the current user state
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { xp: true, level: true },
      });

      if (!user) return null;

      const newXp = user.xp + amount;
      const calculatedTier = this.levelService.calculateLevelForXp(newXp);

      // 3. Update the user
      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          xp: newXp,
          level: calculatedTier.level, // Inherit newly calculated level
        },
      });

      if (calculatedTier.level > user.level) {
        this.logger.log(`User ${userId} leveled up to ${calculatedTier.level} (${calculatedTier.name})`);
        // We could emit a LevelUp Event here for notifications
      }

      return updatedUser;
    });
  }
}
