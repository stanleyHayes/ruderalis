import axiosInstance from "./axios-instance";

const getPayments = () => {
    return axiosInstance({method: 'GET', url: `/user/payments`});
}

const createPayment = (data) => {
    return axiosInstance({method: 'POST', url: `/user/payments`, data});
}

const getPayment = (id) => {
    return axiosInstance({method: 'GET', url: `/user/payments/${id}`});
}

export const FUND_API = {getPayments, createPayment, getPayment};
