import axiosInstance from "./axios-instance";

const getWishlists = () => {
    return axiosInstance({method: 'GET', url: `/user/wishlists`});
}

const addToWishlist = (data) => {
    return axiosInstance({method: 'POST', url: `/user/wishlists`, data});
}

const removeFromWishlist = (id) => {
    return axiosInstance({method: 'DELETE', url: `/user/wishlists/${id}`});
}

export const WISHLIST_API = {getWishlists, addToWishlist, removeFromWishlist};
