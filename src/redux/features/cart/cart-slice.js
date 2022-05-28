import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    items: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state, action) => {
            state.items = [];
        },
        addItem: (state, action) => {
            const item = state.items.find(item => item.product._id === action.payload._id);
            if (item) {
                state.items = state.items.map(item => {
                    if (item.product._id === action.payload._id) {
                        return {product: {...item.product}, quantity: item.quantity + 1}
                    }
                    return item;
                })
            } else {
                state.items.push({product: {...action.payload}, quantity: 1});
            }
        },
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.product._id !== action.payload._id);
        },
        decreaseItem: (state, action) => {
            const item = state.items.find(item => item.product._id === action.payload._id);
            if (item) {
                if (item.quantity - 1 === 0) {
                    state.items = state.items.filter(item => item.product._id !== action.payload._id);
                } else {
                    state.items = state.items.map(item => {
                        if (item.product._id === action.payload._id) {
                            return {product: {...item.product}, quantity: item.quantity - 1}
                        }
                        return item;
                    })
                }
            }
        },
        retrieveItems: (state, action) => {
        },
        updateItem: (state, action) => {
        },
        retrieveItem: (state, action) => {
        }
    }
});

export const {
    addItem,
    clearCart,
    removeItem,
    retrieveItem,
    retrieveItems,
    updateItem,
    decreaseItem
} = cartSlice.actions;

export const selectCart = state => state.cart;

export default cartSlice.reducer;