import {createSlice} from "@reduxjs/toolkit";
import {funds} from "./fund-data";

const initialState = {
    funds: [...funds],
    fundError: null,
    fundLoading: false,
    fundMessage: null
}


const fundSlice = createSlice({
    name: 'fund',
    initialState,
    reducers: {},
    extraReducers: builder => {}
});

export const selectFund = state => state.fund;

export default fundSlice.reducer;