import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    Grid,
    LinearProgress,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {useFormik} from "formik";
import * as yup from "yup";
import "yup-phone";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import {Edit, EditOutlined} from "@mui/icons-material";
import AccountSidebar from "../../components/shared/account-sidebar";

const UpdateProfilePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {authLoading, authError, authData} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const formik = useFormik({
        initialValues: {
            firstName: authData?.firstName || '',
            lastName: authData?.lastName || '',
            username: authData?.username || '',
            email: authData?.email || '',
            phone: authData?.phone || '',
        },
        validationSchema: yup.object({
            firstName: yup.string().required('First name required'),
            lastName: yup.string().required('Last name required'),
            username: yup.string().required('Username required'),
            email: yup.string().email('Enter a valid email').required('Email required'),
            phone: yup.string().phone("Enter a valid phone").required('Phone required'),
        }),
        onSubmit: (values, {setSubmitting}) => {
            dispatch(AUTH_ACTION_CREATORS.updateProfile({values, navigate, showMessage, setSubmitting}));
        },
        enableReinitialize: true,
        validateOnBlur: true,
        validateOnChange: true
    });

    return (
        <Layout>
            {authLoading && <LinearProgress variant="query" color="secondary"/>}
            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 3, md: 5}, pb: {xs: 2, md: 4}}}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <EditOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Account</Typography>
                    </Stack>
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>Update Profile</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>Edit your personal information</Typography>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 5}}}>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 8}}>
                        {authError && (
                            <Alert sx={{mb: 3}} severity="error">
                                <AlertTitle>{authError}</AlertTitle>
                            </Alert>
                        )}

                        <motion.div variants={fadeUp} initial="initial" animate="animate">
                        <Card elevation={0}>
                            <CardContent sx={{p: {xs: 3, md: 4}}}>
                                <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 1}}>
                                    Personal Details
                                </Typography>
                                <Divider sx={{mb: 3}}/>

                                <form onSubmit={formik.handleSubmit}>
                                    <Stack direction="column" spacing={3}>
                                        <Grid container spacing={3}>
                                            <Grid size={{xs: 12, md: 6}}>
                                                <TextField
                                                    InputLabelProps={{shrink: true}}
                                                    fullWidth={true} size="medium" type="text"
                                                    value={formik.values.firstName} name="firstName" id="firstName"
                                                    label="First Name" variant="outlined"
                                                    error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                                                    required={true} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                    placeholder="Enter first name"
                                                    helperText={formik.touched.firstName && formik.errors.firstName}
                                                />
                                            </Grid>
                                            <Grid size={{xs: 12, md: 6}}>
                                                <TextField
                                                    InputLabelProps={{shrink: true}}
                                                    fullWidth={true} value={formik.values.lastName}
                                                    label="Last Name" variant="outlined" size="medium" type="text"
                                                    name="lastName" id="lastName"
                                                    error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                                                    required={true} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                    placeholder="Enter last name"
                                                    helperText={formik.touched.lastName && formik.errors.lastName}
                                                />
                                            </Grid>
                                        </Grid>

                                        <TextField
                                            InputLabelProps={{shrink: true}}
                                            fullWidth={true} value={formik.values.username}
                                            label="Username" variant="outlined" size="medium" type="text"
                                            name="username" id="username"
                                            error={Boolean(formik.touched.username && formik.errors.username)}
                                            required={true} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            placeholder="Enter username"
                                            helperText={formik.touched.username && formik.errors.username}
                                        />

                                        <TextField
                                            InputLabelProps={{shrink: true}}
                                            fullWidth={true} value={formik.values.email}
                                            label="Email" variant="outlined" size="medium" type="email"
                                            name="email" id="email"
                                            error={Boolean(formik.touched.email && formik.errors.email)}
                                            required={true} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            placeholder="Enter email"
                                            helperText={formik.touched.email && formik.errors.email}
                                        />

                                        <TextField
                                            InputLabelProps={{shrink: true}}
                                            fullWidth={true} value={formik.values.phone}
                                            label="Phone" variant="outlined" size="medium" type="text"
                                            name="phone" id="phone"
                                            error={Boolean(formik.touched.phone && formik.errors.phone)}
                                            required={true} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                            placeholder="Enter phone"
                                            helperText={formik.touched.phone && formik.errors.phone}
                                        />

                                        <Button
                                            type="submit" size="large" color="secondary"
                                            sx={{textTransform: 'none', py: 1.5}}
                                           
                                            startIcon={formik.isSubmitting ? <CircularProgress color="secondary" size={20}/> : null}
                                            loading={formik.isSubmitting} fullWidth={true}
                                            variant="contained" disableElevation={true}>
                                            {formik.isSubmitting ? 'Updating...' : 'Update Profile'}
                                        </Button>
                                    </Stack>
                                </form>
                            </CardContent>
                        </Card>
                        </motion.div>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <Box sx={{position: 'sticky', top: 80}}>
                            <AccountSidebar/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default UpdateProfilePage;
