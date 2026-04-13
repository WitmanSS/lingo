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
var StoriesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
const xp_service_1 = require("../gamification/xp.service");
const moderation_priority_service_1 = require("../admin/moderation-priority.service");
let StoriesService = StoriesService_1 = class StoriesService {
    prisma;
    xpService;
    moderationPriorityService;
    logger = new common_1.Logger(StoriesService_1.name);
    constructor(prisma, xpService, moderationPriorityService) {
        this.prisma = prisma;
        this.xpService = xpService;
        this.moderationPriorityService = moderationPriorityService;
    }
    async findAll(params) {
        const { page = 1, limit = 12, level, tag, search, sort = 'newest' } = params;
        const skip = (page - 1) * limit;
        const where = {
            published: true,
            deletedAt: null,
            ...(level && { level }),
            ...(tag && { tags: { some: { tag: { name: tag } } } }),
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { content: { content: { contains: search, mode: 'insensitive' } } },
                ],
            }),
        };
        const orderBy = sort === 'popular' ? { favorites: { _count: 'desc' } } :
            sort === 'oldest' ? { createdAt: 'asc' } :
                { createdAt: 'desc' };
        const [stories, total] = await Promise.all([
            this.prisma.story.findMany({
                where,
                skip,
                take: limit,
                orderBy,
                select: {
                    id: true, title: true, slug: true, level: true,
                    readingTimeMinutes: true, wordCount: true, coverImage: true,
                    difficultyScore: true, isAIGenerated: true,
                    createdAt: true, updatedAt: true,
                    author: { select: { id: true, username: true, avatarUrl: true } },
                    tags: { include: { tag: true } },
                    _count: { select: { favorites: true, comments: true, ratings: true } },
                },
            }),
            this.prisma.story.count({ where }),
        ]);
        return {
            data: stories.map((s) => ({
                ...s,
                tags: s.tags.map((st) => st.tag),
            })),
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                hasNextPage: page < Math.ceil(total / limit),
                hasPrevPage: page > 1,
            },
        };
    }
    async findBySlug(slug) {
        const story = await this.prisma.story.findUnique({
            where: { slug, deletedAt: null },
            include: {
                author: { select: { id: true, username: true, avatarUrl: true } },
                content: true,
                chapters: { orderBy: { order: 'asc' } },
                tags: { include: { tag: true } },
                vocabulary: { include: { vocabulary: true } },
                audio: true,
                translations: true,
                _count: { select: { favorites: true, comments: true, ratings: true } },
            },
        });
        if (!story) {
            throw new common_1.NotFoundException('Story not found');
        }
        return {
            ...story,
            tags: story.tags.map((st) => st.tag),
            vocabulary: story.vocabulary.map((sv) => sv.vocabulary),
        };
    }
    async create(authorId, dto) {
        const slug = this.generateSlug(dto.title);
        const wordCount = dto.content.split(/\s+/).filter(Boolean).length;
        const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
        let story = await this.prisma.story.create({
            data: {
                title: dto.title,
                slug,
                content: {
                    create: { content: dto.content },
                },
                level: dto.level,
                wordCount,
                readingTimeMinutes,
                coverImage: dto.coverImage,
                authorId,
                published: true,
                tags: dto.tagIds ? {
                    create: dto.tagIds.map((tagId) => ({ tagId })),
                } : undefined,
            },
            include: {
                author: { select: { id: true, username: true } },
                tags: { include: { tag: true } },
            },
        });
        const scanResult = await this.moderationPriorityService.scanStoryContent(story.id, dto.content);
        if (scanResult.flag) {
            this.logger.warn(`Story ${story.id} auto-flagged [${scanResult.priority}]`);
            story = await this.prisma.story.update({
                where: { id: story.id },
                data: { published: false },
                include: {
                    author: { select: { id: true, username: true } },
                    tags: { include: { tag: true } },
                }
            });
            await this.prisma.storyReport.create({
                data: {
                    storyId: story.id,
                    reporterId: authorId,
                    reason: `[SYSTEM AUTO-FLAG] Priority: ${scanResult.priority} | Reason: ${scanResult.reason}`,
                }
            });
        }
        if (!scanResult.flag) {
            await this.xpService.grantXp(authorId, xp_service_1.XpReason.WRITE_STORY);
        }
        this.logger.log(`Story created: ${story.title} (${story.id})`);
        return {
            ...story,
            tags: story.tags.map((st) => st.tag),
        };
    }
    async update(id, dto) {
        const existing = await this.prisma.story.findFirst({
            where: { id, deletedAt: null },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Story not found');
        }
        const updateData = {};
        if (dto.title) {
            updateData.title = dto.title;
            updateData.slug = this.generateSlug(dto.title);
        }
        if (dto.content) {
            const wordCount = dto.content.split(/\s+/).filter(Boolean).length;
            updateData.wordCount = wordCount;
            updateData.readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));
            updateData.content = {
                update: { content: dto.content },
            };
        }
        if (dto.level) {
            updateData.level = dto.level;
        }
        if (dto.coverImage !== undefined) {
            updateData.coverImage = dto.coverImage;
        }
        if (dto.published !== undefined) {
            updateData.published = dto.published;
        }
        if (dto.tagIds) {
            await this.prisma.storyTag.deleteMany({ where: { storyId: id } });
            updateData.tags = { create: dto.tagIds.map((tagId) => ({ tagId })) };
        }
        const updated = await this.prisma.story.update({
            where: { id },
            data: updateData,
            include: {
                author: { select: { id: true, username: true } },
                tags: { include: { tag: true } },
            },
        });
        this.logger.log(`Story updated: ${updated.title} (${id})`);
        return {
            ...updated,
            tags: updated.tags.map((st) => st.tag),
        };
    }
    async delete(id) {
        const existing = await this.prisma.story.findFirst({
            where: { id, deletedAt: null },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Story not found');
        }
        await this.prisma.story.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        this.logger.log(`Story soft-deleted: ${id}`);
        return { message: 'Story deleted successfully' };
    }
    generateSlug(title) {
        return (title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '') +
            '-' +
            Date.now().toString(36));
    }
};
exports.StoriesService = StoriesService;
exports.StoriesService = StoriesService = StoriesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        xp_service_1.XpService,
        moderation_priority_service_1.ModerationPriorityService])
], StoriesService);
//# sourceMappingURL=stories.service.js.map