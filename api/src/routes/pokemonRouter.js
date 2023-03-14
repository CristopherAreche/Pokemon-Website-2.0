const axios = require("axios");
const { Router } = require("express");
const {
  allPokemons,
  searchPokemonById,
  filterPokemons,
  newPokemon,
} = require("../controllers/pokemon.controller.js");

const pokemonRouter = Router();

pokemonRouter.get("/", allPokemons);
pokemonRouter.get("/search", filterPokemons);
pokemonRouter.get("/:id", searchPokemonById);
pokemonRouter.post("/", newPokemon);

module.exports = pokemonRouter;
