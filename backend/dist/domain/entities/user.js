"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordChangeError = exports.UserCreationError = exports.User = exports.Role = void 0;
const result_1 = require("../shared/result");
const user_id_1 = require("../value-objects/user-id");
const email_1 = require("../value-objects/email");
const username_1 = require("../value-objects/username");
const password_hash_1 = require("../value-objects/password-hash");
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
    Role["MODERATOR"] = "MODERATOR";
})(Role || (exports.Role = Role = {}));
class User {
    _id;
    _username;
    _email;
    _passwordHash;
    _role;
    _isActive;
    _twoFactorEnabled;
    _createdAt;
    _updatedAt;
    _twoFactorSecret;
    _lastLoginAt;
    _deletedAt;
    constructor(_id, _username, _email, _passwordHash, _role, _isActive, _twoFactorEnabled, _createdAt, _updatedAt, _twoFactorSecret, _lastLoginAt, _deletedAt) {
        this._id = _id;
        this._username = _username;
        this._email = _email;
        this._passwordHash = _passwordHash;
        this._role = _role;
        this._isActive = _isActive;
        this._twoFactorEnabled = _twoFactorEnabled;
        this._createdAt = _createdAt;
        this._updatedAt = _updatedAt;
        this._twoFactorSecret = _twoFactorSecret;
        this._lastLoginAt = _lastLoginAt;
        this._deletedAt = _deletedAt;
    }
    static async create(props) {
        const usernameOrError = username_1.Username.create(props.username);
        if (usernameOrError.isErr()) {
            return result_1.Result.err(usernameOrError.error);
        }
        const emailOrError = email_1.Email.create(props.email);
        if (emailOrError.isErr()) {
            return result_1.Result.err(emailOrError.error);
        }
        const passwordHashOrError = await password_hash_1.PasswordHash.create(props.password);
        if (passwordHashOrError.isErr()) {
            return result_1.Result.err(passwordHashOrError.error);
        }
        const now = new Date();
        return result_1.Result.ok(new User(user_id_1.UserId.generate(), usernameOrError.value, emailOrError.value, passwordHashOrError.value, props.role || Role.USER, true, false, now, now));
    }
    static fromPersistence(data) {
        const usernameOrError = username_1.Username.create(data.username);
        if (usernameOrError.isErr())
            return result_1.Result.err(usernameOrError.error);
        const emailOrError = email_1.Email.create(data.email);
        if (emailOrError.isErr())
            return result_1.Result.err(emailOrError.error);
        const passwordHashOrError = password_hash_1.PasswordHash.createFromHash(data.passwordHash);
        if (passwordHashOrError.isErr())
            return result_1.Result.err(passwordHashOrError.error);
        return result_1.Result.ok(new User(user_id_1.UserId.fromString(data.id), usernameOrError.value, emailOrError.value, passwordHashOrError.value, data.role, !data.deletedAt, data.twoFactorEnabled, data.createdAt, data.updatedAt, data.twoFactorSecret, data.lastLoginAt, data.deletedAt));
    }
    async changePassword(newPassword) {
        const passwordHashOrError = await password_hash_1.PasswordHash.create(newPassword);
        if (passwordHashOrError.isErr()) {
            const error = passwordHashOrError.error;
            return result_1.Result.err(new PasswordChangeError(error?.message || 'Failed to hash password'));
        }
        const newPasswordHash = passwordHashOrError.value;
        if (!newPasswordHash) {
            return result_1.Result.err(new PasswordChangeError('Failed to hash password'));
        }
        this._passwordHash = newPasswordHash;
        this._updatedAt = new Date();
        return result_1.Result.ok(undefined);
    }
    enable2FA(secret) {
        this._twoFactorEnabled = true;
        this._twoFactorSecret = secret;
        this._updatedAt = new Date();
    }
    disable2FA() {
        this._twoFactorEnabled = false;
        this._twoFactorSecret = undefined;
        this._updatedAt = new Date();
    }
    recordLogin() {
        this._lastLoginAt = new Date();
        this._updatedAt = new Date();
    }
    delete() {
        this._deletedAt = new Date();
        this._updatedAt = new Date();
    }
    get id() { return this._id; }
    get username() { return this._username; }
    get email() { return this._email; }
    get passwordHash() { return this._passwordHash; }
    get role() { return this._role; }
    get isActive() { return !this._deletedAt; }
    get twoFactorEnabled() { return this._twoFactorEnabled; }
    get twoFactorSecret() { return this._twoFactorSecret; }
    get createdAt() { return this._createdAt; }
    get updatedAt() { return this._updatedAt; }
    get lastLoginAt() { return this._lastLoginAt; }
    get deletedAt() { return this._deletedAt; }
}
exports.User = User;
class UserCreationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserCreationError';
    }
}
exports.UserCreationError = UserCreationError;
class PasswordChangeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PasswordChangeError';
    }
}
exports.PasswordChangeError = PasswordChangeError;
//# sourceMappingURL=user.js.map