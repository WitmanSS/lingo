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
var LeaderboardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = exports.LeaderboardType = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../core/database/prisma.service");
const redis_service_1 = require("../../core/cache/redis.service");
var LeaderboardType;
(function (LeaderboardType) {
    LeaderboardType["WEEKLY_READERS"] = "leaderboard:weekly:readers";
    LeaderboardType["MONTHLY_READERS"] = "leaderboard:monthly:readers";
    LeaderboardType["ALL_TIME_XP"] = "leaderboard:alltime:xp";
})(LeaderboardType || (exports.LeaderboardType = LeaderboardType = {}));
let LeaderboardService = LeaderboardService_1 = class LeaderboardService {
    prisma;
    redis;
    logger = new common_1.Logger(LeaderboardService_1.name);
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async aggregateAllTimeXp() {
        this.logger.log('Aggregating all-time XP leaderboard...');
        const users = await this.prisma.user.findMany({
            orderBy: { xp: 'desc' },
            take: 1000,
            select: { id: true, xp: true },
        });
        const pipeline = this.redis.getClient().pipeline();
        pipeline.del(LeaderboardType.ALL_TIME_XP);
        for (const u of users) {
            pipeline.zadd(LeaderboardType.ALL_TIME_XP, u.xp, u.id);
        }
        await pipeline.exec();
        this.logger.log(`Aggregated ${users.length} users into all-time XP leaderboard.`);
    }
    async aggregateWeeklyReaders() {
        this.logger.log('Aggregating weekly readers leaderboard...');
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const progressGroup = await this.prisma.readingProgress.groupBy({
            by: ['userId'],
            _count: { storyId: true },
            where: {
                completed: true,
                completedAt: { gte: oneWeekAgo },
            },
        });
        const pipeline = this.redis.getClient().pipeline();
        pipeline.del(LeaderboardType.WEEKLY_READERS);
        for (const group of progressGroup) {
            pipeline.zadd(LeaderboardType.WEEKLY_READERS, group._count.storyId, group.userId);
        }
        await pipeline.exec();
        this.logger.log(`Aggregated ${progressGroup.length} weekly readers.`);
    }
    async getTopUsers(type, limit = 10) {
        const data = await this.redis.zrevrange(type, 0, limit - 1, true);
        if (!data || data.length === 0)
            return [];
        const results = [];
        for (let i = 0; i < data.length; i += 2) {
            results.push({ userId: data[i], score: parseInt(data[i + 1], 10) });
        }
        const userIds = results.map(r => r.userId);
        const users = await this.prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, username: true, avatarUrl: true, level: true },
        });
        const userMap = new Map(users.map(u => [u.id, u]));
        return results.map((result, index) => {
            const u = userMap.get(result.userId);
            return {
                rank: index + 1,
                score: result.score,
                user: u ? {
                    id: u.id,
                    username: u.username,
                    avatarUrl: u.avatarUrl,
                    level: u.level,
                } : null,
            };
        }).filter(r => r.user !== null);
    }
};
exports.LeaderboardService = LeaderboardService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeaderboardService.prototype, "aggregateAllTimeXp", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeaderboardService.prototype, "aggregateWeeklyReaders", null);
exports.LeaderboardService = LeaderboardService = LeaderboardService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], LeaderboardService);
//# sourceMappingURL=leaderboard.service.js.map