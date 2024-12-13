import { House } from '@prisma/client';
import { IMAGE_PATH } from '../../config/constant';
import path from 'path';
import { fileCheckExists } from '../../utils/DbUtils';

const houseDto = (house: House) => ({
  id: house.id,
  name: house.name,
  slug: house.slug,
  color: house.color,
  ghostName: house.ghostName,
  founder: house.founder,
  animal: house.animal,
  element: house.element,
  slogan: house.slogan,
  commonRoomLocation: house.commonRoomLocation,
  commonRoomEntrance: house.commonRoomEntrance,
  bannerPath: path.join(IMAGE_PATH, house.bannerPath ?? ''),
  createdAt: house.createdAt.toLocaleDateString(),
  updatedAt: house.updatedAt.toLocaleDateString(),
});

export default houseDto;
