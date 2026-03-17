import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PRODUCT_API} from "../../../api/product";

const initialState = {
    edibles: [],
    edibleError: null,
    edibleLoading: false,
    edibleMessage: null,
    edibleDetail: null,
    featuredEdibles: [],
    onSaleEdibles: []
}

export const getEdibles = createAsyncThunk('edible/getEdibles',
    async ({query} = {}, {rejectWithValue}) => {
        try {
            const response = await PRODUCT_API.getProductsByVariant('edible', query);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch edibles');
        }
    });

export const getEdible = createAsyncThunk('edible/getEdible',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await PRODUCT_API.getProduct(id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch edible');
        }
    });

export const getFeaturedEdibles = createAsyncThunk('edible/getFeaturedEdibles',
    async (_, {rejectWithValue}) => {
        try {
            const response = await PRODUCT_API.getProductsByVariant('edible', 'featured=true');
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch featured edibles');
        }
    });

const edibleSlice = createSlice({
    name: 'edible',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getEdibles.pending, (state) => {
                state.edibleLoading = true;
                state.edibleError = null;
            }).addCase(getEdibles.fulfilled, (state, action) => {
                state.edibleLoading = false;
                state.edibles = action.payload?.data || action.payload || [];
            }).addCase(getEdibles.rejected, (state, action) => {
                state.edibleLoading = false;
                state.edibleError = action.payload;
            })
            .addCase(getEdible.pending, (state) => {
                state.edibleLoading = true;
                state.edibleError = null;
            }).addCase(getEdible.fulfilled, (state, action) => {
                state.edibleLoading = false;
                state.edibleDetail = action.payload?.data || action.payload;
            }).addCase(getEdible.rejected, (state, action) => {
                state.edibleLoading = false;
                state.edibleError = action.payload;
            })
            .addCase(getFeaturedEdibles.pending, (state) => {
                state.edibleLoading = true;
            }).addCase(getFeaturedEdibles.fulfilled, (state, action) => {
                state.edibleLoading = false;
                state.featuredEdibles = action.payload?.data || action.payload || [];
            }).addCase(getFeaturedEdibles.rejected, (state, action) => {
                state.edibleLoading = false;
                state.edibleError = action.payload;
            })
    }
});

export const selectEdible = state => state.edible;
export default edibleSlice.reducer;
