import { PrismaClient } from '@prisma/client';
import { prepareData } from '../../src/utils/DbUtils';

const prisma = new PrismaClient();

const starSeeder = async () => {
  const data = [
    'daniel radcliffe',
    'rupert grint',
    'emma watson',
    'john cleese',
    'robbie coltrane',
    'richard griffiths',
    'richard harris',
    'ian hart',
    'john hurt',
    'alan rickman',
    'fiona shaw',
    'maggie smith',
    'sean biggerstaff',
    'warwick davis',
    'julie walters',
    'zoë wanamaker',
    'david bradley',
    'tom felton',
    'kenneth branagh',
    'jason isaacs',
    'bonnie wright',
    'robert hardy',
    'shirley henderson',
    'gemma jones',
    'miriam margolyes',
    'mark williams',
    'julie christie',
    'michael gambon',
    'gary oldman',
    'timothy spall',
    'david thewlis',
    'emma thompson',
    'pam ferris',
    'dawn french',
    'ralph fiennes',
    'brendan gleeson',
    'miranda richardson',
    'frances de la tour',
    'predrag bjelac',
    'roger lloyd-pack',
    'stanislav ianevski',
    'clémence poésy',
    'robert pattinson',
    'david tennant',
    'helena bonham carter',
    'imelda staunton',
    'george harris',
    'natalia tena',
    'jim broadbent',
    'helen mccrory',
    'rhys ifans',
    'bill nighy',
    'toby jones',
    'dave legeno',
    'simon mcburney',
    'nick moran',
    'peter mullan',
    'david o hara',
    'kelly macdonald',
    'matthew lewis',
    'ciarán hinds',
    'evanna lynch',
    'james phelps',
    'oliver phelps'
  ];

  for (const value of data) {
    await prisma.star.create({
      data: {
        name: prepareData(value)
      },
    });
  }
};

export default starSeeder;
