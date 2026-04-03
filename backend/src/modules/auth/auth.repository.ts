import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: { username: string; email: string; passwordHash: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { lastLoginAt: new Date() },
    });
  }

  async createSession(data: {
    userId: string;
    token: string;
    ipAddress?: string;
    userAgent?: string;
    deviceId?: string;
    expiresAt: Date;
  }) {
    return this.prisma.session.create({ data });
  }

  async findSessionByToken(token: string) {
    return this.prisma.session.findUnique({
      where: { token },
      include: { user: true },
    });
  }

  async invalidateUserSessions(userId: string): Promise<void> {
    await this.prisma.session.deleteMany({ where: { userId } });
  }

  async deleteSessions(userId: string): Promise<void> {
    await this.prisma.session.deleteMany({ where: { userId } });
  }
}
