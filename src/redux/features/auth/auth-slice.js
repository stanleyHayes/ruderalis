import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authAPI from "../../../api/auth";

const initialState = {
    loading: false,
    message: null,
    error: null,
    token: null,
    authData: {
        firstName: 'Inigo',
        lastName: 'Lopez',
        fullName: 'Inigo Lopez',
        email: 'inigo.lopez@regularis.com',
        phone: '+233270048319',
        username: 'inigolopez',
        status: 'Active',
        gender: 'Male',
        address: {
            country: 'Ghana',
            region: 'Greater Accra',
            city: 'Accra',
            street: 'Haatso Agbogba',
            landmark: 'Atakorah Estates 2',
            gpAddressOrHouseNumber: 'AE-181-21'
        },
        funds: {
            amount: 250,
            currency: 'GHS'
        }
    }
};

export const login = createAsyncThunk('user/login', async (user) => {
    try {
        const response = await authAPI.login(user);
        return response.data;
    }catch (e) {
        const {message} = e.response.data;
        return message;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state, action) => {
            state.token = null;
            state.authData = null;
            state.loading = true;
            state.error = null;
            state.message = null;
        }).addCase(login.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.authData = action.payload.data;
            state.loading = false;
            state.error = null;
            state.message = action.payload.message;
        }).addCase(login.rejected, (state, action) => {
            state.token = null;
            state.authData = null;
            state.loading = false;
            state.error = action.payload;
            state.message = action.payload;
        })
    }
});

export const selectAuth = state => state.auth;
export default authSlice.reducer;