import axiosInstance from "./axios-instance";

const login = (user) => {
    return axiosInstance({method: 'POST', url: `/user/auth/login`, data: user});
}

const register = (user) => {
    return axiosInstance({method: 'POST', url: `/user/auth/register`, data: user});
}

const getProfile = () => {
    return axiosInstance({method: 'GET', url: `/user/auth/profile`});
}

const updateProfile = (data) => {
    return axiosInstance({method: 'PUT', url: `/user/auth/profile`, data});
}

const deleteAccount = () => {
    return axiosInstance({method: 'DELETE', url: `/user/auth/profile`});
}

const changePassword = (data) => {
    return axiosInstance({method: 'PUT', url: `/user/auth/passwords/change`, data});
}

const resetPassword = (data) => {
    return axiosInstance({method: 'PUT', url: `/user/auth/passwords/reset`, data});
}

const changePin = (data) => {
    return axiosInstance({method: 'PUT', url: `/user/auth/pins/change`, data});
}

const resetPin = (data) => {
    return axiosInstance({method: 'PUT', url: `/user/auth/pins/reset`, data});
}

const verifyOTP = (data, token) => {
    return axiosInstance({method: 'POST', url: `/user/auth/otp/${token}/verify`, data});
}

const resendOTP = (data) => {
    return axiosInstance({method: 'POST', url: `/user/auth/otp/resend`, data});
}

const logout = () => {
    return axiosInstance({method: 'POST', url: `/user/auth/logout`});
}

const authAPI = {
    login, register, getProfile, updateProfile, deleteAccount,
    changePassword, resetPassword, changePin, resetPin,
    verifyOTP, resendOTP, logout
};

export default authAPI;
