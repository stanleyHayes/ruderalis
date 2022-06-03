import {createSlice} from "@reduxjs/toolkit";
import {faqs} from "./faqs-data";

const initialState = {
    faqs: [...faqs],
    faqError: null,
    faqLoading: false,
    faqMessage: null
}

const faqsSlice = createSlice({
    name: 'faq',
    initialState,
    reducers: {},
    extraReducers: builder => {}
});

export const selectFAQs = state => state.faq;

export default faqsSlice.reducer;