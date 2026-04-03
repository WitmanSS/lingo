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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./search.service");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
let SearchController = class SearchController {
    searchService;
    constructor(searchService) {
        this.searchService = searchService;
    }
    async searchStories(query, level, limit, offset) {
        if (!query || query.trim().length === 0) {
            throw new common_1.BadRequestException('Search query is required');
        }
        const stories = await this.searchService.searchStories({
            query,
            level,
            limit: limit ? parseInt(limit) : 20,
            offset: offset ? parseInt(offset) : 0,
        });
        return {
            success: true,
            data: stories,
            query,
            count: stories.length,
        };
    }
    async searchVocabulary(query, level, limit, offset) {
        if (!query || query.trim().length === 0) {
            throw new common_1.BadRequestException('Search query is required');
        }
        const vocabulary = await this.searchService.searchVocabulary({
            query,
            level,
            limit: limit ? parseInt(limit) : 20,
            offset: offset ? parseInt(offset) : 0,
        });
        return {
            success: true,
            data: vocabulary,
            query,
            count: vocabulary.length,
        };
    }
    async getSearchSuggestions(query) {
        if (!query || query.trim().length < 2) {
            return {
                success: true,
                data: { stories: [], vocabulary: [] },
            };
        }
        const suggestions = await this.searchService.getSearchSuggestions(query);
        return {
            success: true,
            data: suggestions,
        };
    }
    async getTrendingStories(limit) {
        const stories = await this.searchService.getTrendingStories(limit ? parseInt(limit) : 10);
        return {
            success: true,
            data: stories,
            count: stories.length,
        };
    }
    async getRelatedStories(storyId, limit) {
        if (!storyId) {
            throw new common_1.BadRequestException('Story ID is required');
        }
        const stories = await this.searchService.getRelatedStories(storyId, limit ? parseInt(limit) : 5);
        return {
            success: true,
            data: stories,
            count: stories.length,
        };
    }
};
exports.SearchController = SearchController;
__decorate([
    (0, common_1.Get)('stories'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('level')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "searchStories", null);
__decorate([
    (0, common_1.Get)('vocabulary'),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('level')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "searchVocabulary", null);
__decorate([
    (0, common_1.Get)('suggestions'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getSearchSuggestions", null);
__decorate([
    (0, common_1.Get)('trending'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getTrendingStories", null);
__decorate([
    (0, common_1.Get)('related/:storyId'),
    __param(0, (0, common_1.Query)('storyId')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "getRelatedStories", null);
exports.SearchController = SearchController = __decorate([
    (0, common_1.Controller)('api/v1/search'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
//# sourceMappingURL=search.controller.js.map