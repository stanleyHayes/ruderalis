import {motion} from "framer-motion";
import {fadeUp, stagger} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardActions,
    Container,
    Grid,
    LinearProgress,
    Stack,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import Empty from "../../components/shared/empty";
import emptyIcon from "./../../assets/images/empty.png";
import {useEffect} from "react";
import {Delete, FavoriteBorder, FavoriteBorderOutlined, ShoppingCart} from "@mui/icons-material";
import Product from "../../components/shared/product";
import {getWishlists, removeFromWishlist, selectWishlist} from "../../redux/features/wishlist/wishlist-slice";
import {addItem, selectCart} from "../../redux/features/cart/cart-slice";
import {CheckCircleOutline} from "@mui/icons-material";
import {useSnackbar} from "notistack";
import AccountSidebar from "../../components/shared/account-sidebar";

const WishlistsPage = () => {
    const {wishlistLoading, wishlists, wishlistError} = useSelector(selectWishlist);
    const {items: cartItems} = useSelector(selectCart);
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const isInCart = (productId) => cartItems?.find(item => item.product._id === productId);

    useEffect(() => {
        dispatch(getWishlists());
    }, [dispatch]);

    const handleRemoveFromWishlist = (id) => {
        dispatch(removeFromWishlist({id, showMessage: enqueueSnackbar}));
    };

    const handleAddToCart = (product) => {
        dispatch(addItem(product));
        enqueueSnackbar('Item added to cart', {variant: 'success'});
    };

    return (
        <Layout>
            {wishlistLoading && <LinearProgress variant="query" color="secondary"/>}

            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 3, md: 5}, pb: {xs: 2, md: 4}}}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <FavoriteBorderOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Your Collection</Typography>
                    </Stack>
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>Saved Items</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>Products you've saved for later</Typography>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 5}}}>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 8}}>
                        {wishlistError && (
                            <Alert sx={{mb: 3}} severity="error">
                                <AlertTitle>{wishlistError}</AlertTitle>
                            </Alert>
                        )}

                        {wishlists && wishlists.length === 0 ? (
                            <Box sx={{py: 8, display: 'flex', justifyContent: 'center'}}>
                                <Empty
                                    title="No saved items"
                                    message="Your wishlist is empty. Browse our menu and save items you love for later."
                                    button={
                                        <Button onClick={() => dispatch(getWishlists())} variant="contained" size="large"
                                            color="secondary" disableElevation={true} sx={{textTransform: 'none'}}>
                                            Refresh
                                        </Button>
                                    }
                                    icon={<img alt="Empty" src={emptyIcon} style={{height: 80, width: 80, objectFit: 'contain'}}/>}
                                />
                            </Box>
                        ) : (
                            <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Grid container spacing={3}>
                                {wishlists && wishlists.map((item, index) => {
                                    // Handle both shapes: {product: {...}} from API and direct product objects from local storage
                                    const product = item.product && typeof item.product === 'object' && item.product._id ? item.product : item;
                                    const wishlistId = item._id;
                                    const productId = product._id;
                                    return (
                                    <Grid key={index} size={{xs: 12, sm: 6, md: 6, lg: 4}}>
                                        <motion.div variants={fadeUp}>
                                        <Box>
                                            <Product product={product}/>
                                            <Card elevation={0} sx={{borderTopLeftRadius: 0, borderTopRightRadius: 0, mt: -0.5}}>
                                                <CardActions sx={{p: 1.5}}>
                                                    <Stack sx={{width: '100%'}} direction="row" spacing={1}>
                                                        <Button
                                                            onClick={() => !isInCart(productId) && handleAddToCart(product)}
                                                            variant={isInCart(productId) ? 'outlined' : 'contained'}
                                                            color="secondary" size="small"
                                                            startIcon={isInCart(productId) ? <CheckCircleOutline fontSize="small"/> : <ShoppingCart fontSize="small"/>}
                                                            disableElevation
                                                            sx={{flex: 1}}>
                                                            {isInCart(productId) ? `In Cart (${isInCart(productId).quantity})` : 'Add to Cart'}
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleRemoveFromWishlist(wishlistId)}
                                                            variant="outlined" color="error" size="small"
                                                            startIcon={<Delete fontSize="small"/>}
                                                            sx={{flex: 1}}>
                                                            Remove
                                                        </Button>
                                                    </Stack>
                                                </CardActions>
                                            </Card>
                                        </Box>
                                        </motion.div>
                                    </Grid>
                                    );
                                })}
                            </Grid>
                            </motion.div>
                        )}
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <Box sx={{position: 'sticky', top: 80}}>
                            <AccountSidebar/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default WishlistsPage;
