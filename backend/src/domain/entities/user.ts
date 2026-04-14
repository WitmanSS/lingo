import { Result } from '../shared/result';
import { UserId } from '../value-objects/user-id';
import { Email } from '../value-objects/email';
import { Username } from '../value-objects/username';
import { PasswordHash } from '../value-objects/password-hash';

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR'
}

export class User {
  private constructor(
    private readonly _id: UserId,
    private _username: Username,
    private _email: Email,
    private _passwordHash: PasswordHash,
    private _role: Role,
    private _isActive: boolean,
    private _twoFactorEnabled: boolean,
    private _createdAt: Date,
    private _updatedAt: Date,
    private _twoFactorSecret?: string,
    private _lastLoginAt?: Date,
    private _deletedAt?: Date
  ) {}

  static async create(props: {
    username: string;
    email: string;
    password: string;
    role?: Role;
  }): Promise<Result<User, UserCreationError>> {
    const usernameOrError = Username.create(props.username);
    if (usernameOrError.isErr()) {
      return Result.err(usernameOrError.error as UserCreationError);
    }

    const emailOrError = Email.create(props.email);
    if (emailOrError.isErr()) {
      return Result.err(emailOrError.error as UserCreationError);
    }

    const passwordHashOrError = await PasswordHash.create(props.password);
    if (passwordHashOrError.isErr()) {
      return Result.err(passwordHashOrError.error as UserCreationError);
    }

    const now = new Date();
    return Result.ok(new User(
      UserId.generate(),
      usernameOrError.value!,
      emailOrError.value!,
      passwordHashOrError.value!,
      props.role || Role.USER,
      true,
      false,
      now,
      now
    ));
  }

  static fromPersistence(data: {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    role: Role;
    twoFactorEnabled: boolean;
    twoFactorSecret?: string;
    createdAt: Date;
    updatedAt: Date;
    lastLoginAt?: Date;
    deletedAt?: Date;
  }): Result<User, UserCreationError> {
    const usernameOrError = Username.create(data.username);
    if (usernameOrError.isErr()) return Result.err(usernameOrError.error as UserCreationError);

    const emailOrError = Email.create(data.email);
    if (emailOrError.isErr()) return Result.err(emailOrError.error as UserCreationError);

    const passwordHashOrError = PasswordHash.createFromHash(data.passwordHash);
    if (passwordHashOrError.isErr()) return Result.err(passwordHashOrError.error as UserCreationError);

    return Result.ok(new User(
      UserId.fromString(data.id),
      usernameOrError.value!,
      emailOrError.value!,
      passwordHashOrError.value!,
      data.role,
      !data.deletedAt,
      data.twoFactorEnabled,
      data.createdAt,
      data.updatedAt,
      data.twoFactorSecret,
      data.lastLoginAt,
      data.deletedAt
    ));
  }

  // Business methods
  async changePassword(newPassword: string): Promise<Result<void, PasswordChangeError>> {
    const passwordHashOrError = await PasswordHash.create(newPassword);
    if (passwordHashOrError.isErr()) {
      const error = passwordHashOrError.error;
      return Result.err(new PasswordChangeError(error?.message || 'Failed to hash password'));
    }

    const newPasswordHash = passwordHashOrError.value;
    if (!newPasswordHash) {
      return Result.err(new PasswordChangeError('Failed to hash password'));
    }

    this._passwordHash = newPasswordHash;
    this._updatedAt = new Date();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Result.ok(undefined as any);
  }

  enable2FA(secret: string): void {
    this._twoFactorEnabled = true;
    this._twoFactorSecret = secret;
    this._updatedAt = new Date();
  }

  disable2FA(): void {
    this._twoFactorEnabled = false;
    this._twoFactorSecret = undefined;
    this._updatedAt = new Date();
  }

  recordLogin(): void {
    this._lastLoginAt = new Date();
    this._updatedAt = new Date();
  }

  delete(): void {
    this._deletedAt = new Date();
    this._updatedAt = new Date();
  }

  // Getters
  get id(): UserId { return this._id; }
  get username(): Username { return this._username; }
  get email(): Email { return this._email; }
  get passwordHash(): PasswordHash { return this._passwordHash; }
  get role(): Role { return this._role; }
  get isActive(): boolean { return !this._deletedAt; }
  get twoFactorEnabled(): boolean { return this._twoFactorEnabled; }
  get twoFactorSecret(): string | undefined { return this._twoFactorSecret; }
  get createdAt(): Date { return this._createdAt; }
  get updatedAt(): Date { return this._updatedAt; }
  get lastLoginAt(): Date | undefined { return this._lastLoginAt; }
  get deletedAt(): Date | undefined { return this._deletedAt; }
}

export class UserCreationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserCreationError';
  }
}

export class PasswordChangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PasswordChangeError';
  }
}