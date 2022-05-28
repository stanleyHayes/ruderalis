import {Box, Stack, Typography} from "@mui/material";

const Empty = ({title, message, icon, button}) => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.paper',
                padding: 4,
                borderTopRightRadius: 16,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 16,
                borderTopLeftRadius: 16
            }}>
            <Stack direction="column" spacing={2}>
                <Stack direction="row" justifyContent="center">
                    {icon}
                </Stack>
                <Typography sx={{color: 'text.primary'}} variant="h5" align="center">{title}</Typography>
                <Typography sx={{color: 'text.secondary'}} variant="body1" align="center">{message}</Typography>
                <Stack direction="row" justifyContent="center">
                    {button}
                </Stack>
            </Stack>
        </Box>
    )
}

export default Empty;