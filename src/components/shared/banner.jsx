import {Box} from "@mui/material";

const Banner = ({image, children}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                height: '100%',
                overflow: 'hidden',
            }}>
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                }}>
                {image}
            </Box>

            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: (theme) =>
                        theme.palette.mode === 'dark'
                            ? `linear-gradient(135deg, ${theme.palette.background.default}ee 0%, ${theme.palette.background.default}99 50%, ${theme.palette.background.default}ee 100%)`
                            : `linear-gradient(135deg, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.78) 100%)`,
                    backdropFilter: 'blur(2px)',
                }}
            />

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                {children}
            </Box>
        </Box>
    );
};

export default Banner;
