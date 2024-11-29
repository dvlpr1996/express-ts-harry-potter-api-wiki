// Express application setup (entry point)
// import 'module-alias/register';
import express, { Application, Request, Response, NextFunction } from 'express';
import notFoundErrorHandling from './middlewares/notFoundErrorHandling';
import globalErrorHandling from './middlewares/globalErrorHandling';
import rateLimitConfig from './config/rateLimitConfig';


// todo :: mw => check the env file

const app: Application = express();

app.use(express.json());

app.use(rateLimitConfig);


app.all('*', (req: Request, res: Response, next: NextFunction) => {
  throw new Error(`The Route '${req.originalUrl}' Does Not Exists`);
});

app.use(notFoundErrorHandling);
app.use(globalErrorHandling);

export default app;
