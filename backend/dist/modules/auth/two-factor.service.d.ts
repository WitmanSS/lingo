export declare class TwoFactorService {
    generateSecret(): {
        secret: string;
        qrCode: string;
    };
    verifyToken(secret: string, token: string): boolean;
    resendBackupCodes(): string[];
}
