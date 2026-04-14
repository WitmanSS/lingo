import { User } from '../entities/user';
import { UserId } from '../value-objects/user-id';
import { Email } from '../value-objects/email';
import { Username } from '../value-objects/username';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  findByUsername(username: Username): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
  exists(id: UserId): Promise<boolean>;
  findMany(options: {
    skip?: number;
    take?: number;
    where?: {
      role?: string;
      isActive?: boolean;
      emailContains?: string;
    };
  }): Promise<User[]>;
  count(options?: {
    where?: {
      role?: string;
      isActive?: boolean;
    };
  }): Promise<number>;
}