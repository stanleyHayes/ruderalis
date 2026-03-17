import axiosInstance from "./axios-instance";

const submitContact = (data) => {
    return axiosInstance({method: 'POST', url: `/user/contact`, data});
}

export const CONTACT_API = {submitContact};
