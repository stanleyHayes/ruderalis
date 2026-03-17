import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {WISHLIST_API} from "../../../api/wishlist";
import {UTILS} from "../../../utils/utils";
import {CONSTANTS} from "../../../constants/constants";

const FAVORITE_SHOPS_KEY = 'RUDERALIS_FAVORITE_SHOPS';
const getStoredFavoriteShops = () => {
    try { return JSON.parse(localStorage.getItem(FAVORITE_SHOPS_KEY)) || []; } catch { return []; }
};

const isLoggedIn = () => {
    try { return Boolean(JSON.parse(localStorage.getItem(CONSTANTS.REGULARIS_AUTH_TOKEN))); } catch { return false; }
};

const initialState = {
    wishlists: UTILS.getStoredWishlists(),
    favoriteShops: getStoredFavoriteShops(),
    wishlistLoading: false,
    wishlistError: null,
    wishlistMessage: null
};

const syncStorage = (state) => {
    UTILS.saveWishlists(state.wishlists);
    localStorage.setItem(FAVORITE_SHOPS_KEY, JSON.stringify(state.favoriteShops));
};

export const getWishlists = createAsyncThunk('wishlist/getWishlists',
    async (_, {rejectWithValue}) => {
        try {
            const response = await WISHLIST_API.getWishlists();
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response?.data?.message || 'Failed to fetch wishlists');
        }
    });

export const addToWishlistAPI = createAsyncThunk('wishlist/addToWishlistAPI',
    async ({product, showMessage}, {rejectWithValue}) => {
        try {
            const response = await WISHLIST_API.addToWishlist({product: product._id});
            if (showMessage) showMessage(response.data.message || 'Added to wishlist', {variant: 'success'});
            return response.data;
        } catch (e) {
            const message = e.response?.data?.message || 'Failed to add to wishlist';
            if (showMessage) showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

export const removeFromWishlistAPI = createAsyncThunk('wishlist/removeFromWishlistAPI',
    async ({id, showMessage}, {rejectWithValue}) => {
        try {
            const response = await WISHLIST_API.removeFromWishlist(id);
            if (showMessage) showMessage(response.data.message || 'Removed from wishlist', {variant: 'success'});
            return {id};
        } catch (e) {
            const message = e.response?.data?.message || 'Failed to remove from wishlist';
            if (showMessage) showMessage(message, {variant: 'error'});
            return rejectWithValue(message);
        }
    });

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlistLocal: (state, action) => {
            const product = action.payload;
            const exists = state.wishlists.find(w =>
                (w._id === product._id) || (w.product?._id === product._id)
            );
            if (!exists) {
                state.wishlists.push(product);
                syncStorage(state);
            }
        },
        removeFromWishlistLocal: (state, action) => {
            const id = action.payload;
            state.wishlists = state.wishlists.filter(w =>
                w._id !== id && w.product?._id !== id
            );
            syncStorage(state);
        },
        clearWishlist: (state) => {
            state.wishlists = [];
            syncStorage(state);
        },
        toggleFavoriteShop: (state, action) => {
            const shop = action.payload;
            const exists = state.favoriteShops.find(s => s._id === shop._id);
            if (exists) {
                state.favoriteShops = state.favoriteShops.filter(s => s._id !== shop._id);
            } else {
                state.favoriteShops.push(shop);
            }
            syncStorage(state);
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getWishlists.pending, (state) => {
                state.wishlistLoading = true;
                state.wishlistError = null;
            }).addCase(getWishlists.fulfilled, (state, action) => {
                state.wishlistLoading = false;
                state.wishlists = action.payload?.data || action.payload || [];
                syncStorage(state);
            }).addCase(getWishlists.rejected, (state, action) => {
                state.wishlistLoading = false;
                state.wishlistError = action.payload;
            })
            .addCase(addToWishlistAPI.pending, (state) => {
                state.wishlistLoading = true;
            }).addCase(addToWishlistAPI.fulfilled, (state, action) => {
                state.wishlistLoading = false;
                const item = action.payload?.data || action.payload;
                if (item) {
                    state.wishlists.push(item);
                    syncStorage(state);
                }
            }).addCase(addToWishlistAPI.rejected, (state) => {
                state.wishlistLoading = false;
            })
            .addCase(removeFromWishlistAPI.pending, (state) => {
                state.wishlistLoading = true;
            }).addCase(removeFromWishlistAPI.fulfilled, (state, action) => {
                state.wishlistLoading = false;
                const removedId = action.payload.id;
                state.wishlists = state.wishlists.filter(w =>
                    w._id !== removedId && w.product?._id !== removedId
                );
                syncStorage(state);
            }).addCase(removeFromWishlistAPI.rejected, (state) => {
                state.wishlistLoading = false;
            })
    }
});

export const {addToWishlistLocal, removeFromWishlistLocal, clearWishlist, toggleFavoriteShop} = wishlistSlice.actions;
export const selectFavoriteShops = state => state.wishlist.favoriteShops;

// Smart wrapper: uses API if logged in, falls back to localStorage
export const addToWishlist = ({product, data, showMessage}) => (dispatch, getState) => {
    const item = product || data;
    if (!item) return;

    const {wishlist: {wishlists}} = getState();
    const id = item._id || item.product?._id || item.product;
    const alreadyExists = wishlists.find(w =>
        w._id === id || w.product?._id === id || w.product === id
    );
    if (alreadyExists) {
        if (showMessage) showMessage('Already in your wishlist', {variant: 'info'});
        return;
    }

    if (isLoggedIn()) {
        dispatch(addToWishlistAPI({product: item, showMessage}));
    } else {
        dispatch(addToWishlistLocal(item));
        if (showMessage) showMessage(`${item.name || 'Item'} added to wishlist`, {variant: 'success'});
    }
};

export const removeFromWishlist = ({id, showMessage}) => (dispatch) => {
    if (isLoggedIn()) {
        dispatch(removeFromWishlistAPI({id, showMessage}));
    } else {
        dispatch(removeFromWishlistLocal(id));
        if (showMessage) showMessage('Removed from wishlist', {variant: 'success'});
    }
};

export const selectWishlist = state => state.wishlist;
export default wishlistSlice.reducer;
