import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ORDER_API} from "../../../api/order";

const initialState = {
    orders: [],
    orderDetail: null,
    orderError: null,
    orderLoading: false,
    orderMessage: null
};

export const getOrders = createAsyncThunk('order/getOrders',
    async (_, {rejectWithValue}) => {
        try {
            const response = await ORDER_API.getOrders();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const getOrder = createAsyncThunk('order/getOrder',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await ORDER_API.getOrder(id);
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const createOrder = createAsyncThunk('order/createOrder',
    async ({order, navigate, showMessage}, {rejectWithValue}) => {
        try {
            const response = await ORDER_API.createOrder(order);
            navigate('/checkout/order/confirmed');
            showMessage(response.data.message, {variant: 'success'});
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

export const cancelOrder = createAsyncThunk('order/cancelOrder',
    async ({id, showMessage}, {rejectWithValue}) => {
        try {
            const response = await ORDER_API.cancelOrder(id);
            showMessage(response.data.message, {variant: 'success'});
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getOrders.pending, (state) => {
                state.orderLoading = true;
                state.orderError = null;
            }).addCase(getOrders.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.orders = action.payload?.data || action.payload || [];
                state.orderMessage = action.payload.message;
            }).addCase(getOrders.rejected, (state, action) => {
                state.orderLoading = false;
                state.orderError = action.payload;
            })
            .addCase(getOrder.pending, (state) => {
                state.orderLoading = true;
                state.orderError = null;
            }).addCase(getOrder.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.orderDetail = action.payload?.data || action.payload || [];
            }).addCase(getOrder.rejected, (state, action) => {
                state.orderLoading = false;
                state.orderError = action.payload;
            })
            .addCase(createOrder.pending, (state) => {
                state.orderLoading = true;
                state.orderError = null;
            }).addCase(createOrder.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.orders = [action.payload.data, ...state.orders];
                state.orderMessage = action.payload.message;
            }).addCase(createOrder.rejected, (state, action) => {
                state.orderLoading = false;
                state.orderError = action.payload;
            })
            .addCase(cancelOrder.pending, (state) => {
                state.orderLoading = true;
                state.orderError = null;
            }).addCase(cancelOrder.fulfilled, (state, action) => {
                state.orderLoading = false;
                state.orders = state.orders.map(order =>
                    order._id === action.payload.data._id ? action.payload.data : order
                );
                state.orderMessage = action.payload.message;
            }).addCase(cancelOrder.rejected, (state, action) => {
                state.orderLoading = false;
                state.orderError = action.payload;
            })
    }
});

export const selectOrder = state => state.order;
export default orderSlice.reducer;
