import { Potion } from '@prisma/client';

const potionDto = (potion: Potion) => ({
  id: potion.id,
  name: potion.name,
  slug: potion.slug,
  effect: potion.effect,
  difficulty: potion.difficulty,
  ingredients: potion.ingredients,
  color: potion.color,
  createdAt: potion.createdAt.toLocaleDateString(),
  updatedAt: potion.updatedAt.toLocaleDateString(),
});

export default potionDto;
