"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../core/database/prisma.service");
const user_1 = require("../../../domain/entities/user");
let PrismaUserRepository = class PrismaUserRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async save(user) {
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
    async findById(id) {
        const userData = await this.prisma.user.findUnique({
            where: { id: id.toString() },
        });
        if (!userData)
            return null;
        const userResult = user_1.User.fromPersistence({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            passwordHash: userData.passwordHash,
            role: userData.role,
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
    async findByEmail(email) {
        const userData = await this.prisma.user.findUnique({
            where: { email: email.toString() },
        });
        if (!userData)
            return null;
        const userResult = user_1.User.fromPersistence({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            passwordHash: userData.passwordHash,
            role: userData.role,
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
    async findByUsername(username) {
        const userData = await this.prisma.user.findUnique({
            where: { username: username.toString() },
        });
        if (!userData)
            return null;
        const userResult = user_1.User.fromPersistence({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            passwordHash: userData.passwordHash,
            role: userData.role,
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
    async update(user) {
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
    async delete(id) {
        await this.prisma.user.update({
            where: { id: id.toString() },
            data: { deletedAt: new Date() },
        });
    }
    async exists(id) {
        const count = await this.prisma.user.count({
            where: { id: id.toString(), deletedAt: null },
        });
        return count > 0;
    }
    async findMany(options) {
        const where = {};
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
        const users = [];
        for (const data of userData) {
            const userResult = user_1.User.fromPersistence({
                id: data.id,
                username: data.username,
                email: data.email,
                passwordHash: data.passwordHash,
                role: data.role,
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
    async count(options) {
        const where = {};
        if (options?.where?.role) {
            where.role = options.where.role;
        }
        if (options?.where?.isActive !== undefined) {
            where.deletedAt = options.where.isActive ? null : { not: null };
        }
        return this.prisma.user.count({ where });
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map