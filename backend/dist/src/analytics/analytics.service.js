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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AnalyticsService = class AnalyticsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserStats(userId) {
        const stats = await this.prisma.readingStats.findUnique({ where: { userId } });
        return stats || { totalWordsRead: 0, totalReadingTime: 0, storiesCompleted: 0, vocabularyLearned: 0 };
    }
    async getAdminStats() {
        const [totalUsers, totalStories, totalComments, levelDistribution] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.story.count({ where: { published: true } }),
            this.prisma.comment.count(),
            this.prisma.story.groupBy({ by: ['level'], _count: true, where: { published: true } }),
        ]);
        const popularStories = await this.prisma.story.findMany({
            take: 10,
            where: { published: true },
            orderBy: { favorites: { _count: 'desc' } },
            select: {
                id: true, title: true, slug: true, level: true,
                _count: { select: { favorites: true, progress: true, comments: true } },
            },
        });
        return { totalUsers, totalStories, totalComments, levelDistribution, popularStories };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map