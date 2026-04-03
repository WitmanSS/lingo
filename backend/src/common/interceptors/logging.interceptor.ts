import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';
    const startTime = Date.now();

    return next.handle().pipe(
      tap((response) => {
        const { statusCode } = context.switchToHttp().getResponse();
        const duration = Date.now() - startTime;

        this.logger.log(
          `${method} ${url} ${statusCode} - ${duration}ms - IP: ${ip} - UA: ${userAgent}`,
        );
      }),
    );
  }
}
