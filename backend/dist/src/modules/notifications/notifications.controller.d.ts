import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
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
}
