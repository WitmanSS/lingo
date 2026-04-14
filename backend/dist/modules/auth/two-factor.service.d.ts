export declare class TwoFactorService {
    generateSecret(userId: string): Promise<{
        secret: string;
        qrCode: string;
    }>;
    verifyToken(secret: string, token: string): boolean;
    generateBackupCodes(): string[];
}
