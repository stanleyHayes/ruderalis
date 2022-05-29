import {Box} from "@mui/material";

const Overlay = ({image, children}) => {
    return (
        <Box sx={{position: 'relative'}}>
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%', height: '100vh',
                    top: 0, left: 0, right: 0, bottom: 0,
                }}>
                {image}
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100vh',
                    top: 0, left: 0, right: 0, bottom: 0,
                    zIndex: 1000
                }}>
                {children}
            </Box>
        </Box>
    )
}

export default Overlay;