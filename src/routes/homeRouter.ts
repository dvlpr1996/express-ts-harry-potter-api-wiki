import express, { Request, Response } from 'express';

const homeRouter = express.Router();

const HOST_NAME = process.env.APP_HOST || "localhost";
const APP_PORT = process.env.APP_PORT || 8000
const BASE_URL = `http://${HOST_NAME}:${APP_PORT}/api/v1`;

// Home route
homeRouter.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Express Harry Potter Restful API',
    data: [
      `${BASE_URL}/books`,
      `${BASE_URL}/books/:bookId([1-7])`,
      `${BASE_URL}/books/:slug([a-zA-Z-]+)`,

      `${BASE_URL}/characters`,
      `${BASE_URL}/characters/:id([\\d]+)`,
      `${BASE_URL}/characters/:ids([\\d,]+)`,
      `${BASE_URL}/characters/:slug([a-zA-Z-]+)`,

      `${BASE_URL}/spells`,
      `${BASE_URL}/spells/:id([\\d]+)`,
      `${BASE_URL}/spells/:ids([\\d,]+)`,
      `${BASE_URL}/spells/:slug([a-zA-Z-]+)`,

      `${BASE_URL}/potions`,
      `${BASE_URL}/potions/:id([\\d]+)`,
      `${BASE_URL}/potions/:ids([\\d,]+)`,
      `${BASE_URL}/potions/:slug([a-zA-Z-]+)`,

      `${BASE_URL}/houses`,
      `${BASE_URL}/houses/:id([\\d]+)`,
      `${BASE_URL}/houses/:slug([a-zA-Z-]+)`,
      `${BASE_URL}/houses/:ids([\\d,]+)`,
      `${BASE_URL}/houses/:id([\\d]+)/features`,

      `${BASE_URL}/staffs`,
      `${BASE_URL}/staffs/:id([\\d]+)`,
      `${BASE_URL}/staffs/:ids([\\d,]+)`,
      `${BASE_URL}/staffs/:slug([a-zA-Z-]+)`,

      `${BASE_URL}/students`,
      `${BASE_URL}/students/:id([\\d]+)`,
      `${BASE_URL}/students/:ids([\\d,]+)`,
      `${BASE_URL}/students/:slug([a-zA-Z-]+)`,

      `${BASE_URL}/peoples`,
      `${BASE_URL}/peoples/:id([\\d]+)`,
      `${BASE_URL}/peoples/:ids([\\d,]+)`,
      `${BASE_URL}/peoples/:slug([a-zA-Z-]+)`,

      `${BASE_URL}/movies`,
      `${BASE_URL}/movies/:id(\\d+)`,
      `${BASE_URL}/movies/:ids(\\d+(,\\d+)*)`,
      `${BASE_URL}/movies/:slug`,
      `${BASE_URL}/movies/:id(\\d+)/stars`,
      `${BASE_URL}/movies/:id(\\d+)/producers`
    ]
  });
});

export default homeRouter;
