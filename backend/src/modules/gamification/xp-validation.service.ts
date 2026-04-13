import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '../../core/cache/redis.service';
import { XpReason } from './xp.service';

@Injectable()
export class XpValidationService {
  private readonly logger = new Logger(XpValidationService.name);

  // Limits
  private readonly DAILY_MAX_XP = 1500;
  private readonly DAILY_MAX_STORIES_READ = 20;
  private readonly DAILY_MAX_VOCAB = 50;

  constructor(private redis: RedisService) {}

  /**
   * Returns true if the user is allowed to receive XP for this action.
   * Modifies the cached tracking counts upon success.
   */
  async canGrantXp(userId: string, reason: XpReason, amount: number, contextId?: string): Promise<boolean> {
    const today = new Date().toISOString().split('T')[0];
    
    // 1. Daily General XP Cap
    const dailyXpKey = `xp:limit:daily:total:${userId}:${today}`;
    const currentDailyXp = parseInt(await this.redis.get(dailyXpKey) || '0', 10);
    if (currentDailyXp + amount > this.DAILY_MAX_XP) {
       this.logger.warn(`User ${userId} hit daily XP cap.`);
       return false;
    }

    // Contextual spam guards
    if (reason === XpReason.READ_STORY) {
      if (!contextId) return true; // Safety fallback
      
      // Has already gained XP for THIS story today?
      const storyReadSpamKey = `xp:limit:story:${userId}:${contextId}:${today}`;
      const alreadyRead = await this.redis.exists(storyReadSpamKey);
      if (alreadyRead) return false;

      // Has exceeded daily stories read limit?
      const storiesReadKey = `xp:limit:stories_count:${userId}:${today}`;
      const readCount = parseInt(await this.redis.get(storiesReadKey) || '0', 10);
      if (readCount >= this.DAILY_MAX_STORIES_READ) return false;

      // Record it
      await this.redis.set(storyReadSpamKey, '1', 86400); // Expiry 24h
      const newReadCount = await this.redis.incr(storiesReadKey);
      if (newReadCount === 1) await this.redis.expire(storiesReadKey, 86400);
    }

    if (reason === XpReason.VOCABULARY_LEARNED) {
       const vocabKey = `xp:limit:vocab_count:${userId}:${today}`;
       const vocabCount = parseInt(await this.redis.get(vocabKey) || '0', 10);
       if (vocabCount >= this.DAILY_MAX_VOCAB) return false;

       const newVocabCount = await this.redis.incr(vocabKey);
       if (newVocabCount === 1) await this.redis.expire(vocabKey, 86400);
    }

    if (reason === XpReason.WRITE_STORY) {
       // Stop users from spamming 100 stories in a minute. Max 3 stories a day for XP.
       const writeKey = `xp:limit:write_count:${userId}:${today}`;
       const writeCount = parseInt(await this.redis.get(writeKey) || '0', 10);
       if (writeCount >= 3) return false;

       const newWriteCount = await this.redis.incr(writeKey);
       if (newWriteCount === 1) await this.redis.expire(writeKey, 86400);
    }
    
    // Everything valid? Increment global Daily XP cap tracker
    const newDailyXp = await this.redis.getClient().incrby(dailyXpKey, amount);
    if (newDailyXp === amount) await this.redis.expire(dailyXpKey, 86400); // Expire after 1 day

    return true;
  }
}
