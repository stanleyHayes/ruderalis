import {
    Box,
    Button, Checkbox,
    FormControl, FormControlLabel,
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
    console.log(address)

    const formik = useFormik({
        initialValues: {
            region: address?.region,
            city: address?.city,
            street: address?.street,
            gpAddressOrHouseNumber: address?.gpAddressOrHouseNumber,
            landmark: address?.landmark
        },
        validationSchema: yup.object().shape({
            region: yup.string().required("Region field required"),
            city: yup.string().required("City field required"),
            street: yup.string().required("Street field required"),
            gpAddressOrHouseNumber: yup.string(),
            landmark: yup.string(),
        }),
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (values) => {
            console.log(values);
            next();
        }
    });

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
                                <Grid container={true} spacing={4}>
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
                                </Grid>
                            </Box>
                            <Box>
                                <FormControl variant="outlined" fullWidth={true}>
                                    <InputLabel htmlFor="street">Address</InputLabel>
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
                                        value={formik.values.street}
                                        id="street"
                                        name="street"
                                        type="text"
                                        error={formik.touched.street && formik.errors.street}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Street"
                                        required={true}
                                        label="Street"
                                        size="medium"
                                        margin="dense"
                                        notched={true}
                                    />
                                    {formik.touched.street && formik.errors.street && (
                                        <FormHelperText
                                            error={true}>
                                            {formik.errors.street}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Box>
                            <Box>
                                <Grid container={true} spacing={4}>
                                    <Grid item={true} xs={12} md={6}>
                                        <FormControl variant="outlined" fullWidth={true}>
                                            <InputLabel htmlFor="ghanaPostAddress">Ghana Post Address</InputLabel>
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
                                            <InputLabel htmlFor="landmark">Landmark</InputLabel>
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
                                                value={formik.values.landmark}
                                                id="landmark"
                                                name="landmark"
                                                type="text"
                                                error={formik.touched.landmark && formik.errors.landmark}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                placeholder="Landmark"
                                                required={true}
                                                label="Landmark"
                                                size="medium"
                                                margin="dense"
                                                notched={true}
                                            />
                                            {formik.touched.landmark && formik.errors.landmark && (
                                                <FormHelperText
                                                    error={true}>
                                                    {formik.errors.landmark}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            {!address && (
                                <FormControl>
                                    <FormControlLabel
                                        control={<Checkbox/>}
                                        label={<Typography sx={{color: "text.secondary"}} variant="body1">Save address for future use?</Typography>}
                                    />
                                </FormControl>
                            )}
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
                        </Stack>
                    </Box>
                </Box>
            </form>
        </Box>
    )
}

export default ShippingInformation;