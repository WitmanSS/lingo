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
exports.VocabularyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let VocabularyService = class VocabularyService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async lookup(word) {
        const vocab = await this.prisma.vocabulary.findFirst({ where: { word: word.toLowerCase() } });
        if (!vocab)
            throw new common_1.NotFoundException(`Word "${word}" not found`);
        return vocab;
    }
    async getUserVocabulary(userId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.userVocabulary.findMany({
                where: { userId },
                skip,
                take: limit,
                include: { vocabulary: true },
                orderBy: { lastReviewedAt: 'desc' },
            }),
            this.prisma.userVocabulary.count({ where: { userId } }),
        ]);
        return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
    }
    async saveWord(userId, vocabularyId) {
        const existing = await this.prisma.userVocabulary.findFirst({
            where: { userId, vocabularyId },
        });
        if (existing) {
            return this.prisma.userVocabulary.findUnique({
                where: { id: existing.id },
                include: { vocabulary: true },
            });
        }
        return this.prisma.userVocabulary.create({
            data: { userId, vocabularyId },
            include: { vocabulary: true },
        });
    }
    async markLearned(userId, id) {
        return this.prisma.userVocabulary.update({
            where: { id, userId },
            data: { learned: true, reviewCount: { increment: 1 }, lastReviewedAt: new Date() },
            include: { vocabulary: true },
        });
    }
    async deleteUserWord(userId, id) {
        await this.prisma.userVocabulary.delete({ where: { id, userId } });
        return { message: 'Word removed' };
    }
    async getWordsForReview(userId) {
        return this.prisma.userVocabulary.findMany({
            where: {
                userId,
                learned: false,
                OR: [
                    { nextReviewAt: null },
                    { nextReviewAt: { lte: new Date() } },
                ],
            },
            include: { vocabulary: true },
            take: 20,
        });
    }
};
exports.VocabularyService = VocabularyService;
exports.VocabularyService = VocabularyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VocabularyService);
//# sourceMappingURL=vocabulary.service.js.map