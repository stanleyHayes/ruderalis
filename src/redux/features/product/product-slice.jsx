import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PRODUCT_API} from "../../../api/product";

const initialState = {
    products: [],
    productError: null,
    productLoading: false,
    productMessage: null,
    productDetail: null,
    featuredProducts: [],
    onSaleProducts: []
}

export const getAllProducts = createAsyncThunk('product/getProducts',
    async ({query}, {rejectWithValue}) => {
        try {
            const response = await PRODUCT_API.getAllProducts(query);
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const getProduct = createAsyncThunk('product/getProduct',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await PRODUCT_API.getProduct(id);
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const getFeaturedProducts = createAsyncThunk('product/getFeaturedProducts',
    async (_, {rejectWithValue}) => {
        try {
            const response = await PRODUCT_API.getFeaturedProducts();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const getOnSaleProducts = createAsyncThunk('product/getOnSaleProducts',
    async (_, {rejectWithValue}) => {
        try {
            const response = await PRODUCT_API.getOnSaleProducts();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.productLoading = true;
                state.productError = null;
            }).addCase(getAllProducts.fulfilled, (state, action) => {
                state.productLoading = false;
                state.productMessage = action.payload.message;
                state.products = action.payload?.data || action.payload || [];
            }).addCase(getAllProducts.rejected, (state, action) => {
                state.productLoading = false;
                state.productError = action.payload;
            })
            .addCase(getProduct.pending, (state) => {
                state.productLoading = true;
                state.productError = null;
            }).addCase(getProduct.fulfilled, (state, action) => {
                state.productLoading = false;
                state.productDetail = action.payload?.data || action.payload || [];
            }).addCase(getProduct.rejected, (state, action) => {
                state.productLoading = false;
                state.productError = action.payload;
            })
            .addCase(getFeaturedProducts.pending, (state) => {
                state.productLoading = true;
                state.productError = null;
            }).addCase(getFeaturedProducts.fulfilled, (state, action) => {
                state.productLoading = false;
                state.featuredProducts = action.payload?.data || action.payload || [];
            }).addCase(getFeaturedProducts.rejected, (state, action) => {
                state.productLoading = false;
                state.productError = action.payload;
            })
            .addCase(getOnSaleProducts.pending, (state) => {
                state.productLoading = true;
                state.productError = null;
            }).addCase(getOnSaleProducts.fulfilled, (state, action) => {
                state.productLoading = false;
                state.onSaleProducts = action.payload?.data || action.payload || [];
            }).addCase(getOnSaleProducts.rejected, (state, action) => {
                state.productLoading = false;
                state.productError = action.payload;
            })
    }
});

export const selectProducts = state => state.product;
export default productSlice.reducer;
