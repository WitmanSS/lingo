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
exports.AdminStoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let AdminStoriesService = class AdminStoriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchStories(query, skip = 0, take = 50) {
        const where = query ? {
            title: { contains: query, mode: 'insensitive' }
        } : {};
        const [stories, total] = await Promise.all([
            this.prisma.story.findMany({
                where, skip, take,
                include: { author: { select: { username: true } }, _count: { select: { storyReports: true } } },
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.story.count({ where })
        ]);
        return { data: stories, total };
    }
    async getReportedStories(skip = 0, take = 50) {
        const [reports, total] = await Promise.all([
            this.prisma.storyReport.findMany({
                skip, take,
                where: { status: 'PENDING' },
                include: { story: { select: { title: true, slug: true } }, reporter: { select: { username: true } } },
                orderBy: { createdAt: 'desc' }
            }),
            this.prisma.storyReport.count({ where: { status: 'PENDING' } })
        ]);
        return { data: reports, total };
    }
    async setPublishStatus(storyId, published) {
        return this.prisma.story.update({
            where: { id: storyId },
            data: { published }
        });
    }
    async dismissReport(reportId) {
        return this.prisma.storyReport.update({
            where: { id: reportId },
            data: { status: 'DISMISSED' }
        });
    }
};
exports.AdminStoriesService = AdminStoriesService;
exports.AdminStoriesService = AdminStoriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminStoriesService);
//# sourceMappingURL=admin-stories.service.js.map