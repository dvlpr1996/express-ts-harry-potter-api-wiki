// Express application setup (entry point)
import 'module-alias/register';
import express, { Application } from 'express';
// import userRoutes from './routes/userRoutes';

// Create an instance of Express
const app: Application = express();

app.use(express.json());


// app.use('/api/users', userRoutes);

export default app;
