import axiosInstance from "./axios-instance";

const getTestimonials = () => {
    return axiosInstance({method: 'GET', url: `/user/testimonials`});
}

const getTestimonial = (id) => {
    return axiosInstance({method: 'GET', url: `/user/testimonials/${id}`});
}

const createTestimonial = (data) => {
    return axiosInstance({method: 'POST', url: `/user/testimonials`, data});
}

const updateTestimonial = (id, data) => {
    return axiosInstance({method: 'PUT', url: `/user/testimonials/${id}`, data});
}

const deleteTestimonial = (id) => {
    return axiosInstance({method: 'DELETE', url: `/user/testimonials/${id}`});
}

export const TESTIMONIAL_API = {getTestimonials, getTestimonial, createTestimonial, updateTestimonial, deleteTestimonial};
