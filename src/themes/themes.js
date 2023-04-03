import {createTheme} from "@mui/material";

const lightTheme = createTheme({
    palette: {
        primary: {main: '#285028'},
        secondary: {main: '#73b56f'},
        light: {
            secondary: 'rgba(115,181,111,0.15)',
            red: "rgba(198,40,40,0.15)"
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
        mode: "light"
    },
    typography: {
        fontFamily: 'Gilroy, Urbanist,Futura,  Oxanium, EuclidCircularA, EuclidCircularB,UberMoveAR, Manrope, SamsungSans, SamsungSharpSans, Urbanist, RayleighGlamour, SatrevaNova, OgelicRegular'
    },
    shape: {
        borderRadius: 8
    }
})

const darkTheme = createTheme({
    palette: {
        primary: {main: '#285028'},
        secondary: {main: '#73b56f'},
        light: {
            secondary: 'rgba(6,254,52,0.15)',
            red: "rgba(198,40,40,0.15)"
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
        mode: "dark"
    },
    typography: {
        fontFamily: 'Gilroy, Urbanist,SatrevaNova,Manrope, Futura,  Oxanium, EuclidCircularA, EuclidCircularB, UberMoveAR, Manrope, SamsungSans, SamsungSharpSans, Urbanist, RayleighGlamour, SatrevaNova, OgelicRegular'
    },
    shape: {
        borderRadius: 8
    }
});

export const THEMES = {lightTheme, darkTheme};