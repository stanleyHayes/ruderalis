import {createSlice} from "@reduxjs/toolkit";
import {transactions} from "./transaction-data";

const initialState = {
    transactions: [...transactions],
    transactionError: null,
    transactionLoading: false,
    transactionMessage: null
}


const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {},
    extraReducers: builder => {}
});

export const selectTransaction = state => state.transaction;

export default transactionSlice.reducer;