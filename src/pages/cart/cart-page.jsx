import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import {
    Avatar, Box, Button, Card, CardContent, Chip, Container,
    Divider, Grid, IconButton, Stack, Tooltip, Typography,
} from "@mui/material";
import {
    AddOutlined, ChevronLeftOutlined, ChevronRightOutlined,
    DeleteOutlined, LocalShippingOutlined, LocalMallOutlined,
    LockOutlined, ReceiptOutlined, RemoveOutlined,
    ShoppingCartOutlined, VerifiedOutlined,
} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {addItem, clearCart, decreaseItem, removeItem, selectCart} from "../../redux/features/cart/cart-slice";
import currencyFormatter from "currency-formatter";
import {UTILS} from "../../utils/utils";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {motion} from 'framer-motion';
import {fadeUp} from "../../utils/animations";

const CartPage = () => {
    const {items = []} = useSelector(selectCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const subtotal = items.reduce((sum, it) => sum + (it.product?.price?.amount || 0) * (it.quantity || 1), 0);
    const currency = items[0]?.product?.price?.currency || 'GHS';
    const totalItems = items.reduce((sum, it) => sum + (it.quantity || 1), 0);

    return (
        <Layout>
            <PageBanner title="Shopping Cart" description="Review your items and proceed to checkout" links={[{path: '/', label: 'Home'}, {path: '/cart', label: 'Cart'}]}/>
            <Box sx={{py: {xs: 4, md: 6}, backgroundColor: 'background.default'}}>
                <Container maxWidth="lg">
                    {items.length === 0 ? (
                        /* ═══════════ EMPTY STATE ═══════════ */
                        <Card variant="outlined" sx={{overflow: 'hidden', borderStyle: 'dashed'}}>
                            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                            <CardContent sx={{py: 8, textAlign: 'center'}}>
                                <Box sx={{
                                    width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 3,
                                    backgroundColor: 'light.secondary',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <ShoppingCartOutlined sx={{fontSize: 36, color: 'secondary.main'}}/>
                                </Box>
                                <Typography variant="h5" fontWeight={800} sx={{mb: 1, color: 'text.primary'}}>
                                    Your Cart is Empty
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{mb: 3, maxWidth: 400, mx: 'auto', lineHeight: 1.7}}>
                                    Looks like you haven't added anything yet. Browse our menu and find something you'll love.
                                </Typography>
                                <Stack direction={{xs: 'column', sm: 'row'}} spacing={1.5} justifyContent="center">
                                    <Button
                                        onClick={() => navigate('/products/marijuana')}
                                        endIcon={<ChevronRightOutlined/>}
                                        color="secondary" variant="contained" size="large"
                                        sx={{fontWeight: 700, px: 4}}>
                                        Start Shopping
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/wishlists')}
                                        color="secondary" variant="outlined" size="large"
                                        sx={{fontWeight: 600}}>
                                        View Wishlist
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    ) : (
                        /* ═══════════ CART WITH ITEMS ═══════════ */
                        <motion.div variants={fadeUp} initial="initial" animate="animate">
                        <Grid container spacing={3}>
                            {/* Items column */}
                            <Grid size={{xs: 12, md: 8}}>
                                {/* Header */}
                                <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                    <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                        <ShoppingCartOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                    </Box>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>
                                        Your Items
                                    </Typography>
                                    <Chip size="small" label={`${items.length} item${items.length !== 1 ? 's' : ''}`}
                                        sx={{fontWeight: 700, fontSize: 10, backgroundColor: 'light.secondary', color: 'secondary.main'}}/>
                                    <Box sx={{flex: 1}}/>
                                    <Button onClick={() => dispatch(clearCart())} color="error" size="small"
                                        startIcon={<DeleteOutlined sx={{fontSize: 16}}/>}
                                        sx={{fontSize: 12}}>
                                        Clear All
                                    </Button>
                                </Stack>

                                {/* Cart items */}
                                <Stack spacing={1.5}>
                                    {items.map((item, index) => {
                                        const unitPrice = item.product?.price?.amount || 0;
                                        const lineTotal = unitPrice * (item.quantity || 1);
                                        return (
                                            <Card key={item.product?._id || index} variant="outlined" sx={{overflow: 'hidden'}}>
                                                <CardContent sx={{p: 2, '&:last-child': {pb: 2}}}>
                                                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} alignItems={{xs: 'flex-start', sm: 'center'}}>
                                                        {/* Product info */}
                                                        <Stack direction="row" spacing={2} alignItems="center" sx={{flex: 1, minWidth: 0}}>
                                                            <Avatar variant="rounded" src={item.product?.image}
                                                                sx={{width: 56, height: 56, borderRadius: 1.5}}/>
                                                            <Box sx={{minWidth: 0}}>
                                                                <Typography variant="body2" fontWeight={600} sx={{
                                                                    color: 'text.primary',
                                                                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                                                }}>
                                                                    {item.product?.name}
                                                                </Typography>
                                                                {item.product?.strain && (
                                                                    <Typography variant="caption" color="text.secondary">
                                                                        {item.product.strain}
                                                                    </Typography>
                                                                )}
                                                            </Box>
                                                        </Stack>

                                                        {/* Unit price */}
                                                        <Box sx={{minWidth: 80, textAlign: {xs: 'left', sm: 'center'}}}>
                                                            <Typography variant="caption" color="text.secondary" sx={{display: 'block', fontSize: 10}}>
                                                                Unit price
                                                            </Typography>
                                                            <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                                {currencyFormatter.format(unitPrice, {code: currency})}
                                                            </Typography>
                                                        </Box>

                                                        {/* Quantity controls */}
                                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                                            <IconButton size="small"
                                                                onClick={() => dispatch(decreaseItem(item.product))}
                                                                sx={{
                                                                    border: '1px solid', borderColor: 'divider',
                                                                    width: 30, height: 30, borderRadius: 1,
                                                                }}>
                                                                <RemoveOutlined sx={{fontSize: 16}}/>
                                                            </IconButton>
                                                            <Typography variant="body2" fontWeight={700} sx={{
                                                                minWidth: 32, textAlign: 'center', px: 1, py: 0.25,
                                                                borderRadius: 1, backgroundColor: 'action.hover', color: 'text.primary',
                                                            }}>
                                                                {item.quantity}
                                                            </Typography>
                                                            <IconButton size="small"
                                                                onClick={() => dispatch(addItem(item.product))}
                                                                sx={{
                                                                    border: '1px solid', borderColor: 'divider',
                                                                    width: 30, height: 30, borderRadius: 1,
                                                                }}>
                                                                <AddOutlined sx={{fontSize: 16}}/>
                                                            </IconButton>
                                                        </Stack>

                                                        {/* Line total */}
                                                        <Box sx={{minWidth: 80, textAlign: {xs: 'left', sm: 'right'}}}>
                                                            <Typography variant="caption" color="text.secondary" sx={{display: 'block', fontSize: 10}}>
                                                                Total
                                                            </Typography>
                                                            <Typography variant="body2" fontWeight={800} sx={{color: 'secondary.main'}}>
                                                                {currencyFormatter.format(lineTotal, {code: currency})}
                                                            </Typography>
                                                        </Box>

                                                        {/* Delete */}
                                                        <Tooltip title="Remove item">
                                                            <IconButton size="small"
                                                                onClick={() => dispatch(removeItem(item.product))}
                                                                sx={{
                                                                    width: 34, height: 34, borderRadius: 1,
                                                                    border: '1px solid', borderColor: 'error.main',
                                                                    backgroundColor: 'light.red',
                                                                    '&:hover': {backgroundColor: 'light.red'},
                                                                }}>
                                                                <DeleteOutlined sx={{fontSize: 18, color: 'error.main'}}/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </Stack>

                                {/* Back to shop */}
                                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mt: 3}}>
                                    <Button onClick={() => navigate('/products/marijuana')}
                                        startIcon={<ChevronLeftOutlined/>} color="secondary" variant="text"
                                        sx={{fontWeight: 600}}>
                                        Continue Shopping
                                    </Button>
                                    <Typography variant="caption" color="text.secondary" sx={{display: {xs: 'block', md: 'none'}}}>
                                        {totalItems} items
                                    </Typography>
                                </Stack>
                            </Grid>

                            {/* Sidebar */}
                            <Grid size={{xs: 12, md: 4}}>
                                <Box sx={{position: {md: 'sticky'}, top: {md: 80}}}>
                                    {/* Order Summary */}
                                    <Card variant="outlined" sx={{overflow: 'hidden', mb: 2}}>
                                        <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                        <CardContent sx={{p: 2.5}}>
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                                <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                                    <ReceiptOutlined sx={{fontSize: 16, color: 'secondary.main'}}/>
                                                </Box>
                                                <Typography variant="subtitle2" fontWeight={800} sx={{color: 'text.primary'}}>
                                                    Order Summary
                                                </Typography>
                                            </Stack>

                                            <Stack spacing={1.25}>
                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                    <Typography variant="body2" color="text.secondary">Subtotal ({totalItems} items)</Typography>
                                                    <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                        {currencyFormatter.format(subtotal, {code: currency})}
                                                    </Typography>
                                                </Stack>

                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                    <Typography variant="body2" color="text.secondary">Delivery</Typography>
                                                    <Typography variant="body2" fontWeight={600} sx={{color: 'secondary.main'}}>Free</Typography>
                                                </Stack>

                                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                    <Typography variant="body2" color="text.secondary">Tax</Typography>
                                                    <Typography variant="caption" color="text.secondary">Calculated at checkout</Typography>
                                                </Stack>

                                                <Divider/>

                                                <Box sx={{p: 1.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Typography variant="body2" fontWeight={800} sx={{color: 'text.primary'}}>Total</Typography>
                                                        <Typography variant="h6" fontWeight={800} sx={{color: 'secondary.main'}}>
                                                            {currencyFormatter.format(subtotal, {code: currency})}
                                                        </Typography>
                                                    </Stack>
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Card>

                                    {/* Checkout button */}
                                    <Button
                                        onClick={() => navigate('/checkout')}
                                        endIcon={<ChevronRightOutlined/>}
                                        fullWidth color="secondary" variant="contained" size="large"
                                        sx={{fontWeight: 700, py: 1.5, mb: 2}}>
                                        Proceed to Checkout
                                    </Button>

                                    {/* Trust badges */}
                                    <Stack spacing={1}>
                                        {[
                                            {icon: <LockOutlined sx={{fontSize: 15, color: 'secondary.main'}}/>, label: 'Secure 256-bit SSL checkout'},
                                            {icon: <LocalShippingOutlined sx={{fontSize: 15, color: 'secondary.main'}}/>, label: 'Free discreet delivery'},
                                            {icon: <VerifiedOutlined sx={{fontSize: 15, color: 'secondary.main'}}/>, label: 'All products lab-tested & certified'},
                                        ].map(({icon, label}) => (
                                            <Stack key={label} direction="row" spacing={0.75} alignItems="center">
                                                {icon}
                                                <Typography variant="caption" color="text.secondary" sx={{fontSize: 11}}>
                                                    {label}
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                        </motion.div>
                    )}
                </Container>
            </Box>
        </Layout>
    );
};

export default CartPage;
