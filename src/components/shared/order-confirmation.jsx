import {motion} from "framer-motion";
import {fadeUp, stagger} from "../../utils/animations";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import {
    CheckCircleOutlineOutlined,
    Inventory2Outlined,
    LocalShippingOutlined,
    ShoppingBagOutlined,
    VisibilityOutlined,
} from "@mui/icons-material";
import {useNavigate} from "react-router";

const OrderConfirmation = () => {
    const navigate = useNavigate();

    const orderNumber = `RDL-${Date.now().toString(36).toUpperCase()}`;

    const steps = [
        {
            icon: Inventory2Outlined,
            title: 'Order Processing',
            description: 'Your order is being reviewed and prepared by the dispensary.',
        },
        {
            icon: LocalShippingOutlined,
            title: 'Out for Delivery',
            description: 'A delivery rider will be assigned and your order dispatched.',
        },
        {
            icon: ShoppingBagOutlined,
            title: 'Delivered',
            description: 'Your order arrives at your door. Enjoy responsibly.',
        },
    ];

    return (
        <Card
            variant="outlined"
            sx={{
                backgroundColor: 'background.paper',
                borderTop: '3px solid',
                borderTopColor: 'secondary.main',
                '&:hover': {transform: 'none'},
            }}>
            <CardContent sx={{py: {xs: 5, md: 8}, px: {xs: 3, md: 6}}}>
                <Stack spacing={4} alignItems="center">
                    {/* Success Icon */}
                    <Box
                        sx={{
                            width: 88,
                            height: 88,
                            borderRadius: '50%',
                            backgroundColor: 'light.secondary',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <CheckCircleOutlineOutlined
                            sx={{color: 'secondary.main', fontSize: 52}}
                        />
                    </Box>

                    {/* Title */}
                    <Typography
                        variant="h5"
                        align="center"
                        sx={{color: 'secondary.main', fontWeight: 700}}>
                        Order Confirmed
                    </Typography>

                    <Typography
                        variant="h6"
                        align="center"
                        sx={{color: 'text.primary', fontWeight: 500}}>
                        Thank you for your order
                    </Typography>

                    {/* Order Number */}
                    <Box sx={{
                        bgcolor: 'light.secondary',
                        borderRadius: 2,
                        px: 3,
                        py: 1.5,
                        textAlign: 'center',
                    }}>
                        <Typography variant="caption" sx={{color: 'text.secondary', display: 'block'}}>
                            Order Number
                        </Typography>
                        <Typography variant="subtitle1" sx={{color: 'secondary.main', fontWeight: 700}}>
                            {orderNumber}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{color: 'text.secondary', maxWidth: 440}}>
                        Your order has been confirmed and is being processed. You will receive
                        a notification when your order is on its way.
                    </Typography>

                    <Divider sx={{width: '100%', borderColor: 'divider'}}/>

                    {/* What Happens Next */}
                    <Box sx={{width: '100%', maxWidth: 480}}>
                        <Typography
                            variant="subtitle2"
                            align="center"
                            sx={{color: 'text.primary', fontWeight: 700, mb: 3}}>
                            What happens next
                        </Typography>

                        <motion.div variants={stagger} initial="initial" animate="animate">
                        <Stack spacing={3}>
                            {steps.map(({icon: Icon, title, description}, index) => (
                                <motion.div key={index} variants={fadeUp}>
                                <Stack direction="row" spacing={2.5} alignItems="flex-start">
                                    <Box
                                        sx={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: '50%',
                                            backgroundColor: 'light.secondary',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexShrink: 0,
                                        }}>
                                        <Icon sx={{color: 'secondary.main', fontSize: 22}}/>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 600}}>
                                            {index + 1}. {title}
                                        </Typography>
                                        <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                            {description}
                                        </Typography>
                                    </Box>
                                </Stack>
                                </motion.div>
                            ))}
                        </Stack>
                        </motion.div>
                    </Box>

                    {/* Estimated Delivery */}
                    <Box sx={{
                        bgcolor: 'background.alt',
                        borderRadius: 2,
                        px: 3,
                        py: 2,
                        textAlign: 'center',
                        width: '100%',
                        maxWidth: 480,
                    }}>
                        <Typography variant="caption" sx={{color: 'text.secondary', display: 'block', mb: 0.5}}>
                            Estimated Delivery
                        </Typography>
                        <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 600}}>
                            2 - 5 business days
                        </Typography>
                        <Typography variant="caption" sx={{color: 'text.secondary'}}>
                            Based on vendor shipping policy and your location
                        </Typography>
                    </Box>

                    <Divider sx={{width: '100%', borderColor: 'divider'}}/>

                    {/* CTA Buttons */}
                    <Stack
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={2}
                        sx={{width: '100%', maxWidth: 480}}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="secondary"
                            size="large"
                            onClick={() => navigate('/orders')}
                            sx={{py: 1.5, fontWeight: 700, whiteSpace: 'nowrap'}}>
                            View Orders
                        </Button>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            size="large"
                            onClick={() => navigate('/products/marijuana')}
                            sx={{py: 1.5, fontWeight: 700, whiteSpace: 'nowrap'}}>
                            Continue Shopping
                        </Button>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default OrderConfirmation;
