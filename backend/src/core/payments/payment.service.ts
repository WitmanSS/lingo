import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

interface PaymentData {
  userId: string;
  subscriptionId?: string;
  amount: number;
  currency: string;
  paymentMethod: string;
}

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async createPayment(data: PaymentData) {
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

  async updatePaymentStatus(paymentId: string, status: string) {
    return this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: status as any },
    });
  }

  async getPaymentsByUser(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPaymentById(paymentId: string) {
    return this.prisma.payment.findUnique({
      where: { id: paymentId },
    });
  }

  async createSubscription(userId: string, planId: string) {
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

  async cancelSubscription(subscriptionId: string) {
    return this.prisma.subscription.update({
      where: { id: subscriptionId },
      data: {
        status: 'CANCELLED',
        cancelAtPeriodEnd: true,
      },
    });
  }

  async getSubscriptionsByUser(userId: string) {
    return this.prisma.subscription.findMany({
      where: { userId },
    });
  }

  async processRefund(paymentId: string) {
    return this.prisma.payment.update({
      where: { id: paymentId },
      data: { status: 'REFUNDED' },
    });
  }
}
