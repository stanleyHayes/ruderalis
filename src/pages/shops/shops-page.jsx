import Layout from "../../components/layout/layout";
import {
    Alert, AlertTitle, Avatar, Box, Button, Card, CardContent, Chip, Container,
    FormControl, Grid, InputAdornment, InputLabel, LinearProgress,
    MenuItem, OutlinedInput, Select, Stack, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getFeaturedShops, getShops, selectShop} from "../../redux/features/shop/shop-slice";
import {useEffect, useState} from "react";
import {
    ArrowForward, FavoriteBorderOutlined, FavoriteOutlined,
    LocalShippingOutlined, LocationOnOutlined, SearchOutlined,
    Star, StarOutline, StorefrontOutlined, VerifiedOutlined,
} from "@mui/icons-material";
import {useFormik} from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom";
import banner from "../../assets/images/banner.jpg";
import {motion} from 'framer-motion';
import {fadeUp, stagger} from "../../utils/animations";
import {useSelector as useReduxSelector} from "react-redux";
import {selectFavoriteShops, toggleFavoriteShop} from "../../redux/features/wishlist/wishlist-slice";
import {UTILS} from "../../utils/utils";
import {IconButton} from "@mui/material";

const FeaturedShopCard = ({shop}) => {
    const dispatch = useDispatch();
    const favoriteShops = useReduxSelector(selectFavoriteShops);
    const isFavorite = favoriteShops?.find(s => s._id === shop._id);
    const handleFavorite = (e) => {
        e.preventDefault(); e.stopPropagation();
        dispatch(toggleFavoriteShop({_id: shop._id, name: shop.name, image: shop.image}));
    };

    return (
        <Link to={`/shops/${shop._id}`} style={{textDecoration: 'none', display: 'block', height: '100%'}}>
            <Card variant="outlined" sx={{
                overflow: 'hidden', cursor: 'pointer', height: '100%',
                transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                '&:hover': {transform: 'translateY(-6px)', boxShadow: (t) => t.palette.mode === 'dark' ? '0 20px 48px rgba(0,0,0,0.5)' : '0 20px 48px rgba(0,0,0,0.1)'},
                '&:hover .feat-img': {transform: 'scale(1.06)'},
            }}>
                <Box sx={{height: 4, background: 'linear-gradient(90deg, #22c55e, #16a34a, #c9a96e)'}}/>
                <Box sx={{position: 'relative', overflow: 'hidden', height: {xs: 220, md: 260}}}>
                    <Box className="feat-img" component="img" src={shop.image} alt={shop.name}
                        sx={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease'}}/>
                    <Box sx={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.85) 100%)'}}/>

                    {/* Badges */}
                    <Stack direction="row" spacing={0.75} sx={{position: 'absolute', top: 14, left: 14}}>
                        <Chip size="small" icon={<StarOutline sx={{fontSize: '14px !important', color: '#fff !important'}}/>}
                            label="Featured"
                            sx={{bgcolor: 'secondary.main', color: 'common.white', fontWeight: 800, fontSize: '0.7rem', height: 26,
                                boxShadow: '0 2px 8px rgba(34,197,94,0.4)'}}/>
                        {shop.verified && (
                            <Chip size="small" icon={<VerifiedOutlined sx={{fontSize: '14px !important', color: '#fff !important'}}/>}
                                label="Verified" sx={{bgcolor: 'rgba(59,130,246,0.9)', color: 'common.white', fontWeight: 700, fontSize: '0.65rem', height: 26}}/>
                        )}
                    </Stack>

                    <Stack direction="row" spacing={0.75} sx={{position: 'absolute', top: 14, right: 14}}>
                        <Chip size="small" label={shop.status === 'open' ? 'Open Now' : 'Closed'}
                            sx={{bgcolor: shop.status === 'open' ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)',
                                color: 'common.white', fontWeight: 700, fontSize: '0.65rem', height: 26}}/>
                        <IconButton onClick={handleFavorite} size="small" sx={{
                            bgcolor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', width: 28, height: 28,
                            color: isFavorite ? 'error.main' : 'common.white', '&:hover': {bgcolor: 'rgba(0,0,0,0.6)'},
                        }}>
                            {isFavorite ? <FavoriteOutlined sx={{fontSize: 14}}/> : <FavoriteBorderOutlined sx={{fontSize: 14}}/>}
                        </IconButton>
                    </Stack>

                    {/* Bottom overlay content */}
                    <Box sx={{position: 'absolute', bottom: 0, left: 0, right: 0, p: 2.5}}>
                        <Typography variant="h5" sx={{color: 'common.white', fontWeight: 800, mb: 0.5, lineHeight: 1.2}}>
                            {shop.name}
                        </Typography>
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <Star sx={{color: '#fbbf24', fontSize: 16}}/>
                                <Typography variant="body2" sx={{color: 'common.white', fontWeight: 700}}>
                                    {shop.rating?.average?.toFixed(1) || '0.0'}
                                </Typography>
                                <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.6)'}}>
                                    ({shop.rating?.count || 0})
                                </Typography>
                            </Stack>
                            {shop.products && (
                                <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.6)'}}>
                                    {shop.products.length} products
                                </Typography>
                            )}
                        </Stack>
                    </Box>
                </Box>

                <CardContent sx={{p: 2.5, '&:last-child': {pb: 2.5}}}>
                    <Typography variant="body2" sx={{
                        color: 'text.secondary', lineHeight: 1.7, mb: 2,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        {shop.description}
                    </Typography>
                    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                        {shop.contact?.phone && (
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <LocationOnOutlined sx={{color: 'text.disabled', fontSize: 14}}/>
                                <Typography variant="caption" color="text.secondary">{shop.contact.phone}</Typography>
                            </Stack>
                        )}
                        {shop.shippingPolicy && (
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <LocalShippingOutlined sx={{color: 'secondary.main', fontSize: 14}}/>
                                <Typography variant="caption" sx={{color: 'secondary.main', fontWeight: 600}}>
                                    {(shop.shippingPolicy.baseFee || 0) === 0 ? 'Free delivery' : `From $${shop.shippingPolicy.baseFee}`}
                                </Typography>
                            </Stack>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Link>
    );
};

const ShopCard = ({shop}) => {
    const dispatch = useDispatch();
    const favoriteShops = useReduxSelector(selectFavoriteShops);
    const isFavorite = favoriteShops?.find(s => s._id === shop._id);
    const handleFavorite = (e) => {
        e.preventDefault(); e.stopPropagation();
        dispatch(toggleFavoriteShop({_id: shop._id, name: shop.name, image: shop.image}));
    };

    return (
        <Link to={`/shops/${shop._id}`} style={{textDecoration: 'none', display: 'block', height: '100%'}}>
            <Card variant="outlined" sx={{
                overflow: 'hidden', cursor: 'pointer', height: '100%',
                display: 'flex', flexDirection: {xs: 'column', sm: 'row'},
                transition: 'all 0.3s ease',
                '&:hover': {transform: 'translateY(-3px)', boxShadow: (t) => t.palette.mode === 'dark' ? '0 8px 24px rgba(0,0,0,0.3)' : '0 8px 24px rgba(0,0,0,0.06)'},
                '&:hover .shop-img': {transform: 'scale(1.05)'},
            }}>
                <Box sx={{position: 'relative', overflow: 'hidden', width: {xs: '100%', sm: 180}, height: {xs: 160, sm: 'auto'}, minHeight: {sm: 140}, flexShrink: 0}}>
                    <Box className="shop-img" component="img" src={shop.image} alt={shop.name}
                        sx={{width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', display: 'block'}}/>
                    <Box sx={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5) 100%)'}}/>
                    <Chip size="small" label={shop.status === 'open' ? 'Open' : 'Closed'}
                        sx={{position: 'absolute', top: 8, left: 8, height: 22,
                            bgcolor: shop.status === 'open' ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)',
                            color: 'common.white', fontWeight: 700, fontSize: '0.6rem'}}/>
                    <IconButton onClick={handleFavorite} size="small" sx={{
                        position: 'absolute', top: 8, right: 8, width: 26, height: 26,
                        bgcolor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
                        color: isFavorite ? 'error.main' : 'common.white', '&:hover': {bgcolor: 'rgba(0,0,0,0.5)'},
                    }}>
                        {isFavorite ? <FavoriteOutlined sx={{fontSize: 13}}/> : <FavoriteBorderOutlined sx={{fontSize: 13}}/>}
                    </IconButton>
                </Box>

                <CardContent sx={{p: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', '&:last-child': {pb: 2}}}>
                    <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.5}}>
                        <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary', lineHeight: 1.2}}>
                            {shop.name}
                        </Typography>
                        {shop.verified && <VerifiedOutlined sx={{color: 'secondary.main', fontSize: 15}}/>}
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center" sx={{mb: 1}}>
                        <Star sx={{color: '#fbbf24', fontSize: 14}}/>
                        <Typography variant="caption" fontWeight={600} sx={{color: 'text.primary'}}>
                            {shop.rating?.average?.toFixed(1) || '0.0'}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                            ({shop.rating?.count || 0})
                        </Typography>
                        {shop.products && (
                            <Typography variant="caption" color="text.disabled" sx={{ml: 1}}>
                                {shop.products.length} products
                            </Typography>
                        )}
                    </Stack>
                    <Typography variant="caption" sx={{
                        color: 'text.secondary', lineHeight: 1.5,
                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                        {shop.description}
                    </Typography>
                    {shop.contact?.phone && (
                        <Stack direction="row" spacing={0.5} alignItems="center" sx={{mt: 1}}>
                            <LocationOnOutlined sx={{color: 'text.disabled', fontSize: 12}}/>
                            <Typography variant="caption" color="text.disabled" sx={{fontSize: '0.65rem'}}>{shop.contact.phone}</Typography>
                        </Stack>
                    )}
                </CardContent>
            </Card>
        </Link>
    );
};

const ShopsPage = () => {
    const {shopLoading, shops, shopError, featuredShops} = useSelector(selectShop);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getShops({query: ''}));
        dispatch(getFeaturedShops());
    }, [dispatch]);
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");

    const formik = useFormik({
        initialValues: {searchQuery: ''},
        onSubmit: values => console.log(values),
        validationSchema: yup.object({searchQuery: yup.string()}),
    });

    const featuredIds = new Set(featuredShops?.map(s => s._id) || []);
    const regularShops = shops?.filter(s => !featuredIds.has(s._id)) || [];

    return (
        <Layout>
            {shopLoading && <LinearProgress color="secondary"/>}

            {/* Hero Banner */}
            <Box sx={{position: 'relative', overflow: 'hidden', minHeight: {xs: 280, md: 360}}}>
                <Box sx={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${banner})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    '&::after': {content: '""', position: 'absolute', inset: 0,
                        background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)'},
                }}/>
                <Container maxWidth="xl" sx={{position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', minHeight: {xs: 280, md: 360}}}>
                    <Box sx={{maxWidth: 600}}>
                        <Stack direction="row" spacing={1} sx={{mb: 2}}>
                            <Chip icon={<VerifiedOutlined sx={{fontSize: 14}}/>} label="Licensed Locations" size="small"
                                sx={{bgcolor: 'rgba(34,197,94,0.15)', color: 'secondary.main', fontWeight: 700, border: '1px solid', borderColor: 'rgba(34,197,94,0.3)'}}/>
                        </Stack>
                        <Typography variant="h2" sx={{color: 'common.white', fontWeight: 800, mb: 1.5}}>Our Dispensaries</Typography>
                        <Typography variant="body1" sx={{color: 'rgba(255,255,255,0.7)', mb: 3, maxWidth: 480}}>
                            Find a licensed dispensary near you. Every location is staffed with knowledgeable budtenders ready to guide your wellness journey.
                        </Typography>
                        {shops && (
                            <Stack direction="row" spacing={3}>
                                <Box>
                                    <Typography variant="h4" sx={{color: 'secondary.main', fontWeight: 800}}>{shops.length}</Typography>
                                    <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.5)'}}>Locations</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="h4" sx={{color: 'secondary.main', fontWeight: 800}}>7</Typography>
                                    <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.5)'}}>Cities</Typography>
                                </Box>
                            </Stack>
                        )}
                    </Box>
                </Container>
            </Box>

            {/* Search & Filters */}
            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', position: 'sticky', top: 64, zIndex: 10}}>
                <Container maxWidth="xl">
                    <Stack direction={{xs: 'column', md: 'row'}} spacing={2} alignItems={{md: 'center'}} sx={{py: 2}}>
                        <Box sx={{flex: 1}}>
                            <form onSubmit={formik.handleSubmit}>
                                <OutlinedInput placeholder="Search dispensaries by name or location..." fullWidth size="small" color="secondary"
                                    value={formik.values.searchQuery} onChange={formik.handleChange} name="searchQuery"
                                    startAdornment={<InputAdornment position="start"><SearchOutlined sx={{color: 'text.disabled', fontSize: 20}}/></InputAdornment>}/>
                            </form>
                        </Box>
                        <Stack direction="row" spacing={1.5}>
                            <FormControl variant="outlined" size="small" sx={{minWidth: 140}}>
                                <InputLabel>Status</InputLabel>
                                <Select value={status} onChange={e => setStatus(e.target.value)} label="Status" color="secondary">
                                    <MenuItem value="">All</MenuItem>
                                    <MenuItem value="featured">Featured</MenuItem>
                                    <MenuItem value="verified">Verified</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" size="small" sx={{minWidth: 140}}>
                                <InputLabel>Sort By</InputLabel>
                                <Select value={sortBy} onChange={e => setSortBy(e.target.value)} label="Sort By" color="secondary">
                                    <MenuItem value="">Default</MenuItem>
                                    <MenuItem value="rating">Top Rated</MenuItem>
                                    <MenuItem value="newest">Newest</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Featured Dispensaries */}
            {featuredShops?.length > 0 && (
                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider'}}>
                    <Container maxWidth="xl" sx={{py: {xs: 4, md: 6}}}>
                        <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.5}}>
                            <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                <StarOutline sx={{fontSize: 18, color: 'secondary.main'}}/>
                            </Box>
                            <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>
                                Featured Dispensaries
                            </Typography>
                            <Chip size="small" label={`${featuredShops.length} locations`}
                                sx={{fontSize: 10, fontWeight: 600, backgroundColor: 'light.secondary', color: 'secondary.main'}}/>
                        </Stack>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                            Our top-rated and most popular locations
                        </Typography>
                        <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{once: true}}>
                        <Grid container spacing={3}>
                            {featuredShops.map((shop, i) => (
                                <Grid key={shop._id || i} size={{xs: 12, md: 4}}>
                                    <motion.div variants={fadeUp}>
                                        <FeaturedShopCard shop={shop}/>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                        </motion.div>
                    </Container>
                </Box>
                </motion.div>
            )}

            {/* All Dispensaries */}
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
            <Box sx={{bgcolor: 'background.default'}}>
                <Container maxWidth="xl" sx={{py: {xs: 4, md: 6}}}>
                    {shopError && <Alert sx={{mb: 3}} severity="error"><AlertTitle>{shopError}</AlertTitle></Alert>}

                    {regularShops.length === 0 && !featuredShops?.length ? (
                        <Box sx={{py: 8, textAlign: 'center'}}>
                            <Box sx={{width: 100, height: 100, borderRadius: '50%', mx: 'auto', mb: 3,
                                bgcolor: 'light.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <StorefrontOutlined sx={{color: 'secondary.main', fontSize: 44}}/>
                            </Box>
                            <Typography variant="h5" sx={{color: 'text.primary', mb: 1}}>No dispensaries found</Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary', mb: 3, maxWidth: 400, mx: 'auto'}}>
                                We're expanding to new locations. Check back soon or try adjusting your search.
                            </Typography>
                            <Button onClick={() => dispatch(getShops({query: ''}))} variant="contained" color="secondary">Refresh</Button>
                        </Box>
                    ) : (
                        <>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 3}}>
                                <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                    <StorefrontOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                </Box>
                                <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>
                                    All Dispensaries
                                </Typography>
                                <Chip size="small" label={`${regularShops.length} locations`}
                                    sx={{fontSize: 10, fontWeight: 600}}/>
                            </Stack>
                            <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Grid container spacing={2}>
                                {regularShops.map((shop, i) => (
                                    <Grid key={shop._id || i} size={{xs: 12, sm: 6, lg: 4}}>
                                        <motion.div variants={fadeUp}>
                                            <ShopCard shop={shop}/>
                                        </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                            </motion.div>
                        </>
                    )}
                </Container>
            </Box>
            </motion.div>
        </Layout>
    );
};

export default ShopsPage;
