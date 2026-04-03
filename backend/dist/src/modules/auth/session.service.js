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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let SessionService = class SessionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSession(userId, deviceId, ipAddress) {
        return this.prisma.session.create({
            data: {
                userId,
                deviceId,
                token: this.generateToken(),
                ipAddress,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
        });
    }
    async getSession(sessionId) {
        return this.prisma.session.findUnique({
            where: { id: sessionId },
        });
    }
    async deleteSessions(userId) {
        await this.prisma.session.deleteMany({
            where: { userId },
        });
    }
    async deleteSession(sessionId) {
        await this.prisma.session.delete({
            where: { id: sessionId },
        });
    }
    generateToken() {
        return Math.random().toString(36).substr(2) + Date.now().toString(36);
    }
};
exports.SessionService = SessionService;
exports.SessionService = SessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SessionService);
//# sourceMappingURL=session.service.js.map