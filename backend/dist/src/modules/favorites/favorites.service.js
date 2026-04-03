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
exports.FavoritesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let FavoritesService = class FavoritesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll(userId, page = 1, limit = 12) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.favorite.findMany({
                where: { userId },
                skip,
                take: limit,
                include: {
                    story: { select: { id: true, title: true, slug: true, level: true, readingTimeMinutes: true, wordCount: true } },
                },
            }),
            this.prisma.favorite.count({ where: { userId } }),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async toggle(userId, storyId) {
        const existing = await this.prisma.favorite.findUnique({
            where: { userId_storyId: { userId, storyId } },
        });
        if (existing) {
            await this.prisma.favorite.delete({ where: { id: existing.id } });
            return { favorited: false };
        }
        await this.prisma.favorite.create({ data: { userId, storyId } });
        return { favorited: true };
    }
};
exports.FavoritesService = FavoritesService;
exports.FavoritesService = FavoritesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavoritesService);
//# sourceMappingURL=favorites.service.js.map