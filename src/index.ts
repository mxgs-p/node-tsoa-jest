import 'module-alias/register';
import './config/environment';
import { app } from './app';
import logger from './config/logger';

const port = process.env.PORT;

export const server = app.listen(port, () =>
  logger.debug(`App listening at http://localhost:${port}`)
);
