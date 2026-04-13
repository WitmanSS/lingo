import { PrismaService } from '../database/prisma.service';
interface PaymentData {
    userId: string;
    subscriptionId?: string;
    amount: number;
    currency: string;
    paymentMethod: string;
}
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    createPayment(data: PaymentData): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        currency: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        paymentMethod: string;
        transactionId: string | null;
        updatedAt: Date;
        subscriptionId: string | null;
    }>;
    updatePaymentStatus(paymentId: string, status: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        currency: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        paymentMethod: string;
        transactionId: string | null;
        updatedAt: Date;
        subscriptionId: string | null;
    }>;
    getPaymentsByUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        currency: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        paymentMethod: string;
        transactionId: string | null;
        updatedAt: Date;
        subscriptionId: string | null;
    }[]>;
    getPaymentById(paymentId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        currency: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        paymentMethod: string;
        transactionId: string | null;
        updatedAt: Date;
        subscriptionId: string | null;
    } | null>;
    createSubscription(userId: string, planId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        updatedAt: Date;
        planId: string;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
    }>;
    cancelSubscription(subscriptionId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        updatedAt: Date;
        planId: string;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
    }>;
    getSubscriptionsByUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.SubscriptionStatus;
        updatedAt: Date;
        planId: string;
        currentPeriodStart: Date;
        currentPeriodEnd: Date;
        cancelAtPeriodEnd: boolean;
    }[]>;
    processRefund(paymentId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        amount: number;
        currency: string;
        status: import(".prisma/client").$Enums.PaymentStatus;
        paymentMethod: string;
        transactionId: string | null;
        updatedAt: Date;
        subscriptionId: string | null;
    }>;
}
export {};
