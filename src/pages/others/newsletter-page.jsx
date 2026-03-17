import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import {
    ArrowRightAlt, CheckCircleOutlined, EmailOutlined,
    LocalFloristOutlined, SpaOutlined, VerifiedOutlined,
} from "@mui/icons-material";
import {
    Box, Button, Card, CardContent, CircularProgress, Container,
    Divider, Grid, InputAdornment, OutlinedInput, Stack, Typography,
} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {useState} from "react";
import {NEWSLETTER_API} from "../../api/newsletter";
import {useSnackbar} from "notistack";

const NewsletterPage = () => {
    const [submitting, setSubmitting] = useState(false);
    const [subscribed, setSubscribed] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const formik = useFormik({
        initialValues: {email: ''},
        validationSchema: yup.object({email: yup.string().email('Enter a valid email').required('Email is required')}),
        onSubmit: async (values, {resetForm}) => {
            setSubmitting(true);
            try {
                const response = await NEWSLETTER_API.subscribe({email: values.email});
                setSubscribed(true);
                resetForm();
                enqueueSnackbar(response.data?.message || 'Subscribed successfully!', {variant: 'success'});
            } catch (e) {
                enqueueSnackbar(e.response?.data?.message || 'Failed to subscribe. Please try again.', {variant: 'error'});
            } finally {
                setSubmitting(false);
            }
        },
    });

    const benefits = [
        {icon: <LocalFloristOutlined sx={{fontSize: 20}}/>, title: 'New Strain Alerts', desc: 'Be the first to know when new strains and products arrive at Ruderalis.'},
        {icon: <SpaOutlined sx={{fontSize: 20}}/>, title: 'Wellness Tips', desc: 'Receive curated cannabis wellness guides and dosing advice from our experts.'},
        {icon: <VerifiedOutlined sx={{fontSize: 20}}/>, title: 'Member Exclusives', desc: 'Unlock subscriber-only promotions, early access sales, and loyalty rewards.'},
    ];

    return (
        <Layout>
            <PageBanner title="Newsletter" description="Stay updated with the latest cannabis wellness news"
                links={[{path: '/', label: 'Home'}, {path: '/newsletter', label: 'Newsletter'}]}/>

            <Box sx={{py: {xs: 5, md: 8}, backgroundColor: 'background.default'}}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="flex-start">
                        {/* Left: Form */}
                        <Grid size={{xs: 12, md: 7}}>
                            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{p: {xs: 3, md: 4}}}>
                                    {subscribed ? (
                                        <Box sx={{textAlign: 'center', py: 4}}>
                                            <Box sx={{
                                                width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 3,
                                                bgcolor: 'light.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            }}>
                                                <CheckCircleOutlined sx={{color: 'secondary.main', fontSize: 36}}/>
                                            </Box>
                                            <Typography variant="h5" fontWeight={800} sx={{color: 'text.primary', mb: 1}}>
                                                You're In!
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{mb: 3, maxWidth: 400, mx: 'auto'}}>
                                                Welcome to the Ruderalis community. Watch your inbox for wellness tips, new strain alerts, and exclusive offers.
                                            </Typography>
                                            <Button variant="outlined" color="secondary" onClick={() => setSubscribed(false)}>
                                                Subscribe another email
                                            </Button>
                                        </Box>
                                    ) : (
                                        <>
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.5}}>
                                                <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                                    <EmailOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                                </Box>
                                                <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>
                                                    Join Our Newsletter
                                                </Typography>
                                            </Stack>
                                            <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                                                Get expert cannabis wellness content, product launches, and subscriber-only promotions delivered weekly.
                                            </Typography>

                                            <form onSubmit={formik.handleSubmit}>
                                                <Stack spacing={2.5}>
                                                    <OutlinedInput
                                                        fullWidth placeholder="you@example.com" name="email" type="email" color="secondary"
                                                        value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                                        startAdornment={<InputAdornment position="start"><EmailOutlined sx={{fontSize: 20, color: 'text.secondary'}}/></InputAdornment>}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                <Button type="submit" variant="contained" color="secondary" disabled={submitting}
                                                                    endIcon={submitting ? <CircularProgress size={14} color="inherit"/> : <ArrowRightAlt/>}
                                                                    sx={{fontWeight: 700, px: 3, whiteSpace: 'nowrap'}}>
                                                                    {submitting ? 'Sending...' : 'Subscribe'}
                                                                </Button>
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    {formik.touched.email && formik.errors.email && (
                                                        <Typography variant="caption" color="error">{formik.errors.email}</Typography>
                                                    )}
                                                </Stack>
                                            </form>

                                            <Typography variant="caption" color="text.disabled" sx={{display: 'block', mt: 2}}>
                                                No spam, ever. Unsubscribe at any time. We respect your privacy.
                                            </Typography>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                            </motion.div>
                        </Grid>

                        {/* Right: Benefits */}
                        <Grid size={{xs: 12, md: 5}}>
                            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{p: 0, '&:last-child': {pb: 0}}}>
                                    <Box sx={{px: 2.5, py: 2}}>
                                        <Typography variant="subtitle2" fontWeight={800} sx={{color: 'text.primary'}}>
                                            What You'll Get
                                        </Typography>
                                    </Box>
                                    <Divider/>
                                    {benefits.map((b, i) => (
                                        <Box key={i}>
                                            <Stack direction="row" spacing={2} alignItems="flex-start" sx={{px: 2.5, py: 2}}>
                                                <Box sx={{
                                                    display: 'flex', p: 0.75, borderRadius: 1, flexShrink: 0, mt: 0.25,
                                                    backgroundColor: 'light.secondary', border: '1px solid', borderColor: 'divider',
                                                    color: 'secondary.main',
                                                }}>
                                                    {b.icon}
                                                </Box>
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary', mb: 0.25}}>
                                                        {b.title}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary" sx={{lineHeight: 1.5}}>
                                                        {b.desc}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                            {i < benefits.length - 1 && <Divider/>}
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
};

export default NewsletterPage;
