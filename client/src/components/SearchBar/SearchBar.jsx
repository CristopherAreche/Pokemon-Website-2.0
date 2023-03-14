import React from "react";
import styles from "./SearchBar.module.css";
import { useDispatch } from "react-redux";
import { getPokemonByName, getAllPokemon } from "../../app/actions";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.value === "") {
      dispatch(getAllPokemon());
    }
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    console.log("en el search bar --", event);
    dispatch(getPokemonByName(event));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (searchTerm.length !== 0) {
        handleSearch(searchTerm);
      } else dispatch(getAllPokemon());
    }
  };

  return (
    <input
      className={styles.input}
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export default SearchBar;
