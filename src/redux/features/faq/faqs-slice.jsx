import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {FAQ_API} from "../../../api/faq";

const initialState = {
    faqs: [],
    faqError: null,
    faqLoading: false,
    faqMessage: null
}

export const getFAQs = createAsyncThunk('faq/getFAQs',
    async (_, {rejectWithValue}) => {
        try {
            const response = await FAQ_API.getFAQs();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

const faqsSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getFAQs.pending, (state) => {
                state.faqLoading = true;
                state.faqError = null;
            }).addCase(getFAQs.fulfilled, (state, action) => {
                state.faqLoading = false;
                state.faqs = action.payload?.data || action.payload || [];
            }).addCase(getFAQs.rejected, (state, action) => {
                state.faqLoading = false;
                state.faqError = action.payload;
            })
    }
});

export const selectFAQs = state => state.faq;
export default faqsSlice.reducer;
