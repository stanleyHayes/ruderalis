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
    useTheme
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

const ResetPasswordPage = () => {

    const formik = useFormik({
        initialValues: {
            confirmPassword: '',
            password: '',
            currentPassword: ''
        },
        onSubmit: (values, formikHelpers) => {
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            currentPassword: yup.string().required('Password required'),
            password: yup.string().required('Password required'),
            confirmPassword: yup.string().required('Field required').oneOf([yup.ref('password'), null], 'Passwords must match')
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
                                        Choose a strong password to secure your account
                                    </Typography>

                                    <Card
                                        elevation={1}
                                        sx={{
                                            borderTopRightRadius: 16,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 16,
                                            borderTopLeftRadius: 16,
                                        }}>
                                        <CardContent>
                                            <Box>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel shrink={true} htmlFor="currentPassword">Current
                                                        Password</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true}
                                                        sx={{}}
                                                        value={formik.values.currentPassword}
                                                        id="currentPassword"
                                                        name="currentPassword"
                                                        type={showPassword ? 'text' : 'password'}
                                                        helperText={formik.touched.currentPassword && formik.errors.currentPassword}
                                                        error={formik.touched.currentPassword && formik.errors.currentPassword}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter current password"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                {showPassword ?
                                                                    <VisibilityOff
                                                                        onClick={() => setShowPassword(false)}
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                        }}
                                                                    /> :
                                                                    <Visibility
                                                                        onClick={() => setShowPassword(true)}
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                        }}
                                                                    />}
                                                            </InputAdornment>
                                                        }
                                                        notched={true}
                                                        required={true}
                                                        label="Username"
                                                        size="medium"
                                                        margin="dense"
                                                    />
                                                    {formik.touched.currentPassword && formik.errors.currentPassword && (
                                                        <FormHelperText
                                                            error={true}>
                                                            {formik.errors.currentPassword}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Box>

                                            <Box>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel shrink={true} htmlFor="password">New
                                                        Password</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true}
                                                        sx={{}}
                                                        id="password"
                                                        value={formik.values.password}
                                                        name="password"
                                                        notched={true}
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                {showPassword ?
                                                                    <VisibilityOff
                                                                        onClick={() => setShowPassword(false)}
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                        }}
                                                                    /> :
                                                                    <Visibility
                                                                        onClick={() => setShowPassword(true)}
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                        }}
                                                                    />}
                                                            </InputAdornment>
                                                        }
                                                        helperText={formik.touched.password && formik.errors.password}
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

                                            <Box>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel shrink={true} htmlFor="confirmPassword">Confirm
                                                        Password</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true}
                                                        In
                                                        sx={{}}
                                                        id="confirmPassword"
                                                        value={formik.values.confirmPassword}
                                                        name="confirmPassword"
                                                        notched={true}
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                {showPassword ?
                                                                    <VisibilityOff
                                                                        onClick={() => setShowPassword(false)}
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                        }}
                                                                    /> :
                                                                    <Visibility
                                                                        onClick={() => setShowPassword(true)}
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                        }}
                                                                    />}
                                                            </InputAdornment>
                                                        }
                                                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                                        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Confirm Password"
                                                        required={true}
                                                        label="Confirm Password"
                                                        size="medium"
                                                        margin="dense"
                                                    />
                                                    {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                                        <FormHelperText
                                                            error={true}>
                                                            {formik.errors.confirmPassword}
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
                                                {formik.isSubmitting ? 'Resetting...' : 'Reset Password'}
                                            </LoadingButton>
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default ResetPasswordPage;