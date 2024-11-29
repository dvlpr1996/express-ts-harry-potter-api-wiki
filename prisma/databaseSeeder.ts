import { PrismaClient } from '@prisma/client';
import bookSeeder from './seeder/bookSeeder';
import characterSeeder from './seeder/characterSeeder';
import featureSeeder from './seeder/featureSeeder';
import houseSeeder from './seeder/houseSeeder';
import movieProducerSeeder from './seeder/movieProducerSeeder';
import movieSeeder from './seeder/movieSeeder';
import movieStarSeeder from './seeder/movieStarSeeder';
import potionSeeder from './seeder/potionSeeder';
import producerSeeder from './seeder/producerSeeder';
import spellSeeder from './seeder/spellSeeder';
import starSeeder from './seeder/starSeeder';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    console.log('Database seeding start ...');

    console.log('bookSeeder seeding start ...');
    await bookSeeder();
    console.log('bookSeeder seeding completed.');

    console.log('spellSeeder seeding start ...');
    await spellSeeder();
    console.log('spellSeeder seeding completed.');

    console.log('potionSeeder seeding start ...');
    await potionSeeder();
    console.log('potionSeeder seeding completed.');

    console.log('houseSeeder seeding start ...');
    await houseSeeder();
    console.log('houseSeeder seeding completed.');

    console.log('featureSeeder seeding start ...');
    await featureSeeder();
    console.log('featureSeeder seeding completed.');

    console.log('characterSeeder seeding start ...');
    await characterSeeder();
    console.log('characterSeeder seeding completed.');

    console.log('starSeeder seeding start ...');
    await starSeeder();
    console.log('starSeeder seeding completed.');
    
    console.log('movieSeeder seeding start ...');
    await movieSeeder();
    console.log('movieSeeder seeding completed.');

    console.log('producerSeeder seeding start ...');
    await producerSeeder();
    console.log('producerSeeder seeding completed.');

    console.log('movieStarSeeder seeding start ...');
    await movieStarSeeder();
    console.log('movieStarSeeder seeding completed.');

    console.log('movieProducerSeeder seeding start ...');
    await movieProducerSeeder();
    console.log('movieProducerSeeder seeding completed.');

    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase();
