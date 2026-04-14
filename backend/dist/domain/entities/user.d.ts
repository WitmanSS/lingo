import { Result } from '../shared/result';
import { UserId } from '../value-objects/user-id';
import { Email } from '../value-objects/email';
import { Username } from '../value-objects/username';
import { PasswordHash } from '../value-objects/password-hash';
export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
    MODERATOR = "MODERATOR"
}
export declare class User {
    private readonly _id;
    private _username;
    private _email;
    private _passwordHash;
    private _role;
    private _isActive;
    private _twoFactorEnabled;
    private _createdAt;
    private _updatedAt;
    private _twoFactorSecret?;
    private _lastLoginAt?;
    private _deletedAt?;
    private constructor();
    static create(props: {
        username: string;
        email: string;
        password: string;
        role?: Role;
    }): Promise<Result<User, UserCreationError>>;
    static fromPersistence(data: {
        id: string;
        username: string;
        email: string;
        passwordHash: string;
        role: Role;
        twoFactorEnabled: boolean;
        twoFactorSecret?: string;
        createdAt: Date;
        updatedAt: Date;
        lastLoginAt?: Date;
        deletedAt?: Date;
    }): Result<User, UserCreationError>;
    changePassword(newPassword: string): Promise<Result<void, PasswordChangeError>>;
    enable2FA(secret: string): void;
    disable2FA(): void;
    recordLogin(): void;
    delete(): void;
    get id(): UserId;
    get username(): Username;
    get email(): Email;
    get passwordHash(): PasswordHash;
    get role(): Role;
    get isActive(): boolean;
    get twoFactorEnabled(): boolean;
    get twoFactorSecret(): string | undefined;
    get createdAt(): Date;
    get updatedAt(): Date;
    get lastLoginAt(): Date | undefined;
    get deletedAt(): Date | undefined;
}
export declare class UserCreationError extends Error {
    constructor(message: string);
}
export declare class PasswordChangeError extends Error {
    constructor(message: string);
}
