import axiosInstance from "./axios-instance";

const getEdibles = (query) => {
    return axiosInstance({method: 'GET', url: `/user/edibles${query ? `?${query}` : ''}`});
}

const getEdible = (id) => {
    return axiosInstance({method: 'GET', url: `/user/edibles/${id}`});
}

const getFeaturedEdibles = () => {
    return axiosInstance({method: 'GET', url: `/user/edibles?featured=true`});
}

const getOnSaleEdibles = () => {
    return axiosInstance({method: 'GET', url: `/user/edibles?sale=true`});
}

const searchEdibles = (query) => {
    return axiosInstance({method: 'GET', url: `/user/edibles?search=${query}`});
}

export const EDIBLE_API = {getEdibles, getEdible, getFeaturedEdibles, getOnSaleEdibles, searchEdibles};
