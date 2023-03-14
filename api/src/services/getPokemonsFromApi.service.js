const axios = require("axios");
exports.getPokemonsFromApi = async () => {
  const pokemonData = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=150`
  );
  return pokemonData;
};
