import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PRODUCT_API} from "../../../api/product";

const initialState = {
    accessories: [],
    accessoryDetail: null,
    accessoryLoading: false,
    accessoryError: null,
    accessoryMessage: null,
    featuredAccessories: []
};

export const getAccessories = createAsyncThunk('accessory/getAccessories',
    async ({query} = {}, {rejectWithValue}) => {
        try {
            const response = await PRODUCT_API.getProductsByVariant('accessory', query);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch accessories');
        }
    });

export const getAccessory = createAsyncThunk('accessory/getAccessory',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await PRODUCT_API.getProduct(id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch accessory');
        }
    });

export const getFeaturedAccessories = createAsyncThunk('accessory/getFeaturedAccessories',
    async (_, {rejectWithValue}) => {
        try {
            const response = await PRODUCT_API.getProductsByVariant('accessory', 'featured=true');
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch featured accessories');
        }
    });

const accessorySlice = createSlice({
    name: 'accessory',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAccessories.pending, (state) => {
                state.accessoryLoading = true;
                state.accessoryError = null;
            }).addCase(getAccessories.fulfilled, (state, action) => {
                state.accessoryLoading = false;
                state.accessories = action.payload?.data || action.payload || [];
            }).addCase(getAccessories.rejected, (state, action) => {
                state.accessoryLoading = false;
                state.accessoryError = action.payload;
            })
            .addCase(getAccessory.pending, (state) => {
                state.accessoryLoading = true;
                state.accessoryError = null;
            }).addCase(getAccessory.fulfilled, (state, action) => {
                state.accessoryLoading = false;
                state.accessoryDetail = action.payload?.data || action.payload;
            }).addCase(getAccessory.rejected, (state, action) => {
                state.accessoryLoading = false;
                state.accessoryError = action.payload;
            })
            .addCase(getFeaturedAccessories.pending, (state) => {
                state.accessoryLoading = true;
            }).addCase(getFeaturedAccessories.fulfilled, (state, action) => {
                state.accessoryLoading = false;
                state.featuredAccessories = action.payload?.data || action.payload || [];
            }).addCase(getFeaturedAccessories.rejected, (state, action) => {
                state.accessoryLoading = false;
                state.accessoryError = action.payload;
            })
    }
});

export const selectAccessories = state => state.accessory;
export default accessorySlice.reducer;
