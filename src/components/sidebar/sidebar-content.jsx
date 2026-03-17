import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar,
    Box,
    Button,
    Divider,
    Stack,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, selectUI, changePath} from "../../redux/features/ui/ui-slice";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {UTILS} from "../../utils/utils";
import SidebarLink from "../shared/sidebar-link";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import {useSnackbar} from "notistack";

import {
    ChevronRight,
    Close,
    ConfirmationNumberOutlined,
    DashboardOutlined,
    DeleteForever,
    EditOutlined,
    ExitToApp,
    FavoriteBorder,
    Home,
    HomeOutlined,
    InfoOutlined,
    LocalMall,
    LocalMallOutlined,
    LocalShippingOutlined,
    LocationOnOutlined,
    LockOutlined,
    MenuBookOutlined,
    PersonOutline,
    ShoppingCartOutlined,
    Spa,
    SpaOutlined,
    Star,
    StarOutlined,
    StorefrontOutlined,
} from "@mui/icons-material";

const SidebarContent = () => {
    const {pathname: activePath} = useLocation();
    const {authData} = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const handleLogout = () => {
        dispatch(closeDrawer());
        dispatch(AUTH_ACTION_CREATORS.logout({navigate, showMessage: enqueueSnackbar}));
    };

    const handleDeleteAccount = () => {
        dispatch(closeDrawer());
        dispatch(AUTH_ACTION_CREATORS.deleteAccount({navigate, showMessage: enqueueSnackbar}));
    };

    const handleClose = () => {
        dispatch(closeDrawer());
    };

    const sectionHeaderSx = {
        color: 'text.secondary',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        px: 3,
        pt: 2.5,
        pb: 1,
    };

    const iconSx = (isActive) => ({
        fontSize: 22,
        color: isActive ? 'secondary.main' : 'text.secondary',
        transition: 'color 0.2s ease',
    });

    const accordionSx = {
        width: '100%',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '&:before': {display: 'none'},
        '& .MuiAccordionSummary-root': {
            minHeight: 44,
            px: 3,
            py: 0,
            '&:hover': {backgroundColor: 'action.hover'},
        },
        '& .MuiAccordionSummary-content': {my: 0},
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                minWidth: '80vw',
                maxWidth: 320,
                backgroundColor: 'background.default',
                display: 'flex',
                flexDirection: 'column',
            }}>
            <Box
                sx={{
                    px: 3,
                    pt: 3,
                    pb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        sx={{
                            width: 48,
                            height: 48,
                            background: (theme) =>
                                `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                            fontSize: 18,
                            fontWeight: 700,
                        }}>
                        {UTILS.getInitials(authData?.fullName || `${authData?.firstName || ''} ${authData?.lastName || ''}`)}
                    </Avatar>
                    <Box>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: 'text.primary',
                                fontWeight: 600,
                                lineHeight: 1.3,
                            }}>
                            {authData?.fullName || `${authData?.firstName || ''} ${authData?.lastName || ''}`}
                        </Typography>
                        <Typography variant="caption" sx={{color: 'text.secondary'}}>
                            {authData?.email || ''}
                        </Typography>
                    </Box>
                </Stack>
                <Box
                    onClick={handleClose}
                    sx={{
                        cursor: 'pointer',
                        p: 0.5,
                        borderRadius: '50%',
                        '&:hover': {backgroundColor: 'action.hover'},
                    }}>
                    <Close sx={{color: 'text.secondary', fontSize: 22}}/>
                </Box>
            </Box>

            <Divider sx={{borderColor: 'divider'}}/>

            <Box sx={{flex: 1, overflowY: 'auto', py: 1}}>
                <Typography sx={sectionHeaderSx}>Browse</Typography>

                <SidebarLink
                    active={activePath === '/'}
                    label="Home"
                    path="/"
                    icon={activePath === '/'
                        ? <Home sx={iconSx(true)}/>
                        : <HomeOutlined sx={iconSx(false)}/>
                    }
                />

                <Accordion disableGutters square sx={accordionSx} elevation={0}>
                    <AccordionSummary
                        expandIcon={
                            <ChevronRight sx={{fontSize: 18, color: 'text.secondary'}}/>
                        }>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            {activePath.includes('products')
                                ? <Spa sx={iconSx(true)}/>
                                : <SpaOutlined sx={iconSx(false)}/>
                            }
                            <Typography
                                variant="body2"
                                sx={{
                                    color: activePath.includes('products') ? 'secondary.main' : 'text.primary',
                                    fontWeight: activePath.includes('products') ? 600 : 400,
                                    fontSize: 14,
                                    textTransform: 'none',
                                }}>
                                Products
                            </Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{p: 0, pl: 2}}>
                        <SidebarLink
                            active={activePath.includes('marijuana')}
                            label="Flower"
                            path="/products/marijuana"
                            icon={<SpaOutlined sx={iconSx(activePath.includes('marijuana'))}/>}
                        />
                        <SidebarLink
                            active={activePath.includes('edibles')}
                            label="Edibles"
                            path="/products/edibles"
                            icon={<LocalMallOutlined sx={iconSx(activePath.includes('edibles'))}/>}
                        />
                        <SidebarLink
                            active={activePath.includes('accessories')}
                            label="Accessories"
                            path="/products/accessories"
                            icon={<ShoppingCartOutlined sx={iconSx(activePath.includes('accessories'))}/>}
                        />
                    </AccordionDetails>
                </Accordion>

                <Accordion disableGutters square sx={accordionSx} elevation={0}>
                    <AccordionSummary
                        expandIcon={
                            <ChevronRight sx={{fontSize: 18, color: 'text.secondary'}}/>
                        }>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            {activePath.includes('featured')
                                ? <Star sx={iconSx(true)}/>
                                : <StarOutlined sx={iconSx(false)}/>
                            }
                            <Typography
                                variant="body2"
                                sx={{
                                    color: activePath.includes('featured') ? 'secondary.main' : 'text.primary',
                                    fontWeight: activePath.includes('featured') ? 600 : 400,
                                    fontSize: 14,
                                    textTransform: 'none',
                                }}>
                                Featured
                            </Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{p: 0, pl: 2}}>
                        <SidebarLink
                            active={activePath.includes('marijuana') && activePath.includes('featured')}
                            label="Flower"
                            path="/marijuana/featured"
                            icon={<SpaOutlined sx={iconSx(activePath.includes('marijuana') && activePath.includes('featured'))}/>}
                        />
                        <SidebarLink
                            active={activePath.includes('edibles') && activePath.includes('featured')}
                            label="Edibles"
                            path="/edibles/featured"
                            icon={<LocalMallOutlined sx={iconSx(activePath.includes('edibles') && activePath.includes('featured'))}/>}
                        />
                        <SidebarLink
                            active={activePath.includes('accessories') && activePath.includes('featured')}
                            label="Accessories"
                            path="/accessories/featured"
                            icon={<ShoppingCartOutlined sx={iconSx(activePath.includes('accessories') && activePath.includes('featured'))}/>}
                        />
                    </AccordionDetails>
                </Accordion>

                <SidebarLink
                    active={activePath === '/shops'}
                    label="Dispensaries"
                    path="/shops"
                    icon={<StorefrontOutlined sx={iconSx(activePath === '/shops')}/>}
                />

                <SidebarLink
                    active={activePath === '/blog'}
                    label="Blog"
                    path="/blog"
                    icon={<MenuBookOutlined sx={iconSx(activePath === '/blog')}/>}
                />

                <SidebarLink
                    active={activePath === '/about'}
                    label="About"
                    path="/about"
                    icon={<InfoOutlined sx={iconSx(activePath === '/about')}/>}
                />

                <SidebarLink
                    active={activePath === '/coupons'}
                    label="Coupons & Deals"
                    path="/coupons"
                    icon={<ConfirmationNumberOutlined sx={iconSx(activePath === '/coupons')}/>}
                />

                <Divider sx={{borderColor: 'divider', my: 1}}/>

                <Typography sx={sectionHeaderSx}>Account</Typography>

                <SidebarLink
                    active={activePath === '/account/dashboard'}
                    label="Dashboard"
                    path="/account/dashboard"
                    icon={<DashboardOutlined sx={iconSx(activePath === '/account/dashboard')}/>}
                />
                <SidebarLink
                    active={activePath === '/profile'}
                    label="Profile"
                    path="/profile"
                    icon={<PersonOutline sx={iconSx(activePath === '/profile')}/>}
                />
                <SidebarLink
                    active={activePath === '/cart'}
                    label="Cart"
                    path="/cart"
                    icon={<ShoppingCartOutlined sx={iconSx(activePath === '/cart')}/>}
                />
                <SidebarLink
                    active={activePath === '/orders'}
                    label="Orders"
                    path="/orders"
                    icon={<LocalMall sx={iconSx(activePath === '/orders')}/>}
                />
                <SidebarLink
                    active={activePath === '/wishlist'}
                    label="Wishlist"
                    path="/"
                    icon={<FavoriteBorder sx={iconSx(activePath === '/wishlist')}/>}
                />
                <SidebarLink
                    active={activePath === '/account/addresses'}
                    label="Addresses"
                    path="/account/addresses"
                    icon={<LocationOnOutlined sx={iconSx(activePath === '/account/addresses')}/>}
                />
                <SidebarLink
                    active={activePath === '/tracking'}
                    label="Tracking"
                    path="/tracking"
                    icon={<LocalShippingOutlined sx={iconSx(activePath === '/tracking')}/>}
                />

                <Divider sx={{borderColor: 'divider', my: 1}}/>

                <Typography sx={sectionHeaderSx}>Settings</Typography>

                <SidebarLink
                    active={activePath === '/update-profile'}
                    label="Edit Profile"
                    path="/update-profile"
                    icon={<EditOutlined sx={iconSx(activePath === '/update-profile')}/>}
                />
                <SidebarLink
                    active={activePath === '/change-password'}
                    label="Change Password"
                    path="/change-password"
                    icon={<LockOutlined sx={iconSx(activePath === '/change-password')}/>}
                />
            </Box>

            <Divider sx={{borderColor: 'divider'}}/>
            <Stack sx={{px: 3, py: 2}} spacing={1} direction="column">
                <Button
                    onClick={handleLogout}
                    startIcon={<ExitToApp sx={{fontSize: 20}}/>}
                    fullWidth
                    sx={{
                        justifyContent: 'flex-start',
                        color: 'secondary.main',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: 14,
                        py: 1,
                        px: 1.5,
                        '&:hover': {backgroundColor: 'light.secondary'},
                    }}>
                    Logout
                </Button>
                <Button
                    onClick={handleDeleteAccount}
                    startIcon={<DeleteForever sx={{fontSize: 20}}/>}
                    fullWidth
                    sx={{
                        justifyContent: 'flex-start',
                        color: 'error.main',
                        textTransform: 'none',
                        fontWeight: 500,
                        fontSize: 14,
                        py: 1,
                        px: 1.5,
                        '&:hover': {backgroundColor: 'light.red'},
                    }}>
                    Disable Account
                </Button>
            </Stack>
        </Box>
    );
};

export default SidebarContent;
