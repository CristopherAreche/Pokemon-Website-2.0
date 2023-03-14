const axios = require("axios");
const { TYPE_API } = process.env;

exports.getTypes = async (req, res) => {
  try {
    const response = await axios.get(TYPE_API);
    const types = response.data.results.map((type) => type.name);
    return types;
  } catch (error) {
    throw new Error("Error to obtain pokemon from api.");
  }
};
