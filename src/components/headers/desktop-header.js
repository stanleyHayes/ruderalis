import {Avatar, Badge, Button, Container, Divider, Menu, MenuItem, Stack, Toolbar, Typography} from "@mui/material";
import logo from "./../../assets/images/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {UTILS} from "../../utils/utils";
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
import {selectUI, toggleTheme} from "../../redux/features/ui/ui-slice";
import {useState} from "react";
import {Link} from "react-router-dom";
import NavLink from "../shared/nav-link";
import {selectCart} from "../../redux/features/cart/cart-slice";

const DesktopHeader = () => {

    const {authData} = useSelector(selectAuth);
    const {themeVariant, activePath} = useSelector(selectUI);
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
            <Container maxWidth="xl">
                <Stack
                    divider={<Divider variant="fullWidth" light={true}/>}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Stack spacing={2} direction="row" alignItems="center">
                        <img
                            src={logo}
                            style={{width: 50, height: 50, objectFit: 'contain', objectPosition: 'center'}}
                            alt="Ruderalis Logo"
                        />
                        <Typography
                            sx={{color: 'text.primary'}}
                            fontFamily="EuclidCircularB"
                            variant="h4">Ruderalis</Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={3}>
                        <NavLink label="Home" path="/" active={activePath === '/'}/>
                        <NavLink label="Products" path="/products" active={activePath === '/products'}/>
                        <NavLink label="Shops" path="/shops" active={activePath === '/shops'}/>
                        <NavLink label="Contact" path="/contact" active={activePath === '/contact'}/>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Link to="/profile" style={{textDecoration: 'none'}}>
                            <Avatar sx={{backgroundColor: 'light.secondary', borderRadius: '25%'}}>
                                <Typography
                                    sx={{color: 'secondary.main'}}
                                    variant="h6">
                                    {UTILS.getInitials(authData.fullName)}
                                </Typography>
                            </Avatar>
                        </Link>
                        <Badge color="secondary" max={100} badgeContent={999} variant="dot">
                            <Notifications
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '25%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        </Badge>

                        <Badge color="secondary" max={100}
                               badgeContent={items && items.length === 0 ? null : items.length} variant="standard">
                            <Link to="/cart" style={{textDecoration: 'none'}}>
                                <ShoppingBag
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'secondary.main',
                                        borderRadius: '25%',
                                        padding: 1,
                                        fontSize: 24,
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
                                fontSize: 24,
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
                                            <Face
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: 'secondary.main',
                                                    borderRadius: '25%',
                                                    padding: 1,
                                                    fontSize: 24,
                                                    backgroundColor: 'light.secondary'
                                                }}/>}>
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
                                                    borderRadius: '25%',
                                                    padding: 1,
                                                    fontSize: 24,
                                                    backgroundColor: 'light.secondary'
                                                }}/>}>
                                        Orders
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/transactions" style={{textDecoration: 'none'}}>
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
                                            <Badge color="secondary" max={100} badgeContent={999} variant="dot"
                                                   sx={{color: 'secondary.main'}}>
                                                <Favorite
                                                    sx={{
                                                        cursor: 'pointer',
                                                        color: 'secondary.main',
                                                        borderRadius: '25%',
                                                        padding: 1,
                                                        fontSize: 24,
                                                        backgroundColor: 'light.secondary'
                                                    }}/>
                                            </Badge>}>
                                        Transactions
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
                                                        borderRadius: '25%',
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
                                                borderRadius: '25%',
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
                                    fontSize: 24,
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
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        )}
                    </Stack>
                </Stack>
            </Container>
        </Toolbar>
    )
}


export default DesktopHeader;