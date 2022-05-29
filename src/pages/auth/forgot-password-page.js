import {
    Box,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography, useTheme
} from "@mui/material";
import logo from "./../../assets/images/logo.png";
import loginLogo from "./../../assets/images/forgot-password-background.jpg";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {Link} from "react-router-dom";
import {LoadingButton} from "@mui/lab";
import Overlay from "../../components/shared/overlay";

const ForgotPasswordPage = () => {

    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        onSubmit: (values, formikHelpers) => {
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            phone: yup.string().phone('Enter a valid phone number').required('phone required'),
        })
    });

    const theme = useTheme();

    return (
        <Box
            sx={{
                maxWidth: '100vw',
                display: 'flex',
                minHeight: '100vh',
                backgroundColor: 'background.paper',
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
            <Box sx={{flex: 1}}>
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

                                <Stack direction="column" spacing={2}>

                                    <Stack direction="row" spacing={2}>
                                        <Typography variant="h3" sx={{color: 'secondary.main'}}>
                                            Reset
                                        </Typography>
                                        <Typography variant="h3" sx={{color: 'text.primary'}}>
                                            Password
                                        </Typography>
                                    </Stack>

                                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                        What's the phone number associated with your account?
                                    </Typography>

                                    <Box>
                                        <FormControl fullWidth={true} variant="outlined">
                                            <InputLabel htmlFor="phone">Phone</InputLabel>
                                            <OutlinedInput
                                                fullWidth={true}
                                                sx={{}}
                                                value={formik.values.phone}
                                                id="phone"
                                                name="phone"
                                                type="text"
                                                helperText={formik.touched.phone && formik.errors.phone}
                                                error={formik.touched.phone && formik.errors.phone}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="Enter phone"
                                                required={true}
                                                label="phone"
                                                size="medium"
                                                margin="dense"
                                            />
                                            {formik.touched.phone && formik.errors.phone && (
                                                <FormHelperText
                                                    error={true}>
                                                    {formik.errors.phone}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Box>

                                    <LoadingButton
                                        size="large"
                                        color="secondary"
                                        sx={{
                                            borderTopRightRadius: 16,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 16,
                                            borderTopLeftRadius: 16,
                                            textTransform: 'capitalize',
                                            py: 1.2
                                        }}
                                        loadingPosition="start"
                                        startIcon={formik.isSubmitting ?
                                            <CircularProgress color="secondary"/> : null}
                                        loadingIndicator={formik.isSubmitting ?
                                            <CircularProgress color="secondary"/> : null}
                                        loading={formik.isSubmitting}
                                        fullWidth={true}
                                        variant="contained"
                                        disableElevation={true}>
                                        {formik.isSubmitting ? 'Sending...' : 'Send reset message'}
                                    </LoadingButton>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default ForgotPasswordPage;