import {createSlice} from "@reduxjs/toolkit";
import {wishlist} from "./wishlist-data";

const initialState = {
    wishlists: [...wishlist],
    wishlistLoading: false,
    wishlistError: null,
    wishlistMessage: null
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {},
    extraReducers: builder => {}
});


export const selectWishlist = state => state.wishlist;

export default wishlistSlice.reducer;