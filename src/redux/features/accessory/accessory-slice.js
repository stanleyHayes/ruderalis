import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    accessories: [],
    accessoryLoading: false,
    accessoryError: null,
    accessoryMessage: null
};
const accessorySlice = createSlice({
    name: 'accessory',
    initialState,
    reducers: {},
    extraReducers: {}
});


export const selectAccessories = state => state.accessory;

export default accessorySlice.reducer;