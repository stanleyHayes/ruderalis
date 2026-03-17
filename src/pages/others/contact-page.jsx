import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Box, Button, Card, CardContent, Chip, CircularProgress, Container,
    Divider, Grid, Stack, TextField, Typography,
} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {useState} from "react";
import {
    AccessTimeOutlined, ArrowRightAlt, CheckCircleOutlined,
    EmailOutlined, LocalPhoneOutlined, LocationOnOutlined,
    SendOutlined, SupportAgentOutlined,
} from "@mui/icons-material";

const BUSINESS_HOURS = [
    {day: 'Monday – Friday', hours: '9:00 AM – 9:00 PM'},
    {day: 'Saturday', hours: '10:00 AM – 7:00 PM'},
    {day: 'Sunday', hours: '10:00 AM – 6:00 PM'},
];

const SUPPORT_PROMISES = [
    {icon: <CheckCircleOutlined fontSize="small" sx={{color: 'secondary.main'}}/>, text: 'Replies within 24 hours'},
    {icon: <SupportAgentOutlined fontSize="small" sx={{color: 'secondary.main'}}/>, text: 'Dedicated patient care team'},
    {icon: <AccessTimeOutlined fontSize="small" sx={{color: 'secondary.main'}}/>, text: 'Mon – Sun, 9 AM – 9 PM'},
];

