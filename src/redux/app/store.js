import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "../features/ui/ui-slice";
import authReducer from "../features/auth/auth-slice";
import shopReducer from "../features/shop/shop-slice";
import productReducer from "../features/product/product-slice";
import orderReducer from "../features/order/order-slice";
import wishlistReducer from "../features/wishlist/wishlist-slice";
import cartReducer from "../features/cart/cart-slice";
import fundReducer from "../features/fund/fund-slice";
import edibleReducer from "../features/edible/edible-slice";
import faqReducer from "../features/faqs/faqs-slice";
import testimonialReducer from "../features/testimonials/testimonials-slice";
import {CONSTANTS} from "../../constants/constants";

const themeVariant = localStorage.getItem(CONSTANTS.REGULARIS_THEME_VARIANT) ?
    JSON.parse(localStorage.getItem(CONSTANTS.REGULARIS_THEME_VARIANT)) : 'light';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        shop: shopReducer,
        product: productReducer,
        order: orderReducer,
        fund: fundReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        edible: edibleReducer,
        faq: faqReducer,
        testimonial: testimonialReducer
    },
    initialState: {
        ui: {themeVariant, activePath: '/', drawerOpen: false}
    }
});

export default store;