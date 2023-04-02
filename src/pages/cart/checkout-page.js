import Layout from "../../components/layout/layout";
import {
    Box, Button,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack, Step, StepLabel, Stepper,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import {
    KeyboardArrowLeft,
    KeyboardArrowRightOutlined,
    LocationCityOutlined,
    MailOutline,
    Person2Outlined
} from "@mui/icons-material";
import * as yup from "yup";
import {useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate} from "react-router";
import {useState} from "react";
import CartSummary from "../../components/shared/cart-summary";
import {selectCart} from "../../redux/features/cart/cart-slice";
import ContactInformation from "../../components/shared/contact-information";
import ShippingInformation from "../../components/shared/shipping-information";
import PaymentInformation from "../../components/shared/payment-information";

const CheckoutPage = () => {

    const {authData: {firstName, lastName, email, phone}} = useSelector(selectAuth);

    const formik = useFormik({
        initialValues: {
            firstName, lastName, email, phone
        },
        validationSchema: yup.object().shape({
            firstName: yup.string().required("First name field required"),
            lastName: yup.string().required("Last name field required"),
            email: yup.string().email("Invalid email").required("Email field required"),
            phone: yup.string().required("Phone field required")
        }),
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (values) => {
            console.log(values)
        }
    });

    const navigate = useNavigate();
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
                    <Grid container={true} spacing={4}>
                        <Grid item={true} xs={12} md={7}>
                            <Box>
                                <Typography variant="h4" sx={{color: "text.primary", mb: 8}}>
                                    Checkout
                                </Typography>

                                <Box>
                                    <Stepper activeStep={step}>
                                        <Step key="contact">
                                            <StepLabel>Contact</StepLabel>
                                        </Step>
                                        <Step key="shipping">
                                            <StepLabel>Shipping</StepLabel>
                                        </Step>
                                        <Step key="payment">
                                            <StepLabel>Payment</StepLabel>
                                        </Step>
                                    </Stepper>
                                </Box>

                                <Box>
                                    {step === 0 ? (
                                        <ContactInformation next={next} previous={previous} />
                                    ): step === 1 ? (
                                        <ShippingInformation next={next} previous={previous}  />
                                    ): step === 2 ? (
                                        <PaymentInformation reset={reset} previous={previous}  />
                                    ): null}
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item={true} xs={12} md={5}>
                            <CartSummary items={items} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    )
}

export default CheckoutPage;