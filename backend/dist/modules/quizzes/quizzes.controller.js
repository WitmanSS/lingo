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
exports.QuizzesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const current_user_decorator_1 = require("../../common/decorators/current-user.decorator");
const quizzes_service_1 = require("./quizzes.service");
let QuizzesController = class QuizzesController {
    quizzesService;
    constructor(quizzesService) {
        this.quizzesService = quizzesService;
    }
    getForStory(storyId) {
        return this.quizzesService.getForStory(storyId);
    }
    submit(user, data) {
        return this.quizzesService.submit(user.id, data.quizId, data.selectedOptionId);
    }
};
exports.QuizzesController = QuizzesController;
__decorate([
    (0, common_1.Get)('stories/:storyId/quiz'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, common_1.Param)('storyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "getForStory", null);
__decorate([
    (0, common_1.Post)('quiz/submit'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], QuizzesController.prototype, "submit", null);
exports.QuizzesController = QuizzesController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [quizzes_service_1.QuizzesService])
], QuizzesController);
//# sourceMappingURL=quizzes.controller.js.map