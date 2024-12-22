import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';

const requiredEnvVars = [
  'APP_NAME',
  'APP_PORT',
  'NODE_ENV',
  'DATABASE_URL',
  'RATE_LIMIT_WINDOW_MS',
  'RATE_LIMIT_MAX_REQUESTS',
];

export const checkEnvVars = (_req: Request, _res: Response, next: NextFunction) => {
  const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
  if (missingEnvVars.length > 0) {
    throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
  }

  next();
};
