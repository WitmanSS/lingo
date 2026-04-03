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
exports.StoryRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let StoryRepository = class StoryRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        return this.prisma.story.findUnique({
            where: { id },
            include: {
                author: { select: { id: true, username: true, avatarUrl: true } },
                content: true,
                chapters: true,
                _count: {
                    select: { progress: true, favorites: true, reviews: true },
                },
            },
        });
    }
    async findBySlug(slug) {
        return this.prisma.story.findUnique({
            where: { slug },
            include: {
                author: true,
                content: true,
                chapters: true,
            },
        });
    }
    async findAll(skip = 0, take = 20, filters) {
        const where = {};
        if (filters?.level)
            where.level = filters.level;
        if (filters?.published !== undefined)
            where.published = filters.published;
        const [data, total] = await Promise.all([
            this.prisma.story.findMany({
                where,
                skip,
                take,
                include: {
                    author: { select: { id: true, username: true } },
                },
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.story.count({ where }),
        ]);
        return { data, total };
    }
    async create(data) {
        return this.prisma.story.create({
            data: {
                title: data.title,
                slug: data.slug,
                level: data.level,
                wordCount: data.wordCount,
                readingTimeMinutes: data.readingTimeMinutes,
                authorId: data.authorId,
                content: {
                    create: {
                        content: data.content,
                    },
                },
            },
            include: { content: true },
        });
    }
    async update(id, data) {
        return this.prisma.story.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return this.prisma.story.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
    }
    async getByAuthor(authorId) {
        return this.prisma.story.findMany({
            where: { authorId },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.StoryRepository = StoryRepository;
exports.StoryRepository = StoryRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StoryRepository);
//# sourceMappingURL=story.repository.js.map