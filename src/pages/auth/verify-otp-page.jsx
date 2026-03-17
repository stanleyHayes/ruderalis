import {
    Alert, AlertTitle, Box, Card, CardContent, Container, Divider,
    Grid, LinearProgress, Stack, Typography
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import AuthArtwork from "../../components/shared/auth-artwork";
import AuthField from "../../components/shared/auth-field";
import {useFormik} from "formik";
import * as yup from "yup";
import {Link} from "react-router-dom";
import {ArrowRightAlt, LockOutlined, VpnKeyOutlined} from "@mui/icons-material";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate, useParams} from "react-router";
import {useSnackbar} from "notistack";
import {motion} from 'framer-motion';
import {fadeUp} from '../../utils/animations';

const VerifyOtpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useParams();
    const {authLoading, authError, authMessage} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();
    const showMessage = (message, options) => enqueueSnackbar(message, options);
    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {otp: ''},
        onSubmit: (values, {resetForm, setSubmitting}) => {
            dispatch(AUTH_ACTION_CREATORS.verifyOTP({values, token, navigate, resetForm, showMessage, setSubmitting}));
        },
        validateOnBlur: true, validateOnChange: true,
        validationSchema: yup.object({otp: yup.string().required('OTP required')})
    });

    return (
        <Box sx={{maxWidth: '100vw', display: 'flex', minHeight: '100vh', overflow: 'hidden'}}>
            <AuthArtwork variant="otp"/>
            <Box sx={{flex: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto'}}>
                <Container maxWidth="sm">
                    <motion.div {...fadeUp}>
                        <Stack direction="column" spacing={4} sx={{py: 4}}>
                            <Stack alignItems="center" direction="row" spacing={2}>
                                <Link to="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
                                    <img src={logo} style={{width: 48, height: 48, objectFit: 'contain'}} alt="Ruderalis Logo"/>
                                </Link>
                                <Link to="/" style={{textDecoration: 'none'}}>
                                    <Typography sx={{color: 'text.primary', fontWeight: 600}} variant="h5">Ruderalis</Typography>
                                </Link>
                            </Stack>
                            <Box>
                                <Typography variant="h4" sx={{color: 'text.primary', fontWeight: 700}}>
                                    Verify{' '}<Box component="span" sx={{color: 'secondary.main'}}>OTP</Box>
                                </Typography>
                                <Typography variant="body2" sx={{color: 'text.secondary', mt: 1}}>
                                    Didn't receive it?{' '}
                                    <Typography component={Link} to="/auth/otp/resend" variant="body2"
                                        sx={{color: 'secondary.main', textDecoration: 'none', fontWeight: 700, '&:hover': {textDecoration: 'underline'}}}>
                                        Resend OTP
                                    </Typography>
                                </Typography>
                            </Box>
                            <Card variant="outlined" elevation={0}>
                                <Box sx={{height: 3, bgcolor: 'secondary.main'}}/>
                                {authLoading && <LinearProgress variant="query" color="secondary"/>}
                                <CardContent sx={{p: {xs: 3, md: 4}}}>
                                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                        <Stack spacing={3}>
                                            {authError && <Alert severity="error" variant="outlined"><AlertTitle>{authError}</AlertTitle></Alert>}
                                            {authMessage && <Alert severity="info" variant="outlined"><AlertTitle>{authMessage}</AlertTitle></Alert>}
                                            <AuthField name="otp" label="OTP" placeholder="Enter OTP"
                                                icon={<VpnKeyOutlined sx={{fontSize: 18}}/>} formik={formik}
                                                showToggle showPassword={showPassword} onTogglePassword={() => setShowPassword(!showPassword)}/>
                                            <LoadingButton type="submit" size="large" color="secondary"
                                                sx={{textTransform: 'none', py: 1.5, fontWeight: 600, fontSize: '1rem'}}
                                                endIcon={<ArrowRightAlt/>} loading={authLoading} fullWidth variant="contained" disableElevation>
                                                {authLoading ? 'Verifying...' : 'Verify OTP'}
                                            </LoadingButton>
                                            <Divider/>
                                            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                                <LockOutlined sx={{color: 'text.disabled', fontSize: 18}}/>
                                                <Typography variant="body2" sx={{color: 'text.secondary'}}>Your data is encrypted and secure</Typography>
                                            </Stack>
                                        </Stack>
                                    </form>
                                </CardContent>
                            </Card>
                        </Stack>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    );
};

export default VerifyOtpPage;
