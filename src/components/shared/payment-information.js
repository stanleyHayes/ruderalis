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
import {useFormik} from "formik";
import * as yup from "yup";
import {
    KeyboardArrowLeft,
    KeyboardArrowRightOutlined,
    LocationCityOutlined,
    Person2Outlined
} from "@mui/icons-material";

const PaymentInformation = ({previous}) => {

    const formik = useFormik({
        initialValues: {
            network: "",
            code: "",
            number: ""
        },
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: yup.object().shape({
            network: yup.string().oneOf("MTN", "VODAFONE", "AITEL_TIGO").required('Network required'),
            code: yup.string().oneOf("024", "054", "055", "059", "053", "020", "050", "027", "057").required('Network code required'),
            number: yup.string().required('Number required'),
        })
    })

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Box>
                    <Typography
                        variant="h6"
                        sx={{color: "text.secondary", mb: 3}}>
                        Payment Information
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
                                Pay Now
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </Box>
    )
}

export default PaymentInformation;