import {Link} from "react-router-dom";
import {Stack} from "@mui/material";

const ButtonLink = ({startIcon, endIcon, text, link}) => {
    return (
        <Link style={{textDecoration: 'none'}} to={link}>
            <Stack justifyContent="space-between" alignItems="center" direction="row" spacing={2}>
                <Stack spacing={3} direction="row" alignItems="center">
                    {startIcon} {text}
                </Stack>
                {endIcon}
            </Stack>
        </Link>
    )

}
export default ButtonLink;