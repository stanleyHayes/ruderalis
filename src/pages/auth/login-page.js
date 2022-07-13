import {
    Box,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
    useTheme,
    Card, CardContent, LinearProgress, Alert, AlertTitle
} from "@mui/material";
import logo from "./../../assets/images/logo.png";
import loginLogo from "./../../assets/images/login-background-smoke.jpg";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {Link} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import Overlay from "../../components/shared/overlay";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";

const LoginPage = () => {

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
                                                            Sign
                                                        </Typography>
                                                        <Typography variant="h3" sx={{color: 'text.primary'}}>
                                                            In
                                                        </Typography>
                                                    </Stack>
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
                                                            }} severity="error">
                                                            <AlertTitle>{authMessage}</AlertTitle>
                                                        </Alert>
                                                    )}

                                                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                                        Don't have an account? {' '}
                                                        <Link
                                                            style={{
                                                                color: theme.palette.secondary.main,
                                                                textDecoration: 'none'
                                                            }}
                                                            to="/auth/register">
                                                            Sign Up
                                                        </Link>
                                                    </Typography>


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

                                                    <Box>
                                                        <FormControl fullWidth={true} variant="outlined">
                                                            <InputLabel htmlFor="password">Password</InputLabel>
                                                            <OutlinedInput
                                                                fullWidth={true}
                                                                id="password"
                                                                value={formik.values.password}
                                                                name="password"
                                                                sx={{
                                                                    borderTopRightRadius: 32,
                                                                    borderBottomRightRadius: 0,
                                                                    borderBottomLeftRadius: 32,
                                                                    borderTopLeftRadius: 32,
                                                                }}
                                                                type={showPassword ? 'text' : 'password'}
                                                                endAdornment={
                                                                    <InputAdornment
                                                                        sx={{
                                                                            borderTopRightRadius: 32,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 32,
                                                                            borderTopLeftRadius: 32
                                                                        }}
                                                                        position="end">
                                                                        {showPassword ?
                                                                            <VisibilityOff
                                                                                onClick={() => setShowPassword(false)}
                                                                                sx={{
                                                                                    borderTopRightRadius: 32,
                                                                                    borderBottomRightRadius: 0,
                                                                                    borderBottomLeftRadius: 32,
                                                                                    borderTopLeftRadius: 32,
                                                                                    cursor: 'pointer',
                                                                                    color: 'secondary.main',
                                                                                    backgroundColor: 'light.secondary',
                                                                                    borderRadius: '100%',
                                                                                    padding: 1,
                                                                                    fontSize: 24,
                                                                                }}
                                                                            /> :
                                                                            <Visibility
                                                                                onClick={() => setShowPassword(true)}
                                                                                sx={{
                                                                                    borderTopRightRadius: 32,
                                                                                    borderBottomRightRadius: 0,
                                                                                    borderBottomLeftRadius: 32,
                                                                                    borderTopLeftRadius: 32,
                                                                                    cursor: 'pointer',
                                                                                    backgroundColor: 'light.secondary',
                                                                                    color: 'secondary.main',
                                                                                    borderRadius: '100%',
                                                                                    padding: 1,
                                                                                    fontSize: 24,
                                                                                }}
                                                                            />}
                                                                    </InputAdornment>
                                                                }
                                                                error={formik.touched.password && formik.errors.password}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Enter password"
                                                                required={true}
                                                                label="Password"
                                                                size="medium"
                                                                margin="dense"
                                                            />
                                                            {formik.touched.password && formik.errors.password && (
                                                                <FormHelperText
                                                                    error={true}>
                                                                    {formik.errors.password}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Box>

                                                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                                        <Link
                                                            style={{
                                                                color: theme.palette.secondary.main,
                                                                textDecoration: 'none'
                                                            }}
                                                            to="/auth/forgot-password">
                                                            I forgot my password
                                                        </Link>
                                                    </Typography>

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

export default LoginPage;