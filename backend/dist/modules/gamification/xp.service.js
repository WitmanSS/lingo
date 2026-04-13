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
var XpService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.XpService = exports.XP_AWARDS = exports.XpReason = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../core/database/prisma.service");
const level_service_1 = require("./level.service");
const xp_validation_service_1 = require("./xp-validation.service");
var XpReason;
(function (XpReason) {
    XpReason["READ_STORY"] = "READ_STORY";
    XpReason["WRITE_STORY"] = "WRITE_STORY";
    XpReason["DAILY_STREAK"] = "DAILY_STREAK";
    XpReason["WEEKLY_STREAK"] = "WEEKLY_STREAK";
    XpReason["STORY_APPROVED"] = "STORY_APPROVED";
    XpReason["VOCABULARY_LEARNED"] = "VOCABULARY_LEARNED";
    XpReason["COMMENT_ADDED"] = "COMMENT_ADDED";
    XpReason["STORY_LIKED"] = "STORY_LIKED";
})(XpReason || (exports.XpReason = XpReason = {}));
exports.XP_AWARDS = {
    [XpReason.READ_STORY]: 40,
    [XpReason.WRITE_STORY]: 120,
    [XpReason.DAILY_STREAK]: 25,
    [XpReason.WEEKLY_STREAK]: 150,
    [XpReason.STORY_APPROVED]: 50,
    [XpReason.VOCABULARY_LEARNED]: 15,
    [XpReason.COMMENT_ADDED]: 5,
    [XpReason.STORY_LIKED]: 2,
};
let XpService = XpService_1 = class XpService {
    prisma;
    levelService;
    xpValidator;
    logger = new common_1.Logger(XpService_1.name);
    constructor(prisma, levelService, xpValidator) {
        this.prisma = prisma;
        this.levelService = levelService;
        this.xpValidator = xpValidator;
    }
    async grantXp(userId, reason, customAmount, contextId) {
        const amount = customAmount ?? exports.XP_AWARDS[reason];
        if (!amount || amount <= 0)
            return;
        const canGrant = await this.xpValidator.canGrantXp(userId, reason, amount, contextId);
        if (!canGrant) {
            this.logger.debug(`XP grant blocked for user ${userId} (Reason: ${reason}) - AntiSpam limit hit.`);
            return null;
        }
        return this.prisma.$transaction(async (tx) => {
            await tx.xpLog.create({
                data: { userId, amount, reason },
            });
            const user = await tx.user.findUnique({
                where: { id: userId },
                select: { xp: true, level: true },
            });
            if (!user)
                return null;
            const newXp = user.xp + amount;
            const calculatedTier = this.levelService.calculateLevelForXp(newXp);
            const updatedUser = await tx.user.update({
                where: { id: userId },
                data: {
                    xp: newXp,
                    level: calculatedTier.level,
                },
            });
            if (calculatedTier.level > user.level) {
                this.logger.log(`User ${userId} leveled up to ${calculatedTier.level} (${calculatedTier.name})`);
            }
            return updatedUser;
        });
    }
};
exports.XpService = XpService;
exports.XpService = XpService = XpService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        level_service_1.LevelService,
        xp_validation_service_1.XpValidationService])
], XpService);
//# sourceMappingURL=xp.service.js.map