import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HealthCheckResult } from '@nestjs/terminus';
import { PrismaService } from '../database/prisma.service';
import { Public } from '../../common/decorators/public.decorator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private prisma: PrismaService,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  async check(): Promise<HealthCheckResult> {
    return this.health.check([
      // Database check
      async () => {
        try {
          await this.prisma.$queryRaw`SELECT 1`;
          return { database: { status: 'up' } };
        } catch {
          return { database: { status: 'down' } };
        }
      },
      // Memory check
      async () => {
        const memUsage = process.memoryUsage();
        const heapUsedMB = Math.round(memUsage.heapUsed / 1024 / 1024);
        return {
          memory: {
            status: heapUsedMB < 512 ? 'up' : 'down',
            heapUsedMB,
            rssUsedMB: Math.round(memUsage.rss / 1024 / 1024),
          },
        };
      },
      // Uptime check
      async () => ({
        uptime: {
          status: 'up',
          uptimeSeconds: Math.round(process.uptime()),
        },
      }),
    ]);
  }
}
