import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {SHOP_API} from "../../../api/shop";
import {shops} from "./shop-data";

const initialState = {
    shops: [...shops],
    shopDetail: shops[0],
    shopLoading: false,
    shopError: null,
    shopMessage: null,
    featuredShops: [...shops]
}

export const getShops = createAsyncThunk('shop/getShops', async ({token, query}) => {
    try {
        return await SHOP_API.getShops(token, query);
    }catch (e) {
        const {message} = e.response.data;
        return message;
    }
});

const shopSlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getShops.pending, (state) => {
            state.shopLoading = true;
            state.shoppingError = null;
        }).addCase(getShops.fulfilled, (state, action) => {
            state.shopLoading = false;
            state.shopError = null;
            state.shops = action.payload.data;
            state.shopMessage = action.payload.message;
        }).addCase(getShops.rejected, (state, action) => {
            state.shopLoading = false;
            state.shopError = action.payload;
            state.shops = [];
            state.shopMessage = action.payload;
        })
    }
});

export const selectShop = state => state.shop;
export default shopSlice.reducer;