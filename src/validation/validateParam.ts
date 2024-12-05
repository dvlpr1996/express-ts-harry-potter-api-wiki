import { param, query } from 'express-validator';

export const validateBookIdParam = [
  param('bookId')
    .isInt({ min: 1, max: 7 })
    .withMessage('ID must be a positive integer')
    .trim()
    .escape()
    .toInt(),
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

export const validateCharacterIdParam = [
  param('characterId')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer')
    .trim()
    .escape()
    .toInt(),
];

export const validateCharacterSlugParam = [
  param('characterSlug')
    .isSlug()
    .withMessage('slug is not valid')
    .isLength({ min: 1, max: 128 })
    .withMessage('Slug cannot be empty')
    .trim()
    .escape(),
];

export const validateCharacterPageQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page must be a positive integer')
    .trim()
    .escape()
    .toInt(),
];
