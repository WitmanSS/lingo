"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityAuditInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let SecurityAuditInterceptor = class SecurityAuditInterceptor {
    logger = new common_1.Logger('SecurityAudit');
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const { method, url, ip } = req;
        const userRole = req.user?.role || 'ANONYMOUS';
        this.logger.warn(`[AUDIT] ${method} ${url} accessed by IP: ${ip} [Role: ${userRole}]`);
        return next.handle().pipe((0, operators_1.tap)(() => {
            if (['POST', 'PUT', 'DELETE'].includes(method)) {
                this.logger.log(`[AUDIT] ${method} Action executed on ${url} successfully.`);
            }
        }));
    }
};
exports.SecurityAuditInterceptor = SecurityAuditInterceptor;
exports.SecurityAuditInterceptor = SecurityAuditInterceptor = __decorate([
    (0, common_1.Injectable)()
], SecurityAuditInterceptor);
//# sourceMappingURL=security-audit.interceptor.js.map