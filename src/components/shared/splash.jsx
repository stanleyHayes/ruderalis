import {Box, LinearProgress, Stack, Typography} from "@mui/material";
import logo from "../../assets/images/logo.png";

const Splash = () => {
    return (
        <Box sx={{
            height: '100vh', width: '100vw',
            bgcolor: 'background.default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
        }}>
            <LinearProgress color="secondary" sx={{position: 'absolute', top: 0, left: 0, right: 0, height: 3}}/>

            <Stack alignItems="center" spacing={3}>
                <Box sx={{
                    '@keyframes breathe': {
                        '0%, 100%': {opacity: 0.5, transform: 'scale(0.95)'},
                        '50%': {opacity: 1, transform: 'scale(1.05)'},
                    },
                    animation: 'breathe 2.5s ease-in-out infinite',
                }}>
                    <Box component="img" src={logo} alt="Ruderalis" sx={{width: 72, height: 72, objectFit: 'contain'}}/>
                </Box>

                <Stack alignItems="center" spacing={0.5}>
                    <Typography variant="h6" 
                        sx={{color: 'text.primary', fontWeight: 700, letterSpacing: 1}}>
                        Ruderalis
                    </Typography>
                    <Box sx={{
                        '@keyframes shimmer': {
                            '0%': {opacity: 0.4},
                            '50%': {opacity: 1},
                            '100%': {opacity: 0.4},
                        },
                        animation: 'shimmer 1.8s ease-in-out infinite',
                    }}>
                        <Typography variant="caption" sx={{color: 'text.disabled', letterSpacing: 2, textTransform: 'uppercase', fontSize: 10}}>
                            Loading your experience
                        </Typography>
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

export default Splash;
