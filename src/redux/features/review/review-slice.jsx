import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {REVIEW_API} from "../../../api/review";

const initialState = {
    reviews: [],
    reviewLoading: false,
    reviewError: null,
    reviewMessage: null
};

export const getReviews = createAsyncThunk('review/getReviews',
    async ({productId}, {rejectWithValue}) => {
        try {
            const response = await REVIEW_API.getReviews(productId);
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const createReview = createAsyncThunk('review/createReview',
    async ({review, showMessage, handleClose}, {rejectWithValue}) => {
        try {
            const response = await REVIEW_API.createReview(review);
            showMessage(response.data.message, {variant: 'success'});
            if (handleClose) handleClose();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

export const deleteReview = createAsyncThunk('review/deleteReview',
    async ({id, showMessage}, {rejectWithValue}) => {
        try {
            const response = await REVIEW_API.deleteReview(id);
            showMessage(response.data.message, {variant: 'success'});
            return {data: response.data, id};
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getReviews.pending, (state) => {
                state.reviewLoading = true;
                state.reviewError = null;
            }).addCase(getReviews.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.reviews = action.payload?.data || action.payload || [];
            }).addCase(getReviews.rejected, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = action.payload;
            })
            .addCase(createReview.pending, (state) => {
                state.reviewLoading = true;
                state.reviewError = null;
            }).addCase(createReview.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.reviews = [action.payload.data, ...state.reviews];
            }).addCase(createReview.rejected, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = action.payload;
            })
            .addCase(deleteReview.pending, (state) => {
                state.reviewLoading = true;
            }).addCase(deleteReview.fulfilled, (state, action) => {
                state.reviewLoading = false;
                state.reviews = state.reviews.filter(r => r._id !== action.payload.id);
            }).addCase(deleteReview.rejected, (state, action) => {
                state.reviewLoading = false;
                state.reviewError = action.payload;
            })
    }
});

export const selectReview = state => state.review;
export default reviewSlice.reducer;
