import axiosInstance from "./axios-instance";

const subscribe = (data) => {
    return axiosInstance({method: 'POST', url: `/user/newsletter/subscribe`, data});
}

const unsubscribe = (data) => {
    return axiosInstance({method: 'POST', url: `/user/newsletter/unsubscribe`, data});
}

export const NEWSLETTER_API = {subscribe, unsubscribe};
