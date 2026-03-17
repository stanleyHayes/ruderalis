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
import {KeyboardArrowLeft, KeyboardArrowRightOutlined} from "@mui/icons-material";

const ContactInformation = ({next}) => {
    const {authData} = useSelector(selectAuth);
    const firstName = authData?.firstName || '';
    const lastName = authData?.lastName || '';
    const email = authData?.email || '';
    const phone = authData?.phone || '';

    const formik = useFormik({
        initialValues: {firstName, lastName, email, phone},
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

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
        },
    };

    return (
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={4}>
                    <Box>
                        <Typography
                            variant="h6"
                            sx={{color: 'text.primary', fontWeight: 600, mb: 1}}>
                            Contact Information
                        </Typography>
                        <Typography variant="body2" sx={{color: 'text.secondary', mb: 3}}>
                            We'll use this information to keep you updated on your order
                        </Typography>

                        <Stack spacing={3}>
                            <Grid container spacing={3}>
                                <Grid size={{xs: 12, md: 6}}>
                                    <FormControl variant="outlined" fullWidth sx={inputSx}>
                                        <InputLabel htmlFor="firstName">First Name</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            value={formik.values.firstName}
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="First name"
                                            required
                                            label="First Name"
                                            size="medium"
                                            margin="dense"
                                            notched
                                        />
                                        {formik.touched.firstName && formik.errors.firstName && (
                                            <FormHelperText error>{formik.errors.firstName}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                                <Grid size={{xs: 12, md: 6}}>
                                    <FormControl variant="outlined" fullWidth sx={inputSx}>
                                        <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                        <OutlinedInput
                                            fullWidth
                                            value={formik.values.lastName}
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Last name"
                                            required
                                            label="Last Name"
                                            size="medium"
                                            margin="dense"
                                            notched
                                        />
                                        {formik.touched.lastName && formik.errors.lastName && (
                                            <FormHelperText error>{formik.errors.lastName}</FormHelperText>
                                        )}
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <FormControl variant="outlined" fullWidth sx={inputSx}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    value={formik.values.email}
                                    id="email"
                                    name="email"
                                    type="email"
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter email"
                                    required
                                    label="Email"
                                    size="medium"
                                    margin="dense"
                                    notched
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                                )}
                            </FormControl>

                            <FormControl variant="outlined" fullWidth sx={inputSx}>
                                <InputLabel htmlFor="phone">Phone</InputLabel>
                                <OutlinedInput
                                    fullWidth
                                    value={formik.values.phone}
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter phone"
                                    required
                                    label="Phone"
                                    size="medium"
                                    margin="dense"
                                    notched
                                />
                                {formik.touched.phone && formik.errors.phone && (
                                    <FormHelperText error>{formik.errors.phone}</FormHelperText>
                                )}
                            </FormControl>
                        </Stack>
                    </Box>

                    <Stack direction={{xs: 'column-reverse', md: 'row'}} justifyContent="space-between" spacing={2}>
                        <Button
                            onClick={() => navigate(-1)}
                            variant="text"
                            color="secondary"
                            startIcon={<KeyboardArrowLeft/>}
                            size="large"
                            sx={{textTransform: 'none'}}>
                            Back to cart
                        </Button>
                        <Button
                            onClick={formik.handleSubmit}
                            disableElevation
                            variant="contained"
                            color="secondary"
                            endIcon={<KeyboardArrowRightOutlined/>}
                            size="large"
                            sx={{textTransform: 'none', fontWeight: 600}}>
                            Continue to Delivery
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
};

export default ContactInformation;
