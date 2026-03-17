import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {PROMOTION_API} from "../../../api/promotion";

const initialState = {
    promotions: [],
    coupons: [],
    couponResult: null,
    promotionLoading: false,
    couponLoading: false,
    promotionError: null,
    couponError: null,
};

export const getPromotions = createAsyncThunk('promotion/getPromotions',
    async (_, {rejectWithValue}) => {
        try {
            const response = await PROMOTION_API.getPromotions();
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'An error occurred');
        }
    });

export const getCoupons = createAsyncThunk('promotion/getCoupons',
    async (_, {rejectWithValue}) => {
        try {
            const response = await PROMOTION_API.getCoupons();
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'An error occurred');
        }
    });

export const validateCoupon = createAsyncThunk('promotion/validateCoupon',
    async ({code, orderAmount}, {rejectWithValue}) => {
        try {
            const response = await PROMOTION_API.validateCoupon({code, orderAmount});
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Invalid coupon code');
        }
    });

const promotionSlice = createSlice({
    name: 'promotion',
    initialState,
    reducers: {
        clearCouponResult: (state) => {
            state.couponResult = null;
            state.couponError = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getPromotions.pending, s => { s.promotionLoading = true; s.promotionError = null; })
            .addCase(getPromotions.fulfilled, (s, a) => { s.promotionLoading = false; s.promotions = a.payload?.data || a.payload || []; })
            .addCase(getPromotions.rejected, (s, a) => { s.promotionLoading = false; s.promotionError = a.payload; })

            .addCase(getCoupons.pending, s => { s.couponLoading = true; s.couponError = null; })
            .addCase(getCoupons.fulfilled, (s, a) => { s.couponLoading = false; s.coupons = a.payload?.data || a.payload || []; })
            .addCase(getCoupons.rejected, (s, a) => { s.couponLoading = false; s.couponError = a.payload; })

            .addCase(validateCoupon.pending, s => { s.couponLoading = true; s.couponError = null; })
            .addCase(validateCoupon.fulfilled, (s, a) => { s.couponLoading = false; s.couponResult = a.payload?.data || a.payload; })
            .addCase(validateCoupon.rejected, (s, a) => { s.couponLoading = false; s.couponError = a.payload; })
    }
});

export const {clearCouponResult} = promotionSlice.actions;
export const selectPromotion = state => state.promotion;
export default promotionSlice.reducer;
