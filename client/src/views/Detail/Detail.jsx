import React, { useEffect } from "react";
import styles from "./Detail.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemon } from "../../app/actions";
import { background, backgroundImg } from "../../assets/backgroundColorByType";

const Detail = () => {
  const dispatch = useDispatch();
  const { pokemon } = useSelector((state) => state);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPokemon(id));
  }, [dispatch]);
  if (pokemon) {
    const typeC = pokemon?.type && pokemon.type[0];
    const bgColor = backgroundImg[`${typeC}`];

    return (
      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <div
            className={styles.imageContainer}
            style={{ backgroundColor: `${bgColor}` }}
          >
            <img className={styles.img1} src={pokemon?.image} alt="something" />
          </div>
          <div className={styles.textContainer}>
            <div className={styles.pokemonName}>
              <h2>{pokemon.name}</h2>
              <h2>#{pokemon.pokemonId}</h2>
            </div>
            <div className={styles.details}>
              <div className={styles.estadisticas}>
                <h5>Hp: {pokemon.hp}</h5>
                <h5>Attack: {pokemon.attack}</h5>
                <h5>Defense: {pokemon.defense}</h5>
              </div>
              <div className={styles.estadisticas}>
                <h5>Speed: {pokemon.speed}</h5>
                <h5>Height: {pokemon.height}</h5>
                <h5>Weight: {pokemon.weight}</h5>
              </div>
              <div className={styles.types}>
                {pokemon?.type &&
                  pokemon.type.map((element, pos) => (
                    <div
                      key={pos}
                      className={styles.tLabel}
                      style={{
                        backgroundColor: `${background[`${element}`][0]}`,
                        color: `${background[`${element}`][1]}`,
                      }}
                    >
                      {element}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <p className={styles.button}>Close</p>
          </Link>
        </div>
      </div>
    );
  }
};

export default Detail;
