import { UserRepository } from '../../domain/repositories/user-repository';
import { Result } from '../../domain/shared/result';
export interface CreateUserInput {
    username: string;
    email: string;
    password: string;
    role?: string;
}
export interface CreateUserOutput {
    userId: string;
}
export declare class CreateUserUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(input: CreateUserInput): Promise<Result<CreateUserOutput, CreateUserError>>;
}
export declare class CreateUserError extends Error {
    constructor(message: string);
}
