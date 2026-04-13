import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SecurityAuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger('SecurityAudit');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, ip } = req;
    const userRole = req.user?.role || 'ANONYMOUS';

    this.logger.warn(`[AUDIT] ${method} ${url} accessed by IP: ${ip} [Role: ${userRole}]`);

    // In a real env, we can execute Rate Limiting or specific IP assertions per Admin Account right here.
    return next.handle().pipe(
      tap(() => {
        if (['POST', 'PUT', 'DELETE'].includes(method)) {
             this.logger.log(`[AUDIT] ${method} Action executed on ${url} successfully.`);
        }
      })
    );
  }
}
