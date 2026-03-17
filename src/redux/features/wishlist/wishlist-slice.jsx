import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {WISHLIST_API} from "../../../api/wishlist";
import {UTILS} from "../../../utils/utils";

const FAVORITE_SHOPS_KEY = 'RUDERALIS_FAVORITE_SHOPS';
const getStoredFavoriteShops = () => {
    try { return JSON.parse(localStorage.getItem(FAVORITE_SHOPS_KEY)) || []; } catch { return []; }
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

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlistLocal: (state, action) => {
            const product = action.payload;
            const exists = state.wishlists.find(w => w._id === product._id);
            if (!exists) {
                state.wishlists.push(product);
                syncStorage(state);
            }
        },
        removeFromWishlistLocal: (state, action) => {
            const id = action.payload;
            state.wishlists = state.wishlists.filter(w => w._id !== id);
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
    }
});

export const {addToWishlistLocal, removeFromWishlistLocal, clearWishlist, toggleFavoriteShop} = wishlistSlice.actions;
export const selectFavoriteShops = state => state.wishlist.favoriteShops;

// Wrapper functions that work locally and show snackbar
export const addToWishlist = ({product, data, showMessage}) => (dispatch, getState) => {
    const {wishlist: {wishlists}} = getState();
    const item = product || data;
    const id = item?._id || item?.product;

    if (wishlists.find(w => w._id === id)) {
        showMessage('Already in your wishlist', {variant: 'info'});
        return;
    }

    if (product) {
        dispatch(addToWishlistLocal(product));
        showMessage(`${product.name || 'Item'} added to wishlist`, {variant: 'success'});
    } else {
        dispatch(addToWishlistLocal({_id: id}));
        showMessage('Added to wishlist', {variant: 'success'});
    }
};

export const removeFromWishlist = ({id, showMessage}) => (dispatch) => {
    dispatch(removeFromWishlistLocal(id));
    showMessage('Removed from wishlist', {variant: 'success'});
};

export const selectWishlist = state => state.wishlist;
export default wishlistSlice.reducer;
