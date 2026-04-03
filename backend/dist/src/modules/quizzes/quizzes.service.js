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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let QuizzesService = class QuizzesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getForStory(storyId) {
        return this.prisma.quiz.findMany({
            where: { storyId },
            include: {
                options: { select: { id: true, text: true } },
            },
        });
    }
    async submit(userId, quizId, selectedOptionId) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id: quizId },
            include: { options: true },
        });
        if (!quiz)
            throw new common_1.NotFoundException('Quiz not found');
        const selectedOption = quiz.options.find((o) => o.id === selectedOptionId);
        const score = selectedOption?.isCorrect ? 100 : 0;
        const result = await this.prisma.quizResult.create({
            data: { userId, quizId, score, answers: JSON.stringify({ selectedOptionId }) },
        });
        if (score > 0) {
            await this.prisma.user.update({
                where: { id: userId },
                data: { xp: { increment: 10 } },
            });
        }
        return {
            ...result,
            correct: score > 0,
            correctOptionId: quiz.options.find((o) => o.isCorrect)?.id,
            explanation: quiz.explanation,
        };
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map