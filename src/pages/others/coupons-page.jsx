import {motion} from "framer-motion";
import {fadeUp, stagger} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import {
    Alert, AlertTitle, Box, Button, Card, CardContent, Chip,
    Container, Divider, Grid, LinearProgress, Stack, Typography,
} from "@mui/material";
import {
    AccessTime, CheckCircleOutlined, ContentCopy,
    InfoOutlined, LocalOfferOutlined, Percent,
    ShoppingCartOutlined, TimerOutlined,
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCoupons, selectPromotion} from "../../redux/features/promotion/promotion-slice";
import {UTILS} from "../../utils/utils";
import {Link} from "react-router-dom";
import currencyFormatter from "currency-formatter";

const CouponsPage = () => {
    const dispatch = useDispatch();
    const {coupons, couponLoading, couponError} = useSelector(selectPromotion);
    const [copiedCode, setCopiedCode] = useState(null);

    useEffect(() => { dispatch(getCoupons()); }, [dispatch]);

    const handleCopy = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const now = new Date();
    const activeCoupons = (coupons || []).filter(c => {
        if (c.active === false) return false;
        if (c.endDate && new Date(c.endDate) < now) return false;
        if (c.maxUses && c.usedCount >= c.maxUses) return false;
        return true;
    });

    const expiredCoupons = (coupons || []).filter(c => {
        if (c.endDate && new Date(c.endDate) < now) return true;
        if (c.maxUses && c.usedCount >= c.maxUses) return true;
        return false;
    });

    const getDiscountLabel = (coupon) => {
        const d = coupon.discount || {};
        if (d.type === 'percentage') return `${d.value}% Off`;
        if (d.type === 'fixed') return currencyFormatter.format(d.value, {code: 'GHS'}) + ' Off';
        return coupon.description || 'Discount';
    };

    const getDaysLeft = (endDate) => {
        if (!endDate) return null;
        const diff = Math.ceil((new Date(endDate) - now) / (1000 * 60 * 60 * 24));
        if (diff <= 0) return 'Expired';
        if (diff === 1) return '1 day left';
        return `${diff} days left`;
    };

    const getUsageLabel = (coupon) => {
        if (!coupon.maxUses || coupon.maxUses === 0) return 'Unlimited uses';
        const remaining = coupon.maxUses - (coupon.usedCount || 0);
        return `${remaining} use${remaining !== 1 ? 's' : ''} remaining`;
    };

    const CouponCard = ({coupon, isExpired = false}) => {
        const daysLeft = getDaysLeft(coupon.endDate);
        const isUrgent = daysLeft && !isExpired && typeof daysLeft === 'string' && parseInt(daysLeft) <= 7;

        return (
            <motion.div variants={fadeUp}>
                <Card variant="outlined" sx={{
                    height: '100%', overflow: 'hidden', opacity: isExpired ? 0.55 : 1,
                    transition: 'all 0.3s ease',
                    '&:hover': isExpired ? {} : {transform: 'translateY(-4px)', boxShadow: (t) => t.palette.mode === 'dark' ? '0 12px 32px rgba(0,0,0,0.3)' : '0 12px 32px rgba(0,0,0,0.08)'},
                }}>
                    <Box sx={{height: 3, bgcolor: isExpired ? 'text.disabled' : 'secondary.main'}}/>
                    <CardContent sx={{p: 3}}>
                        {/* Header */}
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{mb: 2}}>
                            <Box sx={{
                                display: 'flex', p: 1, borderRadius: 2,
                                bgcolor: isExpired ? 'action.hover' : 'light.secondary',
                            }}>
                                <Percent sx={{fontSize: 22, color: isExpired ? 'text.disabled' : 'secondary.main'}}/>
                            </Box>
                            {isUrgent && (
                                <Chip icon={<TimerOutlined sx={{fontSize: '14px !important'}}/>}
                                    label={daysLeft} size="small"
                                    sx={{bgcolor: 'rgba(239,68,68,0.1)', color: '#ef4444', fontWeight: 700, fontSize: '0.7rem'}}/>
                            )}
                            {isExpired && (
                                <Chip label="Expired" size="small"
                                    sx={{bgcolor: 'action.hover', color: 'text.disabled', fontWeight: 700, fontSize: '0.7rem'}}/>
                            )}
                        </Stack>

                        {/* Discount */}
                        <Typography variant="h4" sx={{
                            color: isExpired ? 'text.disabled' : 'secondary.main',
                            fontWeight: 800, mb: 0.5,
                        }}>
                            {getDiscountLabel(coupon)}
                        </Typography>

                        {/* Description */}
                        <Typography variant="body2" sx={{color: 'text.secondary', mb: 2.5, minHeight: 40, lineHeight: 1.6}}>
                            {coupon.description || 'Apply this code at checkout for a discount on your order.'}
                        </Typography>

                        {/* Code Display */}
                        <Box sx={{
                            bgcolor: 'background.default', borderRadius: 2, p: 1.5, mb: 2,
                            border: '2px dashed', borderColor: isExpired ? 'divider' : 'secondary.main',
                            textAlign: 'center',
                        }}>
                            <Typography variant="overline" sx={{color: 'text.disabled', fontSize: '0.6rem'}}>
                                Coupon Code
                            </Typography>
                            <Typography variant="h6" sx={{
                                color: isExpired ? 'text.disabled' : 'text.primary',
                                fontWeight: 800, letterSpacing: 3,
                            }}>
                                {coupon.code}
                            </Typography>
                        </Box>

                        {!isExpired && (
                            <Button fullWidth variant={copiedCode === coupon.code ? 'contained' : 'outlined'}
                                color="secondary" size="small" startIcon={copiedCode === coupon.code ? <CheckCircleOutlined/> : <ContentCopy/>}
                                onClick={() => handleCopy(coupon.code)}
                                sx={{textTransform: 'none', fontWeight: 700, mb: 2}}>
                                {copiedCode === coupon.code ? 'Copied!' : 'Copy Code'}
                            </Button>
                        )}

                        <Divider sx={{mb: 2}}/>

                        {/* Qualification Criteria */}
                        <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase', letterSpacing: 1}}>
                            Qualification
                        </Typography>
                        <Stack spacing={1}>
                            {coupon.minOrderAmount > 0 && (
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <ShoppingCartOutlined sx={{fontSize: 15, color: 'text.disabled'}}/>
                                    <Typography variant="caption" color="text.secondary">
                                        Min. order: {currencyFormatter.format(coupon.minOrderAmount, {code: 'GHS'})}
                                    </Typography>
                                </Stack>
                            )}
                            {coupon.minOrderAmount === 0 && (
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <ShoppingCartOutlined sx={{fontSize: 15, color: 'text.disabled'}}/>
                                    <Typography variant="caption" color="text.secondary">
                                        No minimum order required
                                    </Typography>
                                </Stack>
                            )}
                            <Stack direction="row" spacing={1} alignItems="center">
                                <AccessTime sx={{fontSize: 15, color: 'text.disabled'}}/>
                                <Typography variant="caption" color="text.secondary">
                                    {coupon.endDate ? `Valid until ${UTILS.formatDate(coupon.endDate)}` : 'No expiration'}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <InfoOutlined sx={{fontSize: 15, color: 'text.disabled'}}/>
                                <Typography variant="caption" color="text.secondary">
                                    {getUsageLabel(coupon)}
                                </Typography>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>
            </motion.div>
        );
    };

    return (
        <Layout>
            {couponLoading && <LinearProgress color="secondary"/>}
            <PageBanner title="Deals & Promos" description="Exclusive offers and discount codes for our patients"
                links={[{path: '/', label: 'Home'}, {path: '/coupons', label: 'Coupons'}]}/>

            <Box sx={{py: {xs: 4, md: 6}, bgcolor: 'background.default'}}>
                <Container maxWidth="lg">
                    {couponError && (
                        <Alert severity="error" sx={{mb: 3}}><AlertTitle>{couponError}</AlertTitle></Alert>
                    )}

                    {/* How It Works */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Card variant="outlined" sx={{overflow: 'hidden', mb: 4}}>
                        <Box sx={{height: 3, bgcolor: 'secondary.main'}}/>
                        <CardContent sx={{p: {xs: 2.5, md: 3}}}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, bgcolor: 'light.secondary'}}>
                                    <LocalOfferOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                </Box>
                                <Typography variant="subtitle1" fontWeight={800}>How to Use Coupons</Typography>
                            </Stack>
                            <Grid container spacing={3}>
                                {[
                                    {step: '1', title: 'Copy Code', desc: 'Find a coupon below and copy the code.'},
                                    {step: '2', title: 'Add to Cart', desc: 'Shop for products that meet the minimum order requirement.'},
                                    {step: '3', title: 'Apply at Checkout', desc: 'Paste the code in the promo field during checkout and enjoy your discount.'},
                                ].map(s => (
                                    <Grid key={s.step} size={{xs: 12, md: 4}}>
                                        <Stack direction="row" spacing={1.5} alignItems="flex-start">
                                            <Box sx={{
                                                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                                                bgcolor: 'secondary.main', color: 'common.white',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 13, fontWeight: 800,
                                            }}>{s.step}</Box>
                                            <Box>
                                                <Typography variant="body2" fontWeight={700}>{s.title}</Typography>
                                                <Typography variant="caption" color="text.secondary">{s.desc}</Typography>
                                            </Box>
                                        </Stack>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                    </motion.div>

                    {/* Active Coupons */}
                    {activeCoupons.length > 0 && (
                        <>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, bgcolor: 'light.secondary'}}>
                                    <LocalOfferOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                </Box>
                                <Typography variant="subtitle1" fontWeight={800}>Active Coupons</Typography>
                                <Chip size="small" label={`${activeCoupons.length} available`}
                                    sx={{fontSize: 10, fontWeight: 600, bgcolor: 'light.secondary', color: 'secondary.main'}}/>
                            </Stack>
                            <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Grid container spacing={3} sx={{mb: 5}}>
                                {activeCoupons.map(coupon => (
                                    <Grid key={coupon._id} size={{xs: 12, sm: 6, md: 4}}>
                                        <CouponCard coupon={coupon}/>
                                    </Grid>
                                ))}
                            </Grid>
                            </motion.div>
                        </>
                    )}

                    {/* Empty State */}
                    {!couponLoading && activeCoupons.length === 0 && expiredCoupons.length === 0 && (
                        <Box sx={{textAlign: 'center', py: 8}}>
                            <Box sx={{
                                width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 3,
                                bgcolor: 'light.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <LocalOfferOutlined sx={{color: 'secondary.main', fontSize: 36}}/>
                            </Box>
                            <Typography variant="h5" fontWeight={700} sx={{mb: 1}}>No Coupons Available</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{mb: 3, maxWidth: 400, mx: 'auto'}}>
                                Check back soon for new deals and promotions. Subscribe to our newsletter to get notified.
                            </Typography>
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <Button component={Link} to="/products/marijuana" variant="contained" color="secondary"
                                    sx={{textTransform: 'none', fontWeight: 700}}>
                                    Browse Products
                                </Button>
                                <Button component={Link} to="/newsletter" variant="outlined" color="secondary"
                                    sx={{textTransform: 'none', fontWeight: 700}}>
                                    Subscribe
                                </Button>
                            </Stack>
                        </Box>
                    )}

                    {/* Expired Coupons */}
                    {expiredCoupons.length > 0 && (
                        <>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                <Typography variant="subtitle1" fontWeight={800} color="text.secondary">Expired</Typography>
                                <Chip size="small" label={expiredCoupons.length}
                                    sx={{fontSize: 10, fontWeight: 600}}/>
                            </Stack>
                            <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Grid container spacing={3}>
                                {expiredCoupons.map(coupon => (
                                    <Grid key={coupon._id} size={{xs: 12, sm: 6, md: 4}}>
                                        <CouponCard coupon={coupon} isExpired/>
                                    </Grid>
                                ))}
                            </Grid>
                            </motion.div>
                        </>
                    )}
                </Container>
            </Box>
        </Layout>
    );
};

export default CouponsPage;
