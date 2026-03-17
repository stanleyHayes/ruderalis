import axiosInstance from "./axios-instance";

const getPaymentMethods = () => {
    return axiosInstance({method: 'GET', url: `/user/payment-methods`});
}

const getPaymentMethod = (id) => {
    return axiosInstance({method: 'GET', url: `/user/payment-methods/${id}`});
}

const createPaymentMethod = (paymentMethod) => {
    return axiosInstance({method: 'POST', url: `/user/payment-methods`, data: paymentMethod});
}

const deletePaymentMethod = (id) => {
    return axiosInstance({method: 'DELETE', url: `/user/payment-methods/${id}`});
}

export const PAYMENT_METHOD_API = {getPaymentMethods, getPaymentMethod, createPaymentMethod, deletePaymentMethod};
