import { Character } from '@prisma/client';

const characterDto = (character: Character) => ({
  id: character.id,
  name: character.name,
  slug: character.slug,
  type: character.type,
  species: character.species,
  gender: character.gender,
  houseId: character.houseId,
  dateOfBirth: character.dateOfBirth,
  ancestry: character.ancestry,
  isWizard: character.isWizard,
  patronus: character.patronus,
  wandCore: character.wandCore,
  isAlive: character.isAlive,
  createdAt: character.createdAt.toLocaleDateString(),
  updatedAt: character.updatedAt.toLocaleDateString(),
});

export default characterDto;
