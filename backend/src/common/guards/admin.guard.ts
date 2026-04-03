import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../../shared/constants/roles.constant';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    return user && (user.role === Role.ADMIN || user.role === Role.MODERATOR);
  }
}
