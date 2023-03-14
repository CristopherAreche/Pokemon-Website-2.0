import React from "react";
import styles from "./Card.module.css";
import {
  background,
  backgroundImg,
} from "../../assets/backgroundColorByType.js";
import { Link } from "react-router-dom";
import noImg from "../../images/charmander.png";

const TypeLabel = ({ element }) => {
  const colors = background[`${element}`];
  return (
    <div
      className={styles.label}
      style={{ backgroundColor: `${colors[0]}`, color: `${colors[1]}` }}
    >
      {element}
    </div>
  );
};

const Card = ({ name, image, pokemonId, type }) => {
  const bgColor = backgroundImg[`${type[0]}`];

  return (
    <Link
      to={`/detail/${pokemonId}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <div className={styles.card}>
        <div
          style={{
            backgroundColor: `${bgColor}`,
          }}
          className={styles.imgContainer}
        >
          <img
            className={styles.imgCont}
            src={image ? image : noImg}
            alt="img not found"
            width="200px"
            height="250vh"
          />
        </div>
        <div className={styles.infoContainer}>
          <div className={styles.text}>
            <p style={{ color: "black" }}>#{pokemonId}</p>
            <h4>{name}</h4>
          </div>
          <div className={styles.types}>
            {type.map((e, i) => (
              <TypeLabel key={i} element={e} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
