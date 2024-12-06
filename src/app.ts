import express, { Application, Request, Response, NextFunction } from 'express';
import notFoundErrorHandling from './middlewares/notFoundErrorHandling';
import globalErrorHandling from './middlewares/globalErrorHandling';
import rateLimitConfig from './config/rateLimitConfig';
import bodyParser from 'body-parser';
import timeout from 'connect-timeout';
import compression from 'compression';
import helmet from 'helmet';
import hpp from 'hpp';
import wikiRouter from './routes/wikiRouter';

// todo :: add env mw
const app: Application = express();

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
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: { policy: 'same-origin' },
    crossOriginResourcePolicy: { policy: 'same-origin' },
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
      defaultSrc: ["'self'"], // Allow content only from the same origin
      scriptSrc: ["'self'"], // Allow scripts only from the same origin
      styleSrc: ["'self'", 'https:'], // Allow styles from the same origin and HTTPS
      imgSrc: ["'self'", 'data:', 'https:'], // Allow images from the same origin, data URIs, and HTTPS
      connectSrc: ["'self'"], // Restrict connections (e.g., XHR, WebSocket)
      fontSrc: ["'self'", 'https:'], // Allow fonts from the same origin and HTTPS
      objectSrc: ["'none'"], // Disallow plugins like Flash
      frameAncestors: ["'none'"], // Prevent this site from being framed
      // Automatically upgrade HTTP requests to HTTPS
      upgradeInsecureRequests: [], // Automatically upgrade HTTP to HTTPS
      scriptSrcAttr: ["'none'"],
      scriptSrcElem: ["'self'"],
    },
  })
);

app.use(hpp());

app.use(rateLimitConfig);

app.use('/api/v1', wikiRouter);
app.all('*', (req: Request, _res: Response, _next: NextFunction) => {
  throw new Error(`The Route '${req.originalUrl}' Does Not Exists`);
});

app.use(notFoundErrorHandling);
app.use(globalErrorHandling);

export default app;
