import axios from "axios";
import {CONSTANTS} from "../constants/constants";

const getShops = (token, query) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/shops?query=${query}`,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const SHOP_API = {getShops};