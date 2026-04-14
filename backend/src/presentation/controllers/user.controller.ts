import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { CreateUserDto } from '../../shared/dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.createUserUseCase.execute(createUserDto);

    if (result.isErr()) {
      throw new BadRequestException(result.error?.message || 'Failed to create user');
    }

    return result.value;
  }
}