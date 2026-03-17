import Layout from "../../components/layout/layout";
import {
    Alert, AlertTitle, Avatar, Box, Breadcrumbs, Button, Card, CardContent,
    Chip, Container, Divider, Grid, IconButton, LinearProgress, Link as MuiLink,
    List, ListItem, ListItemText, Rating, Skeleton, Stack, Tab, Tabs, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {UTILS} from "../../utils/utils";
import {
    Add, AddShoppingCart, CheckCircleOutline, Favorite, FavoriteBorder,
    Home, LocalFlorist, NavigateNext, Remove, Verified,
} from "@mui/icons-material";
import Reviews from "../../components/tabs/reviews";
import ReviewForm from "../../components/dialogs/review-form";
import {useEffect, useState} from "react";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {useSnackbar} from "notistack";
import currencyFormatter from "currency-formatter";
import {getProduct, selectProducts} from "../../redux/features/product/product-slice";
import {addItemWithQuantity, selectCart} from "../../redux/features/cart/cart-slice";
import {addToWishlist, selectWishlist} from "../../redux/features/wishlist/wishlist-slice";
import {getReviews, selectReview} from "../../redux/features/review/review-slice";
import {motion} from 'framer-motion';
import {scaleIn} from "../../utils/animations";

const STRAIN_COLORS = {
    Sativa: 'warning.main',
    Indica: 'info.main',
    Hybrid: 'secondary.main',
};

const STRAIN_BG = {
    Sativa: 'light.accent',
    Indica: 'light.secondary',
    Hybrid: 'light.secondary',
};

const ProductDetailPage = () => {
    const {productLoading, productError, productDetail, products, featuredProducts} = useSelector(selectProducts);
    const {wishlists} = useSelector(selectWishlist);
    const {reviews} = useSelector(selectReview);
    const {productID} = useParams();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const {items: cartItems} = useSelector(selectCart);

    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [tab, setTab] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (productID) {
            dispatch(getProduct({id: productID}));
            dispatch(getReviews({productId: productID}));
        }
    }, [dispatch, productID]);

    // Fallback: find product from local state if API detail is null
    const product = productDetail || [...(products || []), ...(featuredProducts || [])].find(p => p._id === productID) || null;
    // Use product instead of productDetail below — but keep variable name for minimal changes
    const productData = product;

    const isWishlist = () => wishlists?.find(item => item._id === productData?._id);
    const isInCart = cartItems?.find(item => item.product._id === productData?._id);
    const cartQty = isInCart?.quantity || 0;

    const handleAddToCart = () => {
        if (productData) {
            dispatch(addItemWithQuantity({product: productData, quantity}));
            enqueueSnackbar(`Added ${quantity} x ${productData.name} to your cart.`, {variant: 'success'});
        }
    };

    const handleAddToWishlist = () => {
        if (productData) {
            dispatch(addToWishlist({
                product: productData,
                showMessage: enqueueSnackbar,
            }));
        }
    };

    const strainType = productData?.strain || '';
    const strainColor = STRAIN_COLORS[strainType] || 'secondary.main';
    const strainBg = STRAIN_BG[strainType] || 'light.secondary';

    const specs = [
        {label: 'Strain Name', value: productData?.name},
        {label: 'Category', value: productData?.category},
        {label: 'Strain Type', value: productData?.strain},
        {label: 'THC Content', value: productData?.thc},
        {label: 'CBD Content', value: productData?.cbd},
        {label: 'Status', value: productData?.status},
    ];

    if (!productData && !productLoading) {
        return (
            <Layout>
                <Box sx={{py: 10, textAlign: 'center', bgcolor: 'background.default'}}>
                    <Container maxWidth="sm">
                        <Typography variant="h5" fontWeight={700} sx={{color: 'text.primary', mb: 1}}>Product not found</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                            The product you're looking for doesn't exist or may have been removed.
                        </Typography>
                        <Button component={Link} to="/products/marijuana" variant="contained" color="secondary">
                            Browse Products
                        </Button>
                    </Container>
                </Box>
            </Layout>
        );
    }

    return (
        <Layout>
            {productLoading && <LinearProgress color="secondary"/>}

            <Box sx={{bgcolor: 'background.default', py: {xs: 3, md: 5}}}>
                <Container maxWidth="xl">
                    {/* Breadcrumb */}
                    <Breadcrumbs
                        separator={<NavigateNext sx={{fontSize: 16, color: 'text.disabled'}}/>}
                        sx={{mb: 3}}
                    >
                        <MuiLink
                            component={Link}
                            to="/"
                            underline="hover"
                            sx={{display: 'flex', alignItems: 'center', color: 'text.secondary', fontWeight: 500}}
                        >
                            <Home sx={{fontSize: 18, mr: 0.5}}/>
                            Home
                        </MuiLink>
                        <MuiLink
                            component={Link}
                            to="/products"
                            underline="hover"
                            sx={{color: 'text.secondary', fontWeight: 500}}
                        >
                            Flower
                        </MuiLink>
                        <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 600}}>
                            {productData?.name || 'Product'}
                        </Typography>
                    </Breadcrumbs>

                    {productError && (
                        <Alert sx={{mb: 3}} severity="error">
                            <AlertTitle>{productError}</AlertTitle>
                        </Alert>
                    )}

                    {/* Main Product Card */}
                    <motion.div variants={scaleIn} initial="initial" animate="animate">
                    <Card variant="outlined" sx={{overflow: 'hidden', mb: 4}}>
                        <CardContent sx={{p: {xs: 2, md: 4}}}>
                            <Grid container spacing={{xs: 3, md: 5}} alignItems="flex-start">
                                {/* Left — Image */}
                                <Grid size={{xs: 12, md: 5}}>
                                    {productLoading ? (
                                        <Skeleton
                                            variant="rounded"
                                            animation="wave"
                                            sx={{width: '100%', height: {xs: 340, md: 480}, borderRadius: 4}}
                                        />
                                    ) : (
                                        <Box
                                            component="img"
                                            src={productData?.image}
                                            alt={`${productData?.name} product`}
                                            sx={{
                                                width: '100%',
                                                height: {xs: 340, md: 480},
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                display: 'block',
                                                borderRadius: 4,
                                                bgcolor: 'background.alt',
                                            }}
                                        />
                                    )}
                                </Grid>

                                {/* Right — Info */}
                                <Grid size={{xs: 12, md: 7}}>
                                    <Stack spacing={2.5}>
                                        {/* Chips row: strain + category + status */}
                                        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
                                            {productData?.strain && (
                                                <Chip
                                                    icon={<LocalFlorist sx={{fontSize: 14}}/>}
                                                    label={productData?.strain}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: strainBg,
                                                        color: strainColor,
                                                        fontWeight: 600,
                                                    }}
                                                />
                                            )}
                                            {productData?.category && (
                                                <Chip
                                                    label={productData?.category}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'light.accent',
                                                        color: 'accent.main',
                                                        fontWeight: 600,
                                                    }}
                                                />
                                            )}
                                            {UTILS.renderProductStatus(productData?.status)}
                                        </Stack>

                                        {/* Product Name */}
                                        {productLoading ? (
                                            <Skeleton variant="text" animation="wave" width="70%" sx={{fontSize: '2rem'}}/>
                                        ) : (
                                            <Typography variant="h4" sx={{color: 'text.primary', lineHeight: 1.2, fontWeight: 700}}>
                                                {productData?.name}
                                            </Typography>
                                        )}

                                        {/* Rating */}
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Rating
                                                precision={0.1}
                                                readOnly
                                                value={productData?.rating?.average || 0}
                                                size="small"
                                            />
                                            <Typography variant="body2" sx={{color: 'text.secondary', fontWeight: 500}}>
                                                {productData?.rating?.average?.toFixed(1) || '0.0'}
                                            </Typography>
                                            <Typography variant="body2" sx={{color: 'text.disabled'}}>
                                                ({productData?.rating?.count || 0} reviews)
                                            </Typography>
                                        </Stack>

                                        {/* THC / CBD chips */}
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {productData?.thc && (
                                                <Chip
                                                    variant="outlined"
                                                    size="small"
                                                    label={`THC ${productData?.thc}`}
                                                    sx={{fontWeight: 600, borderColor: 'secondary.main', color: 'secondary.main'}}
                                                />
                                            )}
                                            {productData?.cbd && (
                                                <Chip
                                                    variant="outlined"
                                                    size="small"
                                                    label={`CBD ${productData?.cbd}`}
                                                    sx={{fontWeight: 600, borderColor: 'info.main', color: 'info.main'}}
                                                />
                                            )}
                                        </Stack>

                                        {/* Price */}
                                        {productLoading ? (
                                            <Skeleton variant="text" animation="wave" width="30%"/>
                                        ) : (
                                            <Typography variant="h4" sx={{color: 'secondary.main', fontWeight: 800}}>
                                                {productData?.price && currencyFormatter.format(
                                                    productData?.price.amount,
                                                    {code: productData?.price.currency},
                                                )}
                                            </Typography>
                                        )}

                                        <Divider sx={{borderColor: 'divider'}}/>

                                        {/* Description */}
                                        {productLoading ? (
                                            <Stack spacing={1}>
                                                <Skeleton variant="text" animation="wave"/>
                                                <Skeleton variant="text" animation="wave" width="80%"/>
                                            </Stack>
                                        ) : (
                                            <Typography variant="body1" sx={{color: 'text.secondary', lineHeight: 1.8}}>
                                                {productData?.description}
                                            </Typography>
                                        )}

                                        <Divider sx={{borderColor: 'divider'}}/>

                                        {/* Quantity + Add to Cart + Wishlist */}
                                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} alignItems={{sm: 'center'}}>
                                            {/* Quantity selector */}
                                            <Box sx={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 3,
                                                overflow: 'hidden',
                                            }}>
                                                <IconButton
                                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                                    sx={{
                                                        borderRadius: 0,
                                                        color: 'text.primary',
                                                        px: 1.5,
                                                        '&:hover': {bgcolor: 'background.alt'},
                                                    }}
                                                >
                                                    <Remove fontSize="small"/>
                                                </IconButton>
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        px: 3,
                                                        py: 1,
                                                        fontWeight: 700,
                                                        color: 'text.primary',
                                                        minWidth: 48,
                                                        textAlign: 'center',
                                                        userSelect: 'none',
                                                    }}
                                                >
                                                    {quantity}
                                                </Typography>
                                                <IconButton
                                                    onClick={() => setQuantity(prev => prev + 1)}
                                                    sx={{
                                                        borderRadius: 0,
                                                        color: 'text.primary',
                                                        px: 1.5,
                                                        '&:hover': {bgcolor: 'background.alt'},
                                                    }}
                                                >
                                                    <Add fontSize="small"/>
                                                </IconButton>
                                            </Box>

                                            {/* Add to Cart */}
                                            <Button
                                                onClick={handleAddToCart}
                                                variant={isInCart ? 'outlined' : 'contained'}
                                                color="secondary"
                                                size="large"
                                                fullWidth
                                                startIcon={isInCart ? <CheckCircleOutline/> : <AddShoppingCart/>}
                                                disableElevation
                                                sx={{
                                                    py: 1.5,
                                                    fontSize: '1rem',
                                                    fontWeight: 700,
                                                    borderRadius: 3,
                                                }}
                                            >
                                                {isInCart ? `In Cart (${cartQty})` : 'Add to Cart'}
                                            </Button>

                                            {/* Wishlist */}
                                            <IconButton
                                                onClick={handleAddToWishlist}
                                                sx={{
                                                    border: '1px solid',
                                                    borderColor: 'divider',
                                                    borderRadius: 3,
                                                    p: 1.5,
                                                    '&:hover': {
                                                        borderColor: 'error.main',
                                                        bgcolor: 'light.red',
                                                    },
                                                }}
                                            >
                                                {isWishlist() ? (
                                                    <Favorite sx={{color: 'error.main'}}/>
                                                ) : (
                                                    <FavoriteBorder sx={{color: 'text.secondary'}}/>
                                                )}
                                            </IconButton>
                                        </Stack>

                                        {/* Seller Info */}
                                        <Stack
                                            direction="row"
                                            spacing={2}
                                            alignItems="center"
                                            sx={{
                                                bgcolor: 'background.paper',
                                                borderRadius: 3,
                                                p: 2,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            <Avatar sx={{bgcolor: 'light.secondary', width: 44, height: 44}}>
                                                <Typography sx={{color: 'secondary.main', fontWeight: 600}} variant="body2">
                                                    {UTILS.getInitials(productData?.owner?.fullName)}
                                                </Typography>
                                            </Avatar>
                                            <Box sx={{flex: 1}}>
                                                <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 600}}>
                                                    {productData?.owner?.fullName}
                                                </Typography>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Verified sx={{color: 'secondary.main', fontSize: 13}}/>
                                                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                                        Verified Dispensary
                                                    </Typography>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    </motion.div>

                    {/* Tabs Section */}
                    <Card variant="outlined" sx={{overflow: 'hidden'}}>
                        <CardContent sx={{p: {xs: 2, md: 4}}}>
                            <Tabs
                                value={tab}
                                onChange={(_, v) => setTab(v)}
                                textColor="secondary"
                                indicatorColor="secondary"
                                sx={{
                                    borderBottom: '1px solid',
                                    borderColor: 'divider',
                                    mb: 3,
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontSize: '0.95rem',
                                        fontWeight: 600,
                                        minWidth: 100,
                                    },
                                }}
                            >
                                <Tab label="Details" sx={{textTransform: 'none'}}/>
                                <Tab label="Reviews" sx={{textTransform: 'none'}}/>
                            </Tabs>

                            {tab === 0 && (
                                <Box>
                                    {/* Specs list */}
                                    <List disablePadding>
                                        {specs.map((field, index) => (
                                            <Box key={index}>
                                                <ListItem
                                                    disableGutters
                                                    sx={{py: 1.5, px: 1}}
                                                >
                                                    <ListItemText
                                                        primary={field.label}
                                                        slotProps={{
                                                            primary: {
                                                                variant: 'body2',
                                                                sx: {color: 'text.secondary', fontWeight: 500},
                                                            }
                                                        }}
                                                        sx={{flex: '0 0 180px'}}
                                                    />
                                                    <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                                                        {field.value || 'N/A'}
                                                    </Typography>
                                                </ListItem>
                                                {index < specs.length - 1 && <Divider sx={{borderColor: 'divider'}}/>}
                                            </Box>
                                        ))}
                                    </List>

                                    {/* Description row */}
                                    <Divider sx={{borderColor: 'divider', my: 1}}/>
                                    <Box sx={{py: 2, px: 1}}>
                                        <Typography variant="body2" sx={{color: 'text.secondary', fontWeight: 500, mb: 1}}>
                                            Description
                                        </Typography>
                                        <Typography variant="body1" sx={{color: 'text.primary', lineHeight: 1.8}}>
                                            {productData?.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}

                            {tab === 1 && (
                                <Reviews
                                    reviews={productData?.reviews}
                                    rating={productData?.rating}
                                    onWriteReview={() => setReviewDialogOpen(true)}
                                />
                            )}
                        </CardContent>
                    </Card>
                </Container>
            </Box>

            <ReviewForm
                open={reviewDialogOpen}
                handleClose={() => setReviewDialogOpen(false)}
                productId={productData?._id}
            />
        </Layout>
    );
};

export default ProductDetailPage;
