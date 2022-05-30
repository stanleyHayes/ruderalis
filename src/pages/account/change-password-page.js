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
    Divider, FormControl, InputLabel, OutlinedInput, Stack, FormHelperText, InputAdornment, CircularProgress
} from "@mui/material";
import {useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {LoadingButton} from "@mui/lab";

const ChangePasswordPage = () => {

    const {authError, authLoading} = useSelector(selectAuth);
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = yup.object({
        currentPassword: yup.string().required('Field Required'),
        confirmPassword: yup.string().required('Field Required'),
        password: yup.string().required('Field Required'),
    });

    const formik = useFormik({
        initialValues: {
            currentPassword: '',
            confirmPassword: '',
            password: ''
        },
        validationSchema,
        onSubmit: values => {
            console.log(values);
        }
    })
    return (
        <Layout>
            {authLoading && <LinearProgress variant="query" color="secondary"/>}
            <Box sx={{py: 8}}>
                <Container>
                    <Typography variant="h4" sx={{color: 'text.primary'}}>Update Password</Typography>
                    <Divider variant="fullWidth" sx={{my: 3}} light={true}/>
                    {authError && (
                        <Alert sx={{my: 2}} severity="error">
                            <AlertTitle>{authError}</AlertTitle>
                        </Alert>
                    )}
                    <Box>
                        <Grid container={true}>
                            <Grid item={true} xs={12} md={6}>
                                <Card
                                    sx={{
                                        borderTopRightRadius: 16,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 16,
                                        borderTopLeftRadius: 16
                                    }} elevation={1}>
                                    <CardContent>
                                        <form onSubmit={formik.handleSubmit}>
                                            <Stack direction="column" spacing={2}>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <InputLabel htmlFor="currentPassword">Current Password</InputLabel>
                                                    <OutlinedInput
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        size="medium"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="currentPassword"
                                                        id="currentPassword"
                                                        error={Boolean(formik.errors.currentPassword)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlue={formik.handleBlur}
                                                        placeholder="Enter password"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                {showPassword ?
                                                                    <VisibilityOff
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                            backgroundColor: 'light.secondary'
                                                                        }}
                                                                    /> :
                                                                    <Visibility
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                            backgroundColor: 'light.secondary'
                                                                        }}
                                                                    />}
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    {formik.errors.currentPassword &&
                                                        <FormHelperText
                                                            error={true}>
                                                            {formik.errors.currentPassword}
                                                        </FormHelperText>}
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <InputLabel htmlFor="password">Password</InputLabel>
                                                    <OutlinedInput
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        size="medium"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="password"
                                                        id="password"
                                                        error={Boolean(formik.errors.password)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlue={formik.handleBlur}
                                                        placeholder="Enter password"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                {showPassword ?
                                                                    <VisibilityOff
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                            backgroundColor: 'light.secondary'
                                                                        }}
                                                                    /> :
                                                                    <Visibility
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                            backgroundColor: 'light.secondary'
                                                                        }}
                                                                    />}
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    {formik.errors.password &&
                                                        <FormHelperText
                                                            error={true}>
                                                            {formik.errors.password}
                                                        </FormHelperText>}
                                                </FormControl>
                                                <FormControl variant="outlined" fullWidth={true}>
                                                    <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                                                    <OutlinedInput
                                                        sx={{
                                                            borderTopRightRadius: 16,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 16,
                                                            borderTopLeftRadius: 16
                                                        }}
                                                        size="medium"
                                                        type={showPassword ? 'text' : 'password'}
                                                        name="confirmPassword"
                                                        id="confirmPassword"
                                                        error={Boolean(formik.errors.confirmPassword)}
                                                        required={true}
                                                        onChange={formik.handleChange}
                                                        onBlue={formik.handleBlur}
                                                        placeholder="Enter password"
                                                        endAdornment={
                                                            <InputAdornment position="end">
                                                                {showPassword ?
                                                                    <VisibilityOff
                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                            backgroundColor: 'light.secondary'
                                                                        }}
                                                                    /> :
                                                                    <Visibility
                                                                        onClick={() => setShowPassword(!showPassword)}
                                                                        sx={{
                                                                            borderTopRightRadius: 16,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 16,
                                                                            borderTopLeftRadius: 16,
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            borderRadius: '100%',
                                                                            padding: 1,
                                                                            fontSize: 24,
                                                                            backgroundColor: 'light.secondary'
                                                                        }}
                                                                    />}
                                                            </InputAdornment>
                                                        }
                                                    />
                                                    {formik.errors.confirmPassword &&
                                                        <FormHelperText
                                                            error={true}>
                                                            {formik.errors.confirmPassword}
                                                        </FormHelperText>}
                                                </FormControl>
                                                <LoadingButton
                                                    size="large"
                                                    color="secondary"
                                                    sx={{
                                                        borderTopRightRadius: 16,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 16,
                                                        borderTopLeftRadius: 16,
                                                        textTransform: 'capitalize',
                                                        py: 1.2
                                                    }}
                                                    loadingPosition="start"
                                                    startIcon={formik.isSubmitting ? <CircularProgress color="secondary" />: null}
                                                    loadingIndicator={formik.isSubmitting ? <CircularProgress color="secondary" />: null}
                                                    loading={formik.isSubmitting}
                                                    fullWidth={true}
                                                    variant="contained"
                                                    disableElevation={true}>
                                                    {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                                                </LoadingButton>
                                            </Stack>
                                        </form>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </Layout>
    )
}

export default ChangePasswordPage;