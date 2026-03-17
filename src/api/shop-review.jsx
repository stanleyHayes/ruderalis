import axiosInstance from "./axios-instance";

const getShopReviews = (query) => {
    return axiosInstance({method: 'GET', url: `/user/shop-reviews${query ? `?${query}` : ''}`});
}

const getShopReview = (id) => {
    return axiosInstance({method: 'GET', url: `/user/shop-reviews/${id}`});
}

const createShopReview = (data) => {
    return axiosInstance({method: 'POST', url: `/user/shop-reviews`, data});
}

const updateShopReview = (id, data) => {
    return axiosInstance({method: 'PUT', url: `/user/shop-reviews/${id}`, data});
}

const deleteShopReview = (id) => {
    return axiosInstance({method: 'DELETE', url: `/user/shop-reviews/${id}`});
}

export const SHOP_REVIEW_API = {getShopReviews, getShopReview, createShopReview, updateShopReview, deleteShopReview};
