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
const domain_module_1 = require("./domain/domain.module");
const application_module_1 = require("./application/application.module");
const infrastructure_module_1 = require("./infrastructure/infrastructure.module");
const presentation_module_1 = require("./presentation/presentation.module");
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
            domain_module_1.DomainModule,
            application_module_1.ApplicationModule,
            infrastructure_module_1.InfrastructureModule,
            presentation_module_1.PresentationModule,
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