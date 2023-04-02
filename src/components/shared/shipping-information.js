import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {useFormik} from "formik";
import * as yup from "yup";
import {useNavigate} from "react-router";
import {
    KeyboardArrowLeft,
    KeyboardArrowRightOutlined,
    LocationCityOutlined,
    Person2Outlined
} from "@mui/icons-material";

const ShippingInformation = ({next, previous}) => {
    const {authData: {address}} = useSelector(selectAuth);

    const formik = useFormik({
        initialValues: {
            country: address.country,
            region: address.region,
            city: address.city,
            street: address.street,
            gpAddressOrHouseNumber: address.gpAddressOrHouseNumber,
            landmark: address.landmark
        },
        validationSchema: yup.object().shape({
            country: yup.string().required("First name field required"),
            region: yup.string().required("Last name field required"),
            city: yup.string().email("Invalid email").required("Email field required"),
            street: yup.string().required("Phone field required"),
            gpAddressOrHouseNumber: yup.string().required("Phone field required"),
            landmark: yup.string().required("Phone field required"),
        }),
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (values) => {
            console.log(values);
            next();
        }
    });

    const navigate = useNavigate();
    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{color: "text.secondary", mb: 3}}>
                        Shipping address
                    </Typography>

                    <Box>
                        <Stack spacing={4}>

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
                                <Grid container={true} spacing={4}>
                                    <Grid item={true} xs={12} md={6}>
                                        <FormControl variant="outlined" fullWidth={true}>
                                            <InputLabel
                                                htmlFor="ghanaPostAddress">Ghana Post Address</InputLabel>
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
                                                value={formik.values.ghanaPostAddress}
                                                id="ghanaPostAddress"
                                                name="ghanaPostAddress"
                                                type="text"
                                                error={formik.touched.ghanaPostAddress && formik.errors.ghanaPostAddress}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="Ghana Post Address"
                                                required={true}
                                                label="Ghana Post Address"
                                                size="medium"
                                                margin="dense"
                                                notched={true}
                                            />
                                            {formik.touched.ghanaPostAddress && formik.errors.ghanaPostAddress && (
                                                <FormHelperText
                                                    error={true}>
                                                    {formik.errors.ghanaPostAddress}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item={true} xs={12} md={6}>
                                        <FormControl variant="outlined" fullWidth={true}>
                                            <InputLabel
                                                htmlFor="suburb">Suburb</InputLabel>
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
                                                value={formik.values.suburb}
                                                id="suburb"
                                                name="suburb"
                                                type="text"
                                                error={formik.touched.suburb && formik.errors.suburb}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="Suburb"
                                                required={true}
                                                label="Suburb"
                                                size="medium"
                                                margin="dense"
                                                notched={true}
                                            />
                                            {formik.touched.suburb && formik.errors.suburb && (
                                                <FormHelperText
                                                    error={true}>
                                                    {formik.errors.suburb}
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
                        spacing={4}
                        justifyContent="space-between"
                        alignItems="center">
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                onClick={previous}
                                fullWidth={true}
                                variant="text"
                                color="secondary"
                                startIcon={<KeyboardArrowLeft color="secondary"/>}
                                size="large"
                                sx={{}}>
                                Back
                            </Button>
                        </Grid>
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                onClick={formik.handleSubmit}
                                disableElevation={true}
                                fullWidth={true}
                                variant="contained"
                                endIcon={<KeyboardArrowRightOutlined/>}
                                size="large"
                                sx={{fontWeight: 500}}>
                                Continue to Payment
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Box>
    )
}

export default ShippingInformation;