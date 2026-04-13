import { PrismaService } from '../prisma.service';
import { IUser } from '../../../shared/interfaces/models.interface';
export declare class UserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    private mapToInterface;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findByUsername(username: string): Promise<IUser | null>;
    findAll(skip?: number, take?: number): Promise<{
        data: IUser[];
        total: number;
    }>;
    create(data: {
        username: string;
        email: string;
        passwordHash: string;
    }): Promise<IUser>;
    update(id: string, data: Partial<IUser>): Promise<IUser>;
    delete(id: string): Promise<void>;
    hardDelete(id: string): Promise<void>;
}
