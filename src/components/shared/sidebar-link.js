import {Link} from "react-router-dom";
import {Button, Stack, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {changePath, closeDrawer} from "../../redux/features/ui/ui-slice";
import {ChevronRight} from "@mui/icons-material";

const SidebarLink = ({path, label, active, icon}) => {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(changePath(path));
        dispatch(closeDrawer());
    }
    return (
        <Link to={path} onClick={handleClick} style={{textDecoration: 'none'}}>
            <Stack
                spacing={2}
                sx={{
                    justifyContent: 'flex-start',
                    borderLeftWidth: active ? 3 : 0,
                    borderLeftStyle: active ? 'solid' : false,
                    borderLeftColor: active ? 'secondary.main' : false,
                    backgroundColor: active ? 'light.secondary' : false,
                    px: 2,
                    py: 1
                }}
                direction="row" justifyContent="space-between" alignItems="center">
                {icon}
                <Typography
                    variant="body1"
                    sx={{
                        color: active ? 'secondary.main' : 'text.primary',
                        textTransform: 'capitalize',
                    }}>
                    {label}
                </Typography>
            </Stack>
        </Link>
    )
}

export default SidebarLink;