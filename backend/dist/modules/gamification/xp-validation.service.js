"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var XpValidationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.XpValidationService = void 0;
const common_1 = require("@nestjs/common");
const redis_service_1 = require("../../core/cache/redis.service");
const xp_service_1 = require("./xp.service");
let XpValidationService = XpValidationService_1 = class XpValidationService {
    redis;
    logger = new common_1.Logger(XpValidationService_1.name);
    DAILY_MAX_XP = 1500;
    DAILY_MAX_STORIES_READ = 20;
    DAILY_MAX_VOCAB = 50;
    constructor(redis) {
        this.redis = redis;
    }
    async canGrantXp(userId, reason, amount, contextId) {
        const today = new Date().toISOString().split('T')[0];
        const dailyXpKey = `xp:limit:daily:total:${userId}:${today}`;
        const currentDailyXp = parseInt(await this.redis.get(dailyXpKey) || '0', 10);
        if (currentDailyXp + amount > this.DAILY_MAX_XP) {
            this.logger.warn(`User ${userId} hit daily XP cap.`);
            return false;
        }
        if (reason === xp_service_1.XpReason.READ_STORY) {
            if (!contextId)
                return true;
            const storyReadSpamKey = `xp:limit:story:${userId}:${contextId}:${today}`;
            const alreadyRead = await this.redis.exists(storyReadSpamKey);
            if (alreadyRead)
                return false;
            const storiesReadKey = `xp:limit:stories_count:${userId}:${today}`;
            const readCount = parseInt(await this.redis.get(storiesReadKey) || '0', 10);
            if (readCount >= this.DAILY_MAX_STORIES_READ)
                return false;
            await this.redis.set(storyReadSpamKey, '1', 86400);
            const newReadCount = await this.redis.incr(storiesReadKey);
            if (newReadCount === 1)
                await this.redis.expire(storiesReadKey, 86400);
        }
        if (reason === xp_service_1.XpReason.VOCABULARY_LEARNED) {
            const vocabKey = `xp:limit:vocab_count:${userId}:${today}`;
            const vocabCount = parseInt(await this.redis.get(vocabKey) || '0', 10);
            if (vocabCount >= this.DAILY_MAX_VOCAB)
                return false;
            const newVocabCount = await this.redis.incr(vocabKey);
            if (newVocabCount === 1)
                await this.redis.expire(vocabKey, 86400);
        }
        if (reason === xp_service_1.XpReason.WRITE_STORY) {
            const writeKey = `xp:limit:write_count:${userId}:${today}`;
            const writeCount = parseInt(await this.redis.get(writeKey) || '0', 10);
            if (writeCount >= 3)
                return false;
            const newWriteCount = await this.redis.incr(writeKey);
            if (newWriteCount === 1)
                await this.redis.expire(writeKey, 86400);
        }
        const newDailyXp = await this.redis.getClient().incrby(dailyXpKey, amount);
        if (newDailyXp === amount)
            await this.redis.expire(dailyXpKey, 86400);
        return true;
    }
};
exports.XpValidationService = XpValidationService;
exports.XpValidationService = XpValidationService = XpValidationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService])
], XpValidationService);
//# sourceMappingURL=xp-validation.service.js.map