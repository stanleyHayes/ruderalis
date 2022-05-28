import {createSlice} from "@reduxjs/toolkit";
import {orders} from "./order-data";

const initialState = {
    orders: [...orders],
    orderError: null,
    orderLoading: false,
    orderMessage: null
};


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: builder => {}
});


export const selectOrder = state => state.order;

export default orderSlice.reducer;