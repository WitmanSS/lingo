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
exports.AdminUsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let AdminUsersService = class AdminUsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchUsers(query, skip = 0, take = 50) {
        const where = query ? {
            OR: [
                { username: { contains: query, mode: 'insensitive' } },
                { email: { contains: query, mode: 'insensitive' } }
            ]
        } : {};
        const [users, total] = await Promise.all([
            this.prisma.user.findMany({
                where, skip, take,
                select: { id: true, username: true, email: true, role: true, xp: true, level: true, createdAt: true, deletedAt: true }
            }),
            this.prisma.user.count({ where })
        ]);
        return { data: users, total };
    }
    async getUserDetails(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                xpLogs: { orderBy: { createdAt: 'desc' }, take: 20 },
                warnings: { orderBy: { createdAt: 'desc' } },
                blocks: { orderBy: { createdAt: 'desc' } },
                stories: { orderBy: { createdAt: 'desc' }, take: 10, select: { id: true, title: true, published: true, createdAt: true } },
            }
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async blockUser(adminId, userId, reason) {
        return this.prisma.$transaction(async (tx) => {
            await tx.userBlock.create({
                data: { userId, adminId, reason }
            });
            return tx.user.update({
                where: { id: userId },
                data: { deletedAt: new Date() }
            });
        });
    }
    async warnUser(adminId, userId, reason) {
        return this.prisma.userWarning.create({
            data: { userId, adminId, reason }
        });
    }
};
exports.AdminUsersService = AdminUsersService;
exports.AdminUsersService = AdminUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminUsersService);
//# sourceMappingURL=admin-users.service.js.map