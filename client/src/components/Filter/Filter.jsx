import React, { useEffect, useState } from "react";
import "./Filter.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterType,
  getAllPokemon,
  getTypes,
  pokemonOrder,
  damageOrder,
} from "../../app/actions";

//aqui decidi no usar el css con .module porque tenia conflictos para que los items se ocultaran al hacer clic en otro title
const Filter = () => {
  const state = useSelector((state) => state);
  const [typeState, setTypeState] = useState("all");
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState("all");

  const order = useSelector((state) => state.order);

  function handleFilter(e) {
    const value = e.target.value;
    if (value === "all") {
      dispatch(getAllPokemon());
      setFilter(false);
    } else if (value === "type") {
      setFilter(true);
    }
    setSelectedOption(value);
    dispatch(getFilterType(value));
  }

  function clearFilters() {
    dispatch(getAllPokemon());
    setFilter(false);
    setSelectedOption("all");
    const typeSelector = document.querySelector("select:nth-child(2)");
    if (typeSelector) {
      typeSelector.value = "all";
    }
  }

  function handleOrder(event) {
    dispatch(pokemonOrder(event.target.value));
  }
  function handleDamageOrder(event) {
    dispatch(damageOrder(event.target.value));
  }

  useEffect(() => {
    dispatch(getTypes());
    dispatch(getAllPokemon());
  }, [dispatch]);

  return (
    <div className="filter">
      <h2>Filter</h2>
      <div className="select">
        <label>Type:</label>
        <select onChange={handleFilter} value={selectedOption}>
          <option value="all">All</option>
          {state.types.map((type, index) => {
            return (
              <option key={index} value={type}>
                {type}
              </option>
            );
          })}
        </select>
      </div>

      <div className="select">
        <label>Alphabetical Order:</label>
        <select onChange={handleOrder} value={order}>
          <option value="default">Default</option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="select">
        <label> Attack Damage:</label>
        <select onChange={handleDamageOrder} value={order}>
          <option value="default">Default</option>
          <option value="max">Max Damage</option>
          <option value="min">Min Damage</option>
        </select>
      </div>
      <button onClick={clearFilters} className="clear-btn">
        Clear filter
      </button>
    </div>
  );
};
export default Filter;
