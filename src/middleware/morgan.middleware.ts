import express from 'express';
import { morganMdw } from '../config/morgan';

export function RegisterMorganMiddleware(app: express.Router) {
  app.use(morganMdw);
}
