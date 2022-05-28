import {Button, Card, CardContent, CardMedia, Divider, Grid, Rating, Stack, Tooltip, Typography} from "@mui/material";
import {AddShoppingCart, Favorite, FavoriteBorder, Info} from "@mui/icons-material";
import {red} from "@mui/material/colors";
import currencyFormatter from "currency-formatter";
import {Link} from "react-router-dom";
import {addItem} from "../../redux/features/cart/cart-slice";
import {useDispatch, useSelector} from "react-redux";
import {selectWishlist} from "../../redux/features/wishlist/wishlist-slice";

const Product = ({product}) => {

    const dispatch = useDispatch();
    const {wishlists} = useSelector(selectWishlist);

    const handleClick = () => {

    }

    const isWishlist = () => {
        return wishlists.find(item => item._id === product._id);
    }

    return (
        <Card
            sx={{
                borderTopRightRadius: 16,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 16,
                borderTopLeftRadius: 16
            }}
            elevation={0}>
            <CardContent>
                <CardMedia
                    component="img"
                    sx={{
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 16,
                        borderTopLeftRadius: 16,
                        height: 150,
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        mb: 2
                    }}
                    src={product.image}
                />
                <Stack direction="column" spacing={1}>
                    <Grid container={true} alignItems="center" justifyContent="space-between">
                        <Grid item={true}>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                                fontWeight: 'bold'
                            }}>{product.strain}</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography
                                sx={{color: 'text.secondary'}} fontWeight="bold" fontSize={20}
                                variant="body2">&middot;</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography
                                variant="body2"
                                sx={{color: 'text.secondary', fontWeight: 'bold'}}>{product.type}</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography
                                sx={{color: 'text.secondary'}} fontWeight="bold" fontSize={20}
                                variant="body2">&middot;</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Rating
                                precision={0.1}
                                readOnly={true}
                                value={product.rating}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="h5" sx={{color: 'text.primary'}}>{product.name}</Typography>
                    <Typography variant="h5" sx={{color: 'text.secondary'}}>
                        {currencyFormatter.format(product.price.amount, {code: product.price.currency})}
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
                    <Link style={{textDecoration: 'none'}} to={`/products/${product._id}`}>
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
                        onClick={() => dispatch(addItem(product))}
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