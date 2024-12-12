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
        director: prepareData(value.directors),
        boxOffice: prepareData(value.box_office),
        usRating: prepareData(value.rating.us),
        ukRating: prepareData(value.rating.uk),
        novelWriter: prepareData(value.writers[0].novel),
        screenplayWriter: prepareData(value.writers[1].screenplay),
        releaseDate: prepareData(value.release_date),
        runningTime: prepareData(value.running_time),
        budget: prepareData(value.budget),
        poster: prepareUrlData(value.poster),
      },
    });
  }
};

export default movieSeeder;
