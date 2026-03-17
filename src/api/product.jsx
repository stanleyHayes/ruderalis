import axiosInstance from "./axios-instance";

const getAllProducts = (query) => {
    return axiosInstance({method: 'GET', url: `/user/products${query ? `?${query}` : ''}`});
}

const getProduct = (id) => {
    return axiosInstance({method: 'GET', url: `/user/products/${id}`});
}

const getProductsByVariant = (variant, query) => {
    const params = new URLSearchParams();
    params.set('variant', variant);
    if (query) {
        const extra = new URLSearchParams(query);
        extra.forEach((v, k) => params.set(k, v));
    }
    return axiosInstance({method: 'GET', url: `/user/products?${params.toString()}`});
}

const getFeaturedProducts = () => {
    return axiosInstance({method: 'GET', url: `/user/products?featured=true`});
}

const getOnSaleProducts = () => {
    return axiosInstance({method: 'GET', url: `/user/products?sale=true`});
}

const searchProducts = (query) => {
    return axiosInstance({method: 'GET', url: `/user/products?search=${query}`});
}

export const PRODUCT_API = {getAllProducts, getProduct, getProductsByVariant, getFeaturedProducts, getOnSaleProducts, searchProducts};
