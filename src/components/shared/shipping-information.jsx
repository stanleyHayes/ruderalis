import {
    Box, Button, Card, CardContent, Checkbox, Chip, Divider, FormControl,
    FormControlLabel, FormHelperText, Grid, InputLabel, MenuItem, OutlinedInput, Radio,
    Select, Stack, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {createAddress, getAddresses, selectAddress} from "../../redux/features/address/address-slice";
import {useFormik} from "formik";
import * as yup from "yup";
import {
    AddOutlined, CheckCircleOutlined, HomeOutlined,
    KeyboardArrowLeft, KeyboardArrowRightOutlined, StarOutlined,
} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router";

const ShippingInformation = ({next, previous}) => {
    const dispatch = useDispatch();
    const {authData} = useSelector(selectAuth);
    const {addresses} = useSelector(selectAddress);
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [useNew, setUseNew] = useState(false);
    const [saveAddress, setSaveAddress] = useState(false);

    useEffect(() => {
        dispatch(getAddresses());
    }, [dispatch]);

    useEffect(() => {
        if (addresses?.length && !selectedAddress) {
            const defaultAddr = addresses.find(a => a.isDefault);
            setSelectedAddress(defaultAddr?._id || addresses[0]._id);
            setUseNew(false);
        } else if (!addresses?.length) {
            setUseNew(true);
        }
    }, [addresses]);

    const formik = useFormik({
        initialValues: {
            label: 'Home',
            street: '',
            city: '',
            region: '',
            country: '',
            gpAddressOrHouseNumber: '',
            landmark: '',
        },
        validationSchema: yup.object({
            street: yup.string().required('Street address is required'),
            city: yup.string().required('City is required'),
            country: yup.string().required('Country is required'),
        }),
        onSubmit: (values) => {
            if (saveAddress) {
                dispatch(createAddress({
                    address: values,
                    navigate: () => {},
                    showMessage: enqueueSnackbar,
                }));
            }
            next();
        },
    });

    const handleSelectAddress = (id) => {
        setSelectedAddress(id);
        setUseNew(false);
    };

    const handleUseNew = () => {
        setSelectedAddress(null);
        setUseNew(true);
    };

    const field = (name, label, gridSize = {xs: 12, sm: 6}) => (
        <Grid size={gridSize}>
            <FormControl fullWidth variant="outlined" error={Boolean(formik.touched[name] && formik.errors[name])}>
                <InputLabel>{label}</InputLabel>
                <OutlinedInput fullWidth name={name} label={label}
                    value={formik.values[name]} onChange={formik.handleChange} onBlur={formik.handleBlur}
                    color="secondary" size="medium" sx={{borderRadius: 3}}/>
                {formik.touched[name] && formik.errors[name] && <FormHelperText error>{formik.errors[name]}</FormHelperText>}
            </FormControl>
        </Grid>
    );

    return (
        <Box>
            {/* Saved Addresses */}
            {addresses?.length > 0 && (
                <Box sx={{mb: 3}}>
                    <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary', mb: 2}}>
                        Saved Addresses
                    </Typography>
                    <Stack spacing={1.5}>
                        {addresses.map(addr => (
                            <Card key={addr._id} variant="outlined"
                                onClick={() => handleSelectAddress(addr._id)}
                                sx={{
                                    cursor: 'pointer',
                                    borderColor: selectedAddress === addr._id && !useNew ? 'secondary.main' : 'divider',
                                    bgcolor: selectedAddress === addr._id && !useNew ? 'light.secondary' : 'transparent',
                                    transition: 'all 0.2s',
                                }}>
                                <CardContent sx={{p: 2, '&:last-child': {pb: 2}}}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Radio checked={selectedAddress === addr._id && !useNew} color="secondary" size="small"/>
                                        <Box sx={{flex: 1}}>
                                            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.5}}>
                                                <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                    {addr.label || 'Home'}
                                                </Typography>
                                                {addr.isDefault && (
                                                    <Chip size="small" icon={<StarOutlined sx={{fontSize: '12px !important'}}/>}
                                                        label="Default" color="secondary"
                                                        sx={{fontWeight: 600, fontSize: 10, height: 20}}/>
                                                )}
                                            </Stack>
                                            {addr.gpAddressOrHouseNumber && (
                                                <Typography variant="caption" fontWeight={600} sx={{color: 'text.primary', display: 'block'}}>
                                                    {addr.gpAddressOrHouseNumber}
                                                </Typography>
                                            )}
                                            <Typography variant="caption" color="text.secondary">
                                                {addr.street}
                                                {addr.landmark ? ` (Near ${addr.landmark})` : ''}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" sx={{display: 'block'}}>
                                                {[addr.city, addr.region, addr.country].filter(Boolean).join(', ')}
                                            </Typography>
                                        </Box>
                                        {selectedAddress === addr._id && !useNew && (
                                            <CheckCircleOutlined sx={{color: 'secondary.main', fontSize: 20}}/>
                                        )}
                                    </Stack>
                                </CardContent>
                            </Card>
                        ))}

                        {/* Use new address option */}
                        <Card variant="outlined" onClick={handleUseNew}
                            sx={{
                                cursor: 'pointer',
                                borderColor: useNew ? 'secondary.main' : 'divider',
                                bgcolor: useNew ? 'light.secondary' : 'transparent',
                                borderStyle: 'dashed',
                                transition: 'all 0.2s',
                            }}>
                            <CardContent sx={{p: 2, '&:last-child': {pb: 2}}}>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Radio checked={useNew} color="secondary" size="small"/>
                                    <AddOutlined sx={{color: 'secondary.main', fontSize: 20}}/>
                                    <Typography variant="body2" fontWeight={600} sx={{color: 'secondary.main'}}>
                                        Enter a new address
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Box>
            )}

            {/* New Address Form */}
            {useNew && (
                <>
                    {addresses?.length > 0 && <Divider sx={{mb: 3}}/>}
                    <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary', mb: 2}}>
                        {addresses?.length ? 'New Delivery Address' : 'Delivery Address'}
                    </Typography>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid size={{xs: 12, sm: 6}}>
                                <FormControl fullWidth>
                                    <InputLabel>Label</InputLabel>
                                    <Select name="label" label="Label" color="secondary"
                                        value={formik.values.label} onChange={formik.handleChange}
                                        sx={{borderRadius: 3}}>
                                        <MenuItem value="Home">Home</MenuItem>
                                        <MenuItem value="Work">Work</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {field('gpAddressOrHouseNumber', 'GP Address / House Number')}
                            {field('street', 'Street Address *', {xs: 12})}
                            {field('landmark', 'Landmark (Optional)', {xs: 12})}
                            {field('city', 'City *')}
                            {field('region', 'Region / State')}
                            {field('country', 'Country *')}
                        </Grid>
                        <FormControlLabel
                            control={<Checkbox checked={saveAddress} onChange={(e) => setSaveAddress(e.target.checked)} color="secondary" size="small"/>}
                            label={<Typography variant="body2" color="text.secondary">Save this address for future orders</Typography>}
                            sx={{mt: 2}}
                        />
                    </form>
                </>
            )}

            {/* Navigation */}
            <Stack direction="row" justifyContent="space-between" sx={{mt: 4}}>
                <Button variant="outlined" color="secondary" startIcon={<KeyboardArrowLeft/>}
                    onClick={previous} sx={{textTransform: 'none', fontWeight: 600}}>
                    Back
                </Button>
                <Button variant="contained" color="secondary" endIcon={<KeyboardArrowRightOutlined/>}
                    onClick={useNew ? formik.handleSubmit : next}
                    sx={{textTransform: 'none', fontWeight: 600}}>
                    Continue
                </Button>
            </Stack>
        </Box>
    );
};

export default ShippingInformation;
