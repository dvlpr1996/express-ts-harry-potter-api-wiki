import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import prisma from '../boot/prisma/prisma';
import characterDto from '../libs/dtos/characterDto';
import { pagination, paramValidation } from '../utils/utils';
import { PAGINATION_TAKE_NUMBER } from '../config/constant';

const characterController = {
  index: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const page = parseInt(req.query.page as string, 10) || 1;

    const [characters, totalCharacters] = await prisma.$transaction([
      prisma.character.findMany({
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.character.count(),
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

    const characterId = parseInt(req.params.characterId, 10);

    try {
      const character = await prisma.character.findFirstOrThrow({
        where: { id: characterId },
      });
      res.status(200).json({ success: true, data: characterDto(character) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'character Not Found' });
    }
  }),

  showBySlug: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const characterSlug = req.params.characterSlug;

    try {
      const character = await prisma.character.findFirstOrThrow({
        where: { slug: characterSlug },
      });
      res.status(200).json({ success: true, data: characterDto(character) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'character Not Found' });
    }
  }),
};

export default characterController;
