import { PrismaService } from '../../core/database/prisma.service';
export declare class PasswordResetService {
    private prisma;
    constructor(prisma: PrismaService);
    createResetToken(userId: string): Promise<string>;
    verifyResetToken(token: string): Promise<boolean>;
    resetPassword(token: string, newPassword: string): Promise<{
        success: boolean;
    }>;
}
