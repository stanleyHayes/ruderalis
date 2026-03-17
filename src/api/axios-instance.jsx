import axios from "axios";
import {CONSTANTS} from "../constants/constants";

const axiosInstance = axios.create({
    baseURL: CONSTANTS.SERVER_BASE_URL
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem(CONSTANTS.REGULARIS_AUTH_TOKEN)
            ? JSON.parse(localStorage.getItem(CONSTANTS.REGULARIS_AUTH_TOKEN))
            : null;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem(CONSTANTS.REGULARIS_AUTH_TOKEN);
            localStorage.removeItem(CONSTANTS.REGULARIS_AUTH_DATA);
            if (window.location.pathname !== '/auth/login') {
                window.location.href = '/auth/login';
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
