import { PrismaService } from '../../../core/database/prisma.service';
import { User } from '../../../domain/entities/user';
import { UserRepository } from '../../../domain/repositories/user-repository';
import { UserId } from '../../../domain/value-objects/user-id';
import { Email } from '../../../domain/value-objects/email';
import { Username } from '../../../domain/value-objects/username';
export declare class PrismaUserRepository implements UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
