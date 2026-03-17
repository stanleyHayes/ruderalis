import {
    Alert, AlertTitle, Box, Button, Card, CardContent, Chip, Container, Divider,
    Grid, LinearProgress, Stack, Step, StepLabel, Stepper, Typography,
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import AuthArtwork from "../../components/shared/auth-artwork";
import AuthField from "../../components/shared/auth-field";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {Link} from "react-router-dom";
import {
    ArrowRightAlt, ChevronLeft, EmailOutlined, LockOutlined,
    PersonOutlined, PhoneOutlined, VpnKeyOutlined,
} from "@mui/icons-material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import {motion} from 'framer-motion';
import {fadeUp} from "../../utils/animations";

const steps = ['Personal', 'Credentials', 'Security'];

const RegisterPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const {authLoading, authError} = useSelector(selectAuth);
    const [step, setStep] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [showPin, setShowPin] = useState(false);

    const showMessage = (message, options) => enqueueSnackbar(message, options);

    const formik = useFormik({
        initialValues: {
            firstName: '', lastName: '', username: '', email: '', phone: '',
            referralCode: '', pin: '', password: '', confirmPassword: '',
        },
        onSubmit: (values, {resetForm, setSubmitting}) => {
            dispatch(AUTH_ACTION_CREATORS.register({values, navigate, resetForm, showMessage, setSubmitting}));
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            firstName: yup.string().required('Required'),
            lastName: yup.string().required('Required'),
            username: yup.string().required('Required'),
            email: yup.string().email('Invalid email').required('Required'),
            phone: yup.string().required('Required'),
            referralCode: yup.string().required('Required'),
            pin: yup.string().required('Required').min(4, 'Min 4 chars'),
            password: yup.string().required('Required').min(6, 'Min 6 chars'),
            confirmPassword: yup.string().required('Required').oneOf([yup.ref('password')], 'Must match'),
        }),
    });

    const canNext = () => {
        if (step === 0) return formik.values.firstName && formik.values.lastName && formik.values.username && formik.values.email;
        if (step === 1) return formik.values.phone && formik.values.referralCode;
        return true;
    };

    return (
        <Box sx={{maxWidth: '100vw', display: 'flex', minHeight: '100vh', overflow: 'hidden'}}>
            <AuthArtwork variant="register"/>

            {/* Right — Form */}
            <Box sx={{flex: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', py: 4}}>
                {authLoading && <LinearProgress color="secondary" sx={{position: 'absolute', top: 0, left: 0, right: 0}}/>}
                <Container maxWidth="sm">
                    <motion.div {...fadeUp}>
                        <Stack spacing={3} sx={{py: 2}}>
                            {/* Logo */}
                            <Link to="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10}}>
                                <img src={logo} style={{width: 40, height: 40, objectFit: 'contain'}} alt=""/>
                                <Typography fontFamily="TTSquares" variant="h6" sx={{color: 'text.primary', fontWeight: 700}}>Ruderalis</Typography>
                            </Link>

                            {/* Title */}
                            <Box>
                                <Typography variant="h4" fontWeight={800} sx={{color: 'text.primary'}}>
                                    Create{' '}<Box component="span" sx={{color: 'secondary.main'}}>Account</Box>
                                </Typography>
                                <Typography variant="body2" sx={{color: 'text.secondary', mt: 0.5}}>
                                    Already have an account?{' '}
                                    <Typography component={Link} to="/auth/login" variant="body2"
                                        sx={{color: 'secondary.main', textDecoration: 'none', fontWeight: 700}}>
                                        Sign In
                                    </Typography>
                                </Typography>
                            </Box>

                            {/* Stepper */}
                            <Stepper activeStep={step} alternativeLabel sx={{
                                '& .MuiStepIcon-root.Mui-active': {color: 'secondary.main'},
                                '& .MuiStepIcon-root.Mui-completed': {color: 'secondary.main'},
                            }}>
                                {steps.map(label => (
                                    <Step key={label}><StepLabel>{label}</StepLabel></Step>
                                ))}
                            </Stepper>

                            {authError && <Alert severity="error" variant="outlined"><AlertTitle>{authError}</AlertTitle></Alert>}

                            {/* Form Card */}
                            <Card variant="outlined">
                                <Box sx={{height: 3, bgcolor: 'secondary.main'}}/>
                                <CardContent sx={{p: 3}}>
                                    <form onSubmit={formik.handleSubmit}>
                                        {/* Step 1: Personal */}
                                        {step === 0 && (
                                            <Stack spacing={2.5}>
                                                <Grid container spacing={2.5}>
                                                    <Grid size={{xs: 12, sm: 6}}>
                                                        <AuthField name="firstName" label="First Name" placeholder="First name"
                                                            icon={<PersonOutlined sx={{fontSize: 18}}/>} formik={formik}/>
                                                    </Grid>
                                                    <Grid size={{xs: 12, sm: 6}}>
                                                        <AuthField name="lastName" label="Last Name" placeholder="Last name"
                                                            icon={<PersonOutlined sx={{fontSize: 18}}/>} formik={formik}/>
                                                    </Grid>
                                                </Grid>
                                                <AuthField name="username" label="Username" placeholder="Choose a username"
                                                    icon={<PersonOutlined sx={{fontSize: 18}}/>} formik={formik}/>
                                                <AuthField name="email" label="Email" placeholder="you@example.com" type="email"
                                                    icon={<EmailOutlined sx={{fontSize: 18}}/>} formik={formik}/>
                                            </Stack>
                                        )}

                                        {/* Step 2: Contact & Referral */}
                                        {step === 1 && (
                                            <Stack spacing={2.5}>
                                                <AuthField name="phone" label="Phone Number" placeholder="+1234567890" type="tel"
                                                    icon={<PhoneOutlined sx={{fontSize: 18}}/>} formik={formik}/>
                                                <AuthField name="referralCode" label="Referral Code" placeholder="Enter referral code"
                                                    icon={<VpnKeyOutlined sx={{fontSize: 18}}/>} formik={formik}/>
                                                <Chip label="Signing up requires a referral code from an existing member" size="small"
                                                    sx={{fontSize: 11, fontWeight: 500, alignSelf: 'flex-start'}}/>
                                            </Stack>
                                        )}

                                        {/* Step 3: Security */}
                                        {step === 2 && (
                                            <Stack spacing={2.5}>
                                                <AuthField name="pin" label="PIN" placeholder="4-digit PIN"
                                                    icon={<VpnKeyOutlined sx={{fontSize: 18}}/>} formik={formik}
                                                    showToggle showPassword={showPin} onTogglePassword={() => setShowPin(!showPin)}/>
                                                <AuthField name="password" label="Password" placeholder="Min 6 characters"
                                                    icon={<LockOutlined sx={{fontSize: 18}}/>} formik={formik}
                                                    showToggle showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)}/>
                                                <AuthField name="confirmPassword" label="Confirm Password" placeholder="Re-enter password"
                                                    icon={<LockOutlined sx={{fontSize: 18}}/>} formik={formik}
                                                    showToggle showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)}/>
                                            </Stack>
                                        )}

                                        {/* Navigation */}
                                        <Stack direction="row" spacing={2} sx={{mt: 3}}>
                                            {step > 0 && (
                                                <Button variant="outlined" color="secondary" fullWidth size="large"
                                                    startIcon={<ChevronLeft/>}
                                                    onClick={() => setStep(s => s - 1)}>
                                                    Back
                                                </Button>
                                            )}
                                            {step < 2 ? (
                                                <Button variant="contained" color="secondary" fullWidth size="large"
                                                    disabled={!canNext()}
                                                    endIcon={<ArrowRightAlt/>}
                                                    onClick={() => setStep(s => s + 1)}
                                                    sx={{py: 1.5, fontWeight: 700}}>
                                                    Next
                                                </Button>
                                            ) : (
                                                <Button type="submit" variant="contained" color="secondary" fullWidth size="large"
                                                    loading={authLoading} endIcon={<ArrowRightAlt/>}
                                                    sx={{py: 1.5, fontWeight: 700}}>
                                                    Create Account
                                                </Button>
                                            )}
                                        </Stack>
                                    </form>
                                </CardContent>
                            </Card>

                            {/* Footer */}
                            <Divider/>
                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                <LockOutlined sx={{color: 'text.disabled', fontSize: 16}}/>
                                <Typography variant="caption" color="text.secondary">Your data is encrypted and secure</Typography>
                            </Stack>
                        </Stack>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
};

export default RegisterPage;
