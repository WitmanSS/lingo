import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class ModerationPriorityService {
  private readonly logger = new Logger(ModerationPriorityService.name);

  // Extremely basic auto-flag threshold maps
  private readonly spamKeywords = ['buy cheap', 'casino', 'bitcoin', 'crypto jackpot'];
  private readonly badWords = ['hate speech', 'kill', 'murder dummy word'];

  constructor(private prisma: PrismaService) {}

  /**
   * Scans a newly created or reported story for suspicious content.
   */
  async scanStoryContent(storyId: string, content: string): Promise<{ flag: boolean; reason?: string; priority: 'HIGH' | 'MEDIUM' | 'LOW' }> {
    const text = content.toLowerCase();

    // 1. High Priority (Hate speech, extreme profanity)
    for (const word of this.badWords) {
      if (text.includes(word)) {
         return { flag: true, reason: `Auto-flagged: Restricted keyword detected`, priority: 'HIGH' };
      }
    }

    // 2. Medium Priority (Spam, Crypto, Ads)
    for (const keyword of this.spamKeywords) {
      if (text.includes(keyword)) {
         return { flag: true, reason: `Auto-flagged: Possible Spam Content`, priority: 'MEDIUM' };
      }
    }

    return { flag: false, priority: 'LOW' };
  }
}
