import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ADDRESS_API} from "../../../api/address";

const initialState = {
    addresses: [],
    addressDetail: null,
    addressLoading: false,
    addressError: null,
    addressMessage: null
};

export const getAddresses = createAsyncThunk('address/getAddresses',
    async (_, {rejectWithValue}) => {
        try {
            const response = await ADDRESS_API.getAddresses();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const getAddress = createAsyncThunk('address/getAddress',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await ADDRESS_API.getAddress(id);
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const createAddress = createAsyncThunk('address/createAddress',
    async ({address, navigate, showMessage}, {rejectWithValue}) => {
        try {
            const response = await ADDRESS_API.createAddress(address);
            showMessage(response.data.message, {variant: 'success'});
            navigate('/addresses');
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

export const updateAddress = createAsyncThunk('address/updateAddress',
    async ({id, address, navigate, showMessage}, {rejectWithValue}) => {
        try {
            const response = await ADDRESS_API.updateAddress(id, address);
            showMessage(response.data.message, {variant: 'success'});
            navigate('/addresses');
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

export const deleteAddress = createAsyncThunk('address/deleteAddress',
    async ({id, showMessage}, {rejectWithValue}) => {
        try {
            const response = await ADDRESS_API.deleteAddress(id);
            showMessage(response.data.message, {variant: 'success'});
            return {data: response.data, id};
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAddresses.pending, (state) => {
                state.addressLoading = true;
                state.addressError = null;
            }).addCase(getAddresses.fulfilled, (state, action) => {
                state.addressLoading = false;
                state.addresses = action.payload?.data || action.payload || [];
                state.addressMessage = action.payload.message;
            }).addCase(getAddresses.rejected, (state, action) => {
                state.addressLoading = false;
                state.addressError = action.payload;
            })
            .addCase(getAddress.pending, (state) => {
                state.addressLoading = true;
                state.addressError = null;
            }).addCase(getAddress.fulfilled, (state, action) => {
                state.addressLoading = false;
                state.addressDetail = action.payload?.data || action.payload || [];
            }).addCase(getAddress.rejected, (state, action) => {
                state.addressLoading = false;
                state.addressError = action.payload;
            })
            .addCase(createAddress.pending, (state) => {
                state.addressLoading = true;
                state.addressError = null;
            }).addCase(createAddress.fulfilled, (state, action) => {
                state.addressLoading = false;
                state.addresses = [action.payload.data, ...state.addresses];
                state.addressMessage = action.payload.message;
            }).addCase(createAddress.rejected, (state, action) => {
                state.addressLoading = false;
                state.addressError = action.payload;
            })
            .addCase(updateAddress.pending, (state) => {
                state.addressLoading = true;
                state.addressError = null;
            }).addCase(updateAddress.fulfilled, (state, action) => {
                state.addressLoading = false;
                state.addresses = state.addresses.map(address =>
                    address._id === action.payload.data._id ? action.payload.data : address
                );
                state.addressMessage = action.payload.message;
            }).addCase(updateAddress.rejected, (state, action) => {
                state.addressLoading = false;
                state.addressError = action.payload;
            })
            .addCase(deleteAddress.pending, (state) => {
                state.addressLoading = true;
                state.addressError = null;
            }).addCase(deleteAddress.fulfilled, (state, action) => {
                state.addressLoading = false;
                state.addresses = state.addresses.filter(a => a._id !== action.payload.id);
                state.addressMessage = action.payload.data.message;
            }).addCase(deleteAddress.rejected, (state, action) => {
                state.addressLoading = false;
                state.addressError = action.payload;
            })
    }
});

export const selectAddress = state => state.address;
export default addressSlice.reducer;
