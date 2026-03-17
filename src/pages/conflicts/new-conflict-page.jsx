import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Alert, AlertTitle, Box, Button, Card, CardContent, Container,
    FormControl, FormHelperText, Grid, InputLabel, LinearProgress,
    MenuItem, OutlinedInput, Select, Stack, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {ArrowBack, ArrowRightAlt, GavelOutlined} from "@mui/icons-material";
import {createConflict, selectConflict} from "../../redux/features/conflict/conflict-slice";
import {getOrders, selectOrder} from "../../redux/features/order/order-slice";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import {useFormik} from "formik";
import * as yup from "yup";
import AccountSidebar from "../../components/shared/account-sidebar";
import {LoadingButton} from "@mui/lab";

const reasons = [
    {value: 'wrong_item', label: 'Wrong Item Received'},
    {value: 'damaged_item', label: 'Damaged / Defective Item'},
    {value: 'missing_item', label: 'Missing Item'},
    {value: 'quality_issue', label: 'Quality Issue'},
    {value: 'not_as_described', label: 'Not As Described'},
    {value: 'late_delivery', label: 'Late Delivery'},
    {value: 'overcharged', label: 'Overcharged'},
    {value: 'refund_request', label: 'Refund Request'},
    {value: 'vendor_unresponsive', label: 'Vendor Unresponsive'},
    {value: 'other', label: 'Other'},
];

const NewConflictPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const {conflictLoading, conflictError} = useSelector(selectConflict);
    const {orders} = useSelector(selectOrder);

    const showMessage = (msg, opts) => enqueueSnackbar(msg, opts);

    useEffect(() => { dispatch(getOrders()); }, [dispatch]);

    const formik = useFormik({
        initialValues: {
            order: '',
            reason: '',
            priority: 'medium',
            subject: '',
            description: '',
        },
        validationSchema: yup.object({
            order: yup.string().required('Please select an order'),
            reason: yup.string().required('Please select a reason'),
            priority: yup.string().required('Priority is required'),
            subject: yup.string().required('Subject is required').min(5, 'At least 5 characters'),
            description: yup.string().required('Description is required').min(20, 'Please provide at least 20 characters describing your issue'),
        }),
        onSubmit: (values) => {
            dispatch(createConflict({data: values, navigate, showMessage}));
        },
    });

    const sx = {borderRadius: 3};

    return (
        <Layout>
            {conflictLoading && <LinearProgress color="secondary"/>}

            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 3, md: 5}, pb: {xs: 2, md: 4}}}>
                <Container maxWidth="xl">
                    <Button component={Link} to="/account/conflicts" startIcon={<ArrowBack/>} sx={{mb: 2, textTransform: 'none', color: 'text.secondary'}}>
                        Back to Disputes
                    </Button>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <GavelOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Dispute Center</Typography>
                    </Stack>
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>Raise a Dispute</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                        Tell us about the issue and we'll help resolve it with the vendor
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 5}}}>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 8}}>
                        {conflictError && (
                            <Alert sx={{mb: 3}} severity="error"><AlertTitle>{conflictError}</AlertTitle></Alert>
                        )}

                        <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                        <Card variant="outlined" sx={{overflow: 'hidden'}}>
                            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                            <CardContent sx={{p: {xs: 3, md: 4}}}>
                                <form onSubmit={formik.handleSubmit}>
                                    <Grid container spacing={3}>
                                        {/* Order Selection */}
                                        <Grid size={{xs: 12}}>
                                            <FormControl fullWidth variant="outlined" error={Boolean(formik.touched.order && formik.errors.order)}>
                                                <InputLabel>Select Order</InputLabel>
                                                <Select name="order" label="Select Order" color="secondary"
                                                    value={formik.values.order} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                    sx={sx}>
                                                    {(orders || []).map(order => (
                                                        <MenuItem key={order._id} value={order._id}>
                                                            #{order._id?.substring(0, 8).toUpperCase()} — {order.status} — {order.items?.length || 0} item(s)
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {formik.touched.order && formik.errors.order && <FormHelperText>{formik.errors.order}</FormHelperText>}
                                            </FormControl>
                                        </Grid>

                                        {/* Reason */}
                                        <Grid size={{xs: 12, sm: 6}}>
                                            <FormControl fullWidth variant="outlined" error={Boolean(formik.touched.reason && formik.errors.reason)}>
                                                <InputLabel>Reason</InputLabel>
                                                <Select name="reason" label="Reason" color="secondary"
                                                    value={formik.values.reason} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                    sx={sx}>
                                                    {reasons.map(r => (
                                                        <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>
                                                    ))}
                                                </Select>
                                                {formik.touched.reason && formik.errors.reason && <FormHelperText>{formik.errors.reason}</FormHelperText>}
                                            </FormControl>
                                        </Grid>

                                        {/* Priority */}
                                        <Grid size={{xs: 12, sm: 6}}>
                                            <FormControl fullWidth variant="outlined" error={Boolean(formik.touched.priority && formik.errors.priority)}>
                                                <InputLabel>Priority</InputLabel>
                                                <Select name="priority" label="Priority" color="secondary"
                                                    value={formik.values.priority} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                    sx={sx}>
                                                    <MenuItem value="low">Low</MenuItem>
                                                    <MenuItem value="medium">Medium</MenuItem>
                                                    <MenuItem value="high">High</MenuItem>
                                                </Select>
                                                {formik.touched.priority && formik.errors.priority && <FormHelperText>{formik.errors.priority}</FormHelperText>}
                                            </FormControl>
                                        </Grid>

                                        {/* Subject */}
                                        <Grid size={{xs: 12}}>
                                            <FormControl fullWidth variant="outlined" error={Boolean(formik.touched.subject && formik.errors.subject)}>
                                                <InputLabel htmlFor="subject">Subject</InputLabel>
                                                <OutlinedInput id="subject" name="subject" label="Subject"
                                                    placeholder="Brief summary of the issue"
                                                    value={formik.values.subject} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                    sx={sx} color="secondary"/>
                                                {formik.touched.subject && formik.errors.subject && <FormHelperText>{formik.errors.subject}</FormHelperText>}
                                            </FormControl>
                                        </Grid>

                                        {/* Description */}
                                        <Grid size={{xs: 12}}>
                                            <FormControl fullWidth variant="outlined" error={Boolean(formik.touched.description && formik.errors.description)}>
                                                <InputLabel htmlFor="description">Description</InputLabel>
                                                <OutlinedInput id="description" name="description" label="Description"
                                                    placeholder="Describe the issue in detail — what happened, what you expected, and how you'd like it resolved..."
                                                    multiline rows={5}
                                                    value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                    sx={sx} color="secondary"/>
                                                {formik.touched.description && formik.errors.description && <FormHelperText>{formik.errors.description}</FormHelperText>}
                                            </FormControl>
                                        </Grid>

                                        {/* Submit */}
                                        <Grid size={{xs: 12}}>
                                            <LoadingButton type="submit" size="large" color="secondary"
                                                sx={{textTransform: 'none', py: 1.5, fontWeight: 600, fontSize: '1rem'}}
                                                endIcon={<ArrowRightAlt/>} loading={conflictLoading} fullWidth variant="contained" disableElevation>
                                                {conflictLoading ? 'Submitting...' : 'Submit Dispute'}
                                            </LoadingButton>
                                        </Grid>
                                    </Grid>
                                </form>
                            </CardContent>
                        </Card>
                        </motion.div>

                        {/* Tips */}
                        <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                        <Card variant="outlined" sx={{overflow: 'hidden', mt: 3}}>
                            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                            <CardContent sx={{p: 3}}>
                                <Typography variant="subtitle2" fontWeight={800} sx={{mb: 1.5}}>Tips for a Faster Resolution</Typography>
                                <Stack spacing={1}>
                                    {[
                                        'Be specific about what went wrong and include order details.',
                                        'Mention the product name, quantity, and what you expected.',
                                        'If applicable, mention photos of damaged items (you can describe them in the description).',
                                        'The vendor has 48 hours to respond before you can escalate.',
                                        'You can escalate to admin if the vendor is unresponsive.',
                                    ].map((tip, i) => (
                                        <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                                            <Box sx={{width: 6, height: 6, borderRadius: '50%', bgcolor: 'secondary.main', mt: 0.8, flexShrink: 0}}/>
                                            <Typography variant="body2" color="text.secondary">{tip}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                        </motion.div>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <Box sx={{position: 'sticky', top: 80}}>
                            <AccountSidebar/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default NewConflictPage;
