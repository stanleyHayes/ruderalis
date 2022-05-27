import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "../features/ui/ui-slice";
import authReducer from "../features/auth/auth-slice";
import shopReducer from "../features/shop/shop-slice";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer,
        shop: shopReducer,
    }
});

export default store;