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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../database/prisma.service");
let PaymentService = class PaymentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPayment(data) {
        return this.prisma.payment.create({
            data: {
                userId: data.userId,
                subscriptionId: data.subscriptionId,
                amount: data.amount,
                currency: data.currency,
                paymentMethod: data.paymentMethod,
                status: 'PENDING',
            },
        });
    }
    async updatePaymentStatus(paymentId, status) {
        return this.prisma.payment.update({
            where: { id: paymentId },
            data: { status: status },
        });
    }
    async getPaymentsByUser(userId) {
        return this.prisma.payment.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async getPaymentById(paymentId) {
        return this.prisma.payment.findUnique({
            where: { id: paymentId },
        });
    }
    async createSubscription(userId, planId) {
        const currentDate = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        return this.prisma.subscription.create({
            data: {
                userId,
                planId,
                status: 'ACTIVE',
                currentPeriodStart: currentDate,
                currentPeriodEnd: nextMonth,
            },
        });
    }
    async cancelSubscription(subscriptionId) {
        return this.prisma.subscription.update({
            where: { id: subscriptionId },
            data: {
                status: 'CANCELLED',
                cancelAtPeriodEnd: true,
            },
        });
    }
    async getSubscriptionsByUser(userId) {
        return this.prisma.subscription.findMany({
            where: { userId },
        });
    }
    async processRefund(paymentId) {
        return this.prisma.payment.update({
            where: { id: paymentId },
            data: { status: 'REFUNDED' },
        });
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map