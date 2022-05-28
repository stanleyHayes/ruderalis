import {Badge, Button, Grid, Menu, MenuItem, Stack, Toolbar, Typography} from "@mui/material";
import logo from "../../assets/images/logo.png";
import {
    DarkMode,
    ExitToApp,
    Face,
    Favorite,
    LightMode,
    MoreHoriz,
    Notifications,
    ShoppingBag
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {openDrawer, selectUI, toggleTheme} from "../../redux/features/ui/ui-slice";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {selectCart} from "../../redux/features/cart/cart-slice";

const MobileHeader = () => {

    const {themeVariant} = useSelector(selectUI);
    const dispatch = useDispatch();

    const [openMenu, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = event => {
        setMenuOpen(true);
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setMenuOpen(false);
        setAnchorEl(null);
    }

    const {items} = useSelector(selectCart);

    return (
        <Toolbar variant="regular">
            <Grid container={true} justifyContent="space-between" alignItems="center">
                <Grid item={true}>
                    <Stack spacing={1} direction="row" alignItems="center">
                        <img
                            onClick={() => dispatch(openDrawer())}
                            src={logo}
                            style={{width: 40, height: 40, objectFit: 'contain', objectPosition: 'center'}}
                            alt="Ruderalis Logo"
                        />
                        <Typography fontFamily="EuclidCircularA" variant="h6">Ruderalis</Typography>
                    </Stack>
                </Grid>
                <Grid item={true}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                        <Badge
                            color="secondary" max={100}
                            badgeContent={items && items.length === 0 ? null : items.length}
                            variant="standard">
                            <Link to="/cart" style={{textDecoration: 'none'}}>
                                <ShoppingBag
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'secondary.main',
                                        borderRadius: '25%',
                                        padding: 1,
                                        fontSize: 18,
                                        backgroundColor: 'light.secondary'
                                    }}/>
                            </Link>
                        </Badge>

                        <MoreHoriz
                            onClick={handleMenuOpen}
                            sx={{
                                cursor: 'pointer',
                                color: 'secondary.main',
                                borderRadius: '25%',
                                padding: 1,
                                fontSize: 18,
                                backgroundColor: 'light.secondary'
                            }}/>

                        <Menu open={openMenu} onClose={handleMenuClose} elevation={2} anchorEl={anchorEl}>
                            <MenuItem>
                                <Link to="/profile" style={{textDecoration: 'none'}}>
                                    <Button
                                        size="large"
                                        sx={{
                                            justifyContent: 'flex-start',
                                            color: 'text.primary',
                                            textTransform: 'capitalize'
                                        }}
                                        fullWidth={true}
                                        variant="text"
                                        startIcon={
                                            <Badge
                                                max={100}
                                                badgeContent={999}
                                                variant="dot"
                                                sx={{color: 'secondary.main'}}>
                                                <Face
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: 'secondary.main',
                                                        borderRadius: '100%',
                                                        padding: 1,
                                                        fontSize: 24,
                                                        backgroundColor: 'light.secondary'
                                                    }}/>
                                            </Badge>
                                        }>
                                        Profile
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/orders" style={{textDecoration: 'none'}}>
                                    <Button
                                        size="large"
                                        sx={{
                                            justifyContent: 'flex-start',
                                            color: 'text.primary',
                                            textTransform: 'capitalize'
                                        }}
                                        fullWidth={true}
                                        variant="text"
                                        startIcon={
                                            <ShoppingBag
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: 'secondary.main',
                                                    borderRadius: '100%',
                                                    padding: 1,
                                                    fontSize: 24,
                                                    backgroundColor: 'light.secondary'
                                                }}/>}>
                                        Orders
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/wishlists" style={{textDecoration: 'none'}}>
                                    <Button
                                        size="large"
                                        sx={{
                                            justifyContent: 'flex-start',
                                            color: 'text.primary',
                                            textTransform: 'capitalize'
                                        }}
                                        fullWidth={true}
                                        variant="text"
                                        startIcon={
                                            <Badge max={100} badgeContent={999} variant="dot"
                                                   sx={{color: 'secondary.main'}}>
                                                <Favorite
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: 'secondary.main',
                                                        borderRadius: '100%',
                                                        padding: 1,
                                                        fontSize: 24,
                                                        backgroundColor: 'light.secondary'
                                                    }}/>
                                            </Badge>}>
                                        Wishlists
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/notifications" style={{textDecoration: 'none'}}>
                                    <Button
                                        size="large"
                                        sx={{
                                            justifyContent: 'flex-start',
                                            color: 'text.primary',
                                            textTransform: 'capitalize'
                                        }}
                                        fullWidth={true}
                                        variant="text"
                                        startIcon={
                                            <Badge
                                                max={100}
                                                badgeContent={999}
                                                variant="dot"
                                                sx={{color: 'secondary.main'}}>
                                                <Notifications
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: 'secondary.main',
                                                        borderRadius: '100%',
                                                        padding: 1,
                                                        fontSize: 24,
                                                        backgroundColor: 'light.secondary'
                                                    }}/>
                                            </Badge>}>
                                        Notifications
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Button
                                    size="large"
                                    sx={{
                                        justifyContent: 'flex-start',
                                        color: 'text.primary',
                                        textTransform: 'capitalize'
                                    }}
                                    fullWidth={true}
                                    variant="text"
                                    startIcon={
                                        <ExitToApp
                                            sx={{
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderRadius: '100%',
                                                padding: 1,
                                                fontSize: 24,
                                                backgroundColor: 'light.secondary'
                                            }}/>}>
                                    Logout
                                </Button>
                            </MenuItem>
                        </Menu>

                        {themeVariant === 'light' ? (
                            <DarkMode
                                onClick={() => dispatch(toggleTheme())}
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '25%',
                                    padding: 1,
                                    fontSize: 18,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <LightMode
                                onClick={() => dispatch(toggleTheme())}
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '25%',
                                    padding: 1,
                                    fontSize: 18,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </Toolbar>
    )
}

export default MobileHeader;