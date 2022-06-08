import {
    Alert,
    AlertTitle,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    LinearProgress,
    OutlinedInput,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import logo from "./../../assets/images/logo.png";
import loginLogo from "./../../assets/images/login-background-smoke.jpg";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {Link} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import Overlay from "../../components/shared/overlay";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";

const ResendOTPPAge = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {authLoading, authError, authMessage} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const formik = useFormik({
        initialValues: {
            usernameOrEmailOrPhone: '',
        },
        onSubmit: (values, {resetForm, setSubmitting}) => {
            dispatch(AUTH_ACTION_CREATORS.resendOTP({values, navigate, resetForm, showMessage, setSubmitting}));
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            usernameOrEmailOrPhone: yup.string().required('usernameOrEmailOrPhone required'),
        })
    });

    const theme = useTheme();

    return (
        <Box
            sx={{
                maxWidth: '100vw',
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                overflow: 'hidden'
            }}>
            <Box sx={{display: {xs: 'none', lg: 'block'}, flex: 1, maxHeight: '100vh'}}>
                <Overlay
                    image={
                        <img
                            style={{
                                maxHeight: '100vh',
                                width: '100%',
                                height: '100vh',
                                objectFit: 'cover',
                                objectPosition: 'center'
                            }}
                            alt=""
                            src={loginLogo}
                        />
                    }
                    children={
                        <Box
                            sx={{
                                height: '100vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'rgba(0, 0, 0, 0.45)',
                            }}>
                            <Container>
                                <Typography
                                    sx={{color: 'white'}}
                                    align="center"
                                    variant="h2">
                                    <span style={{color: theme.palette.secondary.main}}>Sons</span>{' '}
                                    and{' '}
                                    <span style={{color: theme.palette.secondary.main}}>Daughters</span>
                                    {' '}of the{' '}
                                    <span style={{color: theme.palette.secondary.main}}>most High</span>
                                </Typography>

                                <Typography
                                    sx={{color: 'white', mb: 2}}
                                    align="center"
                                    variant="h6">
                                    Get as high as your father in heaven.
                                </Typography>
                                <Typography
                                    sx={{color: 'white'}}
                                    align="center"
                                    variant="body1">
                                    Order through Ruderalis
                                </Typography>
                            </Container>
                        </Box>
                    }
                />
            </Box>
            <Box sx={{flex: 1, display: 'flex', alignItems: 'center'}}>
                <Container>
                    <Grid container={true} justifyContent="center">
                        <Grid item={true} xs={12} lg={8}>
                            <Stack
                                sx={{py: 4}}
                                direction="column"
                                justifyContent="space-between"
                                spacing={2}>
                                <Grid
                                    spacing={1}
                                    container={true}
                                    alignItems="center">
                                    <Grid item={true} xs={12} md="auto">
                                        <Stack alignItems="center" direction="row" spacing={2}>
                                            <Link to="/" style={{textDecoration: 'none'}}>
                                                <img
                                                    src={logo}
                                                    style={{
                                                        width: 50,
                                                        height: 50,
                                                        objectFit: 'contain',
                                                        objectPosition: 'center'
                                                    }}
                                                    alt="Ruderalis Logo"
                                                />
                                            </Link>
                                            <Link to="/" style={{textDecoration: 'none'}}>
                                                <Typography
                                                    sx={{color: 'text.primary'}}
                                                    fontFamily="EuclidCircularB"
                                                    variant="h4">Ruderalis</Typography>
                                            </Link>
                                        </Stack>
                                    </Grid>
                                    <Grid item={true} md="auto">
                                        <Divider variant="fullWidth" orientation="vertical"/>
                                    </Grid>
                                    <Grid item={true} xs={12} md="auto">
                                        <Typography variant="body1" sx={{color: 'secondary.main'}}>
                                            The safest way to Nevada
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <form autoComplete="off" onSubmit={formik.handleSubmit}>
                                    <Stack direction="column" spacing={2}>
                                        <Card
                                            elevation={1}
                                            sx={{
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                            }}>
                                            {authLoading && <LinearProgress variant="query" color="secondary"/>}
                                            <CardContent>
                                                <Stack direction="column" spacing={2}>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="h3" sx={{color: 'secondary.main'}}>
                                                            Resend
                                                        </Typography>
                                                        <Typography variant="h3" sx={{color: 'text.primary'}}>
                                                            OTP
                                                        </Typography>
                                                    </Stack>
                                                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                                        Enter your email to receive otp
                                                    </Typography>
                                                    {authError && (
                                                        <Alert
                                                            sx={{
                                                                borderTopRightRadius: 32,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 32,
                                                                borderTopLeftRadius: 32,
                                                            }} severity="error">
                                                            <AlertTitle>{authError}</AlertTitle>
                                                        </Alert>
                                                    )}

                                                    {authMessage && (
                                                        <Alert
                                                            sx={{
                                                                borderTopRightRadius: 32,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 32,
                                                                borderTopLeftRadius: 32,
                                                            }}
                                                            severity="error">
                                                            <AlertTitle>{authMessage}</AlertTitle>
                                                        </Alert>
                                                    )}

                                                    <Box>
                                                        <FormControl fullWidth={true} variant="outlined">
                                                            <InputLabel
                                                                htmlFor="usernameOrEmailOrPhone">Email/Username/Phone</InputLabel>
                                                            <OutlinedInput
                                                                fullWidth={true}
                                                                sx={{
                                                                    borderTopRightRadius: 32,
                                                                    borderBottomRightRadius: 0,
                                                                    borderBottomLeftRadius: 32,
                                                                    borderTopLeftRadius: 32,
                                                                }}
                                                                value={formik.values.usernameOrEmailOrPhone}
                                                                id="usernameOrEmailOrPhone"
                                                                name="usernameOrEmailOrPhone"
                                                                type="text"
                                                                error={formik.touched.usernameOrEmailOrPhone && formik.errors.usernameOrEmailOrPhone}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Enter username or email or phone"
                                                                required={true}
                                                                label="Email/Username/Phone"
                                                                size="medium"
                                                                margin="dense"
                                                            />
                                                            {formik.touched.usernameOrEmailOrPhone && formik.errors.usernameOrEmailOrPhone && (
                                                                <FormHelperText
                                                                    error={true}>
                                                                    {formik.errors.usernameOrEmailOrPhone}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Box>

                                                    <LoadingButton
                                                        type="submit"
                                                        size="large"
                                                        color="secondary"
                                                        sx={{
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                            textTransform: 'capitalize',
                                                            py: 1.2
                                                        }}
                                                        loadingPosition="start"
                                                        startIcon={authLoading ?
                                                            <CircularProgress color="secondary"/> : null}
                                                        loadingIndicator={authLoading ?
                                                            <CircularProgress color="secondary"/> : null}
                                                        loading={authLoading}
                                                        fullWidth={true}
                                                        variant="contained"
                                                        disableElevation={true}>
                                                        {authLoading ? 'Logging In...' : 'Login'}
                                                    </LoadingButton>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Stack>
                                </form>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default ResendOTPPAge;