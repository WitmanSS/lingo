import { Result } from '../shared/result';
export declare class PasswordHash {
    private readonly value;
    private constructor();
    static create(plainPassword: string): Promise<Result<PasswordHash, PasswordValidationError>>;
    static createFromHash(hashedPassword: string): Result<PasswordHash, PasswordValidationError>;
    compare(plainPassword: string): Promise<boolean>;
    toString(): string;
}
export declare class PasswordValidationError extends Error {
    constructor(message: string);
}
