import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as crypto from 'crypto';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Generate CSRF token if not exists
    const session = req.session as any;
    if (!session.csrfToken) {
      session.csrfToken = crypto.randomBytes(32).toString('hex');
    }

    // Add token to response locals for templates
    res.locals.csrfToken = session.csrfToken;

    // For API requests, check CSRF token
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
      const token = req.headers['x-csrf-token'] || req.body._csrf;

      if (!token || token !== session.csrfToken) {
        return res.status(403).json({
          success: false,
          message: 'CSRF token validation failed'
        });
      }
    }

    next();
  }
}