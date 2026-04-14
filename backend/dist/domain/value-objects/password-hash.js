"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidationError = exports.PasswordHash = void 0;
const result_1 = require("../shared/result");
const bcrypt = __importStar(require("bcrypt"));
class PasswordHash {
    value;
    constructor(value) {
        this.value = value;
    }
    static async create(plainPassword) {
        if (!plainPassword) {
            return result_1.Result.err(new PasswordValidationError('Password is required'));
        }
        if (plainPassword.length < 8) {
            return result_1.Result.err(new PasswordValidationError('Password must be at least 8 characters'));
        }
        if (plainPassword.length > 128) {
            return result_1.Result.err(new PasswordValidationError('Password must be less than 128 characters'));
        }
        const hasUppercase = /[A-Z]/.test(plainPassword);
        const hasLowercase = /[a-z]/.test(plainPassword);
        const hasNumber = /\d/.test(plainPassword);
        if (!hasUppercase || !hasLowercase || !hasNumber) {
            return result_1.Result.err(new PasswordValidationError('Password must contain at least one uppercase letter, one lowercase letter, and one number'));
        }
        const hashed = await bcrypt.hash(plainPassword, 12);
        return result_1.Result.ok(new PasswordHash(hashed));
    }
    static createFromHash(hashedPassword) {
        if (!hashedPassword) {
            return result_1.Result.err(new PasswordValidationError('Password hash is required'));
        }
        return result_1.Result.ok(new PasswordHash(hashedPassword));
    }
    async compare(plainPassword) {
        return bcrypt.compare(plainPassword, this.value);
    }
    toString() {
        return this.value;
    }
}
exports.PasswordHash = PasswordHash;
class PasswordValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PasswordValidationError';
    }
}
exports.PasswordValidationError = PasswordValidationError;
//# sourceMappingURL=password-hash.js.map