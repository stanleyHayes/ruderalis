import axiosInstance from "./axios-instance";

const getFAQs = () => {
    return axiosInstance({method: 'GET', url: `/user/faqs`});
}

const getFAQ = (id) => {
    return axiosInstance({method: 'GET', url: `/user/faqs/${id}`});
}

export const FAQ_API = {getFAQs, getFAQ};
