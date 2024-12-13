import { Movie } from '@prisma/client';
import { IMAGE_PATH } from '../../config/constant';
import path from 'path';

const movieDto = (movie: Movie) => ({
  id: movie.id,
  title: movie.title,
  slug: movie.slug,
  director: movie.director,
  boxOffice: movie.boxOffice,
  usRating: movie.usRating,
  ukRating: movie.ukRating,
  novelWriter: movie.novelWriter,
  screenplayWriter: movie.screenplayWriter,
  releaseDate: movie.releaseDate,
  runningTime: movie.runningTime,
  budget: movie.budget,
  poster: path.join(IMAGE_PATH, movie.poster ?? ''),
  createdAt: movie.createdAt.toLocaleDateString(),
});

export default movieDto;
