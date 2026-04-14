import { Injectable, Inject } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { UserRepository } from '../../domain/repositories/user-repository';
import { Email } from '../../domain/value-objects/email';
import { Username } from '../../domain/value-objects/username';
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

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private readonly userRepository: UserRepository,
  ) {}

  async execute(input: CreateUserInput): Promise<Result<CreateUserOutput, CreateUserError>> {
    // Check if email already exists
    const emailValueObj = Email.create(input.email);
    if (emailValueObj.isErr()) {
      return Result.err(new CreateUserError('Invalid email format'));
    }

    const emailValue = emailValueObj.value;
    if (!emailValue) {
      return Result.err(new CreateUserError('Invalid email'));
    }

    const existingEmail = await this.userRepository.findByEmail(emailValue);
    if (existingEmail) {
      return Result.err(new CreateUserError('Email already registered'));
    }

    // Check if username already exists
    const usernameValueObj = Username.create(input.username);
    if (usernameValueObj.isErr()) {
      return Result.err(new CreateUserError('Invalid username'));
    }

    const usernameValue = usernameValueObj.value;
    if (!usernameValue) {
      return Result.err(new CreateUserError('Invalid username'));
    }

    const existingUsername = await this.userRepository.findByUsername(usernameValue);
    if (existingUsername) {
      return Result.err(new CreateUserError('Username already taken'));
    }

    // Create user
    const userResult = await User.create({
      email: input.email,
      username: input.username,
      password: input.password,
    });

    if (userResult.isErr()) {
      const error = userResult.error;
      return Result.err(new CreateUserError(error?.message || 'Failed to create user'));
    }

    const user = userResult.value;
    if (!user) {
      return Result.err(new CreateUserError('Failed to create user'));
    }

    // Save user
    await this.userRepository.save(user);

    return Result.ok({ userId: user.id.toString() });
  }
}

export class CreateUserError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CreateUserError';
  }
}