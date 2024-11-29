import { PrismaClient } from '@prisma/client';
import { prepareData } from '../../src/utils/DbUtils';

const prisma = new PrismaClient();

const producerSeeder = async () => {
  const data = [
    'david heyman',
    'chris columbus',
    'mark radcliffe',
    'david barron',
    'j. k. rowling'
  ];

  for (const value of data) {
    await prisma.producer.create({
      data: {
        name: prepareData(value)
      },
    });
  }
};

export default producerSeeder;
