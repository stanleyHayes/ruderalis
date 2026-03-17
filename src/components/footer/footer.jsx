import {
    Box, Button, Chip, Container, Divider, FormControl, FormHelperText,
    Grid, IconButton, InputAdornment, InputLabel, Link as MUILink,
    OutlinedInput, Stack, Tooltip, Typography,
} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router";
import logo from "../../assets/images/logo.png";
import {
    AccessTimeOutlined, ArrowRightAlt, ChevronRightOutlined,
    EmailOutlined, LocalPhoneOutlined, LocationOnOutlined,
    SecurityOutlined, SmartphoneOutlined, VerifiedOutlined,
} from "@mui/icons-material";
import {useFormik} from "formik";
import * as yup from "yup";
import {NEWSLETTER_API} from "../../api/newsletter";
import {useSnackbar} from "notistack";
import mtn from "../../assets/images/mtn.jpg";
import vodafone from "../../assets/images/Vodafone.jpg";
import airteltigo from "../../assets/images/airteltigo.png";

const FooterLink = ({path, label}) => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const isActive = pathname === path;

    return (
        <Stack
            onClick={() => navigate(path)}
            direction="row" spacing={0.5} alignItems="center"
            sx={{
                cursor: 'pointer', py: 0.4, transition: 'all 0.15s ease',
                '& .footer-arrow': {opacity: 0, transform: 'translateX(-4px)', transition: 'all 0.2s ease'},
                '&:hover .footer-arrow': {opacity: 1, transform: 'translateX(0)'},
                '&:hover .footer-label': {color: 'secondary.main'},
            }}>
            <Typography className="footer-label" variant="body2" sx={{
                color: isActive ? 'secondary.main' : 'text.secondary',
                fontWeight: isActive ? 700 : 400, fontSize: 13,
                transition: 'color 0.15s ease',
            }}>
                {label}
            </Typography>
            <ChevronRightOutlined className="footer-arrow" sx={{fontSize: 14, color: 'secondary.main'}}/>
        </Stack>
    );
};

