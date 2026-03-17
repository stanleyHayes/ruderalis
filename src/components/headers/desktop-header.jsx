import {Avatar, Badge, Box, Button, Container, IconButton, Menu, MenuItem, Stack, Toolbar, Typography} from "@mui/material";
import logo from "./../../assets/images/logo.png";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {UTILS} from "../../utils/utils";
import {
    DarkModeOutlined,
    ExpandMore,
    FavoriteBorderOutlined,
    LightModeOutlined,
    LocalMallOutlined,
    LocalShippingOutlined,
    LogoutOutlined,
    PersonOutlineOutlined,
    ReceiptLongOutlined,
    SearchOutlined,
} from "@mui/icons-material";
import {selectUI, toggleTheme} from "../../redux/features/ui/ui-slice";
import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import {selectCart} from "../../redux/features/cart/cart-slice";
import {selectWishlist} from "../../redux/features/wishlist/wishlist-slice";

const DesktopHeader = () => {
    const {authData} = useSelector(selectAuth);
    const {themeVariant} = useSelector(selectUI);
    const {pathname: activePath} = useLocation();
    const {items} = useSelector(selectCart);
    const {wishlists} = useSelector(selectWishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const [accountEl, setAccountEl] = useState(null);
    const [shopEl, setShopEl] = useState(null);

    const handleLogout = () => {
        setAccountEl(null);
        dispatch(AUTH_ACTION_CREATORS.logout({navigate, showMessage: enqueueSnackbar}));
    };

    const navBtn = (isActive) => ({
        color: isActive ? 'secondary.main' : 'text.primary',
        fontWeight: isActive ? 700 : 600,
        fontSize: '0.875rem',
        textTransform: 'none',
        px: 2, py: 0.8,
        borderRadius: 0,
        position: 'relative',
        backgroundColor: 'transparent',
        transition: 'all 0.25s ease',
        '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: isActive ? '10%' : '50%',
            width: isActive ? '80%' : '0%',
            height: 2,
            borderRadius: 1,
            backgroundColor: 'secondary.main',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        '&:hover': {
            color: 'secondary.main',
            backgroundColor: 'transparent',
        },
        '&:hover::after': {
            left: '10%',
            width: '80%',
        },
    });

    return (
        <Toolbar sx={{py: 0.5}}>
            <Container maxWidth="xl">
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Link to="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10}}>
                        <img src={logo} style={{width: 36, height: 36, objectFit: 'contain'}} alt="Ruderalis"/>
                        <Typography fontFamily="TTSquares" variant="h6" sx={{color: 'text.primary', fontWeight: 700}}>
                            Ruderalis
                        </Typography>
                    </Link>

                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Button component={Link} to="/" sx={navBtn(activePath === '/')}>Home</Button>
                        <Button
                            onClick={(e) => setShopEl(e.currentTarget)}
                            endIcon={<ExpandMore sx={{fontSize: '16px !important'}}/>}
                            sx={navBtn(activePath.includes('/products'))}>
                            Shop
                        </Button>
                        <Button component={Link} to="/shops" sx={navBtn(activePath === '/shops')}>Dispensaries</Button>
                        <Button component={Link} to="/blog" sx={navBtn(activePath === '/blog')}>Blog</Button>
                        <Button component={Link} to="/about" sx={navBtn(activePath === '/about')}>About</Button>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <IconButton sx={{color: 'text.secondary', '&:hover': {color: 'secondary.main'}}} size="small">
                            <SearchOutlined sx={{fontSize: 22}}/>
                        </IconButton>

                        <IconButton
                            onClick={() => dispatch(toggleTheme())}
                            sx={{color: 'text.secondary', '&:hover': {color: 'secondary.main'}}} size="small">
                            {themeVariant === 'light' ? <DarkModeOutlined sx={{fontSize: 22}}/> : <LightModeOutlined sx={{fontSize: 22}}/>}
                        </IconButton>

                        <Badge badgeContent={wishlists?.length || 0} color="error" max={99}
                               sx={{'& .MuiBadge-badge': {fontSize: 10, fontWeight: 700, minWidth: 16, height: 16, top: 4, right: 4}}}>
                            <IconButton component={Link} to="/wishlists"
                                        sx={{color: 'text.secondary', '&:hover': {color: 'error.main'}}} size="small">
                                <FavoriteBorderOutlined sx={{fontSize: 22}}/>
                            </IconButton>
                        </Badge>

                        <Badge badgeContent={items?.length || 0} color="secondary" max={99}
                               sx={{'& .MuiBadge-badge': {fontSize: 10, fontWeight: 700, minWidth: 16, height: 16, top: 4, right: 4}}}>
                            <IconButton component={Link} to="/cart"
                                        sx={{color: 'text.secondary', '&:hover': {color: 'secondary.main'}}} size="small">
                                <LocalMallOutlined sx={{fontSize: 22}}/>
                            </IconButton>
                        </Badge>

                        <Box
                            onClick={(e) => setAccountEl(e.currentTarget)}
                            sx={{
                                display: 'flex', alignItems: 'center', gap: 1, ml: 1,
                                cursor: 'pointer', py: 0.5, px: 1.5, borderRadius: 3,
                                border: '1px solid', borderColor: 'divider',
                                '&:hover': {borderColor: 'secondary.main', backgroundColor: 'light.secondary'},
                                transition: 'all 0.2s',
                            }}>
                            <Avatar sx={{
                                width: 30, height: 30,
                                background: (theme) => `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
                                fontSize: 12, fontWeight: 700,
                            }}>
                                {UTILS.getInitials(authData?.fullName || `${authData?.firstName || ''} ${authData?.lastName || ''}`)}
                            </Avatar>
                            <Typography variant="caption" sx={{color: 'text.primary', fontWeight: 600}}>
                                {authData?.firstName || 'Account'}
                            </Typography>
                        </Box>
                    </Stack>
                </Stack>
            </Container>

            {/* Shop Menu */}
            <Menu open={Boolean(shopEl)} onClose={() => setShopEl(null)} anchorEl={shopEl}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                  transformOrigin={{vertical: 'top', horizontal: 'left'}}>
                <Box sx={{minWidth: 240}}>
                    <Box sx={{px: 2.5, py: 1.5, borderBottom: '1px solid', borderColor: 'divider'}}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary'}}>Browse Products</Typography>
                    </Box>
                    {[
                        {label: 'All Products', to: '/products/marijuana'},
                        {label: 'Flower', to: '/products/marijuana'},
                        {label: 'Edibles', to: '/products/edibles'},
                        {label: 'Accessories', to: '/products/accessories'},
                    ].map(item => (
                        <MenuItem key={item.label} component={Link} to={item.to} onClick={() => setShopEl(null)}
                                  sx={{py: 1.2, px: 2.5}}>
                            <Typography variant="body2" fontWeight={500} sx={{color: 'text.primary'}}>{item.label}</Typography>
                        </MenuItem>
                    ))}
                    <Box sx={{borderTop: '1px solid', borderColor: 'divider', mt: 0.5, pt: 0.5}}>
                        {[
                            {label: 'Featured', to: '/featured/marijuana'},
                            {label: 'On Sale', to: '/products/marijuana'},
                            {label: 'Dispensaries', to: '/shops'},
                        ].map(item => (
                            <MenuItem key={item.label} component={Link} to={item.to} onClick={() => setShopEl(null)}
                                      sx={{py: 1.2, px: 2.5}}>
                                <Typography variant="body2" fontWeight={500} sx={{color: 'text.primary'}}>{item.label}</Typography>
                            </MenuItem>
                        ))}
                    </Box>
                </Box>
            </Menu>

            {/* Account Menu */}
            <Menu open={Boolean(accountEl)} onClose={() => setAccountEl(null)} anchorEl={accountEl}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                  transformOrigin={{vertical: 'top', horizontal: 'right'}}>
                <Box sx={{px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', mb: 0.5}}>
                    <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 600}}>
                        {authData?.fullName || `${authData?.firstName || ''} ${authData?.lastName || ''}`}
                    </Typography>
                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                        {authData?.email || 'Member'}
                    </Typography>
                </Box>
                {[
                    {icon: <PersonOutlineOutlined sx={{fontSize: 20}}/>, label: 'Profile', to: '/profile'},
                    {icon: <ReceiptLongOutlined sx={{fontSize: 20}}/>, label: 'Orders', to: '/orders'},
                    {icon: <FavoriteBorderOutlined sx={{fontSize: 20}}/>, label: 'Saved Items', to: '/wishlists'},
                    {icon: <LocalShippingOutlined sx={{fontSize: 20}}/>, label: 'Tracking', to: '/tracking'},
                ].map(item => (
                    <MenuItem key={item.to} component={Link} to={item.to} onClick={() => setAccountEl(null)}
                              sx={{py: 1.2, px: 2.5, gap: 1.5, minWidth: 200}}>
                        <Box sx={{color: 'secondary.main'}}>{item.icon}</Box>
                        <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>{item.label}</Typography>
                    </MenuItem>
                ))}
                <Box sx={{borderTop: '1px solid', borderColor: 'divider', mt: 0.5, pt: 0.5}}>
                    <MenuItem onClick={handleLogout} sx={{py: 1.2, px: 2.5, gap: 1.5}}>
                        <LogoutOutlined sx={{fontSize: 20, color: 'error.main'}}/>
                        <Typography variant="body2" fontWeight={500} color="error">Sign Out</Typography>
                    </MenuItem>
                </Box>
            </Menu>
        </Toolbar>
    );
};

export default DesktopHeader;
