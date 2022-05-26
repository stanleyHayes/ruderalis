import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    themeVariant: 'dark',
    drawerOpen: false,
    language: 'en',
    activePath: '/'
}

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        changePath: (state, action) => {
            state.activePath = action.payload;
        },
        changeLanguage: (state, action) => {
            state.language = action.payload;
        },
        closeDrawer: state => {
            state.drawerOpen = false
        },
        openDrawer: state => {
            state.drawerOpen = true
        },
        toggleTheme: state => {
            state.themeVariant = state.themeVariant === 'dark' ? 'light': 'dark';
        }
    }
});

export const {changePath, changeLanguage, closeDrawer, openDrawer, toggleTheme} = uiSlice.actions;
export const selectUI = state => state.ui;
export default uiSlice.reducer;
