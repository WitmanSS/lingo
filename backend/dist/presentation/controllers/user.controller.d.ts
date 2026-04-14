import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { CreateUserDto } from '../../shared/dtos/create-user.dto';
export declare class UserController {
    private readonly createUserUseCase;
    constructor(createUserUseCase: CreateUserUseCase);
    createUser(createUserDto: CreateUserDto): Promise<import("../../application/use-cases/create-user.use-case").CreateUserOutput | undefined>;
}
