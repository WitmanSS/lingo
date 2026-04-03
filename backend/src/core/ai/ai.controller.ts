import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AIService } from './ai.service';
import { JwtGuard } from '../../common/guards/jwt.guard';

@Controller('api/v1/ai')
@UseGuards(JwtGuard)
export class AIController {
  constructor(private readonly aiService: AIService) {}

  @Post('generate-story')
  async generateStory(
    @Body() body: { title: string; level: string; prompt: string; wordCount?: number },
  ) {
    if (!body.title || !body.level || !body.prompt) {
      throw new BadRequestException('Missing required fields: title, level, prompt');
    }

    const story = await this.aiService.generateStory({
      title: body.title,
      level: body.level,
      prompt: body.prompt,
      wordCount: body.wordCount,
    });

    return {
      success: true,
      data: story,
      message: 'Story generated successfully',
    };
  }

  @Post('generate-vocabulary')
  async generateVocabulary(
    @Body() body: { word: string; level: string },
  ) {
    if (!body.word || !body.level) {
      throw new BadRequestException('Missing required fields: word, level');
    }

    const vocabulary = await this.aiService.generateVocabulary({
      word: body.word,
      level: body.level,
    });

    return {
      success: true,
      data: vocabulary,
      message: 'Vocabulary generated successfully',
    };
  }

  @Post('generate-quizzes')
  async generateQuizzes(
    @Body() body: { storyId: string; questionCount?: number },
  ) {
    if (!body.storyId) {
      throw new BadRequestException('Missing required field: storyId');
    }

    const quizzes = await this.aiService.generateQuizzes(
      body.storyId,
      body.questionCount,
    );

    return {
      success: true,
      data: quizzes,
      message: 'Quizzes generated successfully',
    };
  }

  @Post('improve-story')
  async improveStory(
    @Body() body: { storyId: string; feedback: string },
  ) {
    if (!body.storyId || !body.feedback) {
      throw new BadRequestException('Missing required fields: storyId, feedback');
    }

    const result = await this.aiService.improveStoryContent(
      body.storyId,
      body.feedback,
    );

    return {
      success: true,
      data: result,
      message: 'Story improvement requested',
    };
  }

  @Get('status')
  getStatus() {
    return {
      status: 'AI service is running',
      models: ['GPT-3.5', 'GPT-4'],
    };
  }
}
