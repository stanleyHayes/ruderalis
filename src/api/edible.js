import axios from "axios";
import {CONSTANTS} from "../constants/constants";

const getEdibles = (token, query) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/edibles?query=${query}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const EDIBLE_API = {getEdibles};