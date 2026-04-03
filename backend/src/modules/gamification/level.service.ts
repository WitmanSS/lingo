import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

export interface LevelThreshold {
  level: number;
  name: string;
  xpRequired: number;
  iconUrl: string | null;
}

@Injectable()
export class LevelService implements OnModuleInit {
  private levels: LevelThreshold[] = [];

  constructor(private prisma: PrismaService) {}

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

  /**
   * Determine the user's level based on XP
   */
  calculateLevelForXp(xp: number): LevelThreshold {
    // Find the highest level where xp >= xpRequired
    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (xp >= this.levels[i].xpRequired) {
        return this.levels[i];
      }
    }
    // Fallback to lowest possible level if somehow below level 1
    return this.levels[0] || { level: 1, name: 'Beginner', xpRequired: 0, iconUrl: null };
  }
}
