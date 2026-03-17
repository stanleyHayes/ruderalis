import {motion} from "framer-motion";
import {fadeUp, scaleIn} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import {
    Box, Button, Card, CardContent, Chip, Container, Divider,
    FormControl, Grid, InputAdornment, InputLabel, LinearProgress,
    OutlinedInput, Stack, Step, StepContent, StepLabel, Stepper, Typography,
} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearTracking, selectTracking, trackOrder} from "../../redux/features/tracking/tracking-slice";
import {useSnackbar} from "notistack";
import {useParams} from "react-router";
import {
    CalendarTodayOutlined, ContentPasteOutlined, InfoOutlined,
    LocalShippingOutlined, PlaceOutlined, ReceiptOutlined, SearchOutlined,
} from "@mui/icons-material";
import {UTILS} from "../../utils/utils";

const TrackingPage = () => {
    const {code: codeFromPath} = useParams();
    const [input, setInput] = useState(codeFromPath || '');
    const dispatch = useDispatch();
    const {tracking, trackingLoading} = useSelector(selectTracking);
    const {enqueueSnackbar} = useSnackbar();

    const handleTrack = (e) => {
        e.preventDefault();
        if (!input.trim()) {
            enqueueSnackbar('Please enter an order ID or order number', {variant: 'warning'});
            return;
        }
        dispatch(trackOrder({code: input.trim(), showMessage: enqueueSnackbar}));
    };

    // Mock tracking events for display
    const events = tracking?.events || [
        ...(tracking ? [
            {status: 'Order Placed', description: 'Your order has been received and confirmed.', location: 'Ruderalis HQ', timestamp: tracking.createdAt || new Date().toISOString()},
            ...(tracking.status !== 'ordered' ? [{status: 'Processing', description: 'Your order is being prepared by our dispensary team.', location: 'Ruderalis Dispensary', timestamp: new Date().toISOString()}] : []),
            ...(tracking.status === 'shipped' || tracking.status === 'delivered' ? [{status: 'Shipped', description: 'Package picked up by carrier for delivery.', location: tracking.origin || 'Las Vegas, NV', timestamp: new Date().toISOString()}] : []),
            ...(tracking.status === 'delivered' ? [{status: 'Delivered', description: 'Package has been delivered successfully.', location: tracking.destination || 'Your address', timestamp: new Date().toISOString()}] : []),
        ] : []),
    ];

    return (
        <Layout>
            {trackingLoading && <LinearProgress color="secondary"/>}
            <PageBanner title="Order Tracking" description="Track your package in real time" links={[{path: '/', label: 'Home'}, {path: '/tracking', label: 'Tracking'}]}/>

            <Box sx={{py: {xs: 4, md: 6}, backgroundColor: 'background.default'}}>
                <Container maxWidth="lg">

                    {/* ═══════════ SEARCH CARD ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Card variant="outlined" sx={{overflow: 'hidden', mb: 4}}>
                        <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                        <CardContent sx={{p: 3}}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                    <LocalShippingOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                </Box>
                                <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>
                                    Track Your Shipment
                                </Typography>
                            </Stack>

                            <form onSubmit={handleTrack}>
                                <Grid container spacing={2} alignItems="flex-start">
                                    <Grid size={{xs: 12, md: 9}}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel htmlFor="tracking-input">Order ID or Order Number</InputLabel>
                                            <OutlinedInput
                                                id="tracking-input"
                                                value={input}
                                                onChange={(e) => setInput(e.target.value)}
                                                label="Order ID or Order Number"
                                                placeholder="e.g. #RUD-2026-001 or paste Order ID"
                                                color="secondary"
                                                startAdornment={
                                                    <InputAdornment position="start">
                                                        <SearchOutlined sx={{fontSize: 20, color: 'text.secondary'}}/>
                                                    </InputAdornment>
                                                }
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <Button size="small" color="secondary"
                                                            startIcon={<ContentPasteOutlined sx={{fontSize: 14}}/>}
                                                            sx={{fontSize: 12, minWidth: 0}}
                                                            onClick={async () => {
                                                                try { const t = await navigator.clipboard.readText(); if (t) setInput(t); } catch {}
                                                            }}>
                                                            Paste
                                                        </Button>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={{xs: 12, md: 3}}>
                                        <Button type="submit" color="secondary" variant="contained" fullWidth
                                            startIcon={<SearchOutlined/>} disabled={trackingLoading}
                                            sx={{fontWeight: 700, py: 1.85}}>
                                            Track Order
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>

                            <Stack direction="row" spacing={2} sx={{mt: 1.5}} flexWrap="wrap" useFlexGap>
                                <Chip size="small" label="Carrier: Ruderalis Express"
                                    sx={{fontSize: 10, fontWeight: 600}}/>
                                <Typography variant="caption" color="text.secondary">
                                    Paste the Order ID you copied from your order history
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                    </motion.div>

                    {/* ═══════════ RESULTS ═══════════ */}
                    {tracking ? (
                        <motion.div variants={scaleIn} initial="initial" animate="animate">
                        <Grid container spacing={2}>
                            {/* Left: Summary + Timeline */}
                            <Grid size={{xs: 12, md: 8}}>
                                {/* Summary */}
                                <Card variant="outlined" sx={{overflow: 'hidden', mb: 2}}>
                                    <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                    <CardContent sx={{p: 2.5}}>
                                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}
                                            justifyContent="space-between" alignItems={{sm: 'center'}}>
                                            <Stack spacing={0.5}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography variant="h6" fontWeight={800} sx={{color: 'text.primary'}}>
                                                        #{tracking.code || input}
                                                    </Typography>
                                                    {UTILS.renderOrderStatus(tracking.status || 'processing')}
                                                </Stack>
                                                <Typography variant="caption" color="text.secondary">
                                                    Carrier: {tracking.carrier || 'Ruderalis Express'} &bull; Est. Delivery: {tracking.estimatedDelivery || '2-5 business days'}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>

                                {/* Timeline */}
                                <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                    <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                    <CardContent sx={{p: 2.5}}>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                            <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                                <LocalShippingOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                            </Box>
                                            <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>
                                                Shipment Timeline
                                            </Typography>
                                        </Stack>
                                        <Divider sx={{mb: 2}}/>

                                        {events.length === 0 ? (
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{py: 2}}>
                                                <InfoOutlined sx={{fontSize: 16, color: 'text.secondary'}}/>
                                                <Typography variant="body2" color="text.secondary">
                                                    No tracking events available yet. Check back soon.
                                                </Typography>
                                            </Stack>
                                        ) : (
                                            <Stepper orientation="vertical" activeStep={events.length - 1}
                                                sx={{
                                                    '& .MuiStepIcon-root.Mui-completed': {color: 'secondary.main'},
                                                    '& .MuiStepIcon-root.Mui-active': {color: 'secondary.main'},
                                                }}>
                                                {events.map((ev, i) => (
                                                    <Step key={i} expanded>
                                                        <StepLabel>
                                                            <Typography variant="body2" fontWeight={700} sx={{color: 'text.primary'}}>
                                                                {ev.status}
                                                            </Typography>
                                                        </StepLabel>
                                                        <StepContent>
                                                            {ev.description && (
                                                                <Typography variant="body2" color="text.secondary" sx={{mb: 0.5}}>
                                                                    {ev.description}
                                                                </Typography>
                                                            )}
                                                            <Stack direction="row" spacing={2}>
                                                                {ev.location && (
                                                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                                                        <PlaceOutlined sx={{fontSize: 13, color: 'text.disabled'}}/>
                                                                        <Typography variant="caption" color="text.secondary">{ev.location}</Typography>
                                                                    </Stack>
                                                                )}
                                                                {ev.timestamp && (
                                                                    <Stack direction="row" spacing={0.5} alignItems="center">
                                                                        <CalendarTodayOutlined sx={{fontSize: 13, color: 'text.disabled'}}/>
                                                                        <Typography variant="caption" color="text.secondary">
                                                                            {UTILS.formatDate(ev.timestamp)}
                                                                        </Typography>
                                                                    </Stack>
                                                                )}
                                                            </Stack>
                                                        </StepContent>
                                                    </Step>
                                                ))}
                                            </Stepper>
                                        )}
                                    </CardContent>
                                </Card>
                            </Grid>

                            {/* Right: Details sidebar */}
                            <Grid size={{xs: 12, md: 4}}>
                                <Card variant="outlined" sx={{overflow: 'hidden', position: 'sticky', top: 80}}>
                                    <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                    <CardContent sx={{p: 2.5}}>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                            <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                                <ReceiptOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                            </Box>
                                            <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>
                                                Shipment Details
                                            </Typography>
                                        </Stack>
                                        <Divider sx={{mb: 2}}/>
                                        <Stack spacing={1.5}>
                                            {[
                                                {label: 'Tracking Number', value: tracking.code || input},
                                                {label: 'Order ID', value: tracking.orderId || tracking._id || '—'},
                                                {label: 'Carrier', value: tracking.carrier || 'Ruderalis Express'},
                                                {label: 'Estimated Delivery', value: tracking.estimatedDelivery || '2-5 business days'},
                                                {label: 'Origin', value: tracking.origin || 'Ruderalis Dispensary, Las Vegas'},
                                                {label: 'Destination', value: tracking.destination || '—'},
                                            ].map((item, i) => (
                                                <Box key={i}>
                                                    <Typography variant="overline" sx={{fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: 'text.secondary'}}>
                                                        {item.label}
                                                    </Typography>
                                                    <Typography variant="body2" fontWeight={700} sx={{color: 'text.primary'}}>
                                                        {item.value}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                        </motion.div>
                    ) : !trackingLoading && (
                        /* Empty state */
                        <Card variant="outlined">
                            <CardContent sx={{py: 6, textAlign: 'center'}}>
                                <LocalShippingOutlined sx={{fontSize: 48, color: 'text.disabled', mb: 1.5}}/>
                                <Typography variant="h6" fontWeight={700} sx={{mb: 0.5, color: 'text.primary'}}>
                                    Ready to track?
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Enter your Order ID or order number above to see your shipment status and delivery timeline.
                                </Typography>
                            </CardContent>
                        </Card>
                    )}
                </Container>
            </Box>
        </Layout>
    );
};

export default TrackingPage;
