import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PRODUCT_API} from "../../../api/product";
import {products} from "./product-data";

const initialState = {
    products: [...products],
    productError: null,
    productLoading: false,
    productMessage: null,
    productDetail: products[0],
    featuredProducts: [...products],
    onSaleProducts: [...products]
}

export const getProducts = createAsyncThunk('product/getProducts', async ({token, query}) => {
    try {
        return await PRODUCT_API.getProducts(token, query);
    }catch (e) {
        const {message} = e.response.data;
        return message;
    }
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProducts.pending, (state) => {
            state.productLoading = true;
            state.productError = null;
            state.productMessage = null;
        }).addCase(getProducts.fulfilled, (state, action) => {
            state.productLoading = false;
            state.productError = null;
            state.productMessage = action.payload.message;
            state.products = action.payload.data;
        }).addCase(getProducts.rejected, (state, action) => {
            state.productLoading = false;
            state.productError = action.payload;
            state.productMessage = action.payload;
            state.products = [];
        })
    }
});

export const selectProduct = state => state.product;

export default productSlice.reducer;