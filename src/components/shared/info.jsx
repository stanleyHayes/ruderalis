import {Stack} from "@mui/material";

const Info = ({title, value, icon}) => {
    return (
        <Stack alignItems="center" direction="row" spacing={2}>
            {icon}
            <Stack direction="column" spacing={1}>
                {title} {value}
            </Stack>
        </Stack>
    )
}

export default Info;