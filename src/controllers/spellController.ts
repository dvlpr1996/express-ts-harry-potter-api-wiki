import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { pagination, paramValidation } from '../utils/utils';
import prisma from '../boot/prisma/prisma';
import { PAGINATION_TAKE_NUMBER } from '../config/constant';
import spellDto from '../libs/dtos/spellDto';

const spellController = {
  index: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const page = parseInt(req.query.page as string, 10) || 1;

    const [spells, totalSpells] = await prisma.$transaction([
      prisma.spell.findMany({
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.spell.count(),
    ]);

    if (spells.length === 0) {
      res.status(404).json({ success: false, data: 'There are no spell' });
      return;
    }

    res.status(200).json({
      success: true,
      length: totalSpells,
      data: spells.map(spellDto),
      pagination: pagination(totalSpells, page),
    });
  }),

  showById: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const spellId = parseInt(req.params.id, 10);

    try {
      const spell = await prisma.spell.findFirstOrThrow({
        where: { id: spellId },
      });
      // res.status(200).json({ success: true, data: spellDto(spell) });
      res.status(200).json({ success: true, data: spell });
    } catch (err) {
      res.status(404).json({ success: false, data: 'spell Not Found' });
    }
  }),

  showByIds: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const page = parseInt(req.query.page as string, 10) || 1;

    const ids = req.params.ids.split(',').map((id) => parseInt(id, 10));

    const [spells, totalSpells] = await prisma.$transaction([
      prisma.spell.findMany({
        where: { id: { gte: ids[0], lte: ids[1] } },
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.spell.count({ where: { id: { gte: ids[0], lte: ids[1] } } }),
    ]);

    if (spells.length === 0) {
      res.status(404).json({ success: false, data: 'There are no spells' });
      return;
    }

    res.status(200).json({
      success: true,
      length: totalSpells,
      data: spells.map(spellDto),
      pagination: pagination(totalSpells, page),
    });
  }),

  showBySlug: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const spellSlug = req.params.slug;

    try {
      const spell = await prisma.spell.findFirstOrThrow({
        where: { slug: spellSlug },
      });
      res.status(200).json({ success: true, data: spellDto(spell) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'spell Not Found' });
    }
  }),
};

export default spellController;
