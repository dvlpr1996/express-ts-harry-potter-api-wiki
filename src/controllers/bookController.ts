import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import prisma from '../boot/prisma/prisma';
import bookDto from '../libs/dtos/bookDto';
import { paramValidation } from '../utils/utils';

const bookController = {
  index: expressAsyncHandler(async (_req: Request, res: Response) => {
    const books = await prisma.book.findMany();

    if (books.length === 0) {
      res.status(404).json({ success: false, data: 'There are no books' });
      return;
    }

    res.status(200).json({
      success: true,
      length: books.length,
      data: books.map(bookDto),
    });
  }),

  showById: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const bookId = parseInt(req.params.bookId, 10);

    try {
      const book = await prisma.book.findFirstOrThrow({
        where: { id: bookId },
      });
      res.status(200).json({ success: true, data: bookDto(book) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'Book Not Found' });
    }
  }),

  showBySlug: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const bookSlug = req.params.bookSlug;

    try {
      const book = await prisma.book.findFirstOrThrow({
        where: { slug: bookSlug },
      });
      res.status(200).json({ success: true, data: bookDto(book) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'Book Not Found' });
    }
  }),
};

export default bookController;
