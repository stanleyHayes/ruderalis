import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {MARIJUANA_API} from "../../../api/marijuana";
import {allMarijuana} from "./marijuana-data";

const initialState = {
    allMarijuana: [...allMarijuana],
    marijuanaError: null,
    marijuanaLoading: false,
    marijuanaMessage: null,
    marijuanaDetail: allMarijuana[0],
    featuredMarijuana: [...allMarijuana],
    onSaleMarijuana: [...allMarijuana]
}

export const getAllMarijuana = createAsyncThunk('marijuana/getMarijuana', async ({token, query}) => {
    try {
        return await MARIJUANA_API.getAllMarijuana(token, query);
    }catch (e) {
        const {message} = e.response.data;
        return message;
    }
})

const marijuanaSlice = createSlice({
    name: 'marijuana',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllMarijuana.pending, (state) => {
            state.marijuanaLoading = true;
            state.marijuanaError = null;
            state.marijuanaMessage = null;
        }).addCase(getAllMarijuana.fulfilled, (state, action) => {
            state.marijuanaLoading = false;
            state.marijuanaError = null;
            state.marijuanaMessage = action.payload.message;
            state.marijuanas = action.payload.data;
        }).addCase(getAllMarijuana.rejected, (state, action) => {
            state.marijuanaLoading = false;
            state.marijuanaError = action.payload;
            state.marijuanaMessage = action.payload;
            state.marijuanas = [];
        })
    }
});

export const selectMarijuana = state => state.marijuana;

export default marijuanaSlice.reducer;