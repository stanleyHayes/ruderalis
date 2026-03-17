import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TESTIMONIAL_API} from "../../../api/testimonial";

const initialState = {
    testimonials: [],
    testimonialError: null,
    testimonialLoading: false,
    testimonialMessage: null
}

export const getTestimonials = createAsyncThunk('testimonial/getTestimonials',
    async (_, {rejectWithValue}) => {
        try {
            const response = await TESTIMONIAL_API.getTestimonials();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const createTestimonial = createAsyncThunk('testimonial/createTestimonial',
    async ({data, showMessage, resetForm}, {rejectWithValue}) => {
        try {
            const response = await TESTIMONIAL_API.createTestimonial(data);
            if (resetForm) resetForm();
            showMessage(response.data.message, {variant: 'success'});
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const testimonialsSlice = createSlice({
    name: 'testimonial',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTestimonials.pending, (state) => {
                state.testimonialLoading = true;
                state.testimonialError = null;
            }).addCase(getTestimonials.fulfilled, (state, action) => {
                state.testimonialLoading = false;
                state.testimonials = action.payload?.data || action.payload || [];
            }).addCase(getTestimonials.rejected, (state, action) => {
                state.testimonialLoading = false;
                state.testimonialError = action.payload;
            })
            .addCase(createTestimonial.pending, (state) => {
                state.testimonialLoading = true;
                state.testimonialError = null;
            }).addCase(createTestimonial.fulfilled, (state, action) => {
                state.testimonialLoading = false;
                state.testimonials = [action.payload.data, ...state.testimonials];
            }).addCase(createTestimonial.rejected, (state, action) => {
                state.testimonialLoading = false;
                state.testimonialError = action.payload;
            })
    }
});

export const selectTestimonials = state => state.testimonial;
export default testimonialsSlice.reducer;