const ContactPage = () => {
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const formik = useFormik({
        initialValues: {name: '', email: '', subject: '', message: ''},
        validationSchema: yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Enter a valid email').required('Email is required'),
            subject: yup.string().required('Subject is required'),
            message: yup.string().required('Message is required').min(10, 'At least 10 characters'),
        }),
        onSubmit: (values, {resetForm}) => {
            setSubmitting(true);
            setTimeout(() => {
                setSubmitting(false);
                setSubmitted(true);
                resetForm();
                setTimeout(() => setSubmitted(false), 4000);
            }, 1500);
        },
    });

    return (
        <Layout>
            {/* Support promise strip */}
            <Box sx={{borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', py: 2.5}}>
                <Container maxWidth="lg">
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={{xs: 2, sm: 4}}
                        justifyContent="center" alignItems="center" flexWrap="wrap" useFlexGap>
                        {SUPPORT_PROMISES.map((item, i) => (
                            <Stack key={i} direction="row" spacing={1} alignItems="center">
                                {item.icon}
                                <Typography variant="body2" fontWeight={500} sx={{color: 'text.primary'}}>{item.text}</Typography>
                            </Stack>
                        ))}
                    </Stack>
                </Container>
            </Box>

            {/* Main */}
            <Box sx={{py: {xs: 6, md: 8}, backgroundColor: 'background.default'}}>
                <Container maxWidth="xl">
                    <Grid container spacing={3} alignItems="flex-start">

                        {/* Left: Form */}
                        <Grid size={{xs: 12, md: 8}}>
                            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{p: {xs: 2.5, md: 4}}}>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.5}}>
                                        <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                            <SendOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                        </Box>
                                        <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>
                                            Send a Message
                                        </Typography>
                                    </Stack>
                                    <Typography variant="body2" color="text.secondary" sx={{mb: 3, lineHeight: 1.7}}>
                                        Have a question about a product, need help with an order, or just want to share feedback? We'll get back to you within 24 hours.
                                    </Typography>

                                    {submitted && (
                                        <Card variant="outlined" sx={{mb: 3, overflow: 'hidden'}}>
                                            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                            <CardContent sx={{py: 2, '&:last-child': {pb: 2}}}>
                                                <Stack direction="row" spacing={1.5} alignItems="center">
                                                    <CheckCircleOutlined sx={{color: 'secondary.main', fontSize: 20}}/>
                                                    <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                        Message sent! We'll get back to you within 24 hours.
                                                    </Typography>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    )}

                                    <form onSubmit={formik.handleSubmit}>
                                        <Stack spacing={2.5}>
                                            <TextField fullWidth label="Full Name" name="name" color="secondary"
                                                value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                error={formik.touched.name && Boolean(formik.errors.name)}
                                                helperText={formik.touched.name && formik.errors.name}/>
                                            <TextField fullWidth label="Email Address" name="email" color="secondary"
                                                value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                error={formik.touched.email && Boolean(formik.errors.email)}
                                                helperText={formik.touched.email && formik.errors.email}/>
                                            <TextField fullWidth label="Subject" name="subject" color="secondary"
                                                value={formik.values.subject} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                error={formik.touched.subject && Boolean(formik.errors.subject)}
                                                helperText={formik.touched.subject && formik.errors.subject}/>
                                            <TextField fullWidth label="Message" name="message" color="secondary"
                                                multiline minRows={6}
                                                value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                error={formik.touched.message && Boolean(formik.errors.message)}
                                                helperText={formik.touched.message && formik.errors.message}/>
                                            <Button type="submit" variant="contained" color="secondary" fullWidth
                                                size="large" disabled={submitting}
                                                endIcon={submitting ? <CircularProgress size={16} color="inherit"/> : <ArrowRightAlt/>}
                                                sx={{fontWeight: 700, py: 1.5}}>
                                                {submitting ? 'Sending...' : 'Send Message'}
                                            </Button>
                                        </Stack>
                                    </form>
                                </CardContent>
                            </Card>
                            </motion.div>
                        </Grid>

                        {/* Right: Contact Details */}
                        <Grid size={{xs: 12, md: 4}}>
                            <Box sx={{position: 'sticky', top: 80}}>
                                {/* Contact Info */}
                                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                                <Card variant="outlined" sx={{overflow: 'hidden', mb: 2}}>
                                    <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                    <CardContent sx={{p: 0, '&:last-child': {pb: 0}}}>
                                        {[
                                            {icon: <EmailOutlined sx={{fontSize: 18}}/>, label: 'Email', value: 'hello@ruderalis.com', sub: 'We reply within 24 hours'},
                                            {icon: <LocalPhoneOutlined sx={{fontSize: 18}}/>, label: 'Phone', value: '+1 (702) 420-0042', sub: 'Mon–Sat 9AM–9PM'},
                                            {icon: <LocationOnOutlined sx={{fontSize: 18}}/>, label: 'Address', value: '420 Green Street', sub: 'Las Vegas, NV 89101'},
                                        ].map((item, i, arr) => (
                                            <Box key={i}>
                                                <Stack direction="row" spacing={2} alignItems="center" sx={{px: 2.5, py: 2}}>
                                                    <Box sx={{
                                                        display: 'flex', p: 0.75, borderRadius: 1,
                                                        backgroundColor: 'light.secondary',
                                                        border: '1px solid', borderColor: 'divider',
                                                        color: 'secondary.main',
                                                    }}>
                                                        {item.icon}
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="overline" sx={{fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: 'text.secondary'}}>
                                                            {item.label}
                                                        </Typography>
                                                        <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                            {item.value}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">{item.sub}</Typography>
                                                    </Box>
                                                </Stack>
                                                {i < arr.length - 1 && <Divider/>}
                                            </Box>
                                        ))}
                                    </CardContent>
                                </Card>
                                </motion.div>

                                {/* Business Hours */}
                                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                                <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                    <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                    <CardContent sx={{p: 2.5}}>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 1.5}}>
                                            <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                                <AccessTimeOutlined sx={{fontSize: 16, color: 'secondary.main'}}/>
                                            </Box>
                                            <Typography variant="subtitle2" fontWeight={800} sx={{color: 'text.primary'}}>
                                                Business Hours
                                            </Typography>
                                        </Stack>
                                        <Divider sx={{mb: 1.5}}/>
                                        <Stack divider={<Divider/>}>
                                            {BUSINESS_HOURS.map(({day, hours}, i) => (
                                                <Stack key={i} direction="row" justifyContent="space-between"
                                                    alignItems="center" sx={{py: 1.25}}>
                                                    <Typography variant="body2" fontWeight={500} sx={{color: 'text.primary'}}>
                                                        {day}
                                                    </Typography>
                                                    <Typography variant="body2"
                                                        sx={{
                                                            color: hours === 'Closed' ? 'error.main' : 'text.secondary',
                                                            fontWeight: hours === 'Closed' ? 600 : 400,
                                                        }}>
                                                        {hours}
                                                    </Typography>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                                </motion.div>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
};

export default ContactPage;
