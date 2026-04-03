import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    softDelete(model: string, id: string): Promise<any>;
    createAuditLog(data: {
        userId?: string;
        action: string;
        entityType: string;
        entityId?: string;
        oldValues?: any;
        newValues?: any;
        ipAddress?: string;
        userAgent?: string;
    }): Promise<{
        id: string;
        action: string;
        entityType: string;
        entityId: string | null;
        oldValues: string | null;
        newValues: string | null;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: Date;
        userId: string | null;
    }>;
}
