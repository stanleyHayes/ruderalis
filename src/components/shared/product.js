import {Box, Button, Card, CardContent, CardMedia, Divider, Rating, Stack, Tooltip, Typography} from "@mui/material";
import {AddShoppingCart, Favorite, FavoriteBorder, Info} from "@mui/icons-material";
import {red} from "@mui/material/colors";
import currencyFormatter from "currency-formatter";
import {Link} from "react-router-dom";
import {addItem} from "../../redux/features/cart/cart-slice";
import {useDispatch, useSelector} from "react-redux";
import {selectWishlist} from "../../redux/features/wishlist/wishlist-slice";
import {useSnackbar} from "notistack";

const Product = ({product}) => {

    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const {wishlists} = useSelector(selectWishlist);

    const handleClick = () => {

    }

    const isWishlist = () => {
        return wishlists.find(item => item._id === product._id);
    }

    const handleAddToCartClick = () => {
        enqueueSnackbar(
            `Added ${product.name} to your cart.`,
            {variant: 'success'}
        );
        dispatch(addItem(product));
    }


    return (
        <Card
            sx={{
                borderTopRightRadius: 32,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 32,
                borderTopLeftRadius: 32
            }}
            elevation={1}>
            <CardContent>
                <CardMedia
                    component="img"
                    sx={{
                        borderTopRightRadius: 32,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 32,
                        borderTopLeftRadius: 32,
                        height: 150,
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        mb: 2
                    }}
                    src={product.image}
                />
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" sx={{color: 'text.primary'}}>{product.name}</Typography>
                    <Box>
                        <Rating
                            precision={0.1}
                            readOnly={true}
                            value={product.rating.average}
                            size="large"
                        />
                    </Box>
                    <Typography variant="h5" sx={{color: 'text.secondary'}}>
                        {currencyFormatter.format(product.price.amount, {code: product.price.currency})}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{color: 'text.secondary'}}>
                        {product.description}
                    </Typography>
                </Stack>
            </CardContent>
            <Divider orientation="horizontal" sx={{backgroundColor: 'divider'}} variant="fullWidth"/>
            <Stack
                justifyContent="space-between"
                direction="row"
                divider={<Divider sx={{backgroundColor: 'divider'}} variant="fullWidth"/>}>
                <Tooltip title={`Add ${product.name} to favorites`}>
                    <Button
                        onClick={handleClick}
                        fullWidth={true}
                        variant="text"
                        startIcon={
                            isWishlist() ? (
                                <Favorite
                                    sx={{
                                        cursor: 'pointer',
                                        color: red[800],
                                        borderRadius: '25%',
                                        padding: 1,
                                        fontSize: 24,
                                    }}/>
                            ) : (
                                <FavoriteBorder
                                    sx={{
                                        cursor: 'pointer',
                                        color: red[800],
                                        borderRadius: '25%',
                                        padding: 1,
                                        fontSize: 24,
                                    }}/>
                            )
                        }
                        sx={{
                            textTransform: 'capitalize',
                            color: red[800]
                        }}>
                        Favorite
                    </Button>
                </Tooltip>
                <Tooltip title={`View ${product.name}`}>
                    <Link style={{textDecoration: 'none'}} to={`/product/${product._id}`}>
                        <Button
                            fullWidth={true}
                            variant="text"
                            startIcon={
                                <Info
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'secondary.main',
                                        borderRadius: '25%',
                                        padding: 1,
                                        fontSize: 24,
                                    }}/>
                            }
                            sx={{textTransform: 'capitalize', color: 'secondary.main'}}>
                            Details
                        </Button>
                    </Link>
                </Tooltip>
                <Tooltip title={`Add ${product.name} to cart`}>
                    <Button
                        onClick={handleAddToCartClick}
                        fullWidth={true}
                        variant="text"
                        startIcon={
                            <AddShoppingCart
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '25%',
                                    padding: 1,
                                    fontSize: 24,
                                }}/>
                        }
                        sx={{textTransform: 'capitalize', color: 'secondary.main'}}>
                        Add
                    </Button>
                </Tooltip>
            </Stack>
        </Card>
    )
}

export default Product;