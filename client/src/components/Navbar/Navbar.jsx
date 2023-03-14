import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { image } from "../../images/index.js";

const Navbar = () => {
  return (
    <div className={styles.mainContainer}>
      <img className={styles.title} src={image.image2} alt="something" />
      <div className={styles.container}>
        <Link to="/home" className={styles.link}>
          Home
        </Link>
        <Link to="/create" className={styles.form}>
          Form
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
