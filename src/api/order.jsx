import axiosInstance from "./axios-instance";

const getOrders = () => {
    return axiosInstance({method: 'GET', url: `/user/orders`});
}

const getOrder = (id) => {
    return axiosInstance({method: 'GET', url: `/user/orders/${id}`});
}

const createOrder = (order) => {
    return axiosInstance({method: 'POST', url: `/user/orders`, data: order});
}

const updateOrder = (id, data) => {
    return axiosInstance({method: 'PUT', url: `/user/orders/${id}`, data});
}

const cancelOrder = (id) => {
    return axiosInstance({method: 'PUT', url: `/user/orders/${id}/cancel`});
}

export const ORDER_API = {getOrders, getOrder, createOrder, updateOrder, cancelOrder};
