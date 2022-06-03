import {Avatar, Badge, Button, Container, Divider, Menu, MenuItem, Stack, Toolbar, Typography} from "@mui/material";
import logo from "./../../assets/images/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {UTILS} from "../../utils/utils";
import {
    DarkMode,
    ExitToApp,
    Face,
    Favorite, KeyboardArrowDown,
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
    const [openProductsMenu, setProductsMenuOpen] = useState(false);
    const [openFeaturedMenu, setFeaturedMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [featuredAnchorEl, setFeaturedAnchorEl] = useState(null);
    const [productsAnchorEl, setProductsAnchorEl] = useState(null);

    const handleProductsMenuOpen = event => {
        setProductsMenuOpen(true);
        setProductsAnchorEl(event.currentTarget);
    }

    const handleProductsMenuClose = () => {
        setProductsMenuOpen(false);
        setProductsAnchorEl(null);
    }

    const handleMenuOpen = event => {
        setMenuOpen(true);
        setAnchorEl(event.currentTarget);
    }

    const handleMenuClose = () => {
        setMenuOpen(false);
        setAnchorEl(null);
    }

    const handleFeaturedMenuOpen = event => {
        setFeaturedMenuOpen(true);
        setFeaturedAnchorEl(event.currentTarget);
    }

    const handleFeaturedMenuClose = () => {
        setFeaturedMenuOpen(false);
        setFeaturedAnchorEl(null);
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
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <img
                                src={logo}
                                style={{width: 50, height: 50, objectFit: 'contain', objectPosition: 'center'}}
                                alt="Ruderalis Logo"
                            />
                        </Link>
                        <Link to="/" style={{textDecoration: 'none'}}>
                            <Typography
                                sx={{color: 'text.primary'}}
                                fontFamily="EuclidCircularA"
                                variant="h4">Ruderalis</Typography>
                        </Link>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={3}>
                        <NavLink label="Home" path="/" active={activePath === '/'}/>
                        <Button
                            onClick={handleFeaturedMenuOpen}
                            size="large"
                            variant="text"
                            endIcon={<KeyboardArrowDown/>}
                            sx={{
                                fontSize: 18,
                                borderTopRightRadius: 32,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 32,
                                color: activePath.startsWith('/marijuana') ? 'secondary.main' : 'text.secondary',
                                backgroundColor: activePath.startsWith('/marijuana') ? 'light.secondary' : false,
                                textTransform: 'capitalize',
                            }}>
                            Featured
                        </Button>
                        <Button
                            onClick={handleProductsMenuOpen}
                            size="large"
                            variant="text"
                            endIcon={<KeyboardArrowDown/>}
                            sx={{
                                fontSize: 18,
                                borderTopRightRadius: 32,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 32,
                                color: activePath.startsWith('/marijuana') ? 'secondary.main' : 'text.secondary',
                                backgroundColor: activePath.startsWith('/marijuana') ? 'light.secondary' : false,
                                textTransform: 'capitalize',
                            }}>
                            Products
                        </Button>
                        <NavLink label="Shops" path="/shops" active={activePath === '/shops'}/>
                        <NavLink label="Trips" path="/trips" active={activePath === '/trips'}/>
                        <NavLink label="About" path="/about" active={activePath === '/about'}/>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Link to="/profile" style={{textDecoration: 'none'}}>
                            <Avatar
                                sx={{
                                    backgroundColor: 'light.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32
                                }}>
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
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        </Badge>
                        <Badge
                            color="secondary"
                            max={100}
                            badgeContent={items && items.length === 0 ? null : items.length}
                            variant="standard">
                            <Link to="/cart" style={{textDecoration: 'none'}}>
                                <ShoppingBag
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'secondary.main',
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
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
                                borderTopRightRadius: 32,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 32,
                                padding: 1,
                                fontSize: 24,
                                backgroundColor: 'light.secondary'
                            }}/>

                        <Menu
                            open={openMenu}
                            onClose={handleMenuClose}
                            elevation={2}
                            anchorEl={anchorEl}>
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
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
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
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
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
                                                        borderTopRightRadius: 32,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 32,
                                                        borderTopLeftRadius: 32,
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
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 1,
                                                fontSize: 24,
                                                backgroundColor: 'light.secondary'
                                            }}/>}>
                                    Logout
                                </Button>
                            </MenuItem>
                        </Menu>

                        <Menu
                            open={openFeaturedMenu}
                            onClose={handleFeaturedMenuClose}
                            elevation={2}
                            anchorEl={featuredAnchorEl}>
                            <MenuItem>
                                <Link to="/featured/marijuana" style={{textDecoration: 'none'}}>
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
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                    padding: 1,
                                                    fontSize: 24,
                                                    backgroundColor: 'light.secondary'
                                                }}/>}>
                                        Marijuana
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/featured/edibles" style={{textDecoration: 'none'}}>
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
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                    padding: 1,
                                                    fontSize: 24,
                                                    backgroundColor: 'light.secondary'
                                                }}/>}>
                                        Edibles
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/featured/accessories" style={{textDecoration: 'none'}}>
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
                                                        borderTopRightRadius: 32,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 32,
                                                        borderTopLeftRadius: 32,
                                                        padding: 1,
                                                        fontSize: 24,
                                                        backgroundColor: 'light.secondary'
                                                    }}/>
                                            </Badge>}>
                                        Accessories
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/featured/shops" style={{textDecoration: 'none'}}>
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
                                                        borderTopRightRadius: 32,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 32,
                                                        borderTopLeftRadius: 32,
                                                        padding: 1,
                                                        fontSize: 24,
                                                        backgroundColor: 'light.secondary'
                                                    }}/>
                                            </Badge>}>
                                        Shops
                                    </Button>
                                </Link>
                            </MenuItem>

                        </Menu>


                        <Menu
                            onOpen
                            open={openProductsMenu}
                            onClose={handleProductsMenuClose}
                            elevation={2}
                            anchorEl={productsAnchorEl}>
                            <MenuItem>
                                <Link to="/products/marijuana" style={{textDecoration: 'none'}}>
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
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                    padding: 1,
                                                    fontSize: 24,
                                                    backgroundColor: 'light.secondary'
                                                }}/>}>
                                        Marijuana
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/products/edibles" style={{textDecoration: 'none'}}>
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
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                    padding: 1,
                                                    fontSize: 24,
                                                    backgroundColor: 'light.secondary'
                                                }}/>}>
                                        Edibles
                                    </Button>
                                </Link>
                            </MenuItem>
                            <MenuItem>
                                <Link to="/products/accessories" style={{textDecoration: 'none'}}>
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
                                                        borderTopRightRadius: 32,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 32,
                                                        borderTopLeftRadius: 32,
                                                        padding: 1,
                                                        fontSize: 24,
                                                        backgroundColor: 'light.secondary'
                                                    }}/>
                                            </Badge>}>
                                        Accessories
                                    </Button>
                                </Link>
                            </MenuItem>
                        </Menu>

                        {themeVariant === 'light' ? (
                            <DarkMode
                                onClick={() => dispatch(toggleTheme())}
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
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
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
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