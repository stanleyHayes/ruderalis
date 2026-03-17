import axiosInstance from "./axios-instance";

const getReviews = (query) => {
    return axiosInstance({method: 'GET', url: `/user/reviews${query ? `?${query}` : ''}`});
}

const getReview = (id) => {
    return axiosInstance({method: 'GET', url: `/user/reviews/${id}`});
}

const createReview = (review) => {
    return axiosInstance({method: 'POST', url: `/user/reviews`, data: review});
}

const updateReview = (id, review) => {
    return axiosInstance({method: 'PUT', url: `/user/reviews/${id}`, data: review});
}

const deleteReview = (id) => {
    return axiosInstance({method: 'DELETE', url: `/user/reviews/${id}`});
}

export const REVIEW_API = {getReviews, getReview, createReview, updateReview, deleteReview};
