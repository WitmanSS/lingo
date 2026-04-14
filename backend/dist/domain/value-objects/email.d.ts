import { Result } from '../shared/result';
export declare class Email {
    private readonly value;
    private constructor();
    static create(value: string): Result<Email, EmailValidationError>;
    toString(): string;
    equals(other: Email): boolean;
}
export declare class EmailValidationError extends Error {
    constructor(message: string);
}
