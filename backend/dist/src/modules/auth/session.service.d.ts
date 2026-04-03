import { PrismaService } from '../../core/database/prisma.service';
export declare class SessionService {
    private prisma;
    constructor(prisma: PrismaService);
    createSession(userId: string, deviceId: string, ipAddress: string): Promise<{
        id: string;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: Date;
        userId: string;
        token: string;
        expiresAt: Date;
        deviceId: string | null;
    }>;
    getSession(sessionId: string): Promise<{
        id: string;
        ipAddress: string | null;
        userAgent: string | null;
        createdAt: Date;
        userId: string;
        token: string;
        expiresAt: Date;
        deviceId: string | null;
    } | null>;
    deleteSessions(userId: string): Promise<void>;
    deleteSession(sessionId: string): Promise<void>;
    private generateToken;
}
