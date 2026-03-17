import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import authAPI from "../../../api/auth";
import {CONSTANTS} from "../../../constants/constants";

const initialState = {
    authLoading: false,
    authMessage: null,
    authError: null,
    token: null,
    authData: null
};

const login = createAsyncThunk('auth/login',
    async ({values, navigate, resetForm, showMessage, setSubmitting}, {rejectWithValue}) => {
        try {
            setSubmitting(true);
            if (CONSTANTS.DEV_MODE) {
                localStorage.setItem(CONSTANTS.REGULARIS_AUTH_TOKEN, JSON.stringify(CONSTANTS.DEV_TOKEN));
                localStorage.setItem(CONSTANTS.REGULARIS_AUTH_DATA, JSON.stringify(CONSTANTS.DEV_USER));
                resetForm();
                showMessage('Welcome back!', {variant: 'success'});
                setSubmitting(false);
                navigate('/');
                return {data: CONSTANTS.DEV_USER, token: CONSTANTS.DEV_TOKEN};
            }
            const response = await authAPI.login(values);
            localStorage.setItem(CONSTANTS.REGULARIS_AUTH_TOKEN, JSON.stringify(response.data.token));
            localStorage.setItem(CONSTANTS.REGULARIS_AUTH_DATA, JSON.stringify(response.data.data));
            resetForm();
            showMessage(response.data.message || 'Welcome back!', {variant: 'success'});
            setSubmitting(false);
            navigate('/');
            return {data: response.data.data, token: response.data.token};
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            setSubmitting(false);
            return rejectWithValue(message);
        }
    });

const register = createAsyncThunk('auth/register',
    async ({values, navigate, resetForm, showMessage, setSubmitting}, {rejectWithValue}) => {
        try {
            setSubmitting(true);
            const response = await authAPI.register(values);
            navigate(`/auth/otp/${response.data.token}/verify`);
            resetForm();
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

const getProfile = createAsyncThunk('auth/getProfile',
    async (_, {rejectWithValue}) => {
        try {
            if (CONSTANTS.DEV_MODE) {
                return {data: CONSTANTS.DEV_USER, token: CONSTANTS.DEV_TOKEN};
            }
            const response = await authAPI.getProfile();
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            return rejectWithValue(message);
        }
    });

const updateProfile = createAsyncThunk('auth/updateProfile',
    async ({values, navigate, showMessage, setSubmitting}, {rejectWithValue}) => {
        try {
            setSubmitting(true);
            const response = await authAPI.updateProfile(values);
            localStorage.setItem(CONSTANTS.REGULARIS_AUTH_DATA, JSON.stringify(response.data.data));
            navigate('/profile');
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

const changePassword = createAsyncThunk('auth/changePassword',
    async ({values, navigate, resetForm, showMessage, setSubmitting}, {rejectWithValue}) => {
        try {
            setSubmitting(true);
            const response = await authAPI.changePassword(values);
            resetForm();
            navigate('/profile');
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

const forgotPassword = createAsyncThunk('auth/forgotPassword',
    async ({values, resetForm, showMessage, setSubmitting}, {rejectWithValue}) => {
        try {
            setSubmitting(true);
            const response = await authAPI.forgotPassword(values);
            resetForm();
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

const resetPassword = createAsyncThunk('auth/resetPassword',
    async ({values, token, navigate, resetForm, showMessage, setSubmitting}, {rejectWithValue}) => {
        try {
            setSubmitting(true);
            const response = await authAPI.resetPassword(values, token);
            resetForm();
            navigate('/auth/login');
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

const verifyOTP = createAsyncThunk('auth/verifyOTP',
    async ({values, token, navigate, resetForm, showMessage}, {rejectWithValue}) => {
        try {
            const response = await authAPI.verifyOTP(values, token);
            localStorage.setItem(CONSTANTS.REGULARIS_AUTH_TOKEN, JSON.stringify(response.data.token));
            localStorage.setItem(CONSTANTS.REGULARIS_AUTH_DATA, JSON.stringify(response.data.data));
            navigate(`/`);
            resetForm();
            showMessage(response.data.message, {variant: 'success'});
            return {data: response.data.data, token: response.data.token};
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const resendOTP = createAsyncThunk('auth/resendOTP',
    async ({values, navigate, resetForm, showMessage}, {rejectWithValue}) => {
        try {
            const response = await authAPI.resendOTP(values);
            navigate(`/auth/otp/${response.data.token}/verify`);
            resetForm();
            showMessage(response.data.message, {variant: 'success'});
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const verifyAccount = createAsyncThunk('auth/verifyAccount',
    async ({values, token, navigate, showMessage, setSubmitting}, {rejectWithValue}) => {
        try {
            setSubmitting(true);
            const response = await authAPI.verifyAccount(values, token);
            navigate('/auth/verify/acknowledgment/success');
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

const logoutAction = createAsyncThunk('auth/logout',
    async ({navigate, showMessage}, {rejectWithValue}) => {
        try {
            await authAPI.logout();
            localStorage.removeItem(CONSTANTS.REGULARIS_AUTH_TOKEN);
            localStorage.removeItem(CONSTANTS.REGULARIS_AUTH_DATA);
            navigate('/auth/login');
            showMessage('Successfully logged out', {variant: 'success'});
            return null;
        } catch (e) {
            localStorage.removeItem(CONSTANTS.REGULARIS_AUTH_TOKEN);
            localStorage.removeItem(CONSTANTS.REGULARIS_AUTH_DATA);
            navigate('/auth/login');
            return rejectWithValue('Logged out');
        }
    });

const deleteAccount = createAsyncThunk('auth/deleteAccount',
    async ({navigate, showMessage}, {rejectWithValue}) => {
        try {
            const response = await authAPI.deleteAccount();
            localStorage.removeItem(CONSTANTS.REGULARIS_AUTH_TOKEN);
            localStorage.removeItem(CONSTANTS.REGULARIS_AUTH_DATA);
            navigate('/auth/login');
            showMessage(response.data.message, {variant: 'success'});
            return null;
        } catch (e) {
            const message = e.response?.data?.message || 'An error occurred';
            showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
                state.authMessage = null;
            }).addCase(login.fulfilled, (state, action) => {
                state.authLoading = false;
                state.authError = null;
                state.authData = action.payload?.data || action.payload;
                state.token = action.payload.token;
                state.authMessage = action.payload.message;
            }).addCase(login.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
            }).addCase(register.fulfilled, (state, action) => {
                state.authLoading = false;
                state.authError = null;
                state.authMessage = action.payload.message;
            }).addCase(register.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
            })
            .addCase(getProfile.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
            }).addCase(getProfile.fulfilled, (state, action) => {
                state.authLoading = false;
                state.authData = action.payload?.data || action.payload || [];
                state.token = action.payload.token;
                state.authMessage = action.payload.message;
            }).addCase(getProfile.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
                state.authData = null;
                state.token = null;
            })
            .addCase(updateProfile.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
            }).addCase(updateProfile.fulfilled, (state, action) => {
                state.authLoading = false;
                state.authData = action.payload?.data || action.payload || [];
                state.authMessage = action.payload.message;
            }).addCase(updateProfile.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
            }).addCase(changePassword.fulfilled, (state, action) => {
                state.authLoading = false;
                state.authMessage = action.payload.message;
            }).addCase(changePassword.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
            })
            .addCase(forgotPassword.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
            }).addCase(forgotPassword.fulfilled, (state, action) => {
                state.authLoading = false;
                state.authMessage = action.payload.message;
            }).addCase(forgotPassword.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
            })
            .addCase(resetPassword.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
            }).addCase(resetPassword.fulfilled, (state, action) => {
                state.authLoading = false;
                state.authMessage = action.payload.message;
            }).addCase(resetPassword.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
            })
            .addCase(verifyOTP.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
            }).addCase(verifyOTP.fulfilled, (state, action) => {
                state.authLoading = false;
                state.authData = action.payload?.data || action.payload || [];
                state.token = action.payload.token;
            }).addCase(verifyOTP.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
            })
            .addCase(resendOTP.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
            }).addCase(resendOTP.fulfilled, (state) => {
                state.authLoading = false;
            }).addCase(resendOTP.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
            })
            .addCase(verifyAccount.pending, (state) => {
                state.authLoading = true;
                state.authError = null;
            }).addCase(verifyAccount.fulfilled, (state, action) => {
                state.authLoading = false;
                state.authMessage = action.payload.message;
            }).addCase(verifyAccount.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
            })
            .addCase(logoutAction.fulfilled, (state) => {
                state.authLoading = false;
                state.authData = null;
                state.token = null;
                state.authError = null;
                state.authMessage = null;
            }).addCase(logoutAction.rejected, (state) => {
                state.authLoading = false;
                state.authData = null;
                state.token = null;
            })
            .addCase(deleteAccount.pending, (state) => {
                state.authLoading = true;
            }).addCase(deleteAccount.fulfilled, (state) => {
                state.authLoading = false;
                state.authData = null;
                state.token = null;
            }).addCase(deleteAccount.rejected, (state, action) => {
                state.authLoading = false;
                state.authError = action.payload;
            })
    }
});

export const AUTH_ACTION_CREATORS = {
    login, register, getProfile, updateProfile, changePassword,
    forgotPassword, resetPassword, verifyOTP, resendOTP, verifyAccount,
    logout: logoutAction, deleteAccount
};
export const selectAuth = state => state.auth;
export default authSlice.reducer;
