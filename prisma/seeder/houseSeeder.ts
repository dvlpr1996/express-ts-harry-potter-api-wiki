import { PrismaClient } from '@prisma/client';
import { fetchDataFromJsonFile, prepareData, prepareSlugData } from '../../src/utils/DbUtils';

const prisma = new PrismaClient();

const houseSeeder = async () => {
  const data = await fetchDataFromJsonFile('houses');

  for (const house of data) {
    await prisma.house.create({
      data: {
        name: prepareData(house.name),
        slug: prepareSlugData(house.name),
        color: prepareData(house.color),
        ghostName: prepareData(house.ghost),
        commonRoomLocation: prepareData(house.commonRoomLocation),
        commonRoomEntrance: prepareData(house.commonRoomEntrance),
        founder: prepareData(house.founder),
        animal: prepareData(house.animal),
        element: prepareData(house.element),
        slogan: prepareData(house.slogan) || null,
        bannerPath: prepareData(house.bannerPath) || null,
      },
    });
  }
};

export default houseSeeder;
