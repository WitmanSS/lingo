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
exports.LevelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
let LevelService = class LevelService {
    prisma;
    levels = [];
    constructor(prisma) {
        this.prisma = prisma;
    }
    async onModuleInit() {
        await this.refreshLevels();
    }
    async refreshLevels() {
        const rawLevels = await this.prisma.levelTable.findMany({
            orderBy: { level: 'asc' },
        });
        this.levels = rawLevels.map(l => ({
            level: l.level,
            name: l.name,
            xpRequired: l.xpRequired,
            iconUrl: l.iconUrl,
        }));
    }
    getAllLevels() {
        return this.levels;
    }
    calculateLevelForXp(xp) {
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (xp >= this.levels[i].xpRequired) {
                return this.levels[i];
            }
        }
        return this.levels[0] || { level: 1, name: 'Beginner', xpRequired: 0, iconUrl: null };
    }
};
exports.LevelService = LevelService;
exports.LevelService = LevelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LevelService);
//# sourceMappingURL=level.service.js.map