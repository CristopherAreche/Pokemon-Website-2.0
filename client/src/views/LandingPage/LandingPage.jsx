import React from "react";
import styles from "./LandingPage.module.css";
import { image } from "../../images/index.js";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img className={styles.img1} src={image.image1} alt="something" />
        </div>
        <div className={styles.textContainer}>
          <img className={styles.img2} src={image.image2} alt="something" />
          <p>
            ¡Bienvenido a mi nueva página para ver y crear Pokemones! Esta
            página ha sido creada especialmente para los fanáticos de Pokemon,
            que desean explorar el fascinante mundo de los Pokemon y crear sus
            propios monstruos de bolsillo. Aquí encontrarás una amplia variedad
            de información sobre los Pokemon, incluyendo sus características,
            habilidades y estadísticas, así como una herramienta para crear tus
            propios Pokemon personalizados.
          </p>
          <Link to="/home">
            <button className={styles.button}>Go Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
