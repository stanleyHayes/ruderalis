import {createSlice} from "@reduxjs/toolkit";
import {testimonials} from "./testimonials-data";

const initialState = {
    testimonials: [...testimonials],
    testimonialError: null,
    testimonialLoading: false,
    testimonialMessage: null
}

const testimonialsSlice = createSlice({
    name: 'testimonial',
    initialState,
    reducers: {},
    extraReducers: builder => {}
});

export const selectTestimonials = state => state.testimonial;

export default testimonialsSlice.reducer;