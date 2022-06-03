import axios from "axios";
import {CONSTANTS} from "../constants/constants";

const getAllMarijuana = (token, query) => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/marijuana?query=${query}`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const MARIJUANA_API = {getAllMarijuana};