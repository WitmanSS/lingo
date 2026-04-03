import { PaymentService } from './payment.service';
export declare class PaymentController {
    private readonly paymentService;
    constructor(paymentService: PaymentService);
    createPayment(user: any, body: {
        subscriptionId?: string;
        amount: number;
        currency: string;
        paymentMethod: string;
    }): Promise<{
        success: boolean;
        data: {
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
        };
        message: string;
    }>;
    getPaymentHistory(user: any): Promise<{
        success: boolean;
        data: {
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
        }[];
        count: number;
    }>;
    getPayment(user: any, paymentId: string): Promise<{
        success: boolean;
        data: {
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
        };
    }>;
    createSubscription(user: any, body: {
        planId: string;
    }): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.SubscriptionStatus;
            updatedAt: Date;
            planId: string;
            currentPeriodStart: Date;
            currentPeriodEnd: Date;
            cancelAtPeriodEnd: boolean;
        };
        message: string;
    }>;
    getSubscriptions(user: any): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.SubscriptionStatus;
            updatedAt: Date;
            planId: string;
            currentPeriodStart: Date;
            currentPeriodEnd: Date;
            cancelAtPeriodEnd: boolean;
        }[];
        count: number;
    }>;
    cancelSubscription(user: any, subscriptionId: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.SubscriptionStatus;
            updatedAt: Date;
            planId: string;
            currentPeriodStart: Date;
            currentPeriodEnd: Date;
            cancelAtPeriodEnd: boolean;
        };
        message: string;
    }>;
    refundPayment(paymentId: string): Promise<{
        success: boolean;
        data: {
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
        };
        message: string;
    }>;
}
