import axios from "axios";
import {CONSTANTS} from "../constants/constants";

const login = (user) => {
    return axios({
        method: 'POST',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/auth/login`,
        data: user
    });
}

const getProfile = token => {
    return axios({
        method: 'GET',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/auth/profile`,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}


const verifyOTP = (otp, token) => {
    return axios({
        method: 'POST',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/auth/otp/${token}/verify`,
        data: otp
    });
}


const resendOTP = (user) => {
    return axios({
        method: 'POST',
        url: `${CONSTANTS.SERVER_BASE_URL}/user/auth/otp/resend`,
        data: user
    });
}

const authAPI = {login, getProfile, verifyOTP, resendOTP};
export default authAPI;