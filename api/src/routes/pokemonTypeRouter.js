const { default: axios } = require("axios");
const { Router } = require("express");
const { allTypes } = require("../controllers/pokemonType.controller.js");

const pokemonTypeRouter = Router();
pokemonTypeRouter.get("/", allTypes);

module.exports = pokemonTypeRouter;
