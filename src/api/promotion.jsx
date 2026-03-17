import axiosInstance from "./axios-instance";

const getPromotions = () => {
    return axiosInstance({method: 'GET', url: `/user/promotions`});
}

const getPromotion = (id) => {
    return axiosInstance({method: 'GET', url: `/user/promotions/${id}`});
}

const createPromotion = (data) => {
    return axiosInstance({method: 'POST', url: `/user/promotions`, data});
}

const getCoupons = () => {
    return axiosInstance({method: 'GET', url: `/user/coupons`});
}

const validateCoupon = (data) => {
    return axiosInstance({method: 'POST', url: `/user/coupons/validate`, data});
}

export const PROMOTION_API = {getPromotions, getPromotion, createPromotion, getCoupons, validateCoupon};
