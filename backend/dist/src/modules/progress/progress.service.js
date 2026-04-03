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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let ProgressService = class ProgressService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProgress(userId, storyId) {
        return this.prisma.readingProgress.findUnique({
            where: { userId_storyId: { userId, storyId } },
        });
    }
    async updateProgress(userId, data) {
        const completed = data.progressPercentage >= 100;
        const progress = await this.prisma.readingProgress.upsert({
            where: { userId_storyId: { userId, storyId: data.storyId } },
            update: {
                progressPercentage: data.progressPercentage,
                lastPosition: data.lastPosition,
                readingTimeSeconds: { increment: data.readingTimeSeconds },
                completed,
            },
            create: {
                userId,
                storyId: data.storyId,
                progressPercentage: data.progressPercentage,
                lastPosition: data.lastPosition,
                readingTimeSeconds: data.readingTimeSeconds,
                completed,
            },
        });
        if (data.readingTimeSeconds > 0) {
            await this.prisma.readingStats.upsert({
                where: { userId },
                update: {
                    totalReadingTime: { increment: data.readingTimeSeconds },
                    ...(completed ? { storiesCompleted: { increment: 1 } } : {}),
                },
                create: {
                    userId,
                    totalReadingTime: data.readingTimeSeconds,
                    storiesCompleted: completed ? 1 : 0,
                },
            });
        }
        if (completed) {
            await this.prisma.user.update({
                where: { id: userId },
                data: { xp: { increment: 50 } },
            });
        }
        return progress;
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProgressService);
//# sourceMappingURL=progress.service.js.map