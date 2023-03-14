import axios from "axios";

export const returnUrl = async (url) => {
  const urlResponse = await axios(url);
  return urlResponse.data;
};
