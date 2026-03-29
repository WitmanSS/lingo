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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GamificationService = class GamificationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getLeaderboard(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                skip,
                take: limit,
                orderBy: { xp: 'desc' },
                select: { id: true, username: true, avatarUrl: true, xp: true, level: true },
            }),
            this.prisma.user.count(),
        ]);
        return {
            data: data.map((user, idx) => ({ ...user, rank: skip + idx + 1 })),
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    async getUserAchievements(userId) {
        const all = await this.prisma.achievement.findMany();
        const earned = await this.prisma.userAchievement.findMany({
            where: { userId },
            select: { achievementId: true, earnedAt: true },
        });
        const earnedMap = new Map(earned.map((e) => [e.achievementId, e.earnedAt]));
        return all.map((a) => ({
            ...a,
            earned: earnedMap.has(a.id),
            earnedAt: earnedMap.get(a.id) || null,
        }));
    }
    async checkAndAwardAchievements(userId) {
        const stats = await this.prisma.readingStats.findUnique({ where: { userId } });
        if (!stats)
            return;
        const achievements = await this.prisma.achievement.findMany();
        const earned = await this.prisma.userAchievement.findMany({
            where: { userId },
            select: { achievementId: true },
        });
        const earnedIds = new Set(earned.map((e) => e.achievementId));
        for (const achievement of achievements) {
            if (earnedIds.has(achievement.id))
                continue;
            let shouldAward = false;
            if (achievement.name === 'First Story' && stats.storiesCompleted >= 1)
                shouldAward = true;
            if (achievement.name === 'Bookworm' && stats.storiesCompleted >= 10)
                shouldAward = true;
            if (achievement.name === 'Word Collector' && stats.vocabularyLearned >= 100)
                shouldAward = true;
            if (achievement.name === 'Speed Reader' && stats.totalWordsRead >= 10000)
                shouldAward = true;
            if (shouldAward) {
                await this.prisma.userAchievement.create({
                    data: { userId, achievementId: achievement.id },
                });
                await this.prisma.user.update({
                    where: { id: userId },
                    data: { xp: { increment: achievement.xpReward } },
                });
            }
        }
    }
};
exports.GamificationService = GamificationService;
exports.GamificationService = GamificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GamificationService);
//# sourceMappingURL=gamification.service.js.map