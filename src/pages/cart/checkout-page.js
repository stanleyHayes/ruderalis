import Layout from "../../components/layout/layout";
import {Box, Container, Grid, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useState} from "react";
import CartSummary from "../../components/shared/cart-summary";
import {selectCart} from "../../redux/features/cart/cart-slice";
import ContactInformation from "../../components/shared/contact-information";
import ShippingInformation from "../../components/shared/shipping-information";
import PaymentInformation from "../../components/shared/payment-information";

const CheckoutPage = () => {

    const [step, setStep] = useState(0);

    const {items} = useSelector(selectCart);
    const previous = () => {
        setStep(step => step - 1);
    }

    const next = () => {
        setStep(step => step + 1);
    }

    const reset = () => {
        setStep(0);
    }

    return (
        <Layout>
            <Box sx={{py: 8}}>
                <Container>
                    <Typography variant="h4" sx={{color: "text.primary", mb: 8}}>
                        Checkout
                    </Typography>
                    <Grid container={true} spacing={4}>
                        <Grid item={true} xs={12} md={7}>
                            <Box sx={{mb: 4}}>
                                <Stepper activeStep={step}>
                                    <Step key="contact">
                                        <StepLabel>Contact</StepLabel>
                                    </Step>
                                    <Step key="delivery">
                                        <StepLabel>Delivery</StepLabel>
                                    </Step>
                                    <Step key="payment">
                                        <StepLabel>Payment</StepLabel>
                                    </Step>
                                </Stepper>
                            </Box>

                            <Box>
                                {step === 0 ? (
                                    <ContactInformation next={next} previous={previous}/>
                                ) : step === 1 ? (
                                    <ShippingInformation next={next} previous={previous}/>
                                ) : step === 2 ? (
                                    <PaymentInformation reset={reset} previous={previous}/>
                                ) : null}
                            </Box>
                        </Grid>
                        <Grid item={true} xs={12} md={5}>
                            <CartSummary items={items}/>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    )
}

export default CheckoutPage;