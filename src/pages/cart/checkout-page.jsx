import Layout from "../../components/layout/layout";
import {
    Box,
    Card,
    CardContent,
    Container,
    Grid,
    Stack,
    Step,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import CartSummary from "../../components/shared/cart-summary";
import {clearCart, selectCart} from "../../redux/features/cart/cart-slice";
import ContactInformation from "../../components/shared/contact-information";
import ShippingInformation from "../../components/shared/shipping-information";
import PaymentInformation from "../../components/shared/payment-information";
import {createOrder} from "../../redux/features/order/order-slice";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import {Lock} from "@mui/icons-material";

const CheckoutPage = () => {
    const [step, setStep] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const {items} = useSelector(selectCart);

    const previous = () => {
        setStep(step => step - 1);
    };

    const next = () => {
        setStep(step => step + 1);
    };

    const handleSubmitOrder = () => {
        enqueueSnackbar('Order placed successfully!', {variant: 'success'});
        dispatch(clearCart());
        navigate('/checkout/order/confirmed');
    };

    const reset = () => {
        setStep(0);
    };

    const steps = ['Contact', 'Shipping', 'Payment'];

    return (
        <Layout>
            <Box sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                pt: {xs: 3, md: 5},
                pb: {xs: 2, md: 4},
            }}>
                <Container>
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 1}}>
                        Checkout
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                        <Lock sx={{color: 'text.secondary', fontSize: 16}}/>
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            Secure checkout - Complete your order in 3 simple steps
                        </Typography>
                    </Stack>
                </Container>
            </Box>

            <Box sx={{py: {xs: 3, md: 4}}}>
                <Container>
                    <Grid container spacing={4}>
                        <Grid size={{xs: 12, md: 8}}>
                            <Card
                                variant="outlined"
                                sx={{
                                    mb: 3,
                                    borderTop: '3px solid',
                                    borderTopColor: 'secondary.main',
                                    '&:hover': {transform: 'none'},
                                }}>
                                <CardContent sx={{p: 3}}>
                                    <Stepper
                                        activeStep={step}
                                        sx={{
                                            '& .MuiStepIcon-root.Mui-active': {color: 'secondary.main'},
                                            '& .MuiStepIcon-root.Mui-completed': {color: 'secondary.main'},
                                        }}>
                                        {steps.map((label) => (
                                            <Step key={label}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </CardContent>
                            </Card>

                            <Card
                                variant="outlined"
                                sx={{
                                    borderTop: '3px solid',
                                    borderTopColor: 'secondary.main',
                                    '&:hover': {transform: 'none'},
                                }}>
                                <CardContent sx={{p: {xs: 2, md: 3}}}>
                                    {step === 0 ? (
                                        <ContactInformation next={next} previous={previous}/>
                                    ) : step === 1 ? (
                                        <ShippingInformation next={next} previous={previous}/>
                                    ) : step === 2 ? (
                                        <PaymentInformation
                                            reset={reset}
                                            previous={previous}
                                            onSubmitOrder={handleSubmitOrder}
                                        />
                                    ) : null}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{xs: 12, md: 4}}>
                            <CartSummary items={items}/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
};

export default CheckoutPage;