const Footer = () => {
    const year = new Date().getFullYear();
    const {enqueueSnackbar} = useSnackbar();

    const formik = useFormik({
        initialValues: {email: ''},
        validationSchema: yup.object({email: yup.string().email('Enter a valid email').required('Email required')}),
        validateOnBlur: true, validateOnChange: false,
        onSubmit: async (values, helpers) => {
            try {
                const response = await NEWSLETTER_API.subscribe({email: values.email});
                helpers.resetForm();
                enqueueSnackbar(response.data?.message || 'Subscribed!', {variant: 'success'});
            } catch (e) {
                enqueueSnackbar(e.response?.data?.message || 'Failed to subscribe', {variant: 'error'});
            }
        },
    });

    return (
        <Box component="footer" sx={{borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper'}}>
            <Box sx={{pt: 8, pb: 4}}>
                <Container maxWidth="xl">
                    {/* ═══════════ Newsletter Banner ═══════════ */}
                    <Box sx={{
                        p: {xs: 3, md: 4}, mb: 6, borderRadius: 1,
                        border: '1px solid', borderColor: 'divider',
                        backgroundColor: 'action.hover',
                    }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid size={{xs: 12, md: 5}}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 1}}>
                                    <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                        <EmailOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                    </Box>
                                    <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>
                                        Stay in the loop
                                    </Typography>
                                </Stack>
                                <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.7}}>
                                    Get exclusive drops, new strain alerts, and wellness tips straight to your inbox.
                                </Typography>
                            </Grid>
                            <Grid size={{xs: 12, md: 7}}>
                                <Box component="form" noValidate onSubmit={formik.handleSubmit}>
                                    <FormControl fullWidth variant="outlined"
                                        error={Boolean(formik.touched.email && formik.errors.email)}>
                                        <InputLabel htmlFor="footer-email">Your email</InputLabel>
                                        <OutlinedInput
                                            id="footer-email" name="email" type="email" label="Your email"
                                            placeholder="you@example.com" color="secondary"
                                            value={formik.values.email}
                                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Button type="submit" endIcon={<ArrowRightAlt/>}
                                                        color="secondary" variant="contained" size="medium"
                                                        sx={{fontWeight: 700, px: 3}}>
                                                        Subscribe
                                                    </Button>
                                                </InputAdornment>
                                            }
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <FormHelperText>{formik.errors.email}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* ═══════════ Main Grid ═══════════ */}
                    <Grid container spacing={4}>
                        {/* Brand */}
                        <Grid size={{xs: 12, md: 6, lg: 3}}>
                            <Link to="/" style={{textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 16}}>
                                <img src={logo} alt="Ruderalis" style={{width: 36, height: 36, objectFit: 'contain'}}/>
                                <Typography variant="h6" fontFamily="TTSquares" sx={{color: 'text.primary', fontWeight: 700}}>
                                    Ruderalis
                                </Typography>
                            </Link>
                            <Typography variant="body2" sx={{mb: 2.5, color: 'text.secondary', lineHeight: 1.7}}>
                                <Typography component="span" variant="body2" sx={{color: 'secondary.main', fontWeight: 700}}>
                                    Ruderalis
                                </Typography>
                                {' '}— premium medical cannabis for wellness-focused individuals. Licensed, lab-tested, delivered.
                            </Typography>

                            {/* Contact info */}
                            <Stack spacing={1.5}>
                                {[
                                    {icon: <LocationOnOutlined sx={{fontSize: 16}}/>, text: '420 Green Street, Las Vegas, NV 89101'},
                                    {icon: <LocalPhoneOutlined sx={{fontSize: 16}}/>, text: '+1 (702) 420-0042'},
                                    {icon: <EmailOutlined sx={{fontSize: 16}}/>, text: 'hello@ruderalis.com'},
                                    {icon: <AccessTimeOutlined sx={{fontSize: 16}}/>, text: 'Mon–Sat: 9AM–9PM'},
                                ].map(({icon, text}, i) => (
                                    <Stack key={i} direction="row" spacing={1} alignItems="center">
                                        <Box sx={{color: 'secondary.main'}}>{icon}</Box>
                                        <Typography variant="caption" sx={{color: 'text.secondary'}}>{text}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Grid>

                        {/* Shop */}
                        <Grid size={{xs: 6, md: 3, lg: 2}}>
                            <Typography variant="overline" sx={{fontWeight: 700, letterSpacing: 1.5, fontSize: 10, color: 'text.secondary', display: 'block', mb: 2}}>
                                Shop
                            </Typography>
                            <Stack spacing={0.5}>
                                <FooterLink path="/products/marijuana" label="Flower"/>
                                <FooterLink path="/products/edibles" label="Edibles"/>
                                <FooterLink path="/products/accessories" label="Accessories"/>
                                <FooterLink path="/shops" label="Dispensaries"/>
                                <FooterLink path="/coupons" label="Deals & Promos"/>
                                <FooterLink path="/featured/marijuana" label="Featured"/>
                            </Stack>
                        </Grid>

                        {/* Support */}
                        <Grid size={{xs: 6, md: 3, lg: 2}}>
                            <Typography variant="overline" sx={{fontWeight: 700, letterSpacing: 1.5, fontSize: 10, color: 'text.secondary', display: 'block', mb: 2}}>
                                Support
                            </Typography>
                            <Stack spacing={0.5}>
                                <FooterLink path="/account/dashboard" label="My Account"/>
                                <FooterLink path="/orders" label="Order History"/>
                                <FooterLink path="/tracking" label="Track Order"/>
                                <FooterLink path="/contact" label="Contact Us"/>
                                <FooterLink path="/about" label="FAQs"/>
                                <FooterLink path="/account/addresses" label="My Addresses"/>
                            </Stack>
                        </Grid>

                        {/* Company */}
                        <Grid size={{xs: 6, md: 3, lg: 2}}>
                            <Typography variant="overline" sx={{fontWeight: 700, letterSpacing: 1.5, fontSize: 10, color: 'text.secondary', display: 'block', mb: 2}}>
                                Company
                            </Typography>
                            <Stack spacing={0.5}>
                                <FooterLink path="/about" label="About Us"/>
                                <FooterLink path="/blog" label="Blog"/>
                                <FooterLink path="/newsletter" label="Newsletter"/>
                                <FooterLink path="/privacy" label="Privacy Policy"/>
                                <FooterLink path="/terms" label="Terms of Service"/>
                                <FooterLink path="/acceptable-use-policy" label="Usage Policy"/>
                            </Stack>
                        </Grid>

                        {/* Payments & Trust */}
                        <Grid size={{xs: 6, md: 3, lg: 3}}>
                            <Typography variant="overline" sx={{fontWeight: 700, letterSpacing: 1.5, fontSize: 10, color: 'text.secondary', display: 'block', mb: 2}}>
                                We Accept
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{mb: 2}}>
                                {[
                                    {src: mtn, alt: 'MTN MoMo'},
                                    {src: vodafone, alt: 'Vodafone Cash'},
                                    {src: airteltigo, alt: 'AirtelTigo Money'},
                                ].map(({src, alt}) => (
                                    <Box key={alt} component="img" src={src} alt={alt}
                                        sx={{
                                            width: 48, height: 32, objectFit: 'contain', borderRadius: 1,
                                            border: '1px solid', borderColor: 'divider', bgcolor: 'background.default', p: 0.5,
                                        }}/>
                                ))}
                            </Stack>
                            <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{mb: 3}}>
                                <Chip size="small" icon={<SmartphoneOutlined sx={{fontSize: '12px !important'}}/>} label="Mobile Money"
                                    sx={{fontSize: 10, fontWeight: 600, backgroundColor: 'light.secondary', color: 'secondary.main',
                                        '& .MuiChip-icon': {color: 'secondary.main'}}}/>
                                <Chip size="small" icon={<SecurityOutlined sx={{fontSize: '12px !important'}}/>} label="Secure"
                                    sx={{fontSize: 10, fontWeight: 600, backgroundColor: 'light.secondary', color: 'secondary.main',
                                        '& .MuiChip-icon': {color: 'secondary.main'}}}/>
                                <Chip size="small" icon={<VerifiedOutlined sx={{fontSize: '12px !important'}}/>} label="Licensed"
                                    sx={{fontSize: 10, fontWeight: 600, backgroundColor: 'light.secondary', color: 'secondary.main',
                                        '& .MuiChip-icon': {color: 'secondary.main'}}}/>
                            </Stack>

                            {/* License badge */}
                            <Box sx={{p: 2, borderRadius: 1, border: '1px solid', borderColor: 'divider', bgcolor: 'light.secondary'}}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.5}}>
                                    <Box sx={{width: 8, height: 8, borderRadius: '50%', bgcolor: 'secondary.main'}}/>
                                    <Typography variant="caption" sx={{color: 'secondary.main', fontWeight: 700}}>Licensed Dispensary</Typography>
                                </Stack>
                                <Typography variant="caption" sx={{color: 'text.disabled', lineHeight: 1.4, display: 'block'}}>
                                    License #MED-2024-RUD-0042<br/>State-certified & compliant
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>

                    <Divider sx={{my: 4}}/>

                    {/* ═══════════ Bottom Bar ═══════════ */}
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={1.5}
                        alignItems="center" justifyContent="space-between">
                        <Typography variant="caption" color="text.secondary">
                            &copy; {year} Ruderalis Inc. All rights reserved. For adults 21+ with valid medical authorization.
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            {[
                                {to: '/privacy', label: 'Privacy'},
                                {to: '/terms', label: 'Terms'},
                                {to: '/acceptable-use-policy', label: 'Cookies'},
                            ].map(({to, label}) => (
                                <MUILink key={to} component={Link} to={to} underline="hover" color="text.secondary" variant="caption"
                                    sx={{transition: 'color 0.15s', '&:hover': {color: 'secondary.main'}}}>
                                    {label}
                                </MUILink>
                            ))}
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;
