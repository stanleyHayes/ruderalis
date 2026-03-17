import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {TRACKING_API} from "../../../api/tracking";

const initialState = {
    tracking: null,
    trackingLoading: false,
    trackingError: null,
    trackingMessage: null
};

export const trackOrder = createAsyncThunk('tracking/trackOrder',
    async ({code, showMessage}, {rejectWithValue}) => {
        try {
            const response = await TRACKING_API.trackOrder(code);
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            if (showMessage) showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const trackingSlice = createSlice({
    name: 'tracking',
    initialState,
    reducers: {
        clearTracking: (state) => {
            state.tracking = null;
            state.trackingError = null;
            state.trackingMessage = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(trackOrder.pending, (state) => {
                state.trackingLoading = true;
                state.trackingError = null;
            }).addCase(trackOrder.fulfilled, (state, action) => {
                state.trackingLoading = false;
                state.tracking = action.payload?.data || action.payload || [];
                state.trackingMessage = action.payload.message;
            }).addCase(trackOrder.rejected, (state, action) => {
                state.trackingLoading = false;
                state.trackingError = action.payload;
            })
    }
});

export const {clearTracking} = trackingSlice.actions;
export const selectTracking = state => state.tracking;
export default trackingSlice.reducer;
