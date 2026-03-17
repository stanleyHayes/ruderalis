import {Stack} from "@mui/material";

const Text = ({text, icon}) => {
    return (
        <Stack direction="row" alignItems="center" spacing={2}>
            {icon} {text}
        </Stack>
    )
}

export default Text;