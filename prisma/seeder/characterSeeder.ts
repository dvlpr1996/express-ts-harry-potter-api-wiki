import { PrismaClient } from '@prisma/client';
import { fetchDataFromJsonFile, prepareData, prepareSlugData } from '../../src/utils/DbUtils';

const prisma = new PrismaClient();

const characterSeeder = async () => {
  const data = await fetchDataFromJsonFile('characters');

  for (const value of data) {
    const house = await prisma.house.findUnique({
      where: { name: prepareData(value.house) },
    });

    await prisma.character.create({
      data: {
        name: prepareData(value.name),
        slug: prepareSlugData(value.name),
        type: prepareData(value.type),
        species: prepareData(value.species),
        gender: prepareData(value.gender),
        houseId: house?.id || null,
        dateOfBirth: prepareData(value.dateofbirth),
        ancestry: prepareData(value.ancestry),
        isWizard: value.wizard ?? false,
        patronus: prepareData(value.patronus),
        wandCore: prepareData(value.wand_core),
        isAlive: value.alive ?? false,
      },
    });
  }
};

export default characterSeeder;
