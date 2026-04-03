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
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let SearchService = class SearchService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchStories(options) {
        const { query, level, limit = 20, offset = 0 } = options;
        const stories = await this.prisma.story.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { title: { contains: query } },
                        ],
                    },
                    level ? { level: level } : {},
                ],
            },
            include: {
                author: { select: { id: true, username: true, avatarUrl: true } },
                _count: {
                    select: { progress: true, favorites: true, reviews: true },
                },
            },
            take: limit,
            skip: offset,
        });
        return stories;
    }
    async searchVocabulary(options) {
        const { query, level, limit = 20, offset = 0 } = options;
        const vocabulary = await this.prisma.vocabulary.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { word: { contains: query } },
                            { definition: { contains: query } },
                        ],
                    },
                    level ? { level: level } : {},
                ],
            },
            take: limit,
            skip: offset,
        });
        return vocabulary;
    }
    async advancedSearch(query, filters) {
        return {
            stories: [],
            vocabulary: [],
            users: [],
        };
    }
    async getSearchSuggestions(query) {
        const stories = await this.prisma.story.findMany({
            where: {
                title: { contains: query },
            },
            select: { title: true },
            take: 5,
        });
        const vocabulary = await this.prisma.vocabulary.findMany({
            where: {
                word: { contains: query },
            },
            select: { word: true },
            take: 5,
        });
        return {
            stories: stories.map(s => s.title),
            vocabulary: vocabulary.map(v => v.word),
        };
    }
    async getTrendingStories(limit = 10) {
        const stories = await this.prisma.story.findMany({
            where: { published: true },
            include: {
                _count: { select: { progress: true, favorites: true } },
            },
            orderBy: { createdAt: 'desc' },
            take: limit,
        });
        return stories;
    }
    async getRelatedStories(storyId, limit = 5) {
        const story = await this.prisma.story.findUnique({
            where: { id: storyId },
            include: { tags: { include: { tag: true } } },
        });
        if (!story)
            return [];
        const tagIds = story.tags.map(st => st.tagId);
        const relatedStories = await this.prisma.story.findMany({
            where: {
                AND: [
                    { id: { not: storyId } },
                    { level: story.level },
                    { tags: { some: { tagId: { in: tagIds } } } },
                ],
            },
            take: limit,
        });
        return relatedStories;
    }
};
exports.SearchService = SearchService;
exports.SearchService = SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SearchService);
//# sourceMappingURL=search.service.js.map