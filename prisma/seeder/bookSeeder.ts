import { PrismaClient } from '@prisma/client';
import { fetchDataFromJsonFile, prepareData, prepareSlugData, prepareUrlData } from '../../src/utils/DbUtils';

const prisma = new PrismaClient();

const bookSeeder = async () => {
  const data = await fetchDataFromJsonFile('books');

  for (const value of data) {
    await prisma.book.create({
      data: {
        title: prepareData(value.title),
        slug: prepareSlugData(value.title),
        author: prepareData(value.author),
        language: prepareData(value.language),
        genre: prepareData(value.genre),
        type: prepareData(value.type),
        country: prepareData(value.country),
        seriesNumber: prepareData(value.series_number),
        isbn: prepareData(value.isbn),
        pages: prepareData(value.pages),
        ukPublishDate: prepareData(value.publish_date[0]?.uk),
        usPublishDate: prepareData(value.publish_date[1]?.us),
        coverPath: prepareUrlData(value.cover_path),
        bookInfoUrl: prepareUrlData(value.book_info_url),
        summary: prepareData(value.summary),
      },
    });
  }
};

export default bookSeeder;
