import axios from "axios";
import { ETHERSCAN_API_KEY } from "../contstants/constants";
const getABI = async (tokenAddress) => {
  try {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=${tokenAddress}&apikey=${ETHERSCAN_API_KEY}`
    );
    if (response) {
      return JSON.parse(response.data.result);
    } else throw Error("Failed!");
  } catch (error) {
    console.log(error);
  }
};

export default getABI;
