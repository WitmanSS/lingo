import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/database/prisma.service';
import { User } from '../../../domain/entities/user';
import { UserRepository } from '../../../domain/repositories/user-repository';
import { UserId } from '../../../domain/value-objects/user-id';
import { Email } from '../../../domain/value-objects/email';
import { Username } from '../../../domain/value-objects/username';
import { Role } from '../../../domain/entities/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: user.id.toString(),
        username: user.username.toString(),
        email: user.email.toString(),
        passwordHash: user.passwordHash.toString(),
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled,
        twoFactorSecret: user.twoFactorSecret,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
        deletedAt: user.deletedAt,
      },
    });
  }

  async findById(id: UserId): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { id: id.toString() },
    });

    if (!userData) return null;

    const userResult = User.fromPersistence({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      passwordHash: userData.passwordHash,
      role: userData.role as Role,
      twoFactorEnabled: userData.twoFactorEnabled,
      twoFactorSecret: userData.twoFactorSecret || undefined,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      lastLoginAt: userData.lastLoginAt || undefined,
      deletedAt: userData.deletedAt || undefined,
    });

    const user = userResult.value;
    return user || null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email: email.toString() },
    });

    if (!userData) return null;

    const userResult = User.fromPersistence({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      passwordHash: userData.passwordHash,
      role: userData.role as Role,
      twoFactorEnabled: userData.twoFactorEnabled,
      twoFactorSecret: userData.twoFactorSecret || undefined,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      lastLoginAt: userData.lastLoginAt || undefined,
      deletedAt: userData.deletedAt || undefined,
    });

    const user = userResult.value;
    return user || null;
  }

  async findByUsername(username: Username): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { username: username.toString() },
    });

    if (!userData) return null;

    const userResult = User.fromPersistence({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      passwordHash: userData.passwordHash,
      role: userData.role as Role,
      twoFactorEnabled: userData.twoFactorEnabled,
      twoFactorSecret: userData.twoFactorSecret || undefined,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt,
      lastLoginAt: userData.lastLoginAt || undefined,
      deletedAt: userData.deletedAt || undefined,
    });

    const user = userResult.value;
    return user || null;
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id.toString() },
      data: {
        username: user.username.toString(),
        email: user.email.toString(),
        passwordHash: user.passwordHash.toString(),
        role: user.role,
        twoFactorEnabled: user.twoFactorEnabled,
        twoFactorSecret: user.twoFactorSecret,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
        deletedAt: user.deletedAt,
      },
    });
  }

  async delete(id: UserId): Promise<void> {
    await this.prisma.user.update({
      where: { id: id.toString() },
      data: { deletedAt: new Date() },
    });
  }

  async exists(id: UserId): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { id: id.toString(), deletedAt: null },
    });
    return count > 0;
  }

  async findMany(options: {
    skip?: number;
    take?: number;
    where?: {
      role?: string;
      isActive?: boolean;
      emailContains?: string;
    };
  }): Promise<User[]> {
    const where: any = {};

    if (options.where?.role) {
      where.role = options.where.role;
    }

    if (options.where?.isActive !== undefined) {
      where.deletedAt = options.where.isActive ? null : { not: null };
    }

    if (options.where?.emailContains) {
      where.email = { contains: options.where.emailContains };
    }

    const userData = await this.prisma.user.findMany({
      where,
      skip: options.skip,
      take: options.take,
      orderBy: { createdAt: 'desc' },
    });

    const users: User[] = [];
    for (const data of userData) {
      const userResult = User.fromPersistence({
        id: data.id,
        username: data.username,
        email: data.email,
        passwordHash: data.passwordHash,
        role: data.role as Role,
        twoFactorEnabled: data.twoFactorEnabled,
        twoFactorSecret: data.twoFactorSecret || undefined,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        lastLoginAt: data.lastLoginAt || undefined,
        deletedAt: data.deletedAt || undefined,
      });

      if (userResult.isOk()) {
        const user = userResult.value;
        if (user) {
          users.push(user);
        }
      }
    }

    return users;
  }

  async count(options?: {
    where?: {
      role?: string;
      isActive?: boolean;
    };
  }): Promise<number> {
    const where: any = {};

    if (options?.where?.role) {
      where.role = options.where.role;
    }

    if (options?.where?.isActive !== undefined) {
      where.deletedAt = options.where.isActive ? null : { not: null };
    }

    return this.prisma.user.count({ where });
  }
}