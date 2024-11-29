import { PrismaClient } from '@prisma/client';
import { fetchDataFromJsonFile, prepareData, prepareSlugData, prepareUrlData } from '../../src/utils/DbUtils';

const prisma = new PrismaClient();

const movieSeeder = async () => {
  const data = await fetchDataFromJsonFile('movies');

  for (const value of data) {
    await prisma.movie.create({
      data: {
        title: prepareData(value.title),
        slug: prepareSlugData(value.title),
        director: prepareData(value.director),
        boxOffice: prepareData(value.box_office),
        usRating: prepareData(value.us_rating),
        ukRating: prepareData(value.uk_rating),
        novelWriter: prepareData(value.novel_writer),
        screenplayWriter: prepareData(value.screenplay_writer),
        releaseDate: prepareData(value.release_date),
        runningTime: prepareData(value.running_time),
        budget: prepareData(value.budget),
        poster: prepareUrlData(value.poster),
      },
    });
  }
};

export default movieSeeder;
