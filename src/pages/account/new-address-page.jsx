import {motion} from "framer-motion";
import {scaleIn} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Box, Breadcrumbs, Button, Card, CardContent, Checkbox, CircularProgress,
    Container, FormControl, FormControlLabel, FormHelperText, Grid, InputAdornment,
    LinearProgress, Link as MuiLink, MenuItem, OutlinedInput, Select, Stack, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createAddress, getAddress, selectAddress, updateAddress} from "../../redux/features/address/address-slice";
import {useFormik} from "formik";
import * as yup from "yup";
import {useNavigate, useParams} from "react-router";
import {useSnackbar} from "notistack";
import {useEffect} from "react";
import {
    ArrowRightAlt, ErrorOutline, Home, HomeOutlined,
    LabelOutlined, LocationOnOutlined, NavigateNext, PlaceOutlined,
    PublicOutlined,
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import AccountSidebar from "../../components/shared/account-sidebar";

const iconSx = {
    borderRadius: 1, padding: 0.5, fontSize: 32,
    border: '1px solid', borderColor: 'divider',
    backgroundColor: 'light.secondary', color: 'secondary.main',
};

const Field = ({label, name, placeholder, icon, formik, ...rest}) => (
    <Box>
        <Typography variant="body2" sx={{mb: 1, color: 'text.secondary', fontWeight: 500}}>{label}</Typography>
        <FormControl fullWidth variant="outlined" error={Boolean(formik.touched[name] && formik.errors[name])}>
            <OutlinedInput
                startAdornment={icon && <InputAdornment position="start">{icon}</InputAdornment>}
                endAdornment={formik.touched[name] && formik.errors[name] ? (
                    <InputAdornment position="end"><ErrorOutline color="error" sx={{fontSize: 20}}/></InputAdornment>
                ) : null}
                placeholder={placeholder} name={name} id={name}
                value={formik.values[name]} onChange={formik.handleChange} onBlur={formik.handleBlur}
                fullWidth size="medium" color="secondary" {...rest}
            />
            {formik.touched[name] && formik.errors[name] && (
                <FormHelperText><Typography color="error" sx={{fontSize: 12}}>{formik.errors[name]}</Typography></FormHelperText>
            )}
        </FormControl>
    </Box>
);

const NewAddressPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {addressID} = useParams();
    const {addressDetail, addressLoading} = useSelector(selectAddress);
    const {enqueueSnackbar} = useSnackbar();
    const isEditMode = Boolean(addressID);

    useEffect(() => {
        if (isEditMode) dispatch(getAddress({id: addressID}));
    }, [dispatch, addressID, isEditMode]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            label: (isEditMode && addressDetail?.label) || 'Home',
            street: (isEditMode && addressDetail?.street) || '',
            city: (isEditMode && addressDetail?.city) || '',
            region: (isEditMode && addressDetail?.region) || '',
            country: (isEditMode && addressDetail?.country) || '',
            gpAddressOrHouseNumber: (isEditMode && addressDetail?.gpAddressOrHouseNumber) || '',
            landmark: (isEditMode && addressDetail?.landmark) || '',
            isDefault: (isEditMode && addressDetail?.isDefault) || false,
        },
        validationSchema: yup.object({
            street: yup.string().required('Street address is required'),
            city: yup.string().required('City is required'),
            country: yup.string().required('Country is required'),
        }),
        onSubmit: (values) => {
            if (isEditMode) {
                dispatch(updateAddress({id: addressID, address: values, navigate, showMessage: enqueueSnackbar}));
            } else {
                dispatch(createAddress({address: values, navigate, showMessage: enqueueSnackbar}));
            }
        },
    });

    return (
        <Layout>
            {addressLoading && <LinearProgress color="secondary"/>}

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 5}}}>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 8}}>
                        {/* Breadcrumb */}
                        <Breadcrumbs separator={<NavigateNext sx={{fontSize: 16, color: 'text.disabled'}}/>} sx={{mb: 3}}>
                            <MuiLink component={Link} to="/" underline="hover" sx={{display: 'flex', alignItems: 'center', color: 'text.secondary', fontWeight: 500}}>
                                <Home sx={{fontSize: 18, mr: 0.5}}/> Home
                            </MuiLink>
                            <MuiLink component={Link} to="/account/addresses" underline="hover" sx={{color: 'text.secondary', fontWeight: 500}}>
                                Addresses
                            </MuiLink>
                            <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 600}}>
                                {isEditMode ? 'Edit Address' : 'New Address'}
                            </Typography>
                        </Breadcrumbs>

                        {/* Title */}
                        <Typography variant="h4" fontWeight={800} sx={{color: 'text.primary', mb: 0.5}}>
                            {isEditMode ? 'Edit' : 'Add a New'}{' '}
                            <Typography variant="h4" display="inline" component="span" sx={{color: 'secondary.main', fontWeight: 800}}>
                                Address
                            </Typography>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{mb: 4}}>
                            Store your delivery address to speed up checkout and ensure smooth delivery.
                        </Typography>

                        <motion.div variants={scaleIn} initial="initial" animate="animate">
                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={3}>
                                {/* Address Details */}
                                <Box>
                                    <Typography variant="h6" sx={{color: 'text.primary', mb: 1.5}}>
                                        Address Details
                                    </Typography>
                                    <Card variant="outlined" elevation={0}>
                                        <CardContent sx={{p: {xs: 2, md: 3}}}>
                                            <Grid container spacing={2.5}>
                                                <Grid size={{xs: 12, md: 6}}>
                                                    <Box>
                                                        <Typography variant="body2" sx={{mb: 1, color: 'text.secondary', fontWeight: 500}}>Label</Typography>
                                                        <FormControl fullWidth>
                                                            <Select
                                                                name="label" id="label" color="secondary"
                                                                value={formik.values.label} onChange={formik.handleChange}
                                                                startAdornment={<InputAdornment position="start"><LabelOutlined sx={iconSx}/></InputAdornment>}
                                                            >
                                                                <MenuItem value="Home">Home</MenuItem>
                                                                <MenuItem value="Work">Work</MenuItem>
                                                                <MenuItem value="Other">Other</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Box>
                                                </Grid>
                                                <Grid size={{xs: 12, md: 6}}>
                                                    <Field label="GP Address / House Number" name="gpAddressOrHouseNumber" placeholder="e.g. GA-123-4567"
                                                        icon={<HomeOutlined sx={iconSx}/>} formik={formik}/>
                                                </Grid>
                                                <Grid size={{xs: 12}}>
                                                    <Field label="Street *" name="street" placeholder="Street address, P.O. box"
                                                        icon={<HomeOutlined sx={iconSx}/>} formik={formik}/>
                                                </Grid>
                                                <Grid size={{xs: 12}}>
                                                    <Field label="Landmark" name="landmark" placeholder="Near a landmark, building, etc."
                                                        icon={<PlaceOutlined sx={iconSx}/>} formik={formik}/>
                                                </Grid>
                                                <Grid size={{xs: 12, md: 6}}>
                                                    <Field label="City *" name="city" placeholder="Enter city"
                                                        icon={<LocationOnOutlined sx={iconSx}/>} formik={formik}/>
                                                </Grid>
                                                <Grid size={{xs: 12, md: 6}}>
                                                    <Field label="Region / State" name="region" placeholder="Enter region or state"
                                                        icon={<LocationOnOutlined sx={iconSx}/>} formik={formik}/>
                                                </Grid>
                                                <Grid size={{xs: 12, md: 6}}>
                                                    <Field label="Country *" name="country" placeholder="Enter country"
                                                        icon={<PublicOutlined sx={iconSx}/>} formik={formik}/>
                                                </Grid>
                                                <Grid size={{xs: 12, md: 6}}>
                                                    <Box sx={{display: 'flex', alignItems: 'center', height: '100%', pt: 3}}>
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    name="isDefault" color="secondary"
                                                                    checked={formik.values.isDefault}
                                                                    onChange={formik.handleChange}
                                                                />
                                                            }
                                                            label={<Typography variant="body2" fontWeight={500}>Set as default address</Typography>}
                                                        />
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Box>

                                {/* Actions */}
                                <Stack direction={{xs: 'column', sm: 'row'}} spacing={1.5} justifyContent="flex-end">
                                    <Button component={Link} to="/account/addresses" variant="outlined" color="secondary" size="large"
                                        sx={{fontWeight: 600}}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="contained" color="secondary" size="large"
                                        disabled={addressLoading}
                                        endIcon={addressLoading ? <CircularProgress size={16} color="inherit"/> : <ArrowRightAlt/>}
                                        sx={{fontWeight: 700, px: 4}}>
                                        {isEditMode ? 'Update Address' : 'Save Address'}
                                    </Button>
                                </Stack>
                            </Stack>
                        </form>
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
    );
};

export default NewAddressPage;
