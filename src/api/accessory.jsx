import axiosInstance from "./axios-instance";

const getAccessories = (query) => {
    return axiosInstance({method: 'GET', url: `/user/accessories${query ? `?${query}` : ''}`});
}

const getAccessory = (id) => {
    return axiosInstance({method: 'GET', url: `/user/accessories/${id}`});
}

const getFeaturedAccessories = () => {
    return axiosInstance({method: 'GET', url: `/user/accessories?featured=true`});
}

const searchAccessories = (query) => {
    return axiosInstance({method: 'GET', url: `/user/accessories?search=${query}`});
}

export const ACCESSORY_API = {getAccessories, getAccessory, getFeaturedAccessories, searchAccessories};
