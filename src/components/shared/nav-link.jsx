import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {changePath} from "../../redux/features/ui/ui-slice";

const NavLink = ({path, label, active}) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(changePath(path));
    };

    return (
        <Link to={path} onClick={handleClick} style={{textDecoration: 'none'}}>
            <Button
                size="medium"
                variant="text"
                sx={{
                    fontSize: 14,
                    fontWeight: active ? 600 : 400,
                    color: active ? 'secondary.main' : 'text.secondary',
                    textTransform: 'none',
                    px: 2,
                    py: 1,
                    position: 'relative',
                    backgroundColor: active ? 'light.secondary' : 'transparent',
                    '&:hover': {
                        color: 'secondary.main',
                        backgroundColor: 'light.secondary',
                    },
                    '&::after': active ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 4,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 20,
                        height: 2,
                        borderRadius: 1,
                        backgroundColor: 'secondary.main',
                    } : {},
                    transition: 'all 0.2s ease',
                }}>
                {label}
            </Button>
        </Link>
    );
};

export default NavLink;
