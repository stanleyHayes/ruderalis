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
import faqReducer from "../features/faq/faqs-slice";
import accessoryReducer from "../features/accessory/accessory-slice";
import testimonialReducer from "../features/testimonial/testimonials-slice";
import reviewReducer from "../features/review/review-slice";
import addressReducer from "../features/address/address-slice";
import blogReducer from "../features/blog/blog-slice";
import trackingReducer from "../features/tracking/tracking-slice";
import paymentMethodReducer from "../features/payment-method/payment-method-slice";
import promotionReducer from "../features/promotion/promotion-slice";
import conflictReducer from "../features/conflict/conflict-slice";
import {CONSTANTS} from "../../constants/constants";

const themeVariant = localStorage.getItem(CONSTANTS.REGULARIS_THEME_VARIANT) ?
    JSON.parse(localStorage.getItem(CONSTANTS.REGULARIS_THEME_VARIANT)) : 'dark';

const token = localStorage.getItem(CONSTANTS.REGULARIS_AUTH_TOKEN) ?
    JSON.parse(localStorage.getItem(CONSTANTS.REGULARIS_AUTH_TOKEN)) :
    (CONSTANTS.DEV_MODE ? CONSTANTS.DEV_TOKEN : null);

const authData = localStorage.getItem(CONSTANTS.REGULARIS_AUTH_DATA) ?
    JSON.parse(localStorage.getItem(CONSTANTS.REGULARIS_AUTH_DATA)) :
    (CONSTANTS.DEV_MODE ? CONSTANTS.DEV_USER : null);


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
            testimonial: testimonialReducer,
            accessory: accessoryReducer,
            review: reviewReducer,
            address: addressReducer,
            blog: blogReducer,
            tracking: trackingReducer,
            paymentMethod: paymentMethodReducer,
            promotion: promotionReducer,
            conflict: conflictReducer
        },
        preloadedState: {
            ui: {themeVariant, activePath: '/', drawerOpen: false},
            auth: {token, authData}
        },
    devTools: true
    });

export default store;
