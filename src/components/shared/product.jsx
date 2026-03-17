import {Box, Card, CardContent, CardMedia, Chip, IconButton, Stack, Typography} from "@mui/material";
import {AddShoppingCartOutlined, CheckOutlined, FavoriteBorderOutlined, FavoriteOutlined, Star} from "@mui/icons-material";
import currencyFormatter from "currency-formatter";
import {Link} from "react-router-dom";
import {addItem, selectCart} from "../../redux/features/cart/cart-slice";
import {useDispatch, useSelector} from "react-redux";
import {addToWishlist, removeFromWishlist, selectWishlist} from "../../redux/features/wishlist/wishlist-slice";
import {useSnackbar} from "notistack";

const Product = ({product}) => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const {wishlists} = useSelector(selectWishlist);
    const {items} = useSelector(selectCart);
    const isWishlist = () => wishlists?.find(item => item._id === product._id || item.product?._id === product._id || item.product === product._id);
    const isInCart = items?.find(item => item.product._id === product._id);

    const handleAddToCart = (e) => {
        e.preventDefault(); e.stopPropagation();
        if (isInCart) {
            enqueueSnackbar(`${product.name} is already in your cart`, {variant: 'info'});
            return;
        }
        enqueueSnackbar(`${product.name} added to cart`, {variant: 'success'});
        dispatch(addItem(product));
    };

    return (
        <Link to={`/products/marijuana/${product._id}`} style={{textDecoration: 'none', display: 'block', height: '100%'}}>
            <Card elevation={0} sx={{
                height: '100%', cursor: 'pointer', overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                '&:hover': {transform: 'translateY(-6px)', boxShadow: (t) => t.palette.mode === 'dark' ? '0 16px 40px rgba(0,0,0,0.4)' : '0 16px 40px rgba(0,0,0,0.1)'},
                '&:hover .prod-img': {transform: 'scale(1.06)'},
                '&:hover .prod-actions': {opacity: 1, transform: 'translateY(0)'},
            }}>
                <Box sx={{position: 'relative', overflow: 'hidden'}}>
                    <CardMedia className="prod-img" component="img"
                        sx={{height: 180, objectFit: 'cover', transition: 'transform 0.5s ease'}}
                        src={product.image} alt={product.name}/>

                    {product.strain && (
                        <Chip label={product.strain} size="small"
                            color={product.strain === 'Sativa' ? 'warning' : product.strain === 'Indica' ? 'info' : 'secondary'}
                            sx={{position: 'absolute', top: 10, left: 10, fontWeight: 700, fontSize: '0.65rem', height: 22}}/>
                    )}
                    {product.sale && (
                        <Chip label="Sale" size="small" color="error"
                            sx={{position: 'absolute', top: 10, right: 10, fontWeight: 700, fontSize: '0.65rem', height: 22}}/>
                    )}

                    <Stack className="prod-actions" direction="row" spacing={0.75} sx={{
                        position: 'absolute', bottom: 10, right: 10,
                        opacity: {xs: 1, md: 0}, transform: {xs: 'translateY(0)', md: 'translateY(8px)'},
                        transition: 'all 0.3s ease',
                    }}>
                        <IconButton onClick={(e) => {
                            e.preventDefault(); e.stopPropagation();
                            if (isWishlist()) {
                                dispatch(removeFromWishlist({id: product._id, showMessage: enqueueSnackbar}));
                            } else {
                                dispatch(addToWishlist({product, showMessage: enqueueSnackbar}));
                            }
                        }} size="small" sx={{
                            bgcolor: 'background.paper', width: 32, height: 32,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            color: isWishlist() ? 'error.main' : 'text.secondary',
                            '&:hover': {bgcolor: 'background.paper', color: 'error.main'},
                        }}>
                            {isWishlist() ? <FavoriteOutlined sx={{fontSize: 16}}/> : <FavoriteBorderOutlined sx={{fontSize: 16}}/>}
                        </IconButton>
                        <IconButton onClick={handleAddToCart} size="small" sx={{
                            bgcolor: isInCart ? 'background.paper' : 'secondary.main',
                            color: isInCart ? 'secondary.main' : 'common.white',
                            width: 32, height: 32,
                            border: isInCart ? '2px solid' : 'none',
                            borderColor: 'secondary.main',
                            boxShadow: (t) => `0 4px 12px ${t.palette.mode === 'dark' ? 'rgba(34,197,94,0.4)' : 'rgba(34,197,94,0.25)'}`,
                            '&:hover': {bgcolor: 'secondary.dark'},
                        }}>
                            {isInCart ? <CheckOutlined sx={{fontSize: 16}}/> : <AddShoppingCartOutlined sx={{fontSize: 16}}/>}
                        </IconButton>
                    </Stack>
                </Box>

                <CardContent sx={{p: 1.5, '&:last-child': {pb: 1.5}, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 100}}>
                    <Box>
                        <Typography variant="body2" sx={{
                            color: 'text.primary', fontWeight: 600, mb: 0.25,
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.85rem',
                        }}>{product.name}</Typography>

                        <Typography variant="caption" sx={{color: 'text.disabled', display: 'block', mb: 0.75, fontSize: '0.7rem', minHeight: 18}}>
                            {product.thc ? `THC ${product.thc}%` : ''}{product.thc && product.cbd ? ' · ' : ''}{product.cbd ? `CBD ${product.cbd}%` : ''}{!product.thc && !product.cbd ? '\u00A0' : ''}
                        </Typography>
                    </Box>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" sx={{color: 'secondary.main', fontWeight: 700}}>
                            {currencyFormatter.format(product.price?.amount || product.price || 0, {code: product.price?.currency || 'GHS'})}
                        </Typography>
                        {(product.rating?.average || product.rating) && (
                            <Stack direction="row" spacing={0.3} alignItems="center">
                                <Star sx={{color: 'accent.main', fontSize: 14}}/>
                                <Typography variant="caption" sx={{color: 'text.disabled', fontWeight: 600, fontSize: '0.7rem'}}>
                                    {typeof product.rating === 'number' ? product.rating.toFixed(1) : product.rating?.average?.toFixed(1) || '0.0'}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Link>
    );
};

export default Product;
