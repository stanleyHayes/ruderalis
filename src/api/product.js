import axios from "axios";
import {CONSTANTS} from "../constants/constants";

const getAllProduct = (token, query) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/products?query=${query}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const PRODUCT_API = {getAllProduct};