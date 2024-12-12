import { House } from '@prisma/client';

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
  bannerPath: house.bannerPath,
  createdAt: house.createdAt.toLocaleDateString(),
  updatedAt: house.updatedAt.toLocaleDateString(),
});

export default houseDto;
