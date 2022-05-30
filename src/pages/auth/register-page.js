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
    MenuItem,
    OutlinedInput,
    Stack,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import logo from "./../../assets/images/logo.png";
import loginLogo from "../../assets/images/register-background-man.jpg";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {Link} from "react-router-dom";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import Overlay from "../../components/shared/overlay";

const RegisterPage = () => {

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            phone: '',
            gender: '',
            confirmPassword: ''
        },
        onSubmit: (values, formikHelpers) => {
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            firstName: yup.string().required('First name required'),
            lastName: yup.string().required('Last name required'),
            username: yup.string().required('username required'),
            password: yup.string().required('Password required'),
            confirmPassword: yup.string()
                .required('confirm password required')
                .oneOf([yup.ref('password'), null], 'Passwords must match'),
            phone: yup.string().phone('Enter valid phone number').required('Phone number required'),
            gender: yup.string().oneOf(['Male', 'Female']).required('Gender required'),
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
                                            Sign
                                        </Typography>
                                        <Typography variant="h3" sx={{color: 'text.primary'}}>
                                            Up
                                        </Typography>
                                    </Stack>

                                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                        Already have an account? {' '}
                                        <Link
                                            style={{color: theme.palette.secondary.main, textDecoration: 'none'}}
                                            to="/auth/login">
                                            Sign In
                                        </Link>
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
                                                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true}
                                                        sx={{}}
                                                        value={formik.values.firstName}
                                                        name="firstName"
                                                        type="text"
                                                        id="firstName"
                                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                                        error={formik.touched.firstName && formik.errors.firstName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter first name"
                                                        required={true}
                                                        label="First Name"
                                                        size="medium"
                                                        margin="dense"
                                                    />
                                                    {formik.touched.firstName && formik.errors.firstName && (
                                                        <FormHelperText
                                                            error={true}>
                                                            {formik.errors.firstName}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true}
                                                        sx={{}}
                                                        value={formik.values.lastName}
                                                        name="lastName"
                                                        id="lastName"
                                                        type="text"
                                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                                        error={formik.touched.lastName && formik.errors.lastName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter last name"
                                                        required={true}
                                                        label="Last Name"
                                                        size="medium"
                                                        margin="dense"
                                                    />
                                                    {formik.touched.lastName && formik.errors.lastName && (
                                                        <FormHelperText
                                                            error={true}>
                                                            {formik.errors.lastName}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel htmlFor="username">Username</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true}
                                                        sx={{}}
                                                        value={formik.values.username}
                                                        id="username"
                                                        name="username"
                                                        type="text"
                                                        helperText={formik.touched.username && formik.errors.username}
                                                        error={formik.touched.username && formik.errors.username}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter username"
                                                        required={true}
                                                        label="Username"
                                                        size="medium"
                                                        margin="dense"
                                                    />
                                                    {formik.touched.username && formik.errors.username && (
                                                        <FormHelperText
                                                            error={true}>
                                                            {formik.errors.username}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel htmlFor="phone">Phone</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true}
                                                        sx={{}}
                                                        value={formik.values.phone}
                                                        name="phone"
                                                        id="phone"
                                                        type="tel"
                                                        helperText={formik.touched.phone && formik.errors.phone}
                                                        error={formik.touched.phone && formik.errors.phone}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter phone"
                                                        required={true}
                                                        label="Phone"
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
                                            <Box>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <TextField
                                                        fullWidth={true}
                                                        sx={{}}
                                                        value={formik.values.gender}
                                                        name="gender"
                                                        id="gender"
                                                        select={true}
                                                        error={formik.touched.gender && formik.errors.gender}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        required={true}
                                                        label="Gender"
                                                        size="medium"
                                                        margin="dense">
                                                        <MenuItem value="">Select Gender</MenuItem>
                                                        <MenuItem value="Male">Male</MenuItem>
                                                        <MenuItem value="Female">Female</MenuItem>
                                                    </TextField>
                                                    {formik.touched.gender && formik.errors.gender && (
                                                        <FormHelperText
                                                            error={true}>
                                                            {formik.errors.gender}
                                                        </FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Box>
                                            <Box>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel htmlFor="password">Password</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true}
                                                        sx={{}}
                                                        id="password"
                                                        value={formik.values.password}
                                                        name="password"
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
                                                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true}
                                                        sx={{}}
                                                        id="confirmPassword"
                                                        value={formik.values.confirmPassword}
                                                        name="confirmPassword"
                                                        type={showPassword ? 'text' : 'password'}
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                {showPassword ?
                                                                    <VisibilityOff
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
                                                        placeholder="Confirm password"
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
                                                {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                                            </LoadingButton>
                                        </CardContent>
                                    </Card>
                                </Stack>

                                <Typography variant="body1" sx={{color: 'text.primary'}}>
                                    By registering, you agree to our {' '}
                                    <Link
                                        style={{
                                            color: theme.palette.secondary.main,
                                            textDecoration: 'none'
                                        }} to="/terms">Terms of Service</Link>,{' '}
                                    <Link
                                        style={{
                                            color: theme.palette.secondary.main,
                                            textDecoration: 'none'
                                        }} to="/privacy">Privacy
                                        Policy</Link> {' '} and our {' '}
                                    <Link
                                        style={{
                                            textDecoration: 'none',
                                            color: theme.palette.secondary.main
                                        }} to="/acceptable-use-policy">
                                        Acceptable Use Policy
                                    </Link>
                                </Typography>

                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}

export default RegisterPage;