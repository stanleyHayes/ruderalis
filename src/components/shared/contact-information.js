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
import {KeyboardArrowLeft, KeyboardArrowRightOutlined, MailOutline, Person2Outlined} from "@mui/icons-material";

const ContactInformation = ({next}) => {

    const {authData: {firstName, lastName, email, phone}} = useSelector(selectAuth);

    const formik = useFormik({
        initialValues: {
            firstName, lastName, email, phone
        },
        validationSchema: yup.object().shape({
            firstName: yup.string().required("First name field required"),
            lastName: yup.string().required("Last name field required"),
            email: yup.string().email("Invalid email").required("Email field required"),
            phone: yup.string().required("Phone field required")
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
                <Stack spacing={4}>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{color: "text.secondary", mb: 4}}>
                            Contact Information
                        </Typography>

                        <Box>
                            <Stack spacing={4}>
                                <Box>
                                    <Grid container={true} spacing={4}>
                                        <Grid item={true} xs={12} md={6}>
                                            <FormControl variant="outlined" fullWidth={true}>
                                                <InputLabel
                                                    htmlFor="firstName">First Name</InputLabel>
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
                                                {formik.touched.firstName && formik.errors.firstName && (
                                                    <FormHelperText
                                                        error={true}>
                                                        {formik.errors.firstName}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </Grid>
                                        <Grid item={true} xs={12} md={6}>
                                            <FormControl variant="outlined" fullWidth={true}>
                                                <InputLabel
                                                    htmlFor="lastName">Last Name</InputLabel>
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
                                                    placeholder="Last Name"
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
                                <FormControl variant="outlined" fullWidth={true}>
                                    <InputLabel
                                        htmlFor="phone">Phone</InputLabel>
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
                                        value={formik.values.phone}
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        error={formik.touched.phone && formik.errors.phone}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Enter phone"
                                        required={true}
                                        label="Phone"
                                        size="medium"
                                        margin="dense"
                                        notched={true}
                                    />
                                    {formik.touched.phone && formik.errors.phone && (
                                        <FormHelperText
                                            error={true}>
                                            {formik.errors.phone}
                                        </FormHelperText>
                                    )}
                                </FormControl>
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
                                    onClick={() => navigate(-1)}
                                    fullWidth={true}
                                    variant="text"
                                    color="secondary"
                                    startIcon={<KeyboardArrowLeft color="secondary"/>}
                                    size="large"
                                    sx={{}}>
                                    Back to cart
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
            </form>
        </Box>
    )
}

export default ContactInformation;