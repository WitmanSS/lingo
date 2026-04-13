import { PrismaService } from '../../core/database/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    getNotifications(): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        type: string;
        storyId: string | null;
        message: string;
        adminId: string | null;
        isRead: boolean;
    }[]>;
    markAsRead(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        type: string;
        storyId: string | null;
        message: string;
        adminId: string | null;
        isRead: boolean;
    }>;
    createNotification(data: {
        type: string;
        message: string;
        storyId?: string;
        userId?: string;
        adminId?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        userId: string | null;
        type: string;
        storyId: string | null;
        message: string;
        adminId: string | null;
        isRead: boolean;
    }>;
}
