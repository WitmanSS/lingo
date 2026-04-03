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
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const jwt_guard_1 = require("../../common/guards/jwt.guard");
const current_user_decorator_1 = require("../../auth/decorators/current-user.decorator");
let PaymentController = class PaymentController {
    paymentService;
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async createPayment(user, body) {
        if (!body.amount || !body.currency || !body.paymentMethod) {
            throw new common_1.BadRequestException('Missing required fields: amount, currency, paymentMethod');
        }
        const payment = await this.paymentService.createPayment({
            userId: user.id,
            subscriptionId: body.subscriptionId,
            amount: body.amount,
            currency: body.currency,
            paymentMethod: body.paymentMethod,
        });
        return {
            success: true,
            data: payment,
            message: 'Payment created successfully',
        };
    }
    async getPaymentHistory(user) {
        const payments = await this.paymentService.getPaymentsByUser(user.id);
        return {
            success: true,
            data: payments,
            count: payments.length,
        };
    }
    async getPayment(user, paymentId) {
        const payment = await this.paymentService.getPaymentById(paymentId);
        if (!payment || payment.userId !== user.id) {
            throw new common_1.BadRequestException('Payment not found or access denied');
        }
        return {
            success: true,
            data: payment,
        };
    }
    async createSubscription(user, body) {
        if (!body.planId) {
            throw new common_1.BadRequestException('Missing required field: planId');
        }
        const subscription = await this.paymentService.createSubscription(user.id, body.planId);
        return {
            success: true,
            data: subscription,
            message: 'Subscription created successfully',
        };
    }
    async getSubscriptions(user) {
        const subscriptions = await this.paymentService.getSubscriptionsByUser(user.id);
        return {
            success: true,
            data: subscriptions,
            count: subscriptions.length,
        };
    }
    async cancelSubscription(user, subscriptionId) {
        const subscription = await this.paymentService.cancelSubscription(subscriptionId);
        return {
            success: true,
            data: subscription,
            message: 'Subscription cancelled successfully',
        };
    }
    async refundPayment(paymentId) {
        const refund = await this.paymentService.processRefund(paymentId);
        return {
            success: true,
            data: refund,
            message: 'Refund processed successfully',
        };
    }
};
exports.PaymentController = PaymentController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('history'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPaymentHistory", null);
__decorate([
    (0, common_1.Get)(':paymentId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('paymentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getPayment", null);
__decorate([
    (0, common_1.Post)('subscriptions/create'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "createSubscription", null);
__decorate([
    (0, common_1.Get)('subscriptions/:subscriptionId'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getSubscriptions", null);
__decorate([
    (0, common_1.Post)('subscriptions/:subscriptionId/cancel'),
    __param(0, (0, current_user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Param)('subscriptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "cancelSubscription", null);
__decorate([
    (0, common_1.Post)('refund/:paymentId'),
    __param(0, (0, common_1.Param)('paymentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "refundPayment", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('api/v1/payments'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [payment_service_1.PaymentService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map