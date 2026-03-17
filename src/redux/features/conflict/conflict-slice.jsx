import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {CONFLICT_API} from "../../../api/conflict";

const initialState = {
    conflicts: [],
    conflictDetail: null,
    conflictError: null,
    conflictLoading: false,
    conflictMessage: null,
};

export const getConflicts = createAsyncThunk('conflict/getConflicts',
    async (_, {rejectWithValue}) => {
        try {
            const response = await CONFLICT_API.getConflicts();
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'An error occurred');
        }
    });

export const getConflict = createAsyncThunk('conflict/getConflict',
    async ({id}, {rejectWithValue}) => {
        try {
            const response = await CONFLICT_API.getConflict(id);
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'An error occurred');
        }
    });

export const createConflict = createAsyncThunk('conflict/createConflict',
    async ({data, navigate, showMessage}, {rejectWithValue}) => {
        try {
            const response = await CONFLICT_API.createConflict(data);
            showMessage(response.data?.message || 'Dispute submitted successfully', {variant: 'success'});
            navigate('/account/conflicts');
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'Failed to submit dispute';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

export const addMessage = createAsyncThunk('conflict/addMessage',
    async ({id, data, showMessage}, {rejectWithValue}) => {
        try {
            const response = await CONFLICT_API.addMessage(id, data);
            showMessage('Message sent', {variant: 'success'});
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'Failed to send message';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

export const resolveConflict = createAsyncThunk('conflict/resolveConflict',
    async ({id, data, showMessage}, {rejectWithValue}) => {
        try {
            const response = await CONFLICT_API.resolveConflict(id, data);
            showMessage(response.data?.message || 'Dispute resolved', {variant: 'success'});
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'Failed to resolve dispute';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

export const escalateConflict = createAsyncThunk('conflict/escalateConflict',
    async ({id, showMessage}, {rejectWithValue}) => {
        try {
            const response = await CONFLICT_API.escalateConflict(id);
            showMessage(response.data?.message || 'Dispute escalated to admin', {variant: 'success'});
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'Failed to escalate dispute';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const conflictSlice = createSlice({
    name: 'conflict',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getConflicts.pending, s => { s.conflictLoading = true; s.conflictError = null; })
            .addCase(getConflicts.fulfilled, (s, a) => { s.conflictLoading = false; s.conflicts = a.payload?.data || a.payload || []; })
            .addCase(getConflicts.rejected, (s, a) => { s.conflictLoading = false; s.conflictError = a.payload; })

            .addCase(getConflict.pending, s => { s.conflictLoading = true; s.conflictError = null; })
            .addCase(getConflict.fulfilled, (s, a) => { s.conflictLoading = false; s.conflictDetail = a.payload?.data || a.payload; })
            .addCase(getConflict.rejected, (s, a) => { s.conflictLoading = false; s.conflictError = a.payload; })

            .addCase(createConflict.pending, s => { s.conflictLoading = true; s.conflictError = null; })
            .addCase(createConflict.fulfilled, (s, a) => {
                s.conflictLoading = false;
                const item = a.payload?.data || a.payload;
                if (item) s.conflicts = [item, ...s.conflicts];
            })
            .addCase(createConflict.rejected, (s, a) => { s.conflictLoading = false; s.conflictError = a.payload; })

            .addCase(addMessage.pending, s => { s.conflictLoading = true; })
            .addCase(addMessage.fulfilled, (s, a) => {
                s.conflictLoading = false;
                s.conflictDetail = a.payload?.data || a.payload;
            })
            .addCase(addMessage.rejected, (s, a) => { s.conflictLoading = false; s.conflictError = a.payload; })

            .addCase(resolveConflict.pending, s => { s.conflictLoading = true; })
            .addCase(resolveConflict.fulfilled, (s, a) => {
                s.conflictLoading = false;
                const updated = a.payload?.data || a.payload;
                s.conflictDetail = updated;
                s.conflicts = s.conflicts.map(c => c._id === updated?._id ? updated : c);
            })
            .addCase(resolveConflict.rejected, (s, a) => { s.conflictLoading = false; s.conflictError = a.payload; })

            .addCase(escalateConflict.pending, s => { s.conflictLoading = true; })
            .addCase(escalateConflict.fulfilled, (s, a) => {
                s.conflictLoading = false;
                const updated = a.payload?.data || a.payload;
                s.conflictDetail = updated;
                s.conflicts = s.conflicts.map(c => c._id === updated?._id ? updated : c);
            })
            .addCase(escalateConflict.rejected, (s, a) => { s.conflictLoading = false; s.conflictError = a.payload; })
    }
});

export const selectConflict = state => state.conflict;
export default conflictSlice.reducer;
