import React, { useState, useEffect, useRef } from "react";
import styles from "./Form.module.css";
import { PokemonTypes } from "../../assets/backgroundColorByType";
import { background } from "../../assets/backgroundColorByType.js";
import axios from "axios";
import noImg from "../../images/charmander.png";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const initialValues = {
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
    type: [],
  };

  //"/Users/cristopherareche/Developer/2023/BootCamp/PI-Pokemon-main/client/src/views/Form/Form.jsx"
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef();
  const [pokeTypes, setPokeTypes] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    const valor = validate({ ...formValues, [name]: value });
    setFormErrors(valor);
  };

  const validate = (values) => {
    const errors = {};
    const regExpName =
      /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(([',. -][a-zA-ZÀ-ÖØ-öø-ÿ ])?[a-zA-ZÀ-ÖØ-öø-ÿ]*)*$/;
    //Name validation
    if (!values.name) {
      errors.name = "name is required";
    } else if (!regExpName.test(values.name)) {
      errors.name = "the name cannot contain numbers";
    }
    //Hp validation
    if (!values.hp) {
      errors.hp = "hp is required";
    } else if (values.hp < 1) {
      errors.hp = "the hp cannot be less than 1";
    } else if (values.hp > 100) {
      errors.hp = "the hp cannot be more than 100";
    }
    //Attack validation
    if (!values.attack) {
      errors.attack = "attack is required";
    } else if (values.attack < 1) {
      errors.attack = "the attack cannot be less than 1";
    } else if (values.attack > 100) {
      errors.attack = "the attack cannot be more than 100";
    }

    //Defense validation
    if (!values.defense) {
      errors.defense = "defense is required";
    } else if (values.defense < 1) {
      errors.defense = "the defense cannot be less than 1";
    } else if (values.defense > 100) {
      errors.defense = "the defense cannot be more than 100";
    }

    //Speed Validation
    if (!values.speed) {
      errors.speed = "speed is required";
    } else if (values.speed < 1) {
      errors.speed = "the speed cannot be less than 1";
    } else if (values.speed > 100) {
      errors.speed = "the speed cannot be more than 100";
    }

    //Height Validation
    if (!values.height) {
      errors.height = "height is required";
    } else if (values.height < 1) {
      errors.height = "the height cannot be less than 1";
    } else if (values.height > 100) {
      errors.height = "the height cannot be more than 100";
    }

    //Weight Validation
    if (!values.weight) {
      errors.weight = "weight is required";
    } else if (values.weight < 1) {
      errors.weight = "the weight cannot be less than 1";
    } else if (values.weight > 100) {
      errors.weight = "the weight cannot be more than 100";
    }

    //Image Validation
    if (!values.image) {
      errors.image = "You should select an image";
    }
    //Type validation
    if (!values.type.length) {
      errors.types = "You should select at least one type.";
    } else if (values.type.length === 1) {
      errors.types = "";
    } else if (values.type.length > 2) {
      errors.types = "You only can select two types.";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //genera un array con las llaves del objeto fomrErrors
    if (Object.keys(formErrors).length > 0) {
      alert("Please complete all the fields correctly.");
    } else {
      axios
        .post("http://localhost:3001/pokemons", formValues)
        .then((res) => alert("Pokemon has been created"))
        .catch((err) => alert(err));
      navigate("/home");
    }
  };

  const handleImageUpload = (e) => {
    setFormValues({
      ...formValues,
      image: e.target.value,
    });
  };

  const handleTypeChange = (e) => {
    var valor;
    const temporalType = e.target.value;
    if (e.target.checked) {
      // Agrega el tipo seleccionado
      setFormValues({
        ...formValues,
        type: [...formValues.type, temporalType],
      });
      valor = validate({
        ...formValues,
        type: [...formValues.type, temporalType],
      });
    } else {
      // Quita el tipo deseleccionado
      let filtrar = formValues.type.filter((t) => t !== temporalType);
      setFormValues({
        ...formValues,
        type: filtrar,
      });
      valor = validate({
        ...formValues,
        type: filtrar,
      });
    }
    setFormErrors(valor);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
    }
  }, [formErrors]);

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1>Create Pokemon</h1>
        <label className={styles.label} htmlFor="name">
          Name:
        </label>
        <input
          placeholder="Name"
          type="text"
          name="name"
          className={styles.input}
          onChange={handleChange}
          value={formValues.name}
        />
        <p>{formErrors.name}</p>
        <div className={styles.imputA}>
          <div className={styles.col}>
            <label className={styles.label} htmlFor="vida">
              Hp:
            </label>
            <input
              placeholder="Hp"
              type="number"
              name="hp"
              className={styles.input}
              onChange={handleChange}
              value={formValues.hp}
            />
            <p>{formErrors.hp}</p>
            <label className={styles.label} htmlFor="attack">
              Attack:
            </label>
            <input
              placeholder="Attack"
              type="number"
              name="attack"
              className={styles.input}
              onChange={handleChange}
              value={formValues.attack}
            />
            <p>{formErrors.attack}</p>

            <label className={styles.label} htmlFor="defense">
              Defense:
            </label>
            <input
              placeholder="Defense"
              type="number"
              name="defense"
              className={styles.input}
              onChange={handleChange}
              value={formValues.defense}
            />
            <p>{formErrors.defense}</p>
          </div>
          <div className={styles.col2}>
            <label className={styles.label} htmlFor="speed">
              Speed:
            </label>
            <input
              placeholder="Speed"
              type="number"
              name="speed"
              className={styles.input}
              onChange={handleChange}
              value={formValues.speed}
            />
            <p>{formErrors.speed}</p>

            <label className={styles.label} htmlFor="height">
              Height:
            </label>
            <input
              placeholder="Height"
              type="number"
              name="height"
              className={styles.input}
              onChange={handleChange}
              value={formValues.height}
            />
            <p>{formErrors.height}</p>

            <label className={styles.label} htmlFor="weight">
              Weight:
            </label>
            <input
              placeholder="Weight"
              type="number"
              name="weight"
              className={styles.input}
              onChange={handleChange}
              value={formValues.weight}
            />
            <p>{formErrors.weight}</p>
          </div>
        </div>

        <label className={styles.imageLabel} htmlFor="image">
          Image:
          <input
            type="text"
            name="image"
            className={styles.input}
            onChange={handleImageUpload}
            ref={fileInputRef}
          />
          {image && (
            <img
              src={image ? image : noImg}
              alt="Preview"
              className={styles.imagePreview}
            />
          )}
        </label>
        <p>{formErrors.image}</p>

        <fieldset className={styles.fieldset}>
          <legend>Select the types:</legend>

          {PokemonTypes.map((type) => {
            return (
              <div key={type}>
                <input
                  style={{ width: "30px" }}
                  type="checkbox"
                  value={type}
                  name={type}
                  onChange={handleTypeChange}
                />
                <label
                  className={styles.typeLabel}
                  htmlFor={type}
                  style={{
                    backgroundColor: `${background[type][0]}`,
                    color: `${background[type][1]}`,
                  }}
                >
                  {type}
                </label>
              </div>
            );
          })}
          <p>{formErrors.types}</p>
        </fieldset>
        <footer className={styles.btnContainer}>
          <button type="submit" className={styles.btn}>
            Create
          </button>
          <button className={styles.btn2}>Cancel</button>
        </footer>
      </form>
    </div>
  );
};
export default Form;
