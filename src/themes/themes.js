import {createTheme} from "@mui/material";
import {red} from "@mui/material/colors";

const lightTheme = createTheme({
    palette: {
        primary: {main: '#285028'},
        secondary: {main: '#06fe34'},
        light: {
            secondary: 'rgba(6,254,52,0.15)'
        },
        action: {
            active: '#06fe34'
        },
        background: {
            paper: '#ffffff',
            default: '#f6f6f6'
        },
        text: {
            primary: "#181818",
            secondary: "#adadad"
        },
    },
    typography: {
        fontFamily: 'EuclidCircularB, EuclidCircularA,Raleway'
    },
    shape: {
        borderRadius: 32
    }
})

const darkTheme = createTheme({
    palette: {
        primary: {main: '#285028'},
        secondary: {main: '#06fe34'},
        light: {
            secondary: 'rgba(6,254,52,0.15)',
            red: red[200]
        },
        action: {
            active: '#06fe34'
        },
        background: {
            paper: '#1a1d21',
            default: '#14171a'
        },
        text: {
            primary: "#edf0f2",
            secondary: "#7f7f80"
        },
    },
    typography: {
        fontFamily: 'EuclidCircularB, EuclidCircularA, Raleway'
    },
    shape: {
        borderRadius: 32
    }
});

export const THEMES = {lightTheme, darkTheme};