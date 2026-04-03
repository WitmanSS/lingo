import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../core/database/prisma.service';

@Injectable()
export class AdminStoriesService {
  constructor(private prisma: PrismaService) {}

  async searchStories(query?: string, skip = 0, take = 50) {
    const where = query ? {
      title: { contains: query, mode: 'insensitive' as const }
    } : {};

    const [stories, total] = await Promise.all([
      this.prisma.story.findMany({
        where, skip, take,
        include: { author: { select: { username: true } }, _count: { select: { storyReports: true } } },
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.story.count({ where })
    ]);

    return { data: stories, total };
  }

  async getReportedStories(skip = 0, take = 50) {
    const [reports, total] = await Promise.all([
      this.prisma.storyReport.findMany({
        skip, take,
        where: { status: 'PENDING' },
        include: { story: { select: { title: true, slug: true } }, reporter: { select: { username: true } } },
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.storyReport.count({ where: { status: 'PENDING' } })
    ]);

    return { data: reports, total };
  }

  async setPublishStatus(storyId: string, published: boolean) {
    return this.prisma.story.update({
      where: { id: storyId },
      data: { published }
    });
  }

  async dismissReport(reportId: string) {
    return this.prisma.storyReport.update({
      where: { id: reportId },
      data: { status: 'DISMISSED' }
    });
  }
}
