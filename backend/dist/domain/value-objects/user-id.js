"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailValidationError = exports.Email = exports.UserId = void 0;
const result_1 = require("../shared/result");
class UserId {
    value;
    constructor(value) {
        this.value = value;
    }
    static generate() {
        return new UserId(require('crypto').randomUUID());
    }
    static fromString(value) {
        return new UserId(value);
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.UserId = UserId;
class Email {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        const trimmed = value.trim().toLowerCase();
        if (!trimmed) {
            return result_1.Result.err(new EmailValidationError('Email is required'));
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
            return result_1.Result.err(new EmailValidationError('Invalid email format'));
        }
        if (trimmed.length > 254) {
            return result_1.Result.err(new EmailValidationError('Email is too long'));
        }
        return result_1.Result.ok(new Email(trimmed));
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.Email = Email;
class EmailValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmailValidationError';
    }
}
exports.EmailValidationError = EmailValidationError;
//# sourceMappingURL=user-id.js.map