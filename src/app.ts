import express, { Application, Request, Response, NextFunction } from 'express';
import notFoundErrorHandler from './middlewares/notFoundErrorHandler';
import globalErrorHandler from './middlewares/globalErrorHandler';
import rateLimitConfig from './config/rateLimitConfig';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import wikiRouter from './routes/wikiRouter';
import { checkEnvVars } from './middlewares/checkEnvVars';
import ApiError from './errors/apiError';
import homeRouter from './routes/homeRouter';

const app: Application = express();

app.use(checkEnvVars);

app.use(compression());

app.use(timeout('20s'));
app.use((req, _res, next) => {
  if (!req.timedout) next();
});

// Parse incoming request bodies in a middleware before your handlers
app.use(
  bodyParser.json({
    inflate: true,
    limit: '1KB',
    strict: true,
    type: 'application/json',
  })
);

app.use(
  bodyParser.urlencoded({
    inflate: true,
    extended: false,
    limit: '1KB',
    parameterLimit: 1,
    type: 'application/x-www-form-urlencoded',
  })
);

app.use(helmet());

app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    frameguard: { action: 'deny' },
    hidePoweredBy: true,
    ieNoOpen: true,
    noSniff: true,
    dnsPrefetchControl: { allow: false },
    referrerPolicy: { policy: 'no-referrer' },
    permissionsPolicy: {
      features: {
        accelerometer: ["'none'"],
        camera: ["'none'"],
        geolocation: ["'none'"],
        microphone: ["'none'"],
        payment: ["'none'"],
        usb: ["'none'"],
        fullscreen: ["'none'"],
        vibrate: ["'none'"],
      },
    },
  })
);

app.use(helmet.crossOriginEmbedderPolicy({ policy: 'require-corp' }));
app.use(helmet.crossOriginResourcePolicy({ policy: 'same-origin' }));

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: ["'none'"],
      styleSrc: ["'none'"],
      imgSrc: ["'none'"],
      connectSrc: ["'none'"],
      fontSrc: ["'none'"],
      objectSrc: ["'none'"],
      frameAncestors: ["'none'"],
      scriptSrcAttr: ["'none'"],
      scriptSrcElem: ["'none'"],
    },
  })
);

app.use(hpp());

app.use(rateLimitConfig);

app.use('/api/v1', wikiRouter);
app.use('/api/v1', homeRouter);

app.all('*', (req: Request, _res: Response, _next: NextFunction) => {
  throw new ApiError(`The Route '${req.originalUrl}' Does Not Exist`, 404, [], 'NOT_FOUND');
});

app.use(notFoundErrorHandler);
app.use(globalErrorHandler);

export default app;
