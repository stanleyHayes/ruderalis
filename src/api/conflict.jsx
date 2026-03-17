import axiosInstance from "./axios-instance";

const getConflicts = () => {
    return axiosInstance({method: 'GET', url: `/user/conflicts`});
};

const getConflict = (id) => {
    return axiosInstance({method: 'GET', url: `/user/conflicts/${id}`});
};

const createConflict = (data) => {
    return axiosInstance({method: 'POST', url: `/user/conflicts`, data});
};

const updateConflict = (id, data) => {
    return axiosInstance({method: 'PUT', url: `/user/conflicts/${id}`, data});
};

const addMessage = (id, data) => {
    return axiosInstance({method: 'POST', url: `/user/conflicts/${id}/messages`, data});
};

const resolveConflict = (id, data) => {
    return axiosInstance({method: 'PUT', url: `/user/conflicts/${id}/resolve`, data});
};

const escalateConflict = (id) => {
    return axiosInstance({method: 'PUT', url: `/user/conflicts/${id}/escalate`});
};

export const CONFLICT_API = {getConflicts, getConflict, createConflict, updateConflict, addMessage, resolveConflict, escalateConflict};
