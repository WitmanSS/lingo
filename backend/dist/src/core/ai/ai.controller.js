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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
let AIController = class AIController {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    async generateStory(body) {
        if (!body.title || !body.level || !body.prompt) {
            throw new common_1.BadRequestException('Missing required fields: title, level, prompt');
        }
        const story = await this.aiService.generateStory({
            title: body.title,
            level: body.level,
            prompt: body.prompt,
            wordCount: body.wordCount,
        });
        return {
            success: true,
            data: story,
            message: 'Story generated successfully',
        };
    }
    async generateVocabulary(body) {
        if (!body.word || !body.level) {
            throw new common_1.BadRequestException('Missing required fields: word, level');
        }
        const vocabulary = await this.aiService.generateVocabulary({
            word: body.word,
            level: body.level,
        });
        return {
            success: true,
            data: vocabulary,
            message: 'Vocabulary generated successfully',
        };
    }
    async generateQuizzes(body) {
        if (!body.storyId) {
            throw new common_1.BadRequestException('Missing required field: storyId');
        }
        const quizzes = await this.aiService.generateQuizzes(body.storyId, body.questionCount);
        return {
            success: true,
            data: quizzes,
            message: 'Quizzes generated successfully',
        };
    }
    async improveStory(body) {
        if (!body.storyId || !body.feedback) {
            throw new common_1.BadRequestException('Missing required fields: storyId, feedback');
        }
        const result = await this.aiService.improveStoryContent(body.storyId, body.feedback);
        return {
            success: true,
            data: result,
            message: 'Story improvement requested',
        };
    }
    getStatus() {
        return {
            status: 'AI service is running',
            models: ['GPT-3.5', 'GPT-4'],
        };
    }
};
exports.AIController = AIController;
__decorate([
    (0, common_1.Post)('generate-story'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "generateStory", null);
__decorate([
    (0, common_1.Post)('generate-vocabulary'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "generateVocabulary", null);
__decorate([
    (0, common_1.Post)('generate-quizzes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "generateQuizzes", null);
__decorate([
    (0, common_1.Post)('improve-story'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "improveStory", null);
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AIController.prototype, "getStatus", null);
exports.AIController = AIController = __decorate([
    (0, common_1.Controller)('api/v1/ai'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [ai_service_1.AIService])
], AIController);
//# sourceMappingURL=ai.controller.js.map