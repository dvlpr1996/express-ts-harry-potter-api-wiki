import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const movieProducerSeeder = async () => {
  const data = {
    '1': ["1"],
    '2': ["1"],
    '3': ["2", "1", "3"],
    '4': ["1"],
    '5': ["1", "4"],
    '6': ["1", "4"],
    '7': ["1", "4", "5"],
    '8': ["1", "4", "5"]
  };

  const result = [];
  for (const [movieId, producerIds] of Object.entries(data)) {
    for (const producerId of producerIds) {
      result.push({
        movieId: parseInt(movieId, 10),
        producerId: parseInt(producerId, 10),
      });
    }
  }

  for (const item of result) {
    await prisma.movieProducer.create({
      data: {
        movieId: item.movieId,
        producerId: item.producerId,
      },
    });
  }
};

export default movieProducerSeeder;
