import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemon } from "../../app/actions";
import Card from "../../components/Card/Card";
import Filter from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = (props) => {
  const { pokemons } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [perPage] = useState(12);
  const max = pokemons.length / perPage;

  useEffect(() => {
    dispatch(getAllPokemon());
  }, [dispatch]);

  return (
    <div className={styles.body}>
      <div className={styles.searchContainer}>
        <h1>Pokemons</h1>
        <p>Search for a pokemon by name or using its national pokedex number</p>
        <SearchBar />
      </div>
      <aside className={styles.filterContainer}>
        <Filter />
      </aside>
      <main className={styles.container}>
        <section className={styles.pokedexContainer}>
          {pokemons
            .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
            .map((pokemon, pos) => {
              return (
                <Card
                  key={pos}
                  name={pokemon?.name}
                  image={pokemon?.image}
                  pokemonId={pokemon?.pokemonId}
                  type={pokemon?.type}
                />
              );
            })}
        </section>
      </main>
      <footer className={styles.footer}>
        <Pagination page={page} setPage={setPage} max={max} />
      </footer>
    </div>
  );
};

export default Home;
