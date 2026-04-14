import 'express-session';

declare global {
  namespace Express {
    interface SessionData {
      csrfToken?: string;
    }
  }
}

export {};