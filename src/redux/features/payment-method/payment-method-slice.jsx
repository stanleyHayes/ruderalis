import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PAYMENT_METHOD_API} from "../../../api/payment-method";

const mockPaymentMethods = [
    {
        _id: 'pm-001', type: 'mobile_money', provider: 'MTN', method_name: 'MTN Mobile Money',
        momo: {account_name: 'Shay Ford', account_number: '0241234567', network: 'MTN'},
        is_default: true, createdAt: '2025-01-15',
    },
    {
        _id: 'pm-002', type: 'mobile_money', provider: 'Vodafone', method_name: 'Vodafone Cash',
        momo: {account_name: 'Shay Ford', account_number: '0201234567', network: 'Vodafone'},
        is_default: false, createdAt: '2025-03-10',
    },
];

const initialState = {
    paymentMethods: mockPaymentMethods,
    paymentMethodLoading: false,
    paymentMethodError: null,
};

export const getPaymentMethods = createAsyncThunk('paymentMethod/getPaymentMethods',
    async (_, {rejectWithValue}) => {
        try {
            const response = await PAYMENT_METHOD_API.getPaymentMethods();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const createPaymentMethod = createAsyncThunk('paymentMethod/createPaymentMethod',
    async ({paymentMethod, navigate, showMessage}, {rejectWithValue}) => {
        try {
            const response = await PAYMENT_METHOD_API.createPaymentMethod(paymentMethod);
            showMessage(response.data.message, {variant: 'success'});
            navigate('/payment-methods');
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

export const deletePaymentMethod = createAsyncThunk('paymentMethod/deletePaymentMethod',
    async ({id, showMessage}, {rejectWithValue}) => {
        try {
            const response = await PAYMENT_METHOD_API.deletePaymentMethod(id);
            showMessage(response.data.message, {variant: 'success'});
            return {data: response.data, id};
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const paymentMethodSlice = createSlice({
    name: 'paymentMethod',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPaymentMethods.pending, (state) => {
                state.paymentMethodLoading = true;
                state.paymentMethodError = null;
            }).addCase(getPaymentMethods.fulfilled, (state, action) => {
                state.paymentMethodLoading = false;
                state.paymentMethods = action.payload?.data || action.payload || [];
            }).addCase(getPaymentMethods.rejected, (state, action) => {
                state.paymentMethodLoading = false;
                state.paymentMethodError = action.payload;
            })
            .addCase(createPaymentMethod.pending, (state) => {
                state.paymentMethodLoading = true;
                state.paymentMethodError = null;
            }).addCase(createPaymentMethod.fulfilled, (state, action) => {
                state.paymentMethodLoading = false;
                state.paymentMethods = [action.payload.data, ...state.paymentMethods];
            }).addCase(createPaymentMethod.rejected, (state, action) => {
                state.paymentMethodLoading = false;
                state.paymentMethodError = action.payload;
            })
            .addCase(deletePaymentMethod.pending, (state) => {
                state.paymentMethodLoading = true;
                state.paymentMethodError = null;
            }).addCase(deletePaymentMethod.fulfilled, (state, action) => {
                state.paymentMethodLoading = false;
                state.paymentMethods = state.paymentMethods.filter(pm => pm._id !== action.payload.id);
            }).addCase(deletePaymentMethod.rejected, (state, action) => {
                state.paymentMethodLoading = false;
                state.paymentMethodError = action.payload;
            })
    }
});

export const selectPaymentMethod = state => state.paymentMethod;
export default paymentMethodSlice.reducer;
