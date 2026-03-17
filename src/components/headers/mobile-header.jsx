import {Badge, Box, IconButton, Menu, MenuItem, Stack, Toolbar, Typography} from "@mui/material";
import logo from "../../assets/images/logo.png";
import {
    DarkModeOutlined,
    ExitToApp,
    FavoriteBorderOutlined,
    LightModeOutlined,
    LocalMallOutlined,
    MenuRounded,
    MoreVert,
    PersonOutlined,
    ReceiptLongOutlined,
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import {openDrawer, selectUI, toggleTheme} from "../../redux/features/ui/ui-slice";
import {AUTH_ACTION_CREATORS} from "../../redux/features/auth/auth-slice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {selectCart} from "../../redux/features/cart/cart-slice";

const MobileHeader = () => {
    const {themeVariant} = useSelector(selectUI);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const {items} = useSelector(selectCart);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleLogout = () => {
        setAnchorEl(null);
        dispatch(AUTH_ACTION_CREATORS.logout({navigate, showMessage: enqueueSnackbar}));
    };

    const iconBtnStyle = {
        width: 38,
        height: 38,
        backgroundColor: 'light.secondary',
        color: 'secondary.main',
    };

    return (
        <Toolbar sx={{py: 0.5}}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width: '100%'}}>
                <Stack spacing={1.5} direction="row" alignItems="center">
                    <IconButton onClick={() => dispatch(openDrawer())} sx={iconBtnStyle}>
                        <MenuRounded sx={{fontSize: 20}}/>
                    </IconButton>
                    <Link to="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8}}>
                        <img src={logo} style={{width: 28, height: 28, objectFit: 'contain'}} alt="Ruderalis"/>
                        <Typography
                            sx={{color: 'text.primary', fontWeight: 700, textTransform: 'none'}}
                            fontFamily="TTSquares"
                            variant="body1">
                            Ruderalis
                        </Typography>
                    </Link>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <IconButton onClick={() => dispatch(toggleTheme())} sx={iconBtnStyle}>
                        {themeVariant === 'light'
                            ? <DarkModeOutlined sx={{fontSize: 18}}/>
                            : <LightModeOutlined sx={{fontSize: 18}}/>}
                    </IconButton>

                    <Badge
                        badgeContent={items?.length || 0}
                        color="secondary"
                        max={99}
                        sx={{'& .MuiBadge-badge': {fontSize: 10, minWidth: 16, height: 16}}}>
                        <IconButton component={Link} to="/cart" sx={iconBtnStyle}>
                            <LocalMallOutlined sx={{fontSize: 18}}/>
                        </IconButton>
                    </Badge>

                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={iconBtnStyle}>
                        <MoreVert sx={{fontSize: 18}}/>
                    </IconButton>

                    <Menu
                        elevation={0}
                        open={Boolean(anchorEl)}
                        onClose={() => setAnchorEl(null)}
                        anchorEl={anchorEl}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                        transformOrigin={{vertical: 'top', horizontal: 'right'}}
                        slotProps={{
                            paper: {
                                sx: {
                                    backgroundColor: 'background.paper',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    mt: 1,
                                },
                            },
                        }}>
                        <MenuItem
                            component={Link}
                            to="/profile"
                            onClick={() => setAnchorEl(null)}
                            sx={{py: 1.5, px: 3, gap: 1.5, minWidth: 180}}>
                            <PersonOutlined sx={{fontSize: 20, color: 'secondary.main'}}/>
                            <Typography variant="body2" sx={{fontWeight: 500, textTransform: 'none'}}>
                                Profile
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/orders"
                            onClick={() => setAnchorEl(null)}
                            sx={{py: 1.5, px: 3, gap: 1.5}}>
                            <ReceiptLongOutlined sx={{fontSize: 20, color: 'secondary.main'}}/>
                            <Typography variant="body2" sx={{fontWeight: 500, textTransform: 'none'}}>
                                Orders
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            component={Link}
                            to="/wishlists"
                            onClick={() => setAnchorEl(null)}
                            sx={{py: 1.5, px: 3, gap: 1.5}}>
                            <FavoriteBorderOutlined sx={{fontSize: 20, color: 'secondary.main'}}/>
                            <Typography variant="body2" sx={{fontWeight: 500, textTransform: 'none'}}>
                                Wishlists
                            </Typography>
                        </MenuItem>
                        <Box sx={{borderTop: '1px solid', borderColor: 'divider', mt: 0.5, pt: 0.5}}>
                            <MenuItem onClick={handleLogout} sx={{py: 1.5, px: 3, gap: 1.5}}>
                                <ExitToApp sx={{fontSize: 20, color: 'error.main'}}/>
                                <Typography variant="body2" sx={{fontWeight: 500, color: 'error.main', textTransform: 'none'}}>
                                    Logout
                                </Typography>
                            </MenuItem>
                        </Box>
                    </Menu>
                </Stack>
            </Stack>
        </Toolbar>
    );
};

export default MobileHeader;
