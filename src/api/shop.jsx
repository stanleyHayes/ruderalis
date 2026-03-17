import axiosInstance from "./axios-instance";

const getShops = (query) => {
    return axiosInstance({method: 'GET', url: `/user/shops${query ? `?${query}` : ''}`});
}

const getShop = (id) => {
    return axiosInstance({method: 'GET', url: `/user/shops/${id}`});
}

const getFeaturedShops = () => {
    return axiosInstance({method: 'GET', url: `/user/shops?featured=true`});
}

const searchShops = (query) => {
    return axiosInstance({method: 'GET', url: `/user/shops?search=${query}`});
}

export const SHOP_API = {getShops, getShop, getFeaturedShops, searchShops};
