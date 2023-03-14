import React, { useState } from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ page, setPage, max }) => {
  const [input, setInput] = useState(1);

  const nextPage = () => {
    setInput(parseInt(input) + 1);
    setPage(parseInt(page) + 1);
  };

  const prevPage = () => {
    setInput(parseInt(input) - 1);
    setPage(parseInt(page) - 1);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setPage(parseInt(e.target.value));
      if (
        parseInt(
          //si el numero es menor a 1, que no siga bajando a numeros negativos
          e.target.value < 1 ||
            parseInt(e.target.value) > Math.ceil(max) ||
            isNaN(parseInt(e.target.value))
        )
      ) {
        setPage(1);
        setInput(1);
      } else {
        setPage(parseInt(e.target.value));
      }
    }
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className={styles.container}>
      <button
        disabled={page === 1 || page < 1}
        className={styles.btn}
        onClick={prevPage}
      >
        Back
      </button>
      <input
        style={{ width: "50px" }}
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        name="page"
        autoComplete="off"
        value={input}
      />
      <p> de {Math.ceil(max)}</p>
      <button
        disabled={page === Math.ceil(max) || page > Math.ceil(max)}
        className={styles.btn}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
