import {Link} from "react-router-dom";
import {Stack, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {changePath, closeDrawer} from "../../redux/features/ui/ui-slice";

const SidebarLink = ({path, label, active, icon}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(changePath(path));
        dispatch(closeDrawer());
    };

    return (
        <Link to={path} onClick={handleClick} style={{textDecoration: 'none'}}>
            <Stack
                spacing={1.5}
                direction="row"
                alignItems="center"
                sx={{
                    px: 3,
                    py: 1.25,
                    cursor: 'pointer',
                    borderLeft: '3px solid',
                    borderLeftColor: active ? 'secondary.main' : 'transparent',
                    backgroundColor: active ? 'light.secondary' : 'transparent',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: active ? 'light.secondary' : 'action.hover',
                    },
                }}>
                {icon}
                <Typography
                    variant="body2"
                    sx={{
                        color: active ? 'secondary.main' : 'text.primary',
                        fontWeight: active ? 600 : 400,
                        fontSize: 14,
                        textTransform: 'none',
                    }}>
                    {label}
                </Typography>
            </Stack>
        </Link>
    );
};

export default SidebarLink;
