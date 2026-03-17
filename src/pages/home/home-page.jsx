import Layout from "../../components/layout/layout";
import {
    Box, Button, Card, CardContent, Chip, CircularProgress, Container,
    FormControl, FormHelperText, Grid, OutlinedInput,
    Stack, Typography, useMediaQuery, useTheme,
} from "@mui/material";
import {Link} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFeaturedProducts, selectProducts} from "../../redux/features/product/product-slice";
import ScrollCarousel from "../../components/shared/scroll-carousel";
import Product from "../../components/shared/product";
import {
    ArrowForward, CheckCircleOutline, LocalFloristOutlined,
    LocalMallOutlined, LocalShippingOutlined,
    SecurityOutlined, SpaOutlined, Star, VerifiedOutlined,
} from "@mui/icons-material";
import Shop from "../../components/shared/shop";
import {getShops, selectShop} from "../../redux/features/shop/shop-slice";
import Empty from "../../components/shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import banner from "../../assets/images/banner.jpg";
import marijuana from "../../assets/images/marijuana.jpg";
import {useFormik} from "formik";
import * as yup from "yup";
import {getFAQs, selectFAQs} from "../../redux/features/faq/faqs-slice";
import FAQ from "../../components/shared/faq";
import Edible from "../../components/shared/edible";
import {getFeaturedEdibles, selectEdible} from "../../redux/features/edible/edible-slice";
import Testimonial from "../../components/shared/testimonial";
import {getTestimonials, selectTestimonials} from "../../redux/features/testimonial/testimonials-slice";
import {NEWSLETTER_API} from "../../api/newsletter";
import {useSnackbar} from "notistack";
import {motion} from 'framer-motion';
import {fadeUp} from "../../utils/animations";

