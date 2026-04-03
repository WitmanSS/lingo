import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    // Extract validation errors if present
    let validationErrors: string[] | undefined;
    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const resp = exceptionResponse as Record<string, unknown>;
        if (Array.isArray(resp.message)) {
          validationErrors = resp.message as string[];
        }
      }
    }

    const errorResponse = {
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: validationErrors ? 'Validation failed' : message,
      ...(validationErrors && { errors: validationErrors }),
      ...(process.env.NODE_ENV === 'development' && {
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    };

    // Log server errors
    if (status >= 500) {
      this.logger.error(
        `${request.method} ${request.url} ${status} - ${message}`,
        exception instanceof Error ? exception.stack : undefined,
      );
    } else if (status >= 400) {
      this.logger.warn(`${request.method} ${request.url} ${status} - ${message}`);
    }

    response.status(status).json(errorResponse);
  }
}
