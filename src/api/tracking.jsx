import axiosInstance from "./axios-instance";

const trackOrder = (code) => {
    return axiosInstance({method: 'GET', url: `/user/tracking/${code}`});
}

export const TRACKING_API = {trackOrder};
