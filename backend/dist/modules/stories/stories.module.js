"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoriesModule = void 0;
const common_1 = require("@nestjs/common");
const stories_controller_1 = require("./stories.controller");
const stories_service_1 = require("./stories.service");
const gamification_module_1 = require("../gamification/gamification.module");
const admin_module_1 = require("../admin/admin.module");
const common_2 = require("@nestjs/common");
let StoriesModule = class StoriesModule {
};
exports.StoriesModule = StoriesModule;
exports.StoriesModule = StoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [gamification_module_1.GamificationModule, (0, common_2.forwardRef)(() => admin_module_1.AdminModule)],
        controllers: [stories_controller_1.StoriesController],
        providers: [stories_service_1.StoriesService],
        exports: [stories_service_1.StoriesService],
    })
], StoriesModule);
//# sourceMappingURL=stories.module.js.map