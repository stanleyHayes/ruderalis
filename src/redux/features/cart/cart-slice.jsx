import {createSlice} from "@reduxjs/toolkit";
import {UTILS} from "../../../utils/utils";

const initialState = {
    items: UTILS.getStoredCart(),
};

const syncStorage = (state) => {
    UTILS.saveCart(state.items);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
            syncStorage(state);
        },
        clearVendorItems: (state, action) => {
            const vendorId = action.payload;
            state.items = state.items.filter(item => item.product?.shop?._id !== vendorId);
            syncStorage(state);
        },
        addItem: (state, action) => {
            const product = action.payload;
            const item = state.items.find(item => item.product._id === product._id);
            if (item) {
                state.items = state.items.map(item => {
                    if (item.product._id === product._id) {
                        return {product: {...item.product}, quantity: item.quantity + 1};
                    }
                    return item;
                });
            } else {
                state.items.push({product: {...product}, quantity: 1});
            }
            syncStorage(state);
        },
        addItemWithQuantity: (state, action) => {
            const {product, quantity} = action.payload;
            const item = state.items.find(item => item.product._id === product._id);
            if (item) {
                state.items = state.items.map(item => {
                    if (item.product._id === product._id) {
                        return {product: {...item.product}, quantity: item.quantity + quantity};
                    }
                    return item;
                });
            } else {
                state.items.push({product: {...product}, quantity});
            }
            syncStorage(state);
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.product._id !== action.payload._id);
            syncStorage(state);
        },
        decreaseItem: (state, action) => {
            const item = state.items.find(item => item.product._id === action.payload._id);
            if (item) {
                if (item.quantity - 1 === 0) {
                    state.items = state.items.filter(item => item.product._id !== action.payload._id);
                } else {
                    state.items = state.items.map(item => {
                        if (item.product._id === action.payload._id) {
                            return {product: {...item.product}, quantity: item.quantity - 1};
                        }
                        return item;
                    });
                }
            }
            syncStorage(state);
        },
    }
});

// Selectors
export const selectCart = state => state.cart;

// Group items by vendor (sub-carts)
export const selectCartByVendor = state => {
    const items = state.cart.items;
    const vendors = {};
    items.forEach(item => {
        const vendorId = item.product?.shop?._id || 'unknown';
        const vendorName = item.product?.shop?.name || 'Unknown Shop';
        if (!vendors[vendorId]) {
            vendors[vendorId] = {vendorId, vendorName, items: [], subtotal: 0};
        }
        vendors[vendorId].items.push(item);
        vendors[vendorId].subtotal += (item.product?.price?.amount || 0) * item.quantity;
    });
    return Object.values(vendors);
};

export const {addItem, addItemWithQuantity, clearCart, clearVendorItems, removeItem, decreaseItem} = cartSlice.actions;
export default cartSlice.reducer;
