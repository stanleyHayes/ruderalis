import Layout from "../../components/layout/layout";
import {
    Avatar, Box, Button, Card, CardContent, Chip, Container,
    Divider, Grid, IconButton, Stack, Tooltip, Typography,
} from "@mui/material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {getOrders, selectOrder} from "../../redux/features/order/order-slice";
import {selectWishlist} from "../../redux/features/wishlist/wishlist-slice";
import {UTILS} from "../../utils/utils";
import {useNavigate} from "react-router";
import {
    AccountBalanceWalletOutlined, AddShoppingCartOutlined,
    CalendarTodayOutlined, ChevronRightOutlined,
    FavoriteOutlined, HomeOutlined, LocalShippingOutlined,
    LockOutlined, PersonOutlined, PlaceOutlined,
    ReceiptLongOutlined, ShoppingCartOutlined, VisibilityOutlined,
} from "@mui/icons-material";
import currencyFormatter from "currency-formatter";
import {Link} from "react-router-dom";
import {motion} from 'framer-motion';
import {fadeUp, stagger} from "../../utils/animations";

const iconBox = (color) => ({
    borderRadius: 1, padding: 0.6, fontSize: 34,
    border: '1px solid', borderColor: 'divider',
    backgroundColor: 'light.secondary', color: color || 'secondary.main',
});

