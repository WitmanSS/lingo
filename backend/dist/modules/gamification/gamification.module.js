"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamificationModule = void 0;
const common_1 = require("@nestjs/common");
const gamification_controller_1 = require("./gamification.controller");
const gamification_service_1 = require("./gamification.service");
const xp_service_1 = require("./xp.service");
const level_service_1 = require("./level.service");
const leaderboard_service_1 = require("./leaderboard.service");
const leaderboards_controller_1 = require("./leaderboards.controller");
const redis_module_1 = require("../../core/cache/redis.module");
const xp_validation_service_1 = require("./xp-validation.service");
let GamificationModule = class GamificationModule {
};
exports.GamificationModule = GamificationModule;
exports.GamificationModule = GamificationModule = __decorate([
    (0, common_1.Module)({
        imports: [redis_module_1.RedisModule],
        controllers: [gamification_controller_1.GamificationController, leaderboards_controller_1.LeaderboardsController],
        providers: [gamification_service_1.GamificationService, xp_validation_service_1.XpValidationService, xp_service_1.XpService, level_service_1.LevelService, leaderboard_service_1.LeaderboardService],
        exports: [gamification_service_1.GamificationService, xp_service_1.XpService, level_service_1.LevelService, leaderboard_service_1.LeaderboardService],
    })
], GamificationModule);
//# sourceMappingURL=gamification.module.js.map