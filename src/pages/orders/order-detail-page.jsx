import {motion} from "framer-motion";
import {scaleIn} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useParams} from "react-router";
import {useSnackbar} from "notistack";
import currencyFormatter from "currency-formatter";
import moment from "moment";
import {getOrder, cancelOrder, selectOrder} from "../../redux/features/order/order-slice";
import {UTILS} from "../../utils/utils";
import {Receipt} from "@mui/icons-material";

const ORDER_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Completed'];

const getActiveStep = (status) => {
    switch (status) {
        case 'pending': return 0;
        case 'processing': return 1;
        case 'shipped': return 2;
        case 'delivered': return 3;
        case 'completed': return 4;
        case 'cancelled': return -1;
        default: return 0;
    }
};

const getStatusColor = (status) => {
    switch (status) {
        case 'completed': return 'success';
        case 'pending': return 'warning';
        case 'cancelled': return 'error';
        case 'processing': return 'info';
        case 'shipped': return 'primary';
        case 'delivered': return 'success';
        default: return 'default';
    }
};

const OrderDetailPage = () => {
    const {orderID} = useParams();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const {orderLoading, orderDetail, orderError} = useSelector(selectOrder);

    useEffect(() => {
        dispatch(getOrder({id: orderID}));
    }, [dispatch, orderID]);

    const handleCancelOrder = () => {
        dispatch(cancelOrder({id: orderID, showMessage: enqueueSnackbar}));
    };

    return (
        <Layout>
            {orderLoading && <LinearProgress variant="query" color="secondary"/>}

            <Box sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                pt: {xs: 3, md: 5},
                pb: {xs: 2, md: 4},
            }}>
                <Container maxWidth="xl">
                    <Stack direction={{xs: 'column', md: 'row'}} justifyContent="space-between" alignItems={{md: 'center'}} spacing={2}>
                        <Box>
                            <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                                <Box sx={{
                                    width: 44, height: 44, borderRadius: '50%',
                                    bgcolor: 'light.secondary',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Receipt sx={{color: 'secondary.main', fontSize: 22}}/>
                                </Box>
                                <Typography variant="overline" sx={{color: 'secondary.main'}}>Order Details</Typography>
                            </Stack>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Typography variant="h3" sx={{color: 'text.primary'}}>
                                    Order #{orderDetail?._id?.substring(0, 8).toUpperCase()}
                                </Typography>
                                {orderDetail && (
                                    <Chip label={orderDetail.status} size="small" color={getStatusColor(orderDetail.status)} sx={{textTransform: 'none'}}/>
                                )}
                            </Stack>
                        </Box>
                        {orderDetail?.status === 'pending' && (
                            <Button onClick={handleCancelOrder} variant="outlined" color="error" size="large"
                                disableElevation={true} sx={{textTransform: 'none'}}>
                                Cancel Order
                            </Button>
                        )}
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 4}}}>
                {orderError && (
                    <Alert sx={{mb: 3}} severity="error">
                        <AlertTitle>{orderError}</AlertTitle>
                    </Alert>
                )}

                {orderDetail && (
                    <motion.div variants={scaleIn} initial="initial" animate="animate">
                    <Stack spacing={4}>
                        {/* Status Timeline */}
                        {orderDetail.status !== 'cancelled' ? (
                            <Card elevation={0}>
                                <CardContent sx={{py: 4}}>
                                    <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 3}}>
                                        Order Progress
                                    </Typography>
                                    <Stepper activeStep={getActiveStep(orderDetail.status)} alternativeLabel
                                        sx={{
                                            '& .MuiStepIcon-root.Mui-active': {color: 'secondary.main'},
                                            '& .MuiStepIcon-root.Mui-completed': {color: 'secondary.main'},
                                        }}>
                                        {ORDER_STEPS.map((label) => (
                                            <Step key={label}><StepLabel>{label}</StepLabel></Step>
                                        ))}
                                    </Stepper>
                                </CardContent>
                            </Card>
                        ) : (
                            <Alert severity="error">
                                <AlertTitle>Order Cancelled</AlertTitle>
                                This order has been cancelled and will not be processed.
                            </Alert>
                        )}

                        {/* Info Cards */}
                        <Grid container spacing={3}>
                            <Grid size={{xs: 12, md: 6}}>
                                <Card elevation={0} sx={{height: '100%'}}>
                                    <CardContent sx={{p: 3}}>
                                        <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 2}}>Order Information</Typography>
                                        <Divider sx={{mb: 2}}/>
                                        <Stack spacing={2}>
                                            {[
                                                {label: 'Order ID', value: orderDetail._id},
                                                orderDetail.trackingNumber && {label: 'Tracking Number', value: orderDetail.trackingNumber},
                                                {label: 'Date', value: moment(orderDetail.createdAt).format('MMM DD, YYYY')},
                                                {label: 'Status', value: orderDetail.status},
                                            ].filter(Boolean).map((row, i) => (
                                                <Stack key={i} direction="row" justifyContent="space-between">
                                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>{row.label}</Typography>
                                                    <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 500, textTransform: 'none'}}>{row.value}</Typography>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{xs: 12, md: 6}}>
                                <Card elevation={0} sx={{height: '100%'}}>
                                    <CardContent sx={{p: 3}}>
                                        <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 2}}>Delivery Information</Typography>
                                        <Divider sx={{mb: 2}}/>
                                        {orderDetail.shipping ? (
                                            <Stack spacing={2}>
                                                {[
                                                    {label: 'Name', value: orderDetail.shipping.name || orderDetail.shipping.fullName || 'N/A'},
                                                    {label: 'Address', value: orderDetail.shipping.address || 'N/A'},
                                                    {label: 'Phone', value: orderDetail.shipping.phone || 'N/A'},
                                                ].map((row, i) => (
                                                    <Stack key={i} direction="row" justifyContent="space-between">
                                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>{row.label}</Typography>
                                                        <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 500}}>{row.value}</Typography>
                                                    </Stack>
                                                ))}
                                            </Stack>
                                        ) : (
                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>No delivery information available</Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{xs: 12, md: 6}}>
                                <Card elevation={0} sx={{height: '100%'}}>
                                    <CardContent sx={{p: 3}}>
                                        <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 2}}>Payment Information</Typography>
                                        <Divider sx={{mb: 2}}/>
                                        {orderDetail.payment ? (
                                            <Stack spacing={2}>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>Method</Typography>
                                                    <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 500, textTransform: 'none'}}>{orderDetail.payment.method || 'N/A'}</Typography>
                                                </Stack>
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>Status</Typography>
                                                    <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 500, textTransform: 'none'}}>{orderDetail.payment.status || 'N/A'}</Typography>
                                                </Stack>
                                            </Stack>
                                        ) : (
                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>No payment information available</Typography>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid size={{xs: 12, md: 6}}>
                                <Card elevation={0} sx={{height: '100%'}}>
                                    <CardContent sx={{p: 3}}>
                                        <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 2}}>Order Total</Typography>
                                        <Divider sx={{mb: 2}}/>
                                        <Stack spacing={2}>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="body2" sx={{color: 'text.secondary'}}>Subtotal</Typography>
                                                <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 500}}>
                                                    {currencyFormatter.format(UTILS.calculateTotalPrice(orderDetail.items), {code: orderDetail.currency || orderDetail.deliveryFee?.currency || 'GHS'})}
                                                </Typography>
                                            </Stack>
                                            {orderDetail.deliveryFee && (
                                                <Stack direction="row" justifyContent="space-between">
                                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>Delivery Fee</Typography>
                                                    <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 500}}>
                                                        {currencyFormatter.format(orderDetail.deliveryFee.amount, {code: orderDetail.deliveryFee.currency || 'GHS'})}
                                                    </Typography>
                                                </Stack>
                                            )}
                                            <Divider/>
                                            <Stack direction="row" justifyContent="space-between">
                                                <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 700}}>Total</Typography>
                                                <Typography variant="h6" sx={{color: 'secondary.main', fontWeight: 700}}>
                                                    {currencyFormatter.format(
                                                        orderDetail.total || (UTILS.calculateTotalPrice(orderDetail.items) + (orderDetail.deliveryFee?.amount || 0)),
                                                        {code: orderDetail.currency || orderDetail.deliveryFee?.currency || 'GHS'}
                                                    )}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>

                        {/* Items */}
                        <Box>
                            <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 2}}>
                                Order Items ({orderDetail.items ? orderDetail.items.length : 0})
                            </Typography>
                            <TableContainer component={Paper} elevation={0} sx={{borderRadius: 3}}>
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow sx={{bgcolor: 'background.default'}}>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}}>#</TableCell>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}}>Product</TableCell>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}} align="center">Qty</TableCell>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}} align="right">Price</TableCell>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}} align="right">Subtotal</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orderDetail.items && orderDetail.items.map((item, index) => (
                                            <TableRow key={index} hover={true} sx={{'&:last-child td': {border: 0}}}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{fontWeight: 500, color: 'text.primary'}}>{item.product?.name || 'N/A'}</Typography>
                                                </TableCell>
                                                <TableCell align="center">{item.quantity}</TableCell>
                                                <TableCell align="right">
                                                    {currencyFormatter.format(item.product?.price?.amount || 0, {code: item.product?.price?.currency || 'GHS'})}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Typography variant="body2" sx={{fontWeight: 600, color: 'text.primary'}}>
                                                        {currencyFormatter.format((item.product?.price?.amount || 0) * item.quantity, {code: item.product?.price?.currency || 'GHS'})}
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Stack>
                    </motion.div>
                )}
            </Container>
        </Layout>
    )
}

export default OrderDetailPage;
