import {Avatar, Box, Card, CardContent, CardMedia, Chip, Divider, IconButton, Stack, Typography} from "@mui/material";
import {
    AccessTimeOutlined, FavoriteBorderOutlined, FavoriteOutlined,
    LocalShippingOutlined, LocationOnOutlined, Star, StorefrontOutlined, VerifiedOutlined,
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectFavoriteShops, toggleFavoriteShop} from "../../redux/features/wishlist/wishlist-slice";
import {UTILS} from "../../utils/utils";

const Shop = ({shop, compact}) => {
    const dispatch = useDispatch();
    const favoriteShops = useSelector(selectFavoriteShops);
    const isFavorite = favoriteShops?.find(s => s._id === shop._id);

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleFavoriteShop({_id: shop._id, name: shop.name, image: shop.image}));
    };

    // Compact version for homepage grid (small cards)
    if (compact) {
        return (
            <Link to={`/shops/${shop._id}`} style={{textDecoration: 'none', display: 'block', height: '100%'}}>
                <Card elevation={0} sx={{
                    height: '100%', cursor: 'pointer', overflow: 'hidden',
                    transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                    '&:hover': {transform: 'translateY(-4px)', boxShadow: (t) => t.palette.mode === 'dark' ? '0 12px 32px rgba(0,0,0,0.4)' : '0 12px 32px rgba(0,0,0,0.08)'},
                    '&:hover .shop-img': {transform: 'scale(1.06)'},
                }}>
                    <Box sx={{position: 'relative', overflow: 'hidden'}}>
                        <CardMedia className="shop-img" component="img"
                            sx={{height: 120, objectFit: 'cover', transition: 'transform 0.5s ease'}}
                            src={shop.image} alt={shop.name}/>
                        <Box sx={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)'}}/>
                        <Typography variant="caption" sx={{
                            position: 'absolute', bottom: 8, left: 10, right: 10,
                            color: 'common.white', fontWeight: 700, fontSize: '0.75rem',
                            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                        }}>{shop.name}</Typography>
                    </Box>
                </Card>
            </Link>
        );
    }

    // Full version
    return (
        <Link to={`/shops/${shop._id}`} style={{textDecoration: 'none', display: 'block', height: '100%'}}>
            <Card elevation={0} sx={{
                height: '100%', cursor: 'pointer', overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                '&:hover': {transform: 'translateY(-6px)', boxShadow: (t) => t.palette.mode === 'dark' ? '0 16px 40px rgba(0,0,0,0.4)' : '0 16px 40px rgba(0,0,0,0.1)'},
                '&:hover .shop-img': {transform: 'scale(1.06)'},
            }}>
                {/* Image */}
                <Box sx={{position: 'relative', overflow: 'hidden'}}>
                    <CardMedia className="shop-img" component="img"
                        sx={{height: 180, objectFit: 'cover', transition: 'transform 0.6s ease'}}
                        src={shop.image} alt={shop.name}/>
                    <Box sx={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.75) 100%)'}}/>

                    {/* Status + Verified */}
                    <Stack direction="row" spacing={0.5} sx={{position: 'absolute', top: 10, right: 10}}>
                        <Chip size="small"
                            label={shop.status === 'open' ? 'Open' : 'Closed'}
                            sx={{
                                height: 22,
                                bgcolor: shop.status === 'open' ? 'secondary.main' : 'error.main',
                                color: 'common.white', fontWeight: 700, fontSize: '0.65rem',
                            }}/>
                    </Stack>

                    {/* Favorite */}
                    <IconButton onClick={handleFavorite} size="small" sx={{
                        position: 'absolute', top: 10, left: 10,
                        bgcolor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
                        color: isFavorite ? 'error.main' : 'common.white',
                        width: 30, height: 30,
                        '&:hover': {bgcolor: 'rgba(0,0,0,0.5)'},
                    }}>
                        {isFavorite ? <FavoriteOutlined sx={{fontSize: 15}}/> : <FavoriteBorderOutlined sx={{fontSize: 15}}/>}
                    </IconButton>

                    {/* Name on image */}
                    <Box sx={{position: 'absolute', bottom: 12, left: 14, right: 14}}>
                        <Typography variant="h6" sx={{color: 'common.white', fontWeight: 800, fontSize: '1rem', lineHeight: 1.2}}>
                            {shop.name}
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center" sx={{mt: 0.5}}>
                            <Star sx={{color: 'accent.main', fontSize: 14}}/>
                            <Typography variant="caption" sx={{color: 'common.white', fontWeight: 600, fontSize: '0.75rem'}}>
                                {shop.rating?.average?.toFixed(1) || '0.0'}
                            </Typography>
                            <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.6)', fontSize: '0.65rem'}}>
                                ({shop.rating?.count || 0})
                            </Typography>
                        </Stack>
                    </Box>
                </Box>

                {/* Content */}
                <CardContent sx={{p: 2, '&:last-child': {pb: 2}}}>
                    {/* Description */}
                    <Typography variant="body2" sx={{
                        color: 'text.secondary', lineHeight: 1.6, mb: 1.5, fontSize: '0.8rem',
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        {shop.description}
                    </Typography>

                    <Divider sx={{mb: 1.5}}/>

                    {/* Info row */}
                    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                        {shop.contact?.phone && (
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <LocationOnOutlined sx={{color: 'text.disabled', fontSize: 13}}/>
                                <Typography variant="caption" sx={{color: 'text.secondary', fontSize: '0.7rem'}}>{shop.contact.phone}</Typography>
                            </Stack>
                        )}
                        {shop.products && (
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <StorefrontOutlined sx={{color: 'text.disabled', fontSize: 13}}/>
                                <Typography variant="caption" sx={{color: 'text.secondary', fontSize: '0.7rem'}}>{shop.products.length || 0} products</Typography>
                            </Stack>
                        )}
                        {shop.shipping && (
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <LocalShippingOutlined sx={{color: 'secondary.main', fontSize: 13}}/>
                                <Typography variant="caption" sx={{color: 'secondary.main', fontWeight: 600, fontSize: '0.7rem'}}>
                                    {shop.shipping?.fee === 0 ? 'Free delivery' : `From $${shop.shipping?.fee}`}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>

                    {/* Owner */}
                    {shop.owner && (
                        <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 1.5}}>
                            <Avatar sx={{width: 22, height: 22, bgcolor: 'secondary.main', fontSize: 9, fontWeight: 700, color: 'common.white'}}>
                                {UTILS.getInitials(shop.owner?.fullName)}
                            </Avatar>
                            <Typography variant="caption" sx={{color: 'text.secondary', fontSize: '0.7rem'}}>
                                {shop.owner?.fullName}
                            </Typography>
                            <VerifiedOutlined sx={{color: 'secondary.main', fontSize: 12}}/>
                        </Stack>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
};

export default Shop;
