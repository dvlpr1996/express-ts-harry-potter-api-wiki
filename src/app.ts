import express, { Application, Request, Response, NextFunction } from 'express';
import notFoundErrorHandling from './middlewares/notFoundErrorHandling';
import globalErrorHandling from './middlewares/globalErrorHandling';
import rateLimitConfig from './config/rateLimitConfig';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import compression from 'compression';
import helmet from 'helmet';
import wikiRouter from './routes/wikiRouter';

// todo :: mw => check the env file.
// todo :: helmet configs.
// todo :: hpp mw.

const app: Application = express();

app.use(timeout('20s'));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

app.use(compression());

app.use(helmet());

app.use(
  bodyParser.json({
    inflate: true,
    limit: '2KB',
    strict: true,
    type: 'application/json',
  })
);

app.use(
  bodyParser.urlencoded({
    inflate: true,
    extended: false,
    limit: '2KB',
    parameterLimit: 1,
    type: 'application/x-www-form-urlencoded',
  })
);

app.use(rateLimitConfig);

app.use('/api/v1', wikiRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  throw new Error(`The Route '${req.originalUrl}' Does Not Exists`);
});

app.use(notFoundErrorHandling);
app.use(globalErrorHandling);

export default app;