const HomePage = () => {
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const {featuredProducts, productLoading} = useSelector(selectProducts);
    const {shops} = useSelector(selectShop);
    const {faqs} = useSelector(selectFAQs);
    const {featuredEdibles} = useSelector(selectEdible);
    const {testimonials} = useSelector(selectTestimonials);
    useSelector(selectAuth);
    useEffect(() => {
        dispatch(getFeaturedProducts());
        dispatch(getShops({query: ''}));
        dispatch(getFeaturedEdibles());
        dispatch(getFAQs());
        dispatch(getTestimonials());
    }, [dispatch]);
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));

    const formik = useFormik({
        initialValues: {email: ''},
        onSubmit: async (values, {resetForm}) => {
            try {
                const response = await NEWSLETTER_API.subscribe({email: values.email});
                resetForm();
                enqueueSnackbar(response.data?.message || 'Subscribed!', {variant: 'success'});
            } catch (e) {
                enqueueSnackbar(e.response?.data?.message || 'Failed to subscribe', {variant: 'error'});
            }
        },
        validationSchema: yup.object({email: yup.string().email('Enter a valid email').required('Email required')}),
    });

    return (
        <Layout>
            {/* ════════════════════════════ HERO ════════════════════════════ */}
            <Box sx={{position: 'relative', overflow: 'hidden', minHeight: {xs: '80vh', md: '90vh'}}}>
                <Box sx={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${banner})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.3)',
                }}/>
                <Container maxWidth="lg" sx={{
                    position: 'relative', zIndex: 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    minHeight: {xs: '80vh', md: '90vh'}, textAlign: 'center',
                }}>
                    <Stack spacing={4} alignItems="center" sx={{maxWidth: 700}}>
                        <Chip label="Licensed Medical Dispensary" size="small" sx={{
                            bgcolor: 'rgba(34,197,94,0.15)', color: 'secondary.main',
                            fontWeight: 700, border: '1px solid', borderColor: 'rgba(34,197,94,0.3)', px: 1,
                        }}/>
                        <Typography sx={{
                            color: 'common.white', fontWeight: 800,
                            fontSize: {xs: '2.5rem', sm: '3.2rem', md: '3.8rem'},
                            lineHeight: 1.1, letterSpacing: '-0.03em',
                        }}>
                            Premium Cannabis{' '}
                            <Box component="span" sx={{color: 'secondary.main'}}>for Wellness</Box>
                        </Typography>
                        <Typography variant="body1" sx={{color: 'rgba(255,255,255,0.6)', maxWidth: 500, fontSize: '1.1rem'}}>
                            Lab-tested, physician-approved medical marijuana from licensed cultivators. Delivered discreetly to your door.
                        </Typography>
                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                            <Button component={Link} to="/products/marijuana" variant="contained" color="secondary"
                                size="large" endIcon={<ArrowForward/>} sx={{px: 5, py: 1.5, fontSize: '1rem'}}>
                                Shop Menu
                            </Button>
                            <Button component={Link} to="/about" variant="outlined" size="large"
                                sx={{px: 5, py: 1.5, fontSize: '1rem', borderColor: 'rgba(255,255,255,0.2)', color: 'common.white',
                                    '&:hover': {borderColor: 'secondary.main', color: 'secondary.main'}}}>
                                Learn More
                            </Button>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* ════════════════════════════ TRUST STRIP ════════════════════════════ */}
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider'}}>
                <Container maxWidth="lg">
                    <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="center" spacing={{xs: 2, sm: 6}} sx={{py: 3}}>
                        {[
                            {icon: <VerifiedOutlined sx={{fontSize: 20, color: 'secondary.main'}}/>, text: 'Lab Tested'},
                            {icon: <LocalShippingOutlined sx={{fontSize: 20, color: 'secondary.main'}}/>, text: 'Discreet Delivery'},
                            {icon: <SecurityOutlined sx={{fontSize: 20, color: 'secondary.main'}}/>, text: 'Secure Checkout'},
                            {icon: <CheckCircleOutline sx={{fontSize: 20, color: 'secondary.main'}}/>, text: 'Licensed Dispensary'},
                        ].map((item, i) => (
                            <Stack key={i} direction="row" spacing={1} alignItems="center">
                                {item.icon}
                                <Typography variant="body2" sx={{color: 'text.secondary', fontWeight: 500}}>{item.text}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Container>
            </Box>

            </motion.div>

            {/* ════════════════════════════ CATEGORIES ════════════════════════════ */}
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
            <Container maxWidth="xl" sx={{py: {xs: 6, md: 10}}}>
                <Box sx={{textAlign: 'center', mb: 5}}>
                    <Typography variant="overline" sx={{color: 'secondary.main'}}>Browse Categories</Typography>
                    <Typography variant="h3" sx={{color: 'text.primary'}}>Explore Our Menu</Typography>
                </Box>
                <Grid container spacing={3} justifyContent="center">
                    {[
                        {title: 'Flower', desc: 'Premium strains — Sativa, Indica & Hybrid', icon: <LocalFloristOutlined sx={{fontSize: 32}}/>, link: '/products/marijuana'},
                        {title: 'Edibles', desc: 'Gummies, chocolates, beverages & more', icon: <LocalMallOutlined sx={{fontSize: 32}}/>, link: '/products/edibles'},
                        {title: 'Accessories', desc: 'Vaporizers, papers, pipes & gear', icon: <SpaOutlined sx={{fontSize: 32}}/>, link: '/products/accessories'},
                    ].map((cat, i) => (
                        <Grid key={i} size={{xs: 12, md: 4}}>
                            <Card component={Link} to={cat.link} elevation={0}
                                sx={{textDecoration: 'none', cursor: 'pointer', height: '100%',
                                    '&:hover .cat-icon': {bgcolor: 'secondary.main', color: 'common.white'}}}>
                                <CardContent sx={{p: {xs: 3, md: 4}, textAlign: 'center'}}>
                                    <Box className="cat-icon" sx={{
                                        width: 64, height: 64, borderRadius: 3, bgcolor: 'light.secondary',
                                        color: 'secondary.main', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                        mb: 2.5, transition: 'all 0.3s ease',
                                    }}>{cat.icon}</Box>
                                    <Typography variant="h5" sx={{color: 'text.primary', mb: 1}}>{cat.title}</Typography>
                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>{cat.desc}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            </motion.div>

            {/* ════════════════════════════ FEATURED PRODUCTS ════════════════════════════ */}
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
            <Box sx={{bgcolor: 'background.paper'}}>
                <Container maxWidth="xl" sx={{py: {xs: 6, md: 10}}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{mb: 4}}>
                        <Box>
                            <Typography variant="overline" sx={{color: 'secondary.main'}}>Curated Selection</Typography>
                            <Typography variant="h3" sx={{color: 'text.primary'}}>Top Shelf Picks</Typography>
                        </Box>
                        <Button component={Link} to="/featured/marijuana" endIcon={<ArrowForward/>}
                            color="secondary" sx={{display: {xs: 'none', md: 'flex'}}}>View All</Button>
                    </Stack>
                    {productLoading ? (
                        <Box sx={{display: 'flex', justifyContent: 'center', py: 6}}><CircularProgress color="secondary"/></Box>
                    ) : featuredProducts?.length > 0 ? (
                        <ScrollCarousel cardWidth={260} gap={16}>
                            {featuredProducts.map((product, i) => (
                                <Product key={i} product={product}/>
                            ))}
                        </ScrollCarousel>
                    ) : (
                        <Empty title="No featured products" message="Check back soon."
                            icon={<img alt="" src={emptyIcon} style={{height: 80, width: 80, objectFit: 'contain'}}/>}/>
                    )}
                </Container>
            </Box>

            </motion.div>

            {/* ════════════════════════════ HOW IT WORKS ════════════════════════════ */}
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
            <Container maxWidth="lg" sx={{py: {xs: 6, md: 10}}}>
                <Box sx={{textAlign: 'center', mb: 5}}>
                    <Typography variant="overline" sx={{color: 'secondary.main'}}>Simple Process</Typography>
                    <Typography variant="h3" sx={{color: 'text.primary'}}>How It Works</Typography>
                </Box>
                <Grid container spacing={3} justifyContent="center">
                    {[
                        {num: '01', title: 'Browse', desc: 'Explore our curated menu of lab-tested cannabis products.', icon: '🔍'},
                        {num: '02', title: 'Order', desc: 'Add to cart, verify credentials, and checkout securely.', icon: '🛒'},
                        {num: '03', title: 'Enjoy', desc: 'Receive discreet delivery right to your door.', icon: '✨'},
                    ].map((step, i) => (
                        <Grid key={i} size={{xs: 12, sm: 6, md: 4}}>
                            <Card elevation={0} sx={{height: '100%', textAlign: 'center', '&:hover': {transform: 'none'}}}>
                                <CardContent sx={{p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <Typography sx={{fontSize: '2.5rem', mb: 1}}>{step.icon}</Typography>
                                    <Typography variant="overline" sx={{color: 'secondary.main'}}>Step {step.num}</Typography>
                                    <Typography variant="h5" sx={{color: 'text.primary', my: 1}}>{step.title}</Typography>
                                    <Typography variant="body2" sx={{color: 'text.secondary', maxWidth: 260}}>{step.desc}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            </motion.div>

            {/* ════════════════════════════ EDIBLES ════════════════════════════ */}
            {featuredEdibles?.length > 0 && (
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                <Box sx={{bgcolor: 'background.paper'}}>
                    <Container maxWidth="xl" sx={{py: {xs: 6, md: 10}}}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{mb: 4}}>
                            <Box>
                                <Typography variant="overline" sx={{color: 'secondary.main'}}>Infused Treats</Typography>
                                <Typography variant="h3" sx={{color: 'text.primary'}}>Curated Edibles</Typography>
                            </Box>
                            <Button component={Link} to="/products/edibles" endIcon={<ArrowForward/>}
                                color="secondary" sx={{display: {xs: 'none', md: 'flex'}}}>View All</Button>
                        </Stack>
                        <ScrollCarousel cardWidth={260} gap={16}>
                            {featuredEdibles.map((edible, i) => (
                                <Edible key={i} edible={edible}/>
                            ))}
                        </ScrollCarousel>
                    </Container>
                </Box>
            </motion.div>
            )}

            {/* ════════════════════════════ PROMO BANNER ════════════════════════════ */}
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
            <Box sx={{position: 'relative', overflow: 'hidden'}}>
                <Box sx={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${marijuana})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'brightness(0.2)',
                }}/>
                <Container maxWidth="lg" sx={{position: 'relative', zIndex: 1, py: {xs: 8, md: 12}}}>
                    <Grid container spacing={6} alignItems="center">
                        <Grid size={{xs: 12, md: 7}}>
                            <Typography variant="overline" sx={{color: 'secondary.main'}}>New Arrivals</Typography>
                            <Typography variant="h2" sx={{color: 'common.white', mb: 2}}>
                                Discover New Strains Weekly
                            </Typography>
                            <Typography variant="body1" sx={{color: 'rgba(255,255,255,0.5)', mb: 4, maxWidth: 450}}>
                                Our cultivators develop new genetics constantly. Be the first to try exclusive strains available only at Ruderalis.
                            </Typography>
                            <Button component={Link} to="/products/marijuana" variant="contained" color="secondary"
                                size="large" endIcon={<ArrowForward/>} sx={{px: 4}}>
                                Shop New Arrivals
                            </Button>
                        </Grid>
                        <Grid size={{xs: 12, md: 5}}>
                            <Stack spacing={2.5}>
                                {[
                                    {label: 'Lab Tested', desc: 'Every batch tested for potency & contaminants'},
                                    {label: 'Craft Grown', desc: 'Small-batch cultivation for premium quality'},
                                    {label: 'Same Day', desc: 'Order by 2PM for same-day delivery'},
                                ].map((item, i) => (
                                    <Stack direction="row" spacing={2} alignItems="center" key={i}>
                                        <CheckCircleOutline sx={{color: 'secondary.main', fontSize: 22}}/>
                                        <Box>
                                            <Typography variant="subtitle2" sx={{color: 'common.white'}}>{item.label}</Typography>
                                            <Typography variant="caption" sx={{color: 'rgba(255,255,255,0.4)'}}>{item.desc}</Typography>
                                        </Box>
                                    </Stack>
                                ))}
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
            </motion.div>

            {/* ════════════════════════════ DISPENSARIES ════════════════════════════ */}
            {shops?.length > 0 && (
                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                <Container maxWidth="xl" sx={{py: {xs: 6, md: 10}}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{mb: 4}}>
                        <Box>
                            <Typography variant="overline" sx={{color: 'secondary.main'}}>Visit Us</Typography>
                            <Typography variant="h3" sx={{color: 'text.primary'}}>Our Dispensaries</Typography>
                        </Box>
                        <Button component={Link} to="/shops" endIcon={<ArrowForward/>}
                            color="secondary" sx={{display: {xs: 'none', md: 'flex'}}}>View All</Button>
                    </Stack>
                    <Grid container spacing={2}>
                        {shops.slice(0, 6).map((shop, i) => (
                            <Grid key={i} size={{xs: 6, sm: 4, md: 2}}><Shop shop={shop} compact/></Grid>
                        ))}
                    </Grid>
                </Container>
                </motion.div>
            )}

            {/* ════════════════════════════ TESTIMONIALS ════════════════════════════ */}
            {testimonials?.length > 0 && (
                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                <Box sx={{bgcolor: 'background.paper'}}>
                    <Container maxWidth="xl" sx={{py: {xs: 6, md: 10}}}>
                        <Box sx={{textAlign: 'center', mb: 5}}>
                            <Typography variant="overline" sx={{color: 'secondary.main'}}>Testimonials</Typography>
                            <Typography variant="h3" sx={{color: 'text.primary'}}>What Our Patients Say</Typography>
                        </Box>
                        <Grid container spacing={3}>
                            {testimonials.slice(0, lg ? 3 : md ? 2 : 1).map((t, i) => (
                                <Grid key={i} size={{xs: 12, md: 6, lg: 4}}>
                                    <Testimonial testimonial={t}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
                </motion.div>
            )}

            {/* ════════════════════════════ FAQ ════════════════════════════ */}
            {faqs?.length > 0 && (
                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                <Container maxWidth="md" sx={{py: {xs: 6, md: 10}}}>
                    <Box sx={{textAlign: 'center', mb: 5}}>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Support</Typography>
                        <Typography variant="h3" sx={{color: 'text.primary'}}>Common Questions</Typography>
                    </Box>
                    <Stack spacing={1.5}>
                        {faqs.map((faq, i) => <FAQ key={i} faq={faq}/>)}
                    </Stack>
                </Container>
                </motion.div>
            )}

            {/* ════════════════════════════ NEWSLETTER ════════════════════════════ */}
            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
            <Box sx={{bgcolor: 'background.paper', borderTop: '1px solid', borderColor: 'divider'}}>
                <Container maxWidth="sm" sx={{py: {xs: 6, md: 10}, textAlign: 'center'}}>
                    <Star sx={{color: 'secondary.main', fontSize: 36, mb: 2}}/>
                    <Typography variant="h4" sx={{color: 'text.primary', mb: 1}}>Stay in the Loop</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary', mb: 4}}>
                        New strains, exclusive drops, and wellness tips — straight to your inbox.
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                            <FormControl fullWidth variant="outlined" sx={{flex: 1}}>
                                <OutlinedInput
                                    value={formik.values.email} id="email" name="email" type="email"
                                    error={Boolean(formik.touched.email && formik.errors.email)}
                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                    placeholder="your@email.com" size="medium" color="secondary"/>
                                {formik.touched.email && formik.errors.email && (
                                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                                )}
                            </FormControl>
                            <Button type="submit" size="large" color="secondary"
                                sx={{px: 4, py: 1.8, whiteSpace: 'nowrap'}}
                                loading={formik.isSubmitting} variant="contained">
                                Subscribe
                            </Button>
                        </Stack>
                    </form>
                </Container>
            </Box>
            </motion.div>
        </Layout>
    );
};

export default HomePage;
