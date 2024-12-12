import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import prisma from '../boot/prisma/prisma';
import { pagination, paramValidation } from '../utils/utils';
import { PAGINATION_TAKE_NUMBER } from '../config/constant';
import characterDto from '../libs/dtos/characterDto';

const staffController = {
  index: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const page = parseInt(req.query.page as string, 10) || 1;

    const [characters, totalCharacters] = await prisma.$transaction([
      prisma.character.findMany({
        where: { type: 'staff' },
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.character.count({ where: { type: 'staff' } }),
    ]);

    if (characters.length === 0) {
      res.status(404).json({ success: false, data: 'There are no character' });
      return;
    }

    res.status(200).json({
      success: true,
      length: totalCharacters,
      data: characters.map(characterDto),
      pagination: pagination(totalCharacters, page),
    });
  }),

  showById: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    try {
      const character = await prisma.character.findFirstOrThrow({
        where: { AND: [{ id: parseInt(req.params.id, 10) }, { type: 'staff' }] },
      });
      res.status(200).json({ success: true, data: characterDto(character) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'Staff Not Found' });
    }
  }),

  showByIds: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const page = parseInt(req.query.page as string, 10) || 1;

    const ids = req.params.ids.split(',').map((id) => parseInt(id, 10));

    const [characters, totalCharacters] = await prisma.$transaction([
      prisma.character.findMany({
        where: { AND: [{ type: 'staff' }, { id: { gte: ids[0], lte: ids[1] } }] },
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.character.count({
        where: { AND: [{ type: 'staff' }, { id: { gte: ids[0], lte: ids[1] } }] },
      }),
    ]);

    if (characters.length === 0) {
      res.status(404).json({ success: false, data: 'There are no character' });
      return;
    }

    res.status(200).json({
      success: true,
      length: totalCharacters,
      data: characters.map(characterDto),
      pagination: pagination(totalCharacters, page),
    });
  }),

  showBySlug: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    try {
      const character = await prisma.character.findFirstOrThrow({
        where: { AND: [{ type: 'staff' }, { slug: req.params.slug }] },
      });
      res.status(200).json({ success: true, data: characterDto(character) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'character Not Found' });
    }
  }),
};

export default staffController;
