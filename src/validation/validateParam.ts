import { param, query } from 'express-validator';

export const validatePageQuery = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('page must be a positive integer')
    .trim()
    .escape()
    .toInt(),
];

export const validateBookIdParam = [
  param('bookId')
    .isInt({ min: 1, max: 7 })
    .withMessage('ID must be a positive integer')
    .trim()
    .escape()
    .toInt(),
];

export const validateIdParam = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a positive integer')
    .trim()
    .escape()
    .toInt(),
];

export const validateIdsParam = [
  param('ids')
    .custom((value) => {
      const ids = value.split(',');
      if (ids.some((id: string) => isNaN(parseInt(id, 10)) || parseInt(id, 10) <= 0)) {
        throw new Error('IDs must be a comma-separated list of positive integers');
      }
      return true;
    })
    .trim()
    .escape(),
];

export const validateSlugParam = [
  param('slug')
    .isSlug()
    .withMessage('slug is not valid')
    .isLength({ min: 1, max: 128 })
    .withMessage('Slug cannot be empty')
    .trim()
    .escape(),
];
