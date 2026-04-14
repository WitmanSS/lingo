"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserError = exports.CreateUserUseCase = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../../domain/entities/user");
const email_1 = require("../../domain/value-objects/email");
const username_1 = require("../../domain/value-objects/username");
const result_1 = require("../../domain/shared/result");
let CreateUserUseCase = class CreateUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(input) {
        const emailValueObj = email_1.Email.create(input.email);
        if (emailValueObj.isErr()) {
            return result_1.Result.err(new CreateUserError('Invalid email format'));
        }
        const emailValue = emailValueObj.value;
        if (!emailValue) {
            return result_1.Result.err(new CreateUserError('Invalid email'));
        }
        const existingEmail = await this.userRepository.findByEmail(emailValue);
        if (existingEmail) {
            return result_1.Result.err(new CreateUserError('Email already registered'));
        }
        const usernameValueObj = username_1.Username.create(input.username);
        if (usernameValueObj.isErr()) {
            return result_1.Result.err(new CreateUserError('Invalid username'));
        }
        const usernameValue = usernameValueObj.value;
        if (!usernameValue) {
            return result_1.Result.err(new CreateUserError('Invalid username'));
        }
        const existingUsername = await this.userRepository.findByUsername(usernameValue);
        if (existingUsername) {
            return result_1.Result.err(new CreateUserError('Username already taken'));
        }
        const userResult = await user_1.User.create({
            email: input.email,
            username: input.username,
            password: input.password,
        });
        if (userResult.isErr()) {
            const error = userResult.error;
            return result_1.Result.err(new CreateUserError(error?.message || 'Failed to create user'));
        }
        const user = userResult.value;
        if (!user) {
            return result_1.Result.err(new CreateUserError('Failed to create user'));
        }
        await this.userRepository.save(user);
        return result_1.Result.ok({ userId: user.id.toString() });
    }
};
exports.CreateUserUseCase = CreateUserUseCase;
exports.CreateUserUseCase = CreateUserUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UserRepository')),
    __metadata("design:paramtypes", [Object])
], CreateUserUseCase);
class CreateUserError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CreateUserError';
    }
}
exports.CreateUserError = CreateUserError;
//# sourceMappingURL=create-user.use-case.js.map