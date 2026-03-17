import {Box, Card, CardContent, CardMedia, Chip, IconButton, Rating, Stack, Typography} from "@mui/material";
import {AddRounded, FavoriteBorderOutlined, FavoriteOutlined} from "@mui/icons-material";
import currencyFormatter from "currency-formatter";
import {Link} from "react-router-dom";
import {addItem} from "../../redux/features/cart/cart-slice";
import {useDispatch, useSelector} from "react-redux";
import {addToWishlist, removeFromWishlist, selectWishlist} from "../../redux/features/wishlist/wishlist-slice";
import {useSnackbar} from "notistack";

const Edible = ({edible, variant = 'grid'}) => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const {wishlists} = useSelector(selectWishlist);

    const isWishlist = () => wishlists.find(item =>
        item._id === edible._id || item.product?._id === edible._id
    );

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        enqueueSnackbar(`${edible.name} added to cart`, {variant: 'success'});
        dispatch(addItem(edible));
    };

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isWishlist()) {
            dispatch(removeFromWishlist({id: edible._id, showMessage: enqueueSnackbar}));
        } else {
            dispatch(addToWishlist({product: edible, showMessage: enqueueSnackbar}));
        }
    };

    const price = currencyFormatter.format(edible.price?.amount || edible.price || 0, {code: edible.price?.currency || 'GHS'});

    if (variant === 'list') {
        return (
            <Link to={`/products/edibles/${edible._id}`} style={{textDecoration: 'none', display: 'block'}}>
                <Card
                    elevation={0}
                    sx={{
                        cursor: 'pointer',
                        border: '1px solid', borderColor: 'divider',
                        overflow: 'hidden',
                        transition: 'all 0.2s ease',
                        '&:hover': {borderColor: 'secondary.main', boxShadow: 1},
                        '&:hover .edible-image': {transform: 'scale(1.06)'},
                    }}>
                    <Stack direction="row" alignItems="center">
                        <Box sx={{
                            width: 120, minWidth: 120, height: 100,
                            overflow: 'hidden', position: 'relative',
                        }}>
                            <CardMedia
                                className="edible-image"
                                component="img"
                                sx={{
                                    width: '100%', height: '100%',
                                    objectFit: 'cover',
                                    transition: 'transform 0.4s ease',
                                }}
                                src={edible.image}
                                alt={edible.name}
                            />
                        </Box>

                        <CardContent sx={{flex: 1, p: 2, '&:last-child': {pb: 2}, minWidth: 0}}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                                <Box sx={{minWidth: 0, flex: 1}}>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.5}}>
                                        <Typography variant="subtitle2" sx={{
                                            color: 'text.primary', fontWeight: 700,
                                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                        }}>
                                            {edible.name}
                                        </Typography>
                                        {edible.category && (
                                            <Chip label={edible.category} size="small"
                                                sx={{bgcolor: 'light.secondary', color: 'secondary.main', fontWeight: 600, fontSize: 10, height: 20}}/>
                                        )}
                                    </Stack>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        {edible.strain && (
                                            <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 500}}>
                                                {edible.strain}
                                            </Typography>
                                        )}
                                        {edible.thc > 0 && (
                                            <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                                THC: {edible.thc}mg
                                            </Typography>
                                        )}
                                        {edible.rating?.average > 0 && (
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Rating readOnly precision={0.1} value={edible.rating.average} size="small"
                                                    sx={{'& .MuiRating-iconFilled': {color: 'accent.main'}, fontSize: 14}}/>
                                                <Typography variant="caption" color="text.secondary">({edible.rating.count})</Typography>
                                            </Stack>
                                        )}
                                    </Stack>
                                </Box>

                                <Stack direction="row" spacing={1} alignItems="center" sx={{flexShrink: 0}}>
                                    <Typography variant="subtitle1" sx={{color: 'secondary.main', fontWeight: 700}}>
                                        {price}
                                    </Typography>
                                    <IconButton onClick={handleWishlistToggle} size="small"
                                        sx={{color: isWishlist() ? 'error.main' : 'text.disabled', '&:hover': {color: 'error.main'}}}>
                                        {isWishlist() ? <FavoriteOutlined sx={{fontSize: 18}}/> : <FavoriteBorderOutlined sx={{fontSize: 18}}/>}
                                    </IconButton>
                                    <IconButton onClick={handleAddToCart} size="small"
                                        sx={{bgcolor: 'secondary.main', color: 'common.white', width: 32, height: 32,
                                            '&:hover': {bgcolor: 'secondary.dark'}}}>
                                        <AddRounded sx={{fontSize: 18}}/>
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Stack>
                </Card>
            </Link>
        );
    }

    return (
        <Link to={`/products/edibles/${edible._id}`} style={{textDecoration: 'none', display: 'block', height: '100%'}}>
            <Card
                elevation={0}
                sx={{
                    height: '100%',
                    cursor: 'pointer',
                    backgroundColor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    '&:hover .edible-image': {
                        transform: 'scale(1.06)',
                    },
                }}>
                <Box sx={{position: 'relative', overflow: 'hidden'}}>
                    <CardMedia
                        className="edible-image"
                        component="img"
                        sx={{
                            height: 220,
                            objectFit: 'cover',
                            transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)',
                        }}
                        src={edible.image}
                        alt={edible.name}
                    />

                    <Stack
                        direction="row"
                        spacing={0.75}
                        sx={{position: 'absolute', top: 12, left: 12}}>
                        {edible.category && (
                            <Chip
                                label={edible.category}
                                size="small"
                                sx={{
                                    backgroundColor: 'secondary.main',
                                    color: 'common.white',
                                    fontWeight: 700,
                                    fontSize: '0.7rem',
                                }}
                            />
                        )}
                        {edible.sale?.status && (
                            <Chip label="Sale" size="small"
                                sx={{backgroundColor: 'error.main', color: 'common.white', fontWeight: 700, fontSize: '0.7rem'}}/>
                        )}
                    </Stack>

                    {edible.featured?.status && (
                        <Chip label="Featured" size="small"
                            sx={{position: 'absolute', top: 12, right: 12,
                                backgroundColor: 'accent.main', color: 'common.white', fontWeight: 700, fontSize: '0.7rem'}}/>
                    )}

                    <IconButton
                        onClick={handleWishlistToggle}
                        size="small"
                        sx={{
                            position: 'absolute', bottom: 12, right: 12,
                            backgroundColor: 'background.paper',
                            color: isWishlist() ? 'error.main' : 'text.disabled',
                            width: 34, height: 34,
                            '&:hover': {backgroundColor: 'background.paper', color: 'error.main'},
                            transition: 'all 0.2s ease',
                        }}>
                        {isWishlist()
                            ? <FavoriteOutlined sx={{fontSize: 18}}/>
                            : <FavoriteBorderOutlined sx={{fontSize: 18}}/>}
                    </IconButton>
                </Box>

                <CardContent sx={{p: 2, '&:last-child': {pb: 2}}}>
                    <Stack spacing={1}>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                color: 'text.primary', fontWeight: 600, lineHeight: 1.3,
                                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                            }}>
                            {edible.name}
                        </Typography>

                        <Stack direction="row" spacing={1.5} alignItems="center">
                            {edible.strain && (
                                <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 600}}>
                                    {edible.strain}
                                </Typography>
                            )}
                            {edible.strain && edible.thc > 0 && (
                                <Box sx={{width: 3, height: 3, borderRadius: '50%', backgroundColor: 'text.disabled'}}/>
                            )}
                            {edible.thc > 0 && (
                                <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 600}}>
                                    {edible.thc}mg per serving
                                </Typography>
                            )}
                        </Stack>

                        {edible.rating?.average > 0 && (
                            <Stack direction="row" spacing={0.75} alignItems="center">
                                <Rating readOnly precision={0.1} value={edible.rating.average} size="small"
                                    sx={{'& .MuiRating-iconFilled': {color: 'accent.main'}, fontSize: 16}}/>
                                <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                    ({edible.rating.count || 0})
                                </Typography>
                            </Stack>
                        )}

                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle1"
                                sx={{color: 'secondary.main', fontWeight: 700, fontSize: '1.05rem'}}>
                                {price}
                            </Typography>
                            <IconButton onClick={handleAddToCart} size="small"
                                sx={{
                                    backgroundColor: 'secondary.main', color: 'common.white',
                                    width: 34, height: 34,
                                    '&:hover': {backgroundColor: 'secondary.dark', transform: 'scale(1.05)'},
                                    transition: 'all 0.2s ease',
                                }}>
                                <AddRounded sx={{fontSize: 20}}/>
                            </IconButton>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Link>
    );
};

export default Edible;
