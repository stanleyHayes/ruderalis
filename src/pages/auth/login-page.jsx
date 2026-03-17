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
import {ArrowRightAlt, EmailOutlined, LockOutlined} from "@mui/icons-material";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import {motion} from 'framer-motion';
import {fadeUp} from '../../utils/animations';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authLoading, authError, authMessage} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    };

    const formik = useFormik({
        initialValues: {
            usernameOrEmailOrPhone: '',
            password: '',
        },
        onSubmit: (values, {resetForm, setSubmitting}) => {
            dispatch(AUTH_ACTION_CREATORS.login({values, navigate, resetForm, showMessage, setSubmitting}));
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            usernameOrEmailOrPhone: yup.string().required('usernameOrEmailOrPhone required'),
            password: yup.string().required('Password required'),
        })
    });

    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box sx={{maxWidth: '100vw', display: 'flex', minHeight: '100vh', overflow: 'hidden'}}>
            <AuthArtwork variant="login"/>

            {/* Right Side - Form */}
            <Box sx={{flex: 1, bgcolor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto'}}>
                <Container maxWidth="sm">
                    <motion.div {...fadeUp}>
                        <Stack direction="column" spacing={4} sx={{py: 4}}>
                            {/* Logo + Brand */}
                            <Stack alignItems="center" direction="row" spacing={2}>
                                <Link to="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
                                    <img src={logo} style={{width: 48, height: 48, objectFit: 'contain', objectPosition: 'center'}} alt="Ruderalis Logo"/>
                                </Link>
                                <Link to="/" style={{textDecoration: 'none'}}>
                                    <Typography sx={{color: 'text.primary', fontWeight: 600}}  variant="h5">
                                        Ruderalis
                                    </Typography>
                                </Link>
                            </Stack>

                            {/* Title */}
                            <Box>
                                <Typography variant="h4" sx={{color: 'text.primary',  fontWeight: 700}}>
                                    Sign{' '}<Box component="span" sx={{color: 'secondary.main'}}>In</Box>
                                </Typography>
                                <Typography variant="body2" sx={{color: 'text.secondary', mt: 1}}>
                                    Don't have an account?{' '}
                                    <Typography component={Link} to="/auth/register" variant="body2"
                                        sx={{color: 'secondary.main', textDecoration: 'none', fontWeight: 700, cursor: 'pointer'}}>
                                        Sign Up
                                    </Typography>
                                </Typography>
                            </Box>

                            {/* Form Card */}
                            <Card variant="outlined" elevation={0}>
                                <Box sx={{height: 3, bgcolor: 'secondary.main'}}/>
                                {authLoading && <LinearProgress variant="query" color="secondary"/>}
                                <CardContent sx={{p: {xs: 3, md: 4}}}>
                                    <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                        <Grid container spacing={3}>
                                            {authError && (
                                                <Grid size={{xs: 12}}>
                                                    <Alert severity="error" variant="outlined"><AlertTitle>{authError}</AlertTitle></Alert>
                                                </Grid>
                                            )}
                                            {authMessage && (
                                                <Grid size={{xs: 12}}>
                                                    <Alert severity="info" variant="outlined"><AlertTitle>{authMessage}</AlertTitle></Alert>
                                                </Grid>
                                            )}

                                            <Grid size={{xs: 12}}>
                                                <AuthField name="usernameOrEmailOrPhone" label="Email / Username / Phone"
                                                    placeholder="Enter username, email or phone"
                                                    icon={<EmailOutlined sx={{fontSize: 18}}/>} formik={formik}/>
                                            </Grid>

                                            <Grid size={{xs: 12}}>
                                                <AuthField name="password" label="Password" placeholder="Enter password"
                                                    icon={<LockOutlined sx={{fontSize: 18}}/>} formik={formik}
                                                    showToggle showPassword={showPassword}
                                                    onTogglePassword={() => setShowPassword(!showPassword)}/>
                                            </Grid>

                                            <Grid size={{xs: 12}}>
                                                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                                                    <Typography component={Link} to="/auth/forgot-password" variant="body2"
                                                        sx={{color: 'secondary.main', textDecoration: 'none', fontWeight: 600, cursor: 'pointer',
                                                            '&:hover': {textDecoration: 'underline'}}}>
                                                        Forgot password?
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                            <Grid size={{xs: 12}}>
                                                <LoadingButton type="submit" size="large" color="secondary"
                                                    sx={{textTransform: 'none', py: 1.5,  fontWeight: 600, fontSize: '1rem'}}
                                                    endIcon={<ArrowRightAlt/>} loading={authLoading} fullWidth variant="contained" disableElevation>
                                                    {authLoading ? 'Signing in...' : 'Sign In'}
                                                </LoadingButton>
                                            </Grid>

                                            <Grid size={{xs: 12}}>
                                                <Divider/>
                                            </Grid>

                                            <Grid size={{xs: 12}}>
                                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                                    <LockOutlined sx={{color: 'text.disabled', fontSize: 18}}/>
                                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                        Your data is encrypted and secure
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
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

export default LoginPage;
