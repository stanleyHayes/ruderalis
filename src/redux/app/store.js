import {configureStore} from "@reduxjs/toolkit";
import uiReducer from "../features/ui/ui-slice";
import authReducer from "../features/auth/auth-slice";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        auth: authReducer
    }
});

export default store;