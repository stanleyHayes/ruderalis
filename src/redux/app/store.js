import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "../features/ui/ui-slice";
import authReducer from "../features/auth/auth-slice";
import shopReducer from "../features/shop/shop-slice";
import productReducer from "../features/product/product-slice";
import orderReducer from "../features/order/order-slice";
import orderTransaction from "../features/transaction/transaction-slice";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        shop: shopReducer,
        product: productReducer,
        order: orderReducer,
        transaction: orderTransaction
    }
});

export default store;