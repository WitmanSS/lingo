import { Controller, Get, Put, Body, Param, Query, UseGuards, Delete } from '@nestjs/common';
import { AdminStoriesService } from './admin-stories.service';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('admin/stories')
@UseGuards(AdminGuard)
export class AdminStoriesController {
  constructor(private readonly storiesService: AdminStoriesService) {}

  @Get()
  getStories(@Query('q') q?: string, @Query('skip') skip?: string, @Query('take') take?: string) {
    return this.storiesService.searchStories(q, parseInt(skip || '0', 10), Math.min(100, parseInt(take || '50', 10)));
  }

  @Get('reports')
  getReports(@Query('skip') skip?: string, @Query('take') take?: string) {
    return this.storiesService.getReportedStories(parseInt(skip || '0', 10), Math.min(100, parseInt(take || '50', 10)));
  }

  @Put(':id/publish')
  setPublishStatus(@Param('id') storyId: string, @Body('published') published: boolean) {
    return this.storiesService.setPublishStatus(storyId, published);
  }

  @Put('reports/:id/dismiss')
  dismissReport(@Param('id') reportId: string) {
    return this.storiesService.dismissReport(reportId);
  }
}
