import { RedisService } from '../../core/cache/redis.service';
import { XpReason } from './xp.service';
export declare class XpValidationService {
    private redis;
    private readonly logger;
    private readonly DAILY_MAX_XP;
    private readonly DAILY_MAX_STORIES_READ;
    private readonly DAILY_MAX_VOCAB;
    constructor(redis: RedisService);
    canGrantXp(userId: string, reason: XpReason, amount: number, contextId?: string): Promise<boolean>;
}
