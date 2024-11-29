import { Request, Response, NextFunction } from 'express';

const notFoundErrorHandling = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 'error',
    message: 'Error 404: Not Found',
  });
};

export default notFoundErrorHandling;
