import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {SHOP_API} from "../../../api/shop";

const initialState = {
    shops: [],
    shopDetail: null,
    shopLoading: false,
    shopError: null,
    shopMessage: null,
    featuredShops: []
}

export const getShops = createAsyncThunk('shop/getShops',
    async ({query}, {rejectWithValue}) => {
        try {
            const response = await SHOP_API.getShops(query);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch shops');
        }
    });

export const getShop = createAsyncThunk('shop/getShop',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await SHOP_API.getShop(id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch shop');
        }
    });

export const getFeaturedShops = createAsyncThunk('shop/getFeaturedShops',
    async (_, {rejectWithValue}) => {
        try {
            const response = await SHOP_API.getFeaturedShops();
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch featured shops');
        }
    });

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getShops.pending, (state) => {
                state.shopLoading = true;
                state.shopError = null;
            }).addCase(getShops.fulfilled, (state, action) => {
                state.shopLoading = false;
                state.shops = action.payload?.data || action.payload || [];
                state.shopMessage = action.payload?.message;
            }).addCase(getShops.rejected, (state, action) => {
                state.shopLoading = false;
                state.shopError = action.payload;
            })
            .addCase(getShop.pending, (state) => {
                state.shopLoading = true;
                state.shopError = null;
            }).addCase(getShop.fulfilled, (state, action) => {
                state.shopLoading = false;
                state.shopDetail = action.payload?.data || action.payload;
            }).addCase(getShop.rejected, (state, action) => {
                state.shopLoading = false;
                state.shopError = action.payload;
            })
            .addCase(getFeaturedShops.pending, (state) => {
                state.shopLoading = true;
                state.shopError = null;
            }).addCase(getFeaturedShops.fulfilled, (state, action) => {
                state.shopLoading = false;
                state.featuredShops = action.payload?.data || action.payload || [];
            }).addCase(getFeaturedShops.rejected, (state, action) => {
                state.shopLoading = false;
                state.shopError = action.payload;
            })
    }
});

export const selectShop = state => state.shop;
export default shopSlice.reducer;
