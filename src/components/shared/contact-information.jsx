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
            next();
        }
    });

    const navigate = useNavigate();

    const field = (name, label, type = 'text', gridSize = {xs: 12}) => {
        const hasValue = Boolean(formik.values[name]);
        return (
            <Grid size={gridSize}>
                <FormControl variant="outlined" fullWidth
                    error={Boolean(formik.touched[name] && formik.errors[name])}>
                    <InputLabel shrink={hasValue || undefined} htmlFor={name}>{label}</InputLabel>
                    <OutlinedInput
                        fullWidth id={name} name={name} type={type}
                        value={formik.values[name]}
                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                        placeholder={label} required label={label}
                        size="medium" color="secondary"
                        notched={hasValue || undefined}
                    />
                    {formik.touched[name] && formik.errors[name] && (
                        <FormHelperText error>{formik.errors[name]}</FormHelperText>
                    )}
                </FormControl>
            </Grid>
        );
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

                        <Grid container spacing={3}>
                            {field('firstName', 'First Name', 'text', {xs: 12, md: 6})}
                            {field('lastName', 'Last Name', 'text', {xs: 12, md: 6})}
                            {field('email', 'Email', 'email')}
                            {field('phone', 'Phone', 'tel')}
                        </Grid>
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
