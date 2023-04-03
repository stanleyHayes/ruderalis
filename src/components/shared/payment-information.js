import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {KeyboardArrowLeft, KeyboardArrowRightOutlined, MailOutline} from "@mui/icons-material";
import {useNavigate} from "react-router";

const PaymentInformation = ({previous}) => {

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            network: "",
            code: "",
            number: ""
        },
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: yup.object({}).shape({
            network: yup.string().oneOf(["MTN", "VODAFONE", "AITEL_TIGO"])
                .required('Network required'),
            code: yup.string().oneOf(["024", "054", "055", "059", "053", "020", "050", "027", "057"])
                .required('Network code required'),
            number: yup.string().required('Number required'),
        }),
        onSubmit: (values) => {
            navigate('/checkout/order/confirmed')
        }
    })

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Typography
                    variant="h6"
                    sx={{color: "text.secondary", mb: 4}}>
                    Payment Information
                </Typography>

                <Stack spacing={4}>
                    <Box>

                        <FormControl variant="outlined" fullWidth={true}>
                            <InputLabel htmlFor="network">Network</InputLabel>
                            <Select
                                elevation={1}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.network}
                                error={Boolean(formik.touched.network && formik.errors.network)}
                                id="network"
                                name="network"
                                fullWidth={true}
                                required={true}
                                label="Network"
                                variant="outlined"
                                margin="none">
                                <MenuItem value="MTN">MTN</MenuItem>
                                <MenuItem value="VODAFONE">Vodafone</MenuItem>
                                <MenuItem value="AIRTEL_TIGO">AirtelTigo</MenuItem>
                            </Select>
                            {formik.touched.network && formik.errors.network && (
                                <FormHelperText
                                    error={true}>
                                    {formik.errors.network}
                                </FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <Box>
                        {formik.values.network && (
                            <Box>
                                {formik.values.network === "MTN" ? (
                                    <Box>
                                        <FormControl variant="outlined" fullWidth={true}>
                                            <InputLabel htmlFor="code">Code</InputLabel>
                                            <Select
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.code}
                                                error={Boolean(formik.touched.code && formik.errors.code)}
                                                name="code"
                                                fullWidth={true}
                                                required={true}
                                                variant="outlined"
                                                label="Code"
                                                margin="none">
                                                <MenuItem value="024">024</MenuItem>
                                                <MenuItem value="054">054</MenuItem>
                                                <MenuItem value="055">055</MenuItem>
                                                <MenuItem value="053">053</MenuItem>
                                                <MenuItem value="059">059</MenuItem>
                                            </Select>
                                            {formik.touched.code && formik.errors.code && (
                                                <FormHelperText
                                                    error={true}>
                                                    {formik.errors.code}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Box>
                                ) : formik.values.network === "VODAFONE" ? (
                                    <Box>
                                        <FormControl variant="outlined" fullWidth={true}>
                                            <InputLabel htmlFor="code">Code</InputLabel>
                                            <Select
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.code}
                                                error={Boolean(formik.touched.code && formik.errors.code)}
                                                name="code"
                                                fullWidth={true}
                                                required={true}
                                                variant="outlined"
                                                label="Code"
                                                margin="none">
                                                <MenuItem value="024">020</MenuItem>
                                                <MenuItem value="054">050</MenuItem>
                                            </Select>
                                            {formik.touched.code && formik.errors.code && (
                                                <FormHelperText
                                                    error={true}>
                                                    {formik.errors.code}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Box>
                                ) : formik.values.network === "AIRTEL_TIGO" ? (
                                    <Box>
                                        <FormControl variant="outlined" fullWidth={true}>
                                            <InputLabel htmlFor="code">Code</InputLabel>
                                            <Select
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.code}
                                                error={Boolean(formik.touched.code && formik.errors.code)}
                                                name="code"
                                                id="code"
                                                fullWidth={true}
                                                required={true}
                                                variant="outlined"
                                                notched={true}
                                                label="Code"
                                                margin="none">
                                                <MenuItem value="024">027</MenuItem>
                                                <MenuItem value="054">057</MenuItem>
                                            </Select>
                                            {formik.touched.code && formik.errors.code && (
                                                <FormHelperText
                                                    error={true}>
                                                    {formik.errors.code}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Box>
                                ) : null}
                            </Box>
                        )}
                    </Box>
                    {formik.values.network && formik.values.code && (
                        <Box>
                            <FormControl variant="outlined" fullWidth={true}>
                                <InputLabel htmlFor="number">Phone</InputLabel>
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
                                    value={formik.values.number}
                                    id="number"
                                    name="number"
                                    type="tel"
                                    error={formik.touched.number && formik.errors.number}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter number without network code"
                                    required={true}
                                    label="Number"
                                    size="medium"
                                    margin="dense"
                                    notched={true}
                                />
                                {formik.touched.number && formik.errors.number && (
                                    <FormHelperText
                                        error={true}>
                                        {formik.errors.number}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        </Box>
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
                                    type="submit"
                                    disabled={!formik.isValid}
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
                </Stack>
            </form>
        </Box>
    )
}

export default PaymentInformation;