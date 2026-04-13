import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { LevelService } from './level.service';
import { XpValidationService } from './xp-validation.service';

export enum XpReason {
  READ_STORY = 'READ_STORY',
  WRITE_STORY = 'WRITE_STORY',
  DAILY_STREAK = 'DAILY_STREAK',
  WEEKLY_STREAK = 'WEEKLY_STREAK',
  STORY_APPROVED = 'STORY_APPROVED',
  VOCABULARY_LEARNED = 'VOCABULARY_LEARNED',
  COMMENT_ADDED = 'COMMENT_ADDED',
  STORY_LIKED = 'STORY_LIKED',
}

export const XP_AWARDS = {
  [XpReason.READ_STORY]: 40,
  [XpReason.WRITE_STORY]: 120,
  [XpReason.DAILY_STREAK]: 25,
  [XpReason.WEEKLY_STREAK]: 150,
  [XpReason.STORY_APPROVED]: 50,
  [XpReason.VOCABULARY_LEARNED]: 15,
  [XpReason.COMMENT_ADDED]: 5,
  [XpReason.STORY_LIKED]: 2,
};

@Injectable()
export class XpService {
  private readonly logger = new Logger(XpService.name);

  constructor(
    private prisma: PrismaService,
    private levelService: LevelService,
    private xpValidator: XpValidationService,
  ) {}

  /**
   * Grant XP to a user and check for level ups
   */
  async grantXp(userId: string, reason: XpReason, customAmount?: number, contextId?: string) {
    const amount = customAmount ?? XP_AWARDS[reason];
    if (!amount || amount <= 0) return;

    const canGrant = await this.xpValidator.canGrantXp(userId, reason, amount, contextId);
    if (!canGrant) {
      this.logger.debug(`XP grant blocked for user ${userId} (Reason: ${reason}) - AntiSpam limit hit.`);
      return null;
    }

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
