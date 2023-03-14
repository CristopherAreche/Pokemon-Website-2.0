import {
  GET_POKEMONS,
  GET_POKEMON,
  FILTER_BY_TYPE,
  GET_TYPES,
  ORDER,
  ORDER_DAMAGE,
  GET_NAME,
} from "./actions";
//este es el estado global
const initialState = {
  pokemons: [],
  pokemon: {},
  types: [],
};
//es una funcion que sabe que hacer en el estado global
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POKEMONS:
      return { ...state, pokemons: action.payload };
    case GET_POKEMON:
      return { ...state, pokemon: { ...state.pokemon, ...action.payload } };
    case FILTER_BY_TYPE:
      return {
        ...state,
        pokemons: action.payload,
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case ORDER:
      var pokeOrder;
      action.payload === "asc"
        ? (pokeOrder = state.pokemons.sort((a, b) =>
            a.name.localeCompare(b.name)
          ))
        : (pokeOrder = state.pokemons.sort((a, b) =>
            b.name.localeCompare(a.name)
          ));
      if (action.payload === "default") {
        pokeOrder = state.pokemons.sort((a, b) => a.pokemonId - b.pokemonId);
      }
      return {
        ...state,
        pokemons: pokeOrder,
      };
    case ORDER_DAMAGE:
      var orderDamage;
      if (action.payload === "max") {
        orderDamage = state.pokemons.sort((a, b) => b.attack - a.attack);
      }
      if (action.payload === "min") {
        orderDamage = state.pokemons.sort((a, b) => a.attack - b.attack);
      }
      if (action.payload === "default") {
        pokeOrder = state.pokemons.sort((a, b) => a.pokemonId - b.pokemonId);
      }
      return {
        ...state,
        pokemons: orderDamage,
      };
    case GET_NAME:
      return {
        ...state,
        pokemons: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
