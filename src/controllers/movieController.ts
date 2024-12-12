import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { pagination, paramValidation } from '../utils/utils';
import prisma from '../boot/prisma/prisma';
import { PAGINATION_TAKE_NUMBER } from '../config/constant';
import movieDto from '../libs/dtos/movieDto';

const movieController = {
  index: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    const page = parseInt(req.query.page as string, 10) || 1;

    const [movies, totalMovie] = await prisma.$transaction([
      prisma.movie.findMany({
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.movie.count(),
    ]);

    if (movies.length === 0) {
      res.status(404).json({ success: false, data: 'There are no movies' });
      return;
    }

    res.status(200).json({
      success: true,
      length: totalMovie,
      data: movies.map(movieDto),
      pagination: pagination(totalMovie, page),
    });
  }),

  showById: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    try {
      const movie = await prisma.movie.findFirstOrThrow({
        where: { id: parseInt(req.params.id, 10) },
      });
      res.status(200).json({ success: true, data: movieDto(movie) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'movie Not Found' });
    }
  }),

  showByIds: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;
    const page = parseInt(req.query.page as string, 10) || 1;

    const ids = req.params.ids.split(',').map((id) => parseInt(id, 10));

    const [movies, totalMovie] = await prisma.$transaction([
      prisma.movie.findMany({
        where: { id: { gte: ids[0], lte: ids[1] } },
        skip: (page - 1) * PAGINATION_TAKE_NUMBER,
        take: PAGINATION_TAKE_NUMBER,
      }),
      prisma.movie.count({ where: { id: { gte: ids[0], lte: ids[1] } } }),
    ]);

    if (movies.length === 0) {
      res.status(404).json({ success: false, data: 'There are no movies' });
      return;
    }

    res.status(200).json({
      success: true,
      length: totalMovie,
      data: movies.map(movieDto),
      pagination: pagination(totalMovie, page),
    });
  }),

  showBySlug: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    try {
      const movie = await prisma.movie.findFirstOrThrow({
        where: { slug: req.params.slug },
      });
      res.status(200).json({ success: true, data: movieDto(movie) });
    } catch (err) {
      res.status(404).json({ success: false, data: 'Movie Not Found' });
    }
  }),

  showStars: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    try {
      const movieWithStars = await prisma.movie.findUnique({
        where: { id: parseInt(req.params.id, 10) },
        include: {
          MovieStar: {
            include: {
              star: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!movieWithStars) {
        res.status(404).json({ success: false, data: 'There are no stars for this movies' });
        return;
      }

      res.status(200).json({
        success: true,
        data: movieWithStars.MovieStar.map((movieStar) => movieStar.star.name),
      });
    } catch (err) {
      res.status(404).json({ success: false, data: 'houseFeature Not Found' });
    }
  }),

  showProducers: expressAsyncHandler(async (req: Request, res: Response) => {
    if (!paramValidation(req, res)) return;

    try {
      const movieWithProducer = await prisma.movie.findUnique({
        where: { id: parseInt(req.params.id, 10) },
        include: {
          MovieProducer: {
            include: {
              producer: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!movieWithProducer) {
        res.status(404).json({ success: false, data: 'There are no producer for this movies' });
        return;
      }

      res.status(200).json({
        success: true,
        data: movieWithProducer.MovieProducer.map((movieProducer) => movieProducer.producer.name),
      });
    } catch (err) {
      res.status(404).json({ success: false, data: 'houseFeature Not Found' });
    }
  }),
};

export default movieController;
