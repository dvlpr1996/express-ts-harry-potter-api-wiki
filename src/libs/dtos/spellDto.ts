import { Spell } from '@prisma/client';

const spellDto = (spell: Spell) => ({
  id: spell.id,
  name: spell.name,
  slug: spell.slug,
  pronunciation: spell.pronunciation,
  description: spell.description,
  createdAt: spell.createdAt.toLocaleDateString(),
  updatedAt: spell.updatedAt.toLocaleDateString(),
});

export default spellDto;
