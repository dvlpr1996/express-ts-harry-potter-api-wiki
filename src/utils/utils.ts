import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { PAGINATION_TAKE_NUMBER } from '../config/constant';

export const paramValidation = (req: Request, res: Response): boolean => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array().map((err) => ({ message: err.msg })),
    });
    return false;
  }
  return true;
};

export const pagination = (totalItems: number, currentPage: number) => {
  const totalPages = Math.ceil(totalItems / PAGINATION_TAKE_NUMBER);
  return {
    pages: totalPages,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
};
