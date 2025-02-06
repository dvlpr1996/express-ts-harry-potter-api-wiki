import 'dotenv/config';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../libs/types/types';

const globalErrorHandler = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Details:', { name: err.name, stack: err.stack });
  }

  // set default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let code = err.code || null;

  // Handle operational errors differently
  if (err.isOperational) {
    // For operational errors, send a detailed response
    const errors = err.errors || [];

    res.status(statusCode).json({
      success: false,
      message,
      errors: Array.isArray(errors) ? errors : [errors],
      ...(code !== null && { code: err.code }),
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        timestamp: new Date().toISOString(),
      }),
    });
  } else {
    console.error('Non-operational error:', err);
    
    res.status(statusCode).json({
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
      ...(process.env.NODE_ENV === 'development' && {
        stack: err.stack,
        timestamp: new Date().toISOString(),
      }),
    });
  }
};

export default globalErrorHandler;