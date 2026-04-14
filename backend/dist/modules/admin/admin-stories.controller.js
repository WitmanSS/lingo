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
exports.AdminStoriesController = void 0;
const common_1 = require("@nestjs/common");
const admin_stories_service_1 = require("./admin-stories.service");
const admin_guard_1 = require("../../common/guards/admin.guard");
const roles_guard_1 = require("../../common/guards/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let AdminStoriesController = class AdminStoriesController {
    storiesService;
    constructor(storiesService) {
        this.storiesService = storiesService;
    }
    getStories(q, skip, take) {
        return this.storiesService.searchStories(q, parseInt(skip || '0', 10), Math.min(100, parseInt(take || '50', 10)));
    }
    getReports(skip, take) {
        return this.storiesService.getReportedStories(parseInt(skip || '0', 10), Math.min(100, parseInt(take || '50', 10)));
    }
    setPublishStatus(storyId, published) {
        return this.storiesService.setPublishStatus(storyId, published);
    }
    dismissReport(reportId) {
        return this.storiesService.dismissReport(reportId);
    }
};
exports.AdminStoriesController = AdminStoriesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], AdminStoriesController.prototype, "getStories", null);
__decorate([
    (0, common_1.Get)('reports'),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AdminStoriesController.prototype, "getReports", null);
__decorate([
    (0, common_1.Put)(':id/publish'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('published')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], AdminStoriesController.prototype, "setPublishStatus", null);
__decorate([
    (0, common_1.Put)('reports/:id/dismiss'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminStoriesController.prototype, "dismissReport", null);
exports.AdminStoriesController = AdminStoriesController = __decorate([
    (0, common_1.Controller)('admin/stories'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MODERATOR),
    __metadata("design:paramtypes", [admin_stories_service_1.AdminStoriesService])
], AdminStoriesController);
//# sourceMappingURL=admin-stories.controller.js.map