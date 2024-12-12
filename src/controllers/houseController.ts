import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { pagination, paramValidation } from '../utils/utils';
import prisma from '../boot/prisma/prisma';
import { PAGINATION_TAKE_NUMBER } from '../config/constant';
import houseDto from '../libs/dtos/houseDto';

const houseController = {
  index: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const page = parseInt(req.query.page as string, 10) || 1;

    const [houses, totalHouses] = await prisma.$transaction([
      prisma.house.findMany({
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.house.count(),
    ]);

    if (houses.length === 0) {
      res.status(404).json({ success: false, data: 'There are no houses' });
      return;
    }

    res.status(200).json({
      success: true,
      length: totalHouses,
      data: houses.map(houseDto),
      pagination: pagination(totalHouses, page),
    });
  }),

  showById: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    try {
      const house = await prisma.house.findFirstOrThrow({
        where: { id: parseInt(req.params.id, 10) },
      });
      res.status(200).json({ success: true, data: houseDto(house) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'house Not Found' });
    }
  }),

  showByIds: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const page = parseInt(req.query.page as string, 10) || 1;

    const ids = req.params.ids.split(',').map((id) => parseInt(id, 10));

    const [houses, totalHouses] = await prisma.$transaction([
      prisma.house.findMany({
        where: { id: { gte: ids[0], lte: ids[1] } },
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.house.count({ where: { id: { gte: ids[0], lte: ids[1] } } }),
    ]);

    if (houses.length === 0) {
      res.status(404).json({ success: false, data: 'There are no house' });
      return;
    }

    res.status(200).json({
      success: true,
      length: totalHouses,
      data: houses.map(houseDto),
      pagination: pagination(totalHouses, page),
    });
  }),

  showBySlug: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    try {
      const house = await prisma.house.findFirstOrThrow({
        where: { slug: req.params.slug },
      });
      res.status(200).json({ success: true, data: houseDto(house) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'house Not Found' });
    }
  }),

  showFeatures: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    try {
      const houseFeatures = await prisma.feature.findMany({
        where: { houseId: parseInt(req.params.id, 10) },
        select: { feature: true },
      });

      res.status(200).json({
        success: true,
        data: houseFeatures.map((houseFeature) => houseFeature.feature),
      });
    } catch (err) {
      res.status(404).json({ success: false, data: 'houseFeature Not Found' });
    }
  }),
};

export default houseController;
