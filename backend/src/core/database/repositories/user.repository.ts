import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IUser } from '../../../shared/interfaces/models.interface';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  private mapToInterface(user: any): IUser {
    return {
      ...user,
      avatarUrl: user.avatarUrl || undefined,
      bio: user.bio || undefined,
      deletedAt: user.deletedAt || undefined,
    };
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? this.mapToInterface(user) : null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    return user ? this.mapToInterface(user) : null;
  }

  async findByUsername(username: string): Promise<IUser | null> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });
    return user ? this.mapToInterface(user) : null;
  }

  async findAll(
    skip: number = 0,
    take: number = 10,
  ): Promise<{ data: IUser[]; total: number }> {
    const [data, total] = await Promise.all([
      this.prisma.user.findMany({ skip, take }),
      this.prisma.user.count(),
    ]);

    return { data: data.map(this.mapToInterface), total };
  }

  async create(data: {
    username: string;
    email: string;
    passwordHash: string;
  }): Promise<IUser> {
    const user = await this.prisma.user.create({
      data: {
        ...data,
        role: 'USER',
      },
    });
    return this.mapToInterface(user);
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.mapToInterface(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
