import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const featureSeeder = async () => {
  const data = {
    1: ['nerve', 'daring', 'courage', 'bravery', 'chivalry', 'determination'],
    2: ['just', 'modesty', 'loyalty', 'fairness', 'patience', 'hard-working'],
    3: ['pride', 'cunning', 'ambition', 'determination', 'resourcefulness', 'self-preservation'],
    4: ['wit', 'wisdom', 'learning', 'creativity', 'acceptance', 'intelligence'],
  };

  const result = [];
  for (const [houseId, features] of Object.entries(data)) {
    for (const feature of features) {
      result.push({
        houseId: parseInt(houseId, 10),
        feature: feature,
      });
    }
  }

  for (const item of result) {
    await prisma.feature.create({
      data: {
        houseId: item.houseId,
        feature: item.feature,
      },
    });
  }
};

export default featureSeeder;