const DashboardPage = () => {
    const dispatch = useDispatch();
    const {authData} = useSelector(selectAuth);
    const {orders} = useSelector(selectOrder);
    const {wishlists} = useSelector(selectWishlist);
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    const recentOrders = (orders || []).slice(0, 4);

    const stats = [
        {icon: <ShoppingCartOutlined sx={iconBox('secondary.main')}/>, value: orders?.length || 0, label: 'Total Orders'},
        {icon: <FavoriteOutlined sx={iconBox('error.main')}/>, value: wishlists?.length || 0, label: 'Wishlist Items'},
        {icon: <PlaceOutlined sx={iconBox('info.main')}/>, value: authData?.address ? 1 : 0, label: 'Saved Addresses'},
        {icon: <AccountBalanceWalletOutlined sx={iconBox('secondary.main')}/>, value: UTILS.formatMoney(authData?.balance || 0), label: 'Account Balance'},
    ];

    const quickLinks = [
        {label: 'Profile', desc: 'Manage your personal info', icon: <PersonOutlined/>, to: '/profile'},
        {label: 'Orders', desc: 'View order history', icon: <ReceiptLongOutlined/>, to: '/orders'},
        {label: 'Addresses', desc: 'Manage delivery addresses', icon: <HomeOutlined/>, to: '/account/addresses'},
        {label: 'Password', desc: 'Update your password', icon: <LockOutlined/>, to: '/change-password'},
        {label: 'Wishlist', desc: 'Your saved products', icon: <FavoriteOutlined/>, to: '/wishlists'},
        {label: 'Wallet', desc: 'Manage your funds', icon: <AccountBalanceWalletOutlined/>, to: '/funds'},
    ];

    return (
        <Layout>
            <Box sx={{py: {xs: 4, md: 6}, backgroundColor: 'background.default'}}>
                <Container maxWidth="xl">

                    {/* ═══════════ WELCOME ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" animate="animate">
                    <Stack direction="row" spacing={2} alignItems="center" sx={{mb: 4}}>
                        <Avatar sx={{width: 56, height: 56, bgcolor: 'secondary.main', fontSize: 22, fontWeight: 700, color: 'common.white'}}>
                            {UTILS.getInitials(authData?.fullName || `${authData?.firstName || ''} ${authData?.lastName || ''}`)}
                        </Avatar>
                        <Box>
                            <Typography variant="h5" fontWeight={700} sx={{color: 'text.primary'}}>
                                Welcome back,{' '}
                                <Typography component="span" variant="h5" sx={{color: 'secondary.main', fontWeight: 700}}>
                                    {authData?.firstName || 'there'}
                                </Typography>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Here's an overview of your account and recent activity.
                            </Typography>
                        </Box>
                    </Stack>

                    <Divider sx={{mb: 4}}/>
                    </motion.div>

                    {/* ═══════════ STATS ═══════════ */}
                    <motion.div variants={stagger} initial="initial" animate="animate">
                    <Grid container spacing={2} sx={{mb: 5}}>
                        {stats.map((stat, i) => (
                            <Grid key={i} size={{xs: 12, sm: 6, lg: 3}}>
                                <Card variant="outlined">
                                    <CardContent sx={{p: 2.5, '&:last-child': {pb: 2.5}}}>
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            {stat.icon}
                                            <Box>
                                                <Typography variant="h5" fontWeight={800} sx={{color: 'text.primary'}}>
                                                    {stat.value}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                                                    {stat.label}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    </motion.div>

                    {/* ═══════════ RECENT ORDERS ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Box sx={{mb: 5}}>
                        <Stack direction={{xs: 'column', md: 'row'}} justifyContent="space-between" alignItems={{md: 'center'}} spacing={2} sx={{mb: 3}}>
                            <Box>
                                <Typography variant="h6" fontWeight={700} sx={{color: 'text.primary', mb: 0.5}}>
                                    Recent Orders
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    See what's been ordered, shipped, and delivered.
                                </Typography>
                            </Box>
                            <Button variant="outlined" color="secondary" onClick={() => navigate('/orders')}
                                endIcon={<ShoppingCartOutlined sx={{fontSize: 18}}/>}>
                                View All Orders
                            </Button>
                        </Stack>

                        {recentOrders.length > 0 ? (
                            <Grid container spacing={2}>
                                {recentOrders.map((order, i) => {
                                    const statusColors = {
                                        completed: 'secondary.main', delivered: 'secondary.main',
                                        processing: 'info.main', shipped: 'info.main',
                                        pending: 'warning.main', cancelled: 'error.main',
                                    };
                                    const barColor = statusColors[order.status] || 'secondary.main';

                                    return (
                                        <Grid key={order._id || i} size={{xs: 12, md: 6}}>
                                            <Card variant="outlined" sx={{
                                                overflow: 'hidden', cursor: 'pointer',
                                                transition: 'transform 0.2s, box-shadow 0.2s',
                                                '&:hover': {transform: 'translateY(-2px)', boxShadow: 4},
                                            }} onClick={() => navigate(`/orders/${order._id}`)}>
                                                <Box sx={{height: 3, backgroundColor: barColor}}/>
                                                <CardContent sx={{p: 2.5}}>
                                                    {/* Top: ID + Status */}
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary'}}>
                                                                #{order._id ? order._id.substring(0, 8).toUpperCase() : `ORD-${i + 1}`}
                                                            </Typography>
                                                        </Stack>
                                                        {UTILS.renderOrderStatus(order.status)}
                                                    </Stack>

                                                    <Divider sx={{mb: 2}}/>

                                                    {/* Details grid */}
                                                    <Grid container spacing={1.5} sx={{mb: 2}}>
                                                        <Grid size={{xs: 6}}>
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <AccountBalanceWalletOutlined sx={{fontSize: 16, color: 'text.secondary'}}/>
                                                                <Box>
                                                                    <Typography variant="caption" color="text.secondary" sx={{display: 'block', lineHeight: 1.2}}>Amount</Typography>
                                                                    <Typography variant="body2" fontWeight={700} sx={{color: 'text.primary'}}>
                                                                        {currencyFormatter.format(order.total || UTILS.calculateTotalPrice(order.items || []), {code: 'GHS'})}
                                                                    </Typography>
                                                                </Box>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid size={{xs: 6}}>
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <CalendarTodayOutlined sx={{fontSize: 16, color: 'text.secondary'}}/>
                                                                <Box>
                                                                    <Typography variant="caption" color="text.secondary" sx={{display: 'block', lineHeight: 1.2}}>Ordered</Typography>
                                                                    <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                                        {UTILS.formatRelativeDate(order.createdAt)}
                                                                    </Typography>
                                                                </Box>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid size={{xs: 6}}>
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <LocalShippingOutlined sx={{fontSize: 16, color: 'text.secondary'}}/>
                                                                <Box>
                                                                    <Typography variant="caption" color="text.secondary" sx={{display: 'block', lineHeight: 1.2}}>Items</Typography>
                                                                    <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                                        {order.items?.length || 0} products
                                                                    </Typography>
                                                                </Box>
                                                            </Stack>
                                                        </Grid>
                                                        <Grid size={{xs: 6}}>
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <PlaceOutlined sx={{fontSize: 16, color: 'text.secondary'}}/>
                                                                <Box>
                                                                    <Typography variant="caption" color="text.secondary" sx={{display: 'block', lineHeight: 1.2}}>Delivery</Typography>
                                                                    <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                                        {order.shipping?.address?.city || 'Standard'}
                                                                    </Typography>
                                                                </Box>
                                                            </Stack>
                                                        </Grid>
                                                    </Grid>

                                                    {/* Bottom: items preview + view */}
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Stack direction="row" spacing={0.5}>
                                                            {order.items?.slice(0, 2).map((item, j) => (
                                                                <Chip key={j} size="small" label={item.product?.name} variant="outlined"
                                                                    sx={{fontSize: 10, maxWidth: 100}}/>
                                                            ))}
                                                            {order.items?.length > 2 && (
                                                                <Typography variant="caption" color="text.secondary">+{order.items.length - 2}</Typography>
                                                            )}
                                                        </Stack>
                                                        <Tooltip title="View details">
                                                            <IconButton size="small" sx={{bgcolor: 'light.secondary', borderRadius: 1}}>
                                                                <VisibilityOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        ) : (
                            <Card variant="outlined" sx={{overflow: 'hidden', borderStyle: 'dashed'}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{py: 6, textAlign: 'center'}}>
                                    <Typography variant="h6" fontWeight={700} sx={{color: 'text.primary', mb: 1}}>No orders yet</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                                        Your order history starts here. Browse our menu to get started.
                                    </Typography>
                                    <Button variant="contained" color="secondary" onClick={() => navigate('/products/marijuana')}
                                        startIcon={<AddShoppingCartOutlined/>} sx={{fontWeight: 700}}>
                                        Start Shopping
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </Box>

                    </motion.div>

                    {/* ═══════════ QUICK LINKS ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Box>
                        <Typography variant="h6" fontWeight={700} sx={{color: 'text.primary', mb: 0.5}}>
                            Quick Links
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                            Manage your account settings and preferences.
                        </Typography>
                        <Grid container spacing={2}>
                            {quickLinks.map((link, i) => (
                                <Grid key={i} size={{xs: 12, sm: 6, md: 4}}>
                                    <Card variant="outlined" component={Link} to={link.to}
                                        sx={{
                                            textDecoration: 'none', cursor: 'pointer',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            '&:hover': {transform: 'translateY(-2px)', boxShadow: 4},
                                        }}>
                                        <CardContent sx={{p: 2.5, '&:last-child': {pb: 2.5}}}>
                                            <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Box sx={{
                                                        display: 'flex', p: 1, borderRadius: 1,
                                                        backgroundColor: 'light.secondary', color: 'secondary.main',
                                                    }}>
                                                        {link.icon}
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary'}}>
                                                            {link.label}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">{link.desc}</Typography>
                                                    </Box>
                                                </Stack>
                                                <ChevronRightOutlined sx={{color: 'text.disabled', fontSize: 20}}/>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    </motion.div>

                </Container>
            </Box>
        </Layout>
    );
};

export default DashboardPage;
