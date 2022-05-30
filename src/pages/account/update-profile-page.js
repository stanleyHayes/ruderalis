import Layout from "../../components/layout/layout";
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
    Grid,
    LinearProgress,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";

const UpdateProfilePage = () => {

    const {authLoading, authError, authData} = useSelector(selectAuth);
    const validationSchema = yup.object({
        firstName: yup.string().required('First name required'),
        lastName: yup.string().required('Last name required'),
        username: yup.string().required('Username required'),
        gender: yup.string().oneOf(['Male', 'Female']).required('Gender required'),
        email: yup.string().email('Enter a valid email').required('Email required'),
        phone: yup.string().phone("Enter a valid phone").required('Phone required'),
        address: yup.object().shape({
            country: yup.string().oneOf(['Ghana']).required('Country required'),
            region: yup.string().required('Country required'),
            city: yup.string().required('Country required'),
            street: yup.string().required('Country required'),
            gpAddressOrHouseNumber: yup.string().required('Country required'),
            landmark: yup.string().required('Country required'),
        })
    });

    const formik = useFormik({
        initialValues: {
            firstName: authData.firstName,
            lastName: authData.lastName,
            username: authData.username,
            email: authData.email,
            gender: authData.gender,
            phone: authData.phone,
            address: {
                country: authData.address.country,
                region: authData.address.region,
                city: authData.address.city,
                street: authData.address.street,
                gpAddressOrHouseNumber: authData.address.gpAddressOrHouseNumber,
                landmark: authData.address.landmark
            }
        },
        validationSchema,
        onSubmit: (values, formikHelpers) => {
        }
    });

    console.log(formik.errors)

    return (
        <Layout>
            {authLoading && <LinearProgress variant="query" color="secondary"/>}
            <Box sx={{py: 8}}>
                <Container>
                    <Typography variant="h4" sx={{color: 'text.primary'}}>Update Profile</Typography>
                    <Divider variant="fullWidth" sx={{my: 3}} light={true}/>
                    {authError && (
                        <Alert sx={{my: 2}} severity="error">
                            <AlertTitle>{authError}</AlertTitle>
                        </Alert>
                    )}
                    <Box>
                        <Grid container={true}>
                            <Grid item={true} xs={12} md={6}>
                                <Card
                                    sx={{
                                        borderTopRightRadius: 16,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 16,
                                        borderTopLeftRadius: 16
                                    }} elevation={1}>
                                    <CardContent>
                                        <form onSubmit={formik.handleSubmit}>
                                            <Stack direction="column" spacing={2}>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        size="medium"
                                                        type='text'
                                                        value={formik.values.firstName}
                                                        name="firstName"
                                                        id="firstName"
                                                        label="First Name"
                                                        variant="outlined"
                                                        error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter first name"
                                                        helperText={formik.touched.firstName && formik.errors.firstName}
                                                    />
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        value={formik.values.lastName}
                                                        label="Last Name"
                                                        variant="outlined"
                                                        size="medium"
                                                        type='text'
                                                        name="lastName"
                                                        id="lastName"
                                                        error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter first name"
                                                        helperText={formik.touched.lastName && formik.errors.lastName}
                                                    />
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        value={formik.values.email}
                                                        label="Email"
                                                        variant="outlined"
                                                        size="medium"
                                                        type='email'
                                                        name="email"
                                                        id="email"
                                                        error={Boolean(formik.touched.email && formik.errors.email)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter email"
                                                        helperText={formik.touched.email && formik.errors.email}
                                                    />
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        value={formik.values.phone}
                                                        label="Phone"
                                                        variant="outlined"
                                                        size="medium"
                                                        type='text'
                                                        name="phone"
                                                        id="phone"
                                                        error={Boolean(formik.touched.phone && formik.errors.phone)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter username"
                                                        helperText={formik.touched.phone && formik.errors.phone}
                                                    />
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        value={formik.values.username}
                                                        label="Username"
                                                        variant="outlined"
                                                        size="medium"
                                                        type='text'
                                                        name="username"
                                                        id="username"
                                                        error={Boolean(formik.touched.username && formik.errors.username)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter username"
                                                        helperText={formik.touched.username && formik.errors.username}
                                                    />
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        label="Gender"
                                                        select={true}
                                                        value={formik.values.gender}
                                                        variant="outlined"
                                                        size="medium"
                                                        type='text'
                                                        name="gender"
                                                        placeholder="Select gender"
                                                        id="gender"
                                                        error={Boolean(formik.touched.gender && formik.errors.gender)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched.gender && formik.errors.gender}>
                                                        <MenuItem value="Male">Male</MenuItem>
                                                        <MenuItem value="Female">Female</MenuItem>
                                                    </TextField>
                                                </FormControl>

                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        label="Country"
                                                        select={true}
                                                        variant="outlined"
                                                        size="medium"
                                                        value={formik.values.address.country}
                                                        type='text'
                                                        name="address.country"
                                                        placeholder="Select country"
                                                        id="gender"
                                                        error={Boolean(formik.touched?.address?.country && formik.errors?.address?.country)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        helperText={formik.touched?.address?.country && formik.errors?.address?.country}>
                                                        <MenuItem value="Ghana">Ghana</MenuItem>
                                                        <MenuItem value="Other">Other</MenuItem>
                                                    </TextField>
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        label="Region"
                                                        variant="outlined"
                                                        size="medium"
                                                        type='text'
                                                        value={formik.values.address.region}
                                                        name="address.region"
                                                        id="street"
                                                        error={Boolean(formik.touched?.address?.region && formik.errors?.address?.region)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter region"
                                                        helperText={formik.touched?.address?.region && formik.errors?.address?.region}
                                                    />
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        label="City"
                                                        value={formik.values.address.city}
                                                        variant="outlined"
                                                        size="medium"
                                                        type='text'
                                                        name="address.city"
                                                        id="city"
                                                        error={Boolean(formik.touched?.address?.city && formik.errors?.address?.city)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter city"
                                                        helperText={formik.touched?.address?.city && formik.errors?.address?.city}
                                                    />
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        value={formik.values.address.street}
                                                        label="Street"
                                                        variant="outlined"
                                                        size="medium"
                                                        type='text'
                                                        name="address.street"
                                                        id="street"
                                                        error={Boolean(formik.touched?.address?.street && formik.errors?.address?.street)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter street"
                                                        helperText={formik.touched?.address?.street && formik.errors?.address?.street}
                                                    />
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        label="GP Address or House Number"
                                                        variant="outlined"
                                                        size="medium"
                                                        type='text'
                                                        name="address.gpsAddressOrHouseNumber"
                                                        id="gpsAddressOrHouseNumber"
                                                        value={formik.values.address.gpAddressOrHouseNumber}
                                                        error={Boolean(formik.touched?.address?.gpAddressOrHouseNumber && formik.errors?.address?.gpAddressOrHouseNumber)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter Ghana Post Address or House Number"
                                                        helperText={formik.touched?.address?.gpAddressOrHouseNumber && formik.errors?.address?.gpAddressOrHouseNumber}
                                                    />
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <TextField
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        InputLabelProps={{shrink: true}}
                                                        label="Landmark"
                                                        variant="outlined"
                                                        size="medium"
                                                        type='text'
                                                        name="address.landmark"
                                                        value={formik.values.address.landmark}
                                                        id="landmark"
                                                        error={Boolean(formik.touched?.address?.landmark && formik.errors?.address?.landmark)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        placeholder="Enter username"
                                                        helperText={formik.touched?.address?.landmark && formik.errors?.address?.landmark}
                                                    />
                                                </FormControl>

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
                                            </Stack>
                                        </form>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Layout>
    )
}

export default UpdateProfilePage;