const axios = require("axios");
const { Type } = require("../db.js");
const { getTypes } = require("../services/getTypesFromApi.service.js");

exports.allTypes = async (req, res) => {
  try {
    const typesFromDb = await Type.findAll();

    if (typesFromDb.length > 0) {
      const types = typesFromDb.map((type) => type.name);
      res.status(200).send(types);
    } else {
      const typesFromAPI = await getTypes();
      const types = await Promise.all(
        typesFromAPI.map(async (typeName) => {
          const type = await Type.create({ name: typeName });
          return type.name;
        })
      );
      res.status(200).send(types);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Internal Server Error");
  }
};
