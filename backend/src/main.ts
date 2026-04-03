import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  // ─── Security ─────────────────────────────────────
  app.use(helmet());
  app.enableCors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Correlation-ID'],
  });

  // ─── API Versioning ───────────────────────────────
  app.setGlobalPrefix('api/v1', {
    exclude: ['health'],
  });

  // ─── Global Validation Pipe ───────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ─── Swagger API Documentation ────────────────────
  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('LinguaRead API')
      .setDescription('Multilingual English reading platform API')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth', 'Authentication endpoints')
      .addTag('users', 'User management')
      .addTag('stories', 'Story management')
      .addTag('vocabulary', 'Vocabulary management')
      .addTag('gamification', 'Gamification system')
      .addTag('admin', 'Admin panel')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
    });

    logger.log('📚 Swagger docs available at /api/docs');
  }

  // ─── Start Server ─────────────────────────────────
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`🚀 LinguaRead API running on http://localhost:${port}`);
  logger.log(`📋 API prefix: /api/v1`);
  logger.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}

bootstrap();
