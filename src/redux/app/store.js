import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "../features/ui/ui-slice";
import authReducer from "../features/auth/auth-slice";
import shopReducer from "../features/shop/shop-slice";
import marijuanaReducer from "../features/marijuana/marijuana-slice";
import orderReducer from "../features/order/order-slice";
import wishlistReducer from "../features/wishlist/wishlist-slice";
import cartReducer from "../features/cart/cart-slice";
import fundReducer from "../features/fund/fund-slice";
import edibleReducer from "../features/edible/edible-slice";
import faqReducer from "../features/faq/faqs-slice";
import accessoryReducer from "../features/accessory/accessory-slice";
import testimonialReducer from "../features/testimonial/testimonials-slice";
import {CONSTANTS} from "../../constants/constants";

const themeVariant = localStorage.getItem(CONSTANTS.REGULARIS_THEME_VARIANT) ?
    JSON.parse(localStorage.getItem(CONSTANTS.REGULARIS_THEME_VARIANT)) : 'dark';

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        shop: shopReducer,
        marijuana: marijuanaReducer,
        order: orderReducer,
        fund: fundReducer,
        wishlist: wishlistReducer,
        cart: cartReducer,
        edible: edibleReducer,
        faq: faqReducer,
        testimonial: testimonialReducer,
        accessory: accessoryReducer
    },
    preloadedState: {
        ui: {themeVariant, activePath: '/', drawerOpen: false}
    }
});

export default store;