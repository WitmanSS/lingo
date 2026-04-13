"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const admin_users_controller_1 = require("./admin-users.controller");
const admin_users_service_1 = require("./admin-users.service");
const admin_stories_controller_1 = require("./admin-stories.controller");
const admin_stories_service_1 = require("./admin-stories.service");
const admin_analytics_service_1 = require("./admin-analytics.service");
const admin_analytics_controller_1 = require("./admin-analytics.controller");
const moderation_priority_service_1 = require("./moderation-priority.service");
const core_1 = require("@nestjs/core");
const security_audit_interceptor_1 = require("../../common/interceptors/security-audit.interceptor");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        controllers: [admin_controller_1.AdminController, admin_users_controller_1.AdminUsersController, admin_stories_controller_1.AdminStoriesController, admin_analytics_controller_1.AdminAnalyticsController],
        providers: [
            admin_service_1.AdminService, admin_users_service_1.AdminUsersService, admin_stories_service_1.AdminStoriesService, admin_analytics_service_1.AdminAnalyticsService, moderation_priority_service_1.ModerationPriorityService,
            { provide: core_1.APP_INTERCEPTOR, useClass: security_audit_interceptor_1.SecurityAuditInterceptor }
        ],
        exports: [admin_service_1.AdminService, moderation_priority_service_1.ModerationPriorityService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map