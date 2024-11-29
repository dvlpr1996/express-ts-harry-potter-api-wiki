import { PrismaClient } from '@prisma/client';
import { fetchDataFromJsonFile, prepareData, prepareSlugData } from '../../src/utils/DbUtils';

const prisma = new PrismaClient();

const spellSeeder = async () => {
  const data = await fetchDataFromJsonFile('spells');

  for (const value of data) {
    await prisma.spell.create({
      data: {
        name: prepareData(value.name),
        slug: prepareSlugData(value.name),
        pronunciation: prepareData(value.pronunciation),
        description: prepareData(value.description),
      },
    });
  }
};

export default spellSeeder;
