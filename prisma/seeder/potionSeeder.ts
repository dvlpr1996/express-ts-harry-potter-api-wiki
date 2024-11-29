import { PrismaClient } from '@prisma/client';
import { fetchDataFromJsonFile, prepareData, prepareSlugData } from '../../src/utils/DbUtils';

const prisma = new PrismaClient();

const potionSeeder = async () => {
  const data = await fetchDataFromJsonFile('potions');

  for (const value of data) {
    await prisma.potion.create({
      data: {
        name: prepareData(value.name),
        slug: prepareSlugData(value.name),
        effect: prepareData(value.effect),
        difficulty: prepareData(value.difficulty),
        ingredients: prepareData(value.ingredients),
        color: prepareData(value.color),
      },
    });
  }
};

export default potionSeeder;
