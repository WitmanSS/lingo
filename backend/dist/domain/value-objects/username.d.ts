import { Result } from '../shared/result';
export declare class Username {
    private readonly value;
    private constructor();
    static create(value: string): Result<Username, UsernameValidationError>;
    toString(): string;
    equals(other: Username): boolean;
}
export declare class UsernameValidationError extends Error {
    constructor(message: string);
}
