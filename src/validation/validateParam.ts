import { param } from 'express-validator';

export const validateBookIdParam = [
  param('bookId').isInt({ min: 1, max: 7 }).withMessage('ID must be a positive integer').trim().escape().toInt(),
];

export const validateBookSlugParam = [
  param('bookSlug')
    .isSlug()
    .withMessage('slug is not valid')
    .isLength({ min: 1, max: 128 })
    .withMessage('Slug cannot be empty')
    .trim()
    .escape(),
];
