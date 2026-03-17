import {createTheme, alpha} from "@mui/material";

const shared = {
    typography: {
        fontFamily: '"TTSquares", "EuclidCircularA", "Gilroy", sans-serif',
        h1: {fontWeight: 800, fontSize: '3rem', letterSpacing: '-0.03em', lineHeight: 1.1},
        h2: {fontWeight: 700, fontSize: '2.25rem', letterSpacing: '-0.02em', lineHeight: 1.2},
        h3: {fontWeight: 700, fontSize: '1.75rem', letterSpacing: '-0.01em'},
        h4: {fontWeight: 600, fontSize: '1.5rem'},
        h5: {fontWeight: 600, fontSize: '1.25rem'},
        h6: {fontWeight: 600, fontSize: '1.1rem'},
        subtitle1: {fontWeight: 500, fontSize: '1rem', lineHeight: 1.5},
        subtitle2: {fontWeight: 500, fontSize: '0.875rem'},
        body1: {fontSize: '0.95rem', lineHeight: 1.7},
        body2: {fontSize: '0.875rem', lineHeight: 1.6},
        caption: {fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.02em'},
        overline: {fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase'},
        button: {fontWeight: 600, fontSize: '0.875rem'},
    },
    shape: {borderRadius: 14},
};

const componentOverrides = (mode) => ({
    MuiCssBaseline: {
        styleOverrides: {
            body: {
                scrollbarWidth: 'thin',
                '&::-webkit-scrollbar': {width: 5},
                '&::-webkit-scrollbar-track': {background: 'transparent'},
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)',
                    borderRadius: 10,
                },
            },
        },
    },
    MuiButton: {
        defaultProps: {disableElevation: true},
        styleOverrides: {
            root: {
                borderRadius: 10,
                textTransform: 'none',
                fontWeight: 600,
                padding: '10px 22px',
                transition: 'all 0.25s ease',
            },
            sizeLarge: {padding: '13px 28px', fontSize: '0.95rem', borderRadius: 12},
            sizeSmall: {padding: '6px 14px', fontSize: '0.8rem', borderRadius: 8},
            containedSecondary: {
                color: '#fff',
                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                '&:hover': {
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    boxShadow: '0 6px 20px rgba(34,197,94,0.35)',
                    transform: 'translateY(-1px)',
                },
                '&:active': {transform: 'translateY(0)'},
            },
            outlinedSecondary: {
                borderWidth: 1.5,
                '&:hover': {borderWidth: 1.5, transform: 'translateY(-1px)'},
            },
        },
    },
    MuiCard: {
        defaultProps: {elevation: 0},
        styleOverrides: {
            root: {
                borderRadius: 18,
                border: '1px solid',
                borderColor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: mode === 'dark'
                        ? '0 20px 40px rgba(0,0,0,0.4)'
                        : '0 20px 40px rgba(0,0,0,0.08)',
                },
            },
        },
    },
    MuiChip: {styleOverrides: {root: {borderRadius: 8, fontWeight: 600, fontSize: '0.75rem'}}},
    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: mode === 'dark' ? '#22c55e' : '#16a34a',
                    borderWidth: 1.5,
                },
                '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                    borderWidth: 1.5,
                },
            },
            notchedOutline: {
                borderColor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)',
            },
        },
    },
    MuiAppBar: {
        defaultProps: {elevation: 0},
        styleOverrides: {root: {
            backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)',
            backgroundColor: mode === 'light' ? 'rgba(255,255,255,0.95)' : undefined,
        }},
    },
    MuiMenu: {
        styleOverrides: {
            paper: {
                borderRadius: 14,
                border: '1px solid',
                borderColor: mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
                backgroundColor: mode === 'light' ? '#ffffff' : undefined,
                boxShadow: mode === 'dark'
                    ? '0 16px 48px rgba(0,0,0,0.5)'
                    : '0 8px 32px rgba(0,0,0,0.12)',
            },
        },
    },
    MuiDialog: {styleOverrides: {paper: {borderRadius: 20}}},
    MuiTab: {styleOverrides: {root: {textTransform: 'none', fontWeight: 600, fontSize: '0.9rem'}}},
    MuiAccordion: {
        defaultProps: {disableGutters: true, elevation: 0, square: true},
        styleOverrides: {root: {'&:before': {display: 'none'}, backgroundColor: 'transparent'}},
    },
});

const lightTheme = createTheme({
    ...shared,
    palette: {
        mode: 'light',
        primary: {main: '#0f2b1a', light: '#1a4028', dark: '#091a0f'},
        secondary: {main: '#22c55e', light: '#4ade80', dark: '#16a34a'},
        accent: {main: '#c9a96e', light: '#d4bb8a', dark: '#b8944f'},
        error: {main: '#ef4444'},
        warning: {main: '#f59e0b'},
        info: {main: '#3b82f6'},
        success: {main: '#22c55e'},
        light: {
            secondary: 'rgba(34,197,94,0.08)',
            accent: 'rgba(201,169,110,0.08)',
            red: 'rgba(239,68,68,0.08)',
        },
        background: {
            default: '#f5f5f0',
            paper: '#ffffff',
            card: '#ffffff',
            alt: '#eceee8',
        },
        text: {primary: '#1a1a1a', secondary: '#4b5563', disabled: '#9ca3af'},
        divider: 'rgba(0,0,0,0.07)',
    },
    components: componentOverrides('light'),
});

const darkTheme = createTheme({
    ...shared,
    palette: {
        mode: 'dark',
        primary: {main: '#22c55e', light: '#4ade80', dark: '#16a34a'},
        secondary: {main: '#22c55e', light: '#4ade80', dark: '#16a34a'},
        accent: {main: '#c9a96e', light: '#d4bb8a', dark: '#b8944f'},
        error: {main: '#ef4444'},
        warning: {main: '#f59e0b'},
        info: {main: '#3b82f6'},
        success: {main: '#22c55e'},
        light: {
            secondary: 'rgba(34,197,94,0.08)',
            accent: 'rgba(201,169,110,0.08)',
            red: 'rgba(239,68,68,0.08)',
        },
        background: {
            default: '#080c08',
            paper: '#111a11',
            card: '#152015',
            alt: '#0d140d',
        },
        text: {primary: '#eef2ee', secondary: '#7a8a7a', disabled: '#4a5a4a'},
        divider: 'rgba(255,255,255,0.06)',
    },
    components: componentOverrides('dark'),
});

export const THEMES = {lightTheme, darkTheme};
