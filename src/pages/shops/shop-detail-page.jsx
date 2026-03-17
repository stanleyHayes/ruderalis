import Layout from "../../components/layout/layout";
import {
    Avatar, Box, Breadcrumbs, Button, Card, CardContent, Chip, Container,
    Divider, Grid, IconButton, LinearProgress, Link as MuiLink,
    Stack, Tab, Tabs, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getShop, selectShop} from "../../redux/features/shop/shop-slice";
import {UTILS} from "../../utils/utils";
import {
    AccessTimeOutlined, CallOutlined, CheckCircleOutlined,
    EmailOutlined, Home, LocalShippingOutlined, LocationOnOutlined,
    NavigateNext, Star, StorefrontOutlined, VerifiedOutlined,
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import Reviews from "../../components/tabs/reviews";
import ProductList from "../../components/tabs/product-list";
import {useParams} from "react-router";
import {Link} from "react-router-dom";

const ShopDetailPage = () => {
    const {shopLoading, shopDetail, shops, featuredShops} = useSelector(selectShop);
    const {shopID} = useParams();
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);

    useEffect(() => { dispatch(getShop({id: shopID})); }, [dispatch, shopID]);

    // Fallback to local state if API detail is null
    const shopData = shopDetail || [...(shops || []), ...(featuredShops || [])].find(s => s._id === shopID) || null;

    return (
        <Layout>
            {shopLoading && <LinearProgress color="secondary"/>}

            <Box sx={{py: {xs: 3, md: 5}, backgroundColor: 'background.default'}}>
                <Container maxWidth={false} sx={{px: {xs: 2, md: 4, lg: 6}}}>

                    {/* Breadcrumb */}
                    <Breadcrumbs separator={<NavigateNext sx={{fontSize: 16, color: 'text.disabled'}}/>} sx={{mb: 3}}>
                        <MuiLink component={Link} to="/" underline="hover" sx={{display: 'flex', alignItems: 'center', color: 'text.secondary', fontWeight: 500}}>
                            <Home sx={{fontSize: 18, mr: 0.5}}/> Home
                        </MuiLink>
                        <MuiLink component={Link} to="/shops" underline="hover" sx={{color: 'text.secondary', fontWeight: 500}}>
                            Dispensaries
                        </MuiLink>
                        <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 600}}>
                            {shopData?.name || 'Dispensary'}
                        </Typography>
                    </Breadcrumbs>

                    <Grid container spacing={3}>
                        {/* ═══════════ LEFT COLUMN ═══════════ */}
                        <Grid size={{xs: 12, md: 8}}>
                            {/* Hero image card */}
                            <Card variant="outlined" sx={{overflow: 'hidden', mb: 3}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <Box sx={{position: 'relative', height: {xs: 220, md: 320}, overflow: 'hidden'}}>
                                    {shopData?.image && (
                                        <Box component="img" src={shopData?.image} alt={shopData?.name}
                                            sx={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                    )}
                                    <Box sx={{position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.8) 100%)'}}/>
                                    <Box sx={{position: 'absolute', bottom: 0, left: 0, right: 0, p: {xs: 2.5, md: 3}}}>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 1}}>
                                            <Chip size="small"
                                                label={shopData?.status === 'open' ? 'Open Now' : 'Closed'}
                                                sx={{bgcolor: shopData?.status === 'open' ? 'secondary.main' : 'error.main',
                                                    color: 'common.white', fontWeight: 700, fontSize: '0.7rem', height: 24}}/>
                                            <Chip size="small" icon={<VerifiedOutlined sx={{fontSize: 12, color: 'common.white !important'}}/>}
                                                label="Licensed"
                                                sx={{bgcolor: 'rgba(255,255,255,0.15)', color: 'common.white', fontWeight: 600, fontSize: '0.7rem', height: 24, backdropFilter: 'blur(8px)'}}/>
                                        </Stack>
                                        <Typography variant="h4" sx={{color: 'common.white', fontWeight: 800}}>
                                            {shopData?.name}
                                        </Typography>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 0.5}}>
                                            <Star sx={{fontSize: 16, color: 'accent.main'}}/>
                                            <Typography variant="body2" sx={{color: 'common.white', fontWeight: 600}}>
                                                {shopData?.rating?.average?.toFixed(1) || '0.0'}
                                            </Typography>
                                            <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.6)'}}>
                                                ({shopData?.rating?.count || 0} reviews) · {shopData?.products?.length || 0} products
                                            </Typography>
                                        </Stack>
                                    </Box>
                                </Box>
                            </Card>

                            {/* About card */}
                            <Card variant="outlined" sx={{mb: 3}}>
                                <CardContent sx={{p: 2.5}}>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 1.5}}>
                                        <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                            <StorefrontOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                        </Box>
                                        <Typography variant="subtitle2" fontWeight={800} sx={{color: 'text.primary'}}>About This Dispensary</Typography>
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.8}}>
                                        {shopData?.description}
                                    </Typography>
                                </CardContent>
                            </Card>

                            {/* Tabs card */}
                            <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="secondary" indicatorColor="secondary"
                                    sx={{borderBottom: '1px solid', borderColor: 'divider', px: 2}}>
                                    <Tab label={`Menu (${shopData?.products?.length || 0})`} sx={{textTransform: 'none', fontWeight: 600}}/>
                                    <Tab label={`Reviews (${shopData?.reviews?.length || 0})`} sx={{textTransform: 'none', fontWeight: 600}}/>
                                </Tabs>
                                <CardContent sx={{p: {xs: 2, md: 3}}}>
                                    {tab === 0 && <ProductList products={shopData?.products}/>}
                                    {tab === 1 && <Reviews reviews={shopData?.reviews} rating={shopData?.rating}/>}
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* ═══════════ RIGHT SIDEBAR ═══════════ */}
                        <Grid size={{xs: 12, md: 4}}>
                            <Box sx={{position: 'sticky', top: 80}}>
                                {/* Contact card */}
                                <Card variant="outlined" sx={{overflow: 'hidden', mb: 2}}>
                                    <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                    <CardContent sx={{p: 2.5}}>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                            <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                                <CallOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                            </Box>
                                            <Typography variant="subtitle2" fontWeight={800} sx={{color: 'text.primary'}}>Contact Info</Typography>
                                        </Stack>
                                        <Divider sx={{mb: 2}}/>
                                        <Stack spacing={2}>
                                            {[
                                                {icon: <CallOutlined sx={{fontSize: 16}}/>, label: 'Phone', value: shopData?.contact?.phone || 'N/A'},
                                                {icon: <EmailOutlined sx={{fontSize: 16}}/>, label: 'Email', value: shopData?.contact?.email || 'N/A'},
                                                {icon: <LocationOnOutlined sx={{fontSize: 16}}/>, label: 'Address', value: shopData?.location || 'Las Vegas, NV'},
                                                {icon: <AccessTimeOutlined sx={{fontSize: 16}}/>, label: 'Hours', value: 'Mon–Sat 9AM–9PM'},
                                            ].map((item, i) => (
                                                <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                                                    <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary', color: 'secondary.main', mt: 0.25}}>
                                                        {item.icon}
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="overline" sx={{fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: 'text.secondary'}}>
                                                            {item.label}
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                            {item.value}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>

                                {/* Owner card */}
                                {shopData?.owner && (
                                    <Card variant="outlined" sx={{mb: 2}}>
                                        <CardContent sx={{p: 2.5}}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <Avatar sx={{width: 48, height: 48, bgcolor: 'secondary.main', fontSize: 16, fontWeight: 700, color: 'common.white'}}>
                                                    {UTILS.getInitials(shopData?.owner.fullName)}
                                                </Avatar>
                                                <Box>
                                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                                        <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary'}}>
                                                            {shopData?.owner.fullName}
                                                        </Typography>
                                                        <CheckCircleOutlined sx={{fontSize: 14, color: 'secondary.main'}}/>
                                                    </Stack>
                                                    <Typography variant="caption" color="text.secondary">Owner & Licensed Operator</Typography>
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                )}

                                {/* Delivery card */}
                                <Card variant="outlined">
                                    <CardContent sx={{p: 2.5}}>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 1.5}}>
                                            <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                                <LocalShippingOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                            </Box>
                                            <Typography variant="subtitle2" fontWeight={800} sx={{color: 'text.primary'}}>Delivery Info</Typography>
                                        </Stack>
                                        <Divider sx={{mb: 1.5}}/>
                                        <Stack spacing={1}>
                                            {[
                                                'Same-day delivery available (before 2PM)',
                                                'Free delivery on orders over $50',
                                                'Discreet, child-resistant packaging',
                                                'Age verification required at delivery',
                                            ].map((item, i) => (
                                                <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                                                    <CheckCircleOutlined sx={{fontSize: 14, color: 'secondary.main', mt: 0.25}}/>
                                                    <Typography variant="caption" color="text.secondary">{item}</Typography>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
};

export default ShopDetailPage;
