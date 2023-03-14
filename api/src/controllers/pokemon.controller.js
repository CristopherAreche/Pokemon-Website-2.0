const axios = require("axios");
const { Op } = require("sequelize");
const { Pokemon } = require("../db.js");
const { Type } = require("../db.js");
const {
  getPokemonsFromApi,
} = require("../services/getPokemonsFromApi.service.js");

//function que busca dentro de cualquier URL
const returnUrl = async (url) => {
  const urlResponse = await axios(url);
  return urlResponse.data;
};

exports.allPokemons = async (req, res) => {
  try {
    const apiData = await getPokemonsFromApi();
    const apiPokemons = await apiData.data.results.map((pokemon) => {
      const obj = {
        name: pokemon?.name ?? "Unknown",
        url: pokemon.url,
      };

      return obj;
    });
    const pokemonHandler = async (req, res) => {
      const pokemon = apiPokemons?.map(async (res) => {
        const urlInfo = await returnUrl(res.url);
        const pokemonData = {
          pokemonId: urlInfo.id ?? 12345,
          name: res.name ?? "Unknown",
          image: urlInfo.sprites.other.dream_world.front_default ?? "Unknown",
          hp: urlInfo.stats[0].base_stat ?? "Unknown",
          attack: urlInfo.stats[1].base_stat ?? "Unknown",
          defense: urlInfo.stats[2].base_stat ?? "Unknown",
          speed: urlInfo.stats[5].base_stat ?? "Unknown",
          height: urlInfo.height ?? "Unknown",
          weight: urlInfo.weight ?? "Unknown",
          type: urlInfo.types.map((t) => t.type.name),
        };
        return pokemonData;
      });
      const pokemonData = Promise.all(pokemon);
      return pokemonData;
    };
    const data = await pokemonHandler();

    const savedPokemons = await Pokemon.findAll();
    const response = [...data, ...savedPokemons];
    res.status(200).send([response]);
  } catch (error) {
    res.send({ error: error.message });
  }
};

const pokemonId = async (pokemonId) => {
  try {
    const pokemonFromDB = await Pokemon.findByPk(pokemonId);
    if (pokemonFromDB) {
      return pokemonFromDB.toJSON();
    }
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    const type = res.data.types.map((e) => e.type.name);
    const pokemon = {
      pokemonId: res.data.id,
      name: res.data.name,
      hp: res.data.stats[0].base_stat,
      speed: res.data.stats[5].base_stat,
      attack: res.data.stats[1].base_stat,
      defense: res.data.stats[2].base_stat,
      weight: res.data.weight,
      height: res.data.height,
      image: res.data.sprites.other.dream_world.front_default,
      type: type,
    };
    return pokemon;
  } catch (error) {
    throw new Error(`"pokemonId", ${error.message}`);
  }
};

exports.searchPokemonById = async (req, res) => {
  try {
    const id = req.params.id;
    const pokemon = await pokemonId(id);
    res.status(200).send(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al buscar el Pokémon" });
  }
};

exports.filterPokemons = async (req, res) => {
  try {
    const { name } = req.query;
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    const filteredList = await Pokemon.findAll({
      where: {
        name: { [Op.iRegexp]: name },
      },
    });
    if (response) {
      const pokeName = {
        name: response.data.name,
        hp: response.data.stats[0].base_stat,
        speed: response.data.stats[5].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        weight: response.data.weight,
        height: response.data.height,
        image: response.data.sprites.other.dream_world.front_default,
        type: response.data.types.map((e) => e.type.name),
      };
      res.send(pokeName);
    } else if (filteredList.length !== 0) {
      res.send(filteredList);
    } else {
      return res.sendStatus(404).json("Not found in DB");
    }
  } catch (error) {
    res.send({ error: error.message });
  }
};

exports.newPokemon = async (req, res) => {
  const response = await axios.get("http://localhost:3001/pokemons");
  const id = response.data[0][response.data[0].length - 1].pokemonId + 1;
  try {
    const {
      pokemonId,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      type,
    } = req.body;
    const pokemon = Pokemon.create({
      pokemonId: id,
      name,
      image,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      type,
    });
    if (
      !pokemonId &&
      !name &&
      !image &&
      !hp &&
      !attack &&
      !defense &&
      !speed &&
      !height &&
      !weight &&
      !type
    ) {
      res.send({ error: new Error("The information provided is incomplete") });
    }
    if (!pokemon) {
      res.send({ message: "Not created" });
    }
    res.status(201).send("Successfully created");
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
};
