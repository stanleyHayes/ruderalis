import {Box} from "@mui/material";

const Banner = ({image, children}) => {
    return (
        <Box sx={{position: 'relative', height: '100%'}}>
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.85)'
                }}>
                {image}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.60)'
                }}>
                {children}
            </Box>
        </Box>
    )
}

export default Banner;