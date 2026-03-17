import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {FUND_API} from "../../../api/fund";

const initialState = {
    funds: [],
    fundError: null,
    fundLoading: false,
    fundMessage: null
}

export const getFunds = createAsyncThunk('fund/getFunds',
    async (_, {rejectWithValue}) => {
        try {
            const response = await FUND_API.getFunds();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

export const loadFunds = createAsyncThunk('fund/loadFunds',
    async ({data, navigate, showMessage, setSubmitting, resetForm}, {rejectWithValue}) => {
        try {
            setSubmitting(true);
            const response = await FUND_API.loadFunds(data);
            resetForm();
            navigate('/funds');
            showMessage(response.data.message, {variant: 'success'});
            setSubmitting(false);
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            setSubmitting(false);
            return rejectWithValue(message);
        }
    });

const fundSlice = createSlice({
    name: 'fund',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getFunds.pending, (state) => {
                state.fundLoading = true;
                state.fundError = null;
            }).addCase(getFunds.fulfilled, (state, action) => {
                state.fundLoading = false;
                state.funds = action.payload?.data || action.payload || [];
            }).addCase(getFunds.rejected, (state, action) => {
                state.fundLoading = false;
                state.fundError = action.payload;
            })
            .addCase(loadFunds.pending, (state) => {
                state.fundLoading = true;
                state.fundError = null;
            }).addCase(loadFunds.fulfilled, (state, action) => {
                state.fundLoading = false;
                state.funds = [action.payload.data, ...state.funds];
                state.fundMessage = action.payload.message;
            }).addCase(loadFunds.rejected, (state, action) => {
                state.fundLoading = false;
                state.fundError = action.payload;
            })
    }
});

export const selectFund = state => state.fund;
export default fundSlice.reducer;
