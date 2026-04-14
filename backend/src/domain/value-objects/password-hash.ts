import { Result } from '../shared/result';
import * as bcrypt from 'bcrypt';

export class PasswordHash {
  private constructor(private readonly value: string) {}

  static async create(plainPassword: string): Promise<Result<PasswordHash, PasswordValidationError>> {
    if (!plainPassword) {
      return Result.err(new PasswordValidationError('Password is required'));
    }

    if (plainPassword.length < 8) {
      return Result.err(new PasswordValidationError('Password must be at least 8 characters'));
    }

    if (plainPassword.length > 128) {
      return Result.err(new PasswordValidationError('Password must be less than 128 characters'));
    }

    // Check for at least one uppercase, one lowercase, and one number
    const hasUppercase = /[A-Z]/.test(plainPassword);
    const hasLowercase = /[a-z]/.test(plainPassword);
    const hasNumber = /\d/.test(plainPassword);

    if (!hasUppercase || !hasLowercase || !hasNumber) {
      return Result.err(new PasswordValidationError('Password must contain at least one uppercase letter, one lowercase letter, and one number'));
    }

    const hashed = await bcrypt.hash(plainPassword, 12);
    return Result.ok(new PasswordHash(hashed));
  }

  static createFromHash(hashedPassword: string): Result<PasswordHash, PasswordValidationError> {
    if (!hashedPassword) {
      return Result.err(new PasswordValidationError('Password hash is required'));
    }

    return Result.ok(new PasswordHash(hashedPassword));
  }

  async compare(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.value);
  }

  toString(): string {
    return this.value;
  }
}

export class PasswordValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordValidationError';
  }
}