import express, { Response as ExResponse, NextFunction } from 'express';
import logger from '../config/logger';

export function RegisterRouteUnknownMiddleware(app: express.Router) {
  app.use(function notFoundHandler(_req, res: ExResponse, next: NextFunction) {
    if (res.statusCode == 404) {
      logger.warn(`Unknown route ${_req.path}`);
      res.status(404).send({
        message: 'Not Found'
      });
    }
    next();
  });
}
