import Layout from "../../components/layout/layout";
import {
    Box, Button,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import {KeyboardArrowLeft, LocationCityOutlined, MailOutline, Person2Outlined} from "@mui/icons-material";
import * as yup from "yup";
import {useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {useNavigate} from "react-router";

const PaymentPage = () => {

    const {authData: {name, email, phone}} = useSelector(selectAuth);

    const formik = useFormik({
        initialValues: {
            name, email, phone
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Name field required"),
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

    return (
        <Layout>
            <Box>
                <Container>
                    <Box>
                        <Typography variant="h4" sx={{color: "text.primary"}}>
                            Payment
                        </Typography>

                        <Box>
                            <form onSubmit={formik.handleSubmit}>
                                <Stack spacing={4}>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{color: "text.secondary"}}>
                                            Contact Information
                                        </Typography>

                                        <Box>
                                            <FormControl variant="outlined" fullWidth={true}>
                                                <InputLabel
                                                    htmlFor="email">Email</InputLabel>
                                                <OutlinedInput
                                                    fullWidth={true}
                                                    sx={{}}
                                                    startAdornment={
                                                        <MailOutline
                                                            sx={{
                                                                backgroundColor: 'light.secondary',
                                                                color: 'secondary.main',
                                                                padding: 0.4,
                                                                fontSize: 20,
                                                                borderTopRightRadius: 8,
                                                                borderBottomRightRadius: 2,
                                                                borderBottomLeftRadius: 8,
                                                                borderTopLeftRadius: 2,
                                                                mr: 1,
                                                            }} color="secondary"
                                                        />
                                                    }
                                                    value={formik.values.email}
                                                    id="email"
                                                    name="email"
                                                    type="text"
                                                    error={formik.touched.email && formik.errors.email}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter email"
                                                    required={true}
                                                    label="Email"
                                                    size="medium"
                                                    margin="dense"
                                                    notched={true}
                                                />
                                                {formik.touched.email && formik.errors.email && (
                                                    <FormHelperText
                                                        error={true}>
                                                        {formik.errors.email}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{color: "text.secondary"}}>
                                            Shipping address
                                        </Typography>

                                        <Box>
                                            <Stack spacing={2}>
                                                <Box>
                                                    <Grid container={true} spacing={2}>
                                                        <Grid item={true} xs={12} md={6}>
                                                            <FormControl variant="outlined" fullWidth={true}>
                                                                <InputLabel
                                                                    htmlFor="firstName">First name</InputLabel>
                                                                <OutlinedInput
                                                                    fullWidth={true}
                                                                    sx={{}}
                                                                    startAdornment={
                                                                        <Person2Outlined
                                                                            sx={{
                                                                                backgroundColor: 'light.secondary',
                                                                                color: 'secondary.main',
                                                                                padding: 0.4,
                                                                                fontSize: 20,
                                                                                borderTopRightRadius: 8,
                                                                                borderBottomRightRadius: 2,
                                                                                borderBottomLeftRadius: 8,
                                                                                borderTopLeftRadius: 2,
                                                                                mr: 1,
                                                                            }} color="secondary"
                                                                        />
                                                                    }
                                                                    value={formik.values.firstName}
                                                                    id="firstName"
                                                                    name="firstName"
                                                                    type="text"
                                                                    error={formik.touched.firstName && formik.errors.firstName}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    placeholder="First name"
                                                                    required={true}
                                                                    label="First Name"
                                                                    size="medium"
                                                                    margin="dense"
                                                                    notched={true}
                                                                />
                                                                {formik.touched.email && formik.errors.email && (
                                                                    <FormHelperText
                                                                        error={true}>
                                                                        {formik.errors.email}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item={true} xs={12} md={6}>
                                                            <FormControl variant="outlined" fullWidth={true}>
                                                                <InputLabel
                                                                    htmlFor="lastName">Last name</InputLabel>
                                                                <OutlinedInput
                                                                    fullWidth={true}
                                                                    sx={{}}
                                                                    startAdornment={
                                                                        <Person2Outlined
                                                                            sx={{
                                                                                backgroundColor: 'light.secondary',
                                                                                color: 'secondary.main',
                                                                                padding: 0.4,
                                                                                fontSize: 20,
                                                                                borderTopRightRadius: 8,
                                                                                borderBottomRightRadius: 2,
                                                                                borderBottomLeftRadius: 8,
                                                                                borderTopLeftRadius: 2,
                                                                                mr: 1,
                                                                            }} color="secondary"
                                                                        />
                                                                    }
                                                                    value={formik.values.lastName}
                                                                    id="lastName"
                                                                    name="lastName"
                                                                    type="text"
                                                                    error={formik.touched.lastName && formik.errors.lastName}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    placeholder="Last name"
                                                                    required={true}
                                                                    label="Last Name"
                                                                    size="medium"
                                                                    margin="dense"
                                                                    notched={true}
                                                                />
                                                                {formik.touched.lastName && formik.errors.lastName && (
                                                                    <FormHelperText
                                                                        error={true}>
                                                                        {formik.errors.lastName}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                                <Box>
                                                    <FormControl variant="outlined" fullWidth={true}>
                                                        <InputLabel
                                                            htmlFor="address">Address</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth={true}
                                                            sx={{}}
                                                            startAdornment={
                                                                <Person2Outlined
                                                                    sx={{
                                                                        backgroundColor: 'light.secondary',
                                                                        color: 'secondary.main',
                                                                        padding: 0.4,
                                                                        fontSize: 20,
                                                                        borderTopRightRadius: 8,
                                                                        borderBottomRightRadius: 2,
                                                                        borderBottomLeftRadius: 8,
                                                                        borderTopLeftRadius: 2,
                                                                        mr: 1,
                                                                    }} color="secondary"
                                                                />
                                                            }
                                                            value={formik.values.address}
                                                            id="address"
                                                            name="address"
                                                            type="text"
                                                            error={formik.touched.address && formik.errors.address}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Address"
                                                            required={true}
                                                            label="Address"
                                                            size="medium"
                                                            margin="dense"
                                                            notched={true}
                                                        />
                                                        {formik.touched.address && formik.errors.address && (
                                                            <FormHelperText
                                                                error={true}>
                                                                {formik.errors.address}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                </Box>
                                                <Box>
                                                    <Grid container={true} spacing={2}>
                                                        <Grid item={true} xs={12} md={6}>
                                                            <FormControl variant="outlined" fullWidth={true}>
                                                                <InputLabel
                                                                    htmlFor="city">City</InputLabel>
                                                                <OutlinedInput
                                                                    fullWidth={true}
                                                                    sx={{}}
                                                                    startAdornment={
                                                                        <LocationCityOutlined
                                                                            sx={{
                                                                                backgroundColor: 'light.secondary',
                                                                                color: 'secondary.main',
                                                                                padding: 0.4,
                                                                                fontSize: 20,
                                                                                borderTopRightRadius: 8,
                                                                                borderBottomRightRadius: 2,
                                                                                borderBottomLeftRadius: 8,
                                                                                borderTopLeftRadius: 2,
                                                                                mr: 1,
                                                                            }} color="secondary"
                                                                        />
                                                                    }
                                                                    value={formik.values.city}
                                                                    id="city"
                                                                    name="city"
                                                                    type="text"
                                                                    error={formik.touched.city && formik.errors.city}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    placeholder="City"
                                                                    required={true}
                                                                    label="City"
                                                                    size="medium"
                                                                    margin="dense"
                                                                    notched={true}
                                                                />
                                                                {formik.touched.city && formik.errors.city && (
                                                                    <FormHelperText
                                                                        error={true}>
                                                                        {formik.errors.city}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                        <Grid item={true} xs={12} md={6}>
                                                            <FormControl variant="outlined" fullWidth={true}>
                                                                <InputLabel
                                                                    htmlFor="region">Region</InputLabel>
                                                                <OutlinedInput
                                                                    fullWidth={true}
                                                                    sx={{}}
                                                                    startAdornment={
                                                                        <Person2Outlined
                                                                            sx={{
                                                                                backgroundColor: 'light.secondary',
                                                                                color: 'secondary.main',
                                                                                padding: 0.4,
                                                                                fontSize: 20,
                                                                                borderTopRightRadius: 8,
                                                                                borderBottomRightRadius: 2,
                                                                                borderBottomLeftRadius: 8,
                                                                                borderTopLeftRadius: 2,
                                                                                mr: 1,
                                                                            }} color="secondary"
                                                                        />
                                                                    }
                                                                    value={formik.values.region}
                                                                    id="region"
                                                                    name="region"
                                                                    type="text"
                                                                    error={formik.touched.region && formik.errors.region}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    placeholder="Region"
                                                                    required={true}
                                                                    label="Region"
                                                                    size="medium"
                                                                    margin="dense"
                                                                    notched={true}
                                                                />
                                                                {formik.touched.region && formik.errors.region && (
                                                                    <FormHelperText
                                                                        error={true}>
                                                                        {formik.errors.region}
                                                                    </FormHelperText>
                                                                )}
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </Stack>
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Grid
                                            container={true}
                                            spacing={2}
                                            justifyContent="center"
                                            alignItems="center">
                                            <Grid item={true} xs={12} md="auto">
                                                <Button
                                                    onClick={() => navigate(-1)}
                                                    fullWidth={true}
                                                    variant="text"
                                                    startIcon={<KeyboardArrowLeft color="secondary"/>}
                                                    size="small"
                                                    sx={{}}>
                                                    Back to cart
                                                </Button>
                                            </Grid>
                                            <Grid item={true} xs={12} md="auto">
                                                <Button
                                                    fullWidth={true}
                                                    variant="text"
                                                    startIcon={<KeyboardArrowLeft/>}
                                                    size="small"
                                                    sx={{}}>
                                                    Continue to Shipping
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Stack>
                            </form>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </Layout>
    )
}

export default PaymentPage;