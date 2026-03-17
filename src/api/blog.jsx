import axiosInstance from "./axios-instance";

const getBlogs = () => {
    return axiosInstance({method: 'GET', url: `/user/blogs`});
}

const getBlog = (id) => {
    return axiosInstance({method: 'GET', url: `/user/blogs/${id}`});
}

export const BLOG_API = {getBlogs, getBlog};
