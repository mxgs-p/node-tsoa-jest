import express, { Response as ExResponse, Request as ExRequest, Application } from 'express';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import { RegisterRoutes } from './generated/routes';
import { RegisterErrorMiddleware } from './middleware/err.middleware';
import { RegisterRouteUnknownMiddleware } from './middleware/routeunknown.middleware';
import { RegisterMorganMiddleware } from './middleware/morgan.middleware';

export const app: Application = express();

RegisterErrorMiddleware(app);
RegisterMorganMiddleware(app);
RegisterRouteUnknownMiddleware(app);

// Use body parser to read sent json payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use swagger docs
app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('./generated/swagger.json')));
});

RegisterRoutes(app);
