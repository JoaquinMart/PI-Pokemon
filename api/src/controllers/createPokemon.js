const { Pokemon, Types } = require('../db');

const createPkController = async (
  name,
  types,
  image,
  hp,
  attack,
  defense,
  speed = null,
  height = null,
  weight = null
) => {
  const [pokemon, created] = await Pokemon.findOrCreate({
    where: { name },
    defaults: {
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight
    },
  });
  if (!created) throw new Error("Este pokemon ya existe en la DB");
  const typesDb = await Types.findAll({ where: { name: types } });
  pokemon.addTypes(typesDb);
  return pokemon;
};

module.exports = { createPkController };