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
        commonRoomLocation: prepareData(house.common_room[0].location),
        commonRoomEntrance: prepareData(house.common_room[1].entrance),
        founder: prepareData(house.founder),
        animal: prepareData(house.animal),
        element: prepareData(house.element),
        slogan: prepareData(house.slogan),
        bannerPath: prepareData(house.banner),
      },
    });
  }
};

export default houseSeeder;
