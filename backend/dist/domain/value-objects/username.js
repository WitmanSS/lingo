"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsernameValidationError = exports.Username = void 0;
const result_1 = require("../shared/result");
class Username {
    value;
    constructor(value) {
        this.value = value;
    }
    static create(value) {
        const trimmed = value.trim();
        if (!trimmed) {
            return result_1.Result.err(new UsernameValidationError('Username is required'));
        }
        if (trimmed.length < 3) {
            return result_1.Result.err(new UsernameValidationError('Username must be at least 3 characters'));
        }
        if (trimmed.length > 30) {
            return result_1.Result.err(new UsernameValidationError('Username must be less than 30 characters'));
        }
        const usernameRegex = /^[a-zA-Z0-9_-]+$/;
        if (!usernameRegex.test(trimmed)) {
            return result_1.Result.err(new UsernameValidationError('Username can only contain letters, numbers, underscores, and hyphens'));
        }
        return result_1.Result.ok(new Username(trimmed));
    }
    toString() {
        return this.value;
    }
    equals(other) {
        return this.value === other.value;
    }
}
exports.Username = Username;
class UsernameValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UsernameValidationError';
    }
}
exports.UsernameValidationError = UsernameValidationError;
//# sourceMappingURL=username.js.map