"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const throttler_1 = require("@nestjs/throttler");
const terminus_1 = require("@nestjs/terminus");
const schedule_1 = require("@nestjs/schedule");
const config_module_1 = require("./core/config/config.module");
const prisma_module_1 = require("./core/database/prisma.module");
const redis_module_1 = require("./core/cache/redis.module");
const ai_module_1 = require("./core/ai/ai.module");
const payment_module_1 = require("./core/payments/payment.module");
const search_module_1 = require("./core/search/search.module");
const all_exceptions_filter_1 = require("./common/filters/all-exceptions.filter");
const logging_interceptor_1 = require("./common/interceptors/logging.interceptor");
const response_interceptor_1 = require("./common/interceptors/response.interceptor");
const jwt_guard_1 = require("./common/guards/jwt.guard");
const roles_guard_1 = require("./common/guards/roles.guard");
const health_controller_1 = require("./core/health/health.controller");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const stories_module_1 = require("./modules/stories/stories.module");
const admin_module_1 = require("./modules/admin/admin.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const vocabulary_module_1 = require("./modules/vocabulary/vocabulary.module");
const gamification_module_1 = require("./modules/gamification/gamification.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const bookmarks_module_1 = require("./modules/bookmarks/bookmarks.module");
const favorites_module_1 = require("./modules/favorites/favorites.module");
const progress_module_1 = require("./modules/progress/progress.module");
const quizzes_module_1 = require("./modules/quizzes/quizzes.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 100,
                }]),
            terminus_1.TerminusModule,
            config_module_1.AppConfigModule,
            prisma_module_1.PrismaModule,
            redis_module_1.RedisModule,
            ai_module_1.AIModule,
            payment_module_1.PaymentModule,
            search_module_1.SearchModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            stories_module_1.StoriesModule,
            admin_module_1.AdminModule,
            notifications_module_1.NotificationsModule,
            vocabulary_module_1.VocabularyModule,
            gamification_module_1.GamificationModule,
            analytics_module_1.AnalyticsModule,
            bookmarks_module_1.BookmarksModule,
            favorites_module_1.FavoritesModule,
            progress_module_1.ProgressModule,
            quizzes_module_1.QuizzesModule,
        ],
        controllers: [health_controller_1.HealthController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exceptions_filter_1.AllExceptionsFilter,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: logging_interceptor_1.LoggingInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JwtGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map