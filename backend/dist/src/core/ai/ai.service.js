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
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config/config.service");
const prisma_service_1 = require("../database/prisma.service");
let AIService = class AIService {
    config;
    prisma;
    constructor(config, prisma) {
        this.config = config;
        this.prisma = prisma;
    }
    async generateStory(options) {
        try {
            const storyData = {
                title: options.title,
                content: `Generated story about: ${options.title}`,
                wordCount: options.wordCount || 500,
                tokensUsed: 150,
                generationTime: 5000,
            };
            return storyData;
        }
        catch (error) {
            throw new Error(`Failed to generate story: ${error?.message || 'Unknown error'}`);
        }
    }
    async generateVocabulary(options) {
        try {
            const vocabularyData = {
                word: options.word,
                definition: `Definition for ${options.word}`,
                exampleSentence: `Example sentence with ${options.word}`,
                phonetic: '/example/',
                level: options.level,
            };
            return vocabularyData;
        }
        catch (error) {
            throw new Error(`Failed to generate vocabulary: ${error?.message || 'Unknown error'}`);
        }
    }
    async improveStoryContent(storyId, feedback) {
        try {
            return {
                success: true,
                message: 'Story improvement requested',
                storyId,
            };
        }
        catch (error) {
            throw new Error(`Failed to improve story: ${error?.message || 'Unknown error'}`);
        }
    }
    async generateQuizzes(storyId, questionCount = 5) {
        try {
            const quizzes = [];
            for (let i = 0; i < questionCount; i++) {
                quizzes.push({
                    question: `Generated question ${i + 1}`,
                    options: [
                        { text: 'Option A', isCorrect: i === 0 },
                        { text: 'Option B', isCorrect: false },
                        { text: 'Option C', isCorrect: false },
                        { text: 'Option D', isCorrect: false },
                    ],
                    explanation: 'Explanation for the correct answer',
                });
            }
            return quizzes;
        }
        catch (error) {
            throw new Error(`Failed to generate quizzes: ${error?.message || 'Unknown error'}`);
        }
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_service_1.AppConfigService,
        prisma_service_1.PrismaService])
], AIService);
//# sourceMappingURL=ai.service.js.map