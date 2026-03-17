import axiosInstance from "./axios-instance";

const getFunds = () => {
    return axiosInstance({method: 'GET', url: `/user/payments`});
}

const loadFunds = (data) => {
    return axiosInstance({method: 'POST', url: `/user/payments`, data});
}

const getFund = (id) => {
    return axiosInstance({method: 'GET', url: `/user/payments/${id}`});
}

export const FUND_API = {getFunds, loadFunds, getFund};
