import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import { ValidateError } from '@tsoa/runtime';
import logger from '../config/logger';

export function RegisterErrorMiddleware(app: express.Router) {
  app.use(function ErrorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction
  ): ExResponse | void {
    if (err instanceof ValidateError) {
      logger.warn(`Caught Validation Error for ${req.path}: ${JSON.stringify(err.fields)}`);
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields
      });
    }
    if (err instanceof Error) {
      logger.error(`${err.name} ${err.message}`);
      return res.status(500).json({
        message: 'Internal Server Error'
      });
    }

    next();
  });
}
