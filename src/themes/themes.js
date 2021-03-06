import {createTheme} from "@mui/material";
import {red} from "@mui/material/colors";

const lightTheme = createTheme({
    palette: {
        primary: {main: '#285028'},
        secondary: {main: '#73b56f'},
        light: {
            secondary: 'rgba(115,181,111,0.15)'
        },
        action: {
            active: '#73b56f'
        },
        background: {
            paper: '#ffffff',
            default: '#f9f9f9'
        },
        text: {
            primary: "#12131c",
            secondary: "#989ba9"
        },
    },
    typography: {
        fontFamily: 'EuclidCircularA, EuclidCircularB,Raleway'
    },
    shape: {
        borderRadius: 32
    }
})

const darkTheme = createTheme({
    palette: {
        primary: {main: '#285028'},
        secondary: {main: '#73b56f'},
        light: {
            secondary: 'rgba(6,254,52,0.15)',
            red: red[200]
        },
        action: {
            active: '#73b56f'
        },
        background: {
            paper: '#24252e',
            default: '#141416'
        },
        text: {
            primary: "#fefefe",
            secondary: "#777a8b"
        },
        divider: '#32333d'
    },
    typography: {
        fontFamily: 'EuclidCircularA, EuclidCircularB, Raleway'
    },
    shape: {
        borderRadius: 32
    }
});

export const THEMES = {lightTheme, darkTheme};