import { Result } from '../shared/result';

export class Email {
  private constructor(private readonly value: string) {}

  static create(value: string): Result<Email, EmailValidationError> {
    const trimmed = value.trim().toLowerCase();

    if (!trimmed) {
      return Result.err(new EmailValidationError('Email is required'));
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return Result.err(new EmailValidationError('Invalid email format'));
    }

    if (trimmed.length > 254) {
      return Result.err(new EmailValidationError('Email is too long'));
    }

    return Result.ok(new Email(trimmed));
  }

  toString(): string {
    return this.value;
  }

  equals(other: Email): boolean {
    return this.value === other.value;
  }
}

export class EmailValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailValidationError';
  }
}