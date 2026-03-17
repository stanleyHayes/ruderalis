import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Typography,
    Container,
    Box,
    LinearProgress,
    Alert,
    AlertTitle,
    Grid,
    Card,
    CardContent,
    Divider,
    FormControl,
    InputLabel,
    OutlinedInput,
    Stack,
    FormHelperText,
    InputAdornment,
    CircularProgress,
    IconButton
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {Lock, LockOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import AccountSidebar from "../../components/shared/account-sidebar";

const ChangePasswordPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {authError, authLoading} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const validationSchema = yup.object({
        currentPassword: yup.string().required('Field Required'),
        password: yup.string().required('Field Required'),
        confirmPassword: yup.string()
            .required('Field Required')
            .oneOf([yup.ref('password'), null], 'Passwords must match'),
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: (values, {setSubmitting}) => {
            dispatch(AUTH_ACTION_CREATORS.changePassword({values, navigate, showMessage, setSubmitting}));
        }
    });

    const PasswordVisibilityToggle = () => (
        <InputAdornment position="end">
            <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{color: 'secondary.main'}}>
                {showPassword ? <VisibilityOff fontSize="small"/> : <Visibility fontSize="small"/>}
            </IconButton>
        </InputAdornment>
    );

    return (
        <Layout>
            {authLoading && <LinearProgress variant="query" color="secondary"/>}
            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 3, md: 5}, pb: {xs: 2, md: 4}}}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <LockOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Security</Typography>
                    </Stack>
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>Change Password</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>Update your account password</Typography>
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
                                    Password Settings
                                </Typography>
                                <Divider sx={{mb: 3}}/>

                                <form onSubmit={formik.handleSubmit}>
                                    <Stack direction="column" spacing={3}>
                                        <FormControl variant="outlined" fullWidth={true}>
                                            <InputLabel htmlFor="currentPassword">Current Password</InputLabel>
                                            <OutlinedInput
                                                size="medium" type={showPassword ? 'text' : 'password'}
                                                name="currentPassword" id="currentPassword"
                                                value={formik.values.currentPassword}
                                                error={Boolean(formik.touched.currentPassword && formik.errors.currentPassword)}
                                                required={true} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                placeholder="Enter current password"
                                                endAdornment={<PasswordVisibilityToggle/>}
                                            />
                                            {formik.touched.currentPassword && formik.errors.currentPassword &&
                                                <FormHelperText error={true}>{formik.errors.currentPassword}</FormHelperText>}
                                        </FormControl>

                                        <FormControl variant="outlined" fullWidth={true}>
                                            <InputLabel htmlFor="password">New Password</InputLabel>
                                            <OutlinedInput
                                                size="medium" type={showPassword ? 'text' : 'password'}
                                                name="password" id="password"
                                                value={formik.values.password}
                                                error={Boolean(formik.touched.password && formik.errors.password)}
                                                required={true} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                placeholder="Enter new password"
                                                endAdornment={<PasswordVisibilityToggle/>}
                                            />
                                            {formik.touched.password && formik.errors.password &&
                                                <FormHelperText error={true}>{formik.errors.password}</FormHelperText>}
                                        </FormControl>

                                        <FormControl variant="outlined" fullWidth={true}>
                                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                            <OutlinedInput
                                                size="medium" type={showPassword ? 'text' : 'password'}
                                                name="confirmPassword" id="confirmPassword"
                                                value={formik.values.confirmPassword}
                                                error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                                                required={true} onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                placeholder="Confirm new password"
                                                endAdornment={<PasswordVisibilityToggle/>}
                                            />
                                            {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                                                <FormHelperText error={true}>{formik.errors.confirmPassword}</FormHelperText>}
                                        </FormControl>

                                        <LoadingButton
                                            type="submit" size="large" color="secondary"
                                            sx={{textTransform: 'none', py: 1.5}}
                                            loadingPosition="start"
                                            startIcon={formik.isSubmitting ? <CircularProgress color="secondary" size={20}/> : null}
                                            loadingIndicator={formik.isSubmitting ? <CircularProgress color="secondary" size={20}/> : null}
                                            loading={formik.isSubmitting} fullWidth={true}
                                            variant="contained" disableElevation={true}>
                                            {formik.isSubmitting ? 'Updating...' : 'Change Password'}
                                        </LoadingButton>
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

export default ChangePasswordPage;
