import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {EDIBLE_API} from "../../../api/edible";
import {edibles} from "./edible-data";

const initialState = {
    edibles: [...edibles],
    edibleError: null,
    edibleLoading: false,
    edibleMessage: null,
    edibleDetail: edibles[0],
    featuredEdibles: [...edibles],
    onSaleEdibles: [...edibles]
}

export const getEdibles = createAsyncThunk('edible/getEdibles', async ({token, query}) => {
    try {
        return await EDIBLE_API.getEdibles(token, query);
    }catch (e) {
        const {message} = e.response.data;
        return message;
    }
})

const edibleSlice = createSlice({
    name: 'edible',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getEdibles.pending, (state) => {
            state.edibleLoading = true;
            state.edibleError = null;
            state.edibleMessage = null;
        }).addCase(getEdibles.fulfilled, (state, action) => {
            state.edibleLoading = false;
            state.edibleError = null;
            state.edibleMessage = action.payload.message;
            state.edibles = action.payload.data;
        }).addCase(getEdibles.rejected, (state, action) => {
            state.edibleLoading = false;
            state.edibleError = action.payload;
            state.edibleMessage = action.payload;
            state.edibles = [];
        })
    }
});

export const selectEdible = state => state.edible;

export default edibleSlice.reducer;