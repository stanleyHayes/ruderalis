import {Box, Button, Card, CardContent, CardMedia, Divider, Rating, Stack, Tooltip, Typography} from "@mui/material";
import {AddShoppingCart, Favorite, FavoriteBorder, Info} from "@mui/icons-material";
import {red} from "@mui/material/colors";
import currencyFormatter from "currency-formatter";
import {Link} from "react-router-dom";
import {addItem} from "../../redux/features/cart/cart-slice";
import {useDispatch, useSelector} from "react-redux";
import {selectWishlist} from "../../redux/features/wishlist/wishlist-slice";

const Edible = ({edible}) => {

    const dispatch = useDispatch();
    const {wishlists} = useSelector(selectWishlist);

    const handleClick = () => {

    }

    const isWishlist = () => {
        return wishlists.find(item => item._id === edible._id);
    }

    return (
        <Card
            sx={{
                borderTopRightRadius: 16,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 16,
                borderTopLeftRadius: 16
            }}
            elevation={1}>
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
                    src={edible.image}
                />
                <Stack direction="column" spacing={1}>
                    <Typography variant="h5" sx={{color: 'text.primary'}}>{edible.name}</Typography>
                    <Box>
                        <Rating
                            precision={0.1}
                            readOnly={true}
                            value={edible.rating.average}
                            size="large"
                        />
                    </Box>
                    <Typography variant="h5" sx={{color: 'text.secondary'}}>
                        {currencyFormatter.format(edible.price.amount, {code: edible.price.currency})}
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{color: 'text.secondary'}}>
                        {edible.description}
                    </Typography>
                </Stack>
            </CardContent>
            <Divider orientation="horizontal" sx={{backgroundColor: 'divider'}} variant="fullWidth"/>
            <Stack
                justifyContent="space-between"
                direction="row"
                divider={<Divider sx={{backgroundColor: 'divider'}} variant="fullWidth"/>}>
                <Tooltip title={`Add ${edible.name} to favorites`}>
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
                <Tooltip title={`View ${edible.name}`}>
                    <Link style={{textDecoration: 'none'}} to={`/edibles/${edible._id}`}>
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
                <Tooltip title={`Add ${edible.name} to cart`}>
                    <Button
                        onClick={() => dispatch(addItem(edible))}
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

export default Edible;