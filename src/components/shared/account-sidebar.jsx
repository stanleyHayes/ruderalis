import {Box, Card, CardContent, Chip, Divider, Stack, Typography} from "@mui/material";
import {
    AccountBalanceWalletOutlined, ChevronRightOutlined, DashboardOutlined,
    EditOutlined, FavoriteBorderOutlined, GavelOutlined, HomeOutlined,
    LocalOfferOutlined, LocalShippingOutlined, LockOutlined, PersonOutlined,
    ReceiptLongOutlined,
} from "@mui/icons-material";
import {Link, useLocation} from "react-router-dom";

const links = [
    {label: 'Dashboard', icon: <DashboardOutlined/>, to: '/account/dashboard'},
    {label: 'Profile', icon: <PersonOutlined/>, to: '/profile'},
    {label: 'Orders', icon: <ReceiptLongOutlined/>, to: '/orders'},
    {label: 'Addresses', icon: <HomeOutlined/>, to: '/account/addresses'},
    {label: 'Wishlist', icon: <FavoriteBorderOutlined/>, to: '/wishlists'},
    {label: 'Wallet', icon: <AccountBalanceWalletOutlined/>, to: '/funds'},
    {label: 'Deals & Promos', icon: <LocalOfferOutlined/>, to: '/coupons'},
    {label: 'Disputes', icon: <GavelOutlined/>, to: '/account/conflicts'},
    {label: 'Tracking', icon: <LocalShippingOutlined/>, to: '/tracking'},
    {label: 'Edit Profile', icon: <EditOutlined/>, to: '/update-profile'},
    {label: 'Password', icon: <LockOutlined/>, to: '/change-password'},
];

const AccountSidebar = () => {
    const {pathname} = useLocation();

    return (
        <Card variant="outlined" sx={{overflow: 'hidden'}}>
            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
            <CardContent sx={{p: 0, '&:last-child': {pb: 0}}}>
                <Box sx={{px: 2.5, py: 2}}>
                    <Typography variant="subtitle2" fontWeight={800} sx={{color: 'text.primary'}}>
                        Account Menu
                    </Typography>
                </Box>
                <Divider/>
                {links.map((link, i) => {
                    const isActive = pathname === link.to;
                    return (
                        <Box key={i} component={Link} to={link.to} sx={{
                            textDecoration: 'none', display: 'flex', alignItems: 'center',
                            justifyContent: 'space-between',
                            px: 2.5, py: 1.5,
                            borderLeft: '3px solid',
                            borderColor: isActive ? 'secondary.main' : 'transparent',
                            bgcolor: isActive ? 'light.secondary' : 'transparent',
                            transition: 'all 0.15s ease',
                            '&:hover': {bgcolor: 'action.hover'},
                        }}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <Box sx={{color: isActive ? 'secondary.main' : 'text.secondary', display: 'flex', fontSize: 20}}>
                                    {link.icon}
                                </Box>
                                <Typography variant="body2" sx={{
                                    color: isActive ? 'secondary.main' : 'text.primary',
                                    fontWeight: isActive ? 700 : 500,
                                }}>
                                    {link.label}
                                </Typography>
                            </Stack>
                            <ChevronRightOutlined sx={{fontSize: 16, color: isActive ? 'secondary.main' : 'text.disabled'}}/>
                        </Box>
                    );
                })}
            </CardContent>
        </Card>
    );
};

export default AccountSidebar;
