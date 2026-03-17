import axiosInstance from "./axios-instance";

const getAddresses = () => {
    return axiosInstance({method: 'GET', url: `/user/addresses`});
}

const getAddress = (id) => {
    return axiosInstance({method: 'GET', url: `/user/addresses/${id}`});
}

const createAddress = (address) => {
    return axiosInstance({method: 'POST', url: `/user/addresses`, data: address});
}

const updateAddress = (id, address) => {
    return axiosInstance({method: 'PUT', url: `/user/addresses/${id}`, data: address});
}

const deleteAddress = (id) => {
    return axiosInstance({method: 'DELETE', url: `/user/addresses/${id}`});
}

export const ADDRESS_API = {getAddresses, getAddress, createAddress, updateAddress, deleteAddress};
