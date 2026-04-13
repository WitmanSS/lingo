import { OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';
export interface LevelThreshold {
    level: number;
    name: string;
    xpRequired: number;
    iconUrl: string | null;
}
export declare class LevelService implements OnModuleInit {
    private prisma;
    private levels;
    constructor(prisma: PrismaService);
    onModuleInit(): Promise<void>;
    refreshLevels(): Promise<void>;
    getAllLevels(): LevelThreshold[];
    calculateLevelForXp(xp: number): LevelThreshold;
}
