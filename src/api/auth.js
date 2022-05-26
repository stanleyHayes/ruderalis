import axios from "axios";
import {CONSTANTS} from "../constants/constants";

const login =  async (user) => {
    return axios({
        method: 'POST',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/auth/login`,
        data: user
    });
}

const authAPI = {login};
export default authAPI;