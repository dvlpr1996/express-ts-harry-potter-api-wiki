import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { pagination, paramValidation } from '../utils/utils';
import prisma from '../boot/prisma/prisma';
import { PAGINATION_TAKE_NUMBER } from '../config/constant';
import potionDto from '../libs/dtos/potionDto';

const potionController = {
  index: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const page = parseInt(req.query.page as string, 10) || 1;

    const [potions, totalPotions] = await prisma.$transaction([
      prisma.potion.findMany({
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.potion.count(),
    ]);

    if (potions.length === 0) {
      res.status(404).json({ success: false, data: 'There are no potion' });
      return;
    }

    res.status(200).json({
      success: true,
      length: totalPotions,
      data: potions.map(potionDto),
      pagination: pagination(totalPotions, page),
    });
  }),

  showById: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const potionId = parseInt(req.params.id, 10);

    try {
      const potion = await prisma.potion.findFirstOrThrow({
        where: { id: potionId },
      });
      res.status(200).json({ success: true, data: potionDto(potion) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'potion Not Found' });
    }
  }),

  showByIds: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const page = parseInt(req.query.page as string, 10) || 1;

    const ids = req.params.ids.split(',').map((id) => parseInt(id, 10));

    const [potions, totalPotions] = await prisma.$transaction([
      prisma.potion.findMany({
        where: { id: { gte: ids[0], lte: ids[1] } },
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.potion.count({ where: { id: { gte: ids[0], lte: ids[1] } } }),
    ]);

    if (potions.length === 0) {
      res.status(404).json({ success: false, data: 'There are no potions' });
      return;
    }

    res.status(200).json({
      success: true,
      length: totalPotions,
      data: potions.map(potionDto),
      pagination: pagination(totalPotions, page),
    });
  }),

  showBySlug: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    try {
      const potion = await prisma.potion.findFirstOrThrow({
        where: { slug: req.params.slug },
      });
      res.status(200).json({ success: true, data: potionDto(potion) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'potion Not Found' });
    }
  }),
};

export default potionController;
