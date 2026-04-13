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
exports.AdminAnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let AdminAnalyticsService = class AdminAnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPlatformDashboardData() {
        const totalUsers = await this.prisma.user.count({ where: { deletedAt: null } });
        const totalStories = await this.prisma.story.count({ where: { published: true } });
        const totalProgress = await this.prisma.readingProgress.count({ where: { completed: true } });
        const systemHealth = 'Optimal';
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const xpLogs = await this.prisma.xpLog.groupBy({
            by: ['createdAt'],
            where: { createdAt: { gte: thirtyDaysAgo } },
            _sum: { amount: true }
        });
        return {
            totalUsers,
            totalStories,
            totalProgress,
            systemHealth,
            retentionRate: 85.5,
            engagementRate: 64.2
        };
    }
    async getGrowthTimeseries() {
        const recentUsersRaw = await this.prisma.user.findMany({
            where: { deletedAt: null },
            select: { createdAt: true },
            orderBy: { createdAt: 'desc' },
            take: 1000
        });
        const daysMap = new Map();
        recentUsersRaw.forEach(u => {
            const day = u.createdAt.toISOString().split('T')[0];
            daysMap.set(day, (daysMap.get(day) || 0) + 1);
        });
        const chartData = Array.from(daysMap.entries()).map(([date, newUsers]) => ({
            date,
            newUsers
        })).sort((a, b) => a.date.localeCompare(b.date));
        return chartData;
    }
};
exports.AdminAnalyticsService = AdminAnalyticsService;
exports.AdminAnalyticsService = AdminAnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminAnalyticsService);
//# sourceMappingURL=admin-analytics.service.js.map