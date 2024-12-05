import { Request, Response } from "express";
import { validationResult } from "express-validator";

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