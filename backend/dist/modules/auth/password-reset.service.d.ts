import { PrismaService } from '../../core/database/prisma.service';
export declare class PasswordResetService {
    private prisma;
    constructor(prisma: PrismaService);
    createResetToken(email: string): Promise<string>;
    verifyResetToken(token: string): Promise<string | null>;
    resetPassword(token: string, newPassword: string): Promise<void>;
}
