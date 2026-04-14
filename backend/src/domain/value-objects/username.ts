import { Result } from '../shared/result';

export class Username {
  private constructor(private readonly value: string) {}

  static create(value: string): Result<Username, UsernameValidationError> {
    const trimmed = value.trim();

    if (!trimmed) {
      return Result.err(new UsernameValidationError('Username is required'));
    }

    if (trimmed.length < 3) {
      return Result.err(new UsernameValidationError('Username must be at least 3 characters'));
    }

    if (trimmed.length > 30) {
      return Result.err(new UsernameValidationError('Username must be less than 30 characters'));
    }

    const usernameRegex = /^[a-zA-Z0-9_-]+$/;
    if (!usernameRegex.test(trimmed)) {
      return Result.err(new UsernameValidationError('Username can only contain letters, numbers, underscores, and hyphens'));
    }

    return Result.ok(new Username(trimmed));
  }

  toString(): string {
    return this.value;
  }

  equals(other: Username): boolean {
    return this.value === other.value;
  }
}

export class UsernameValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UsernameValidationError';
  }
}