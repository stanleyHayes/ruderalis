import {motion} from "framer-motion";
import {fadeUp, stagger} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Box, Button, Card, CardContent, Chip, Container, Divider,
    Grid, IconButton, LinearProgress, Stack, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {deleteAddress, getAddresses, selectAddress} from "../../redux/features/address/address-slice";
import {useEffect} from "react";
import {
    AddOutlined, DeleteOutlined, EditOutlined, LocalShippingOutlined,
    PersonOutlined, PhoneOutlined, PlaceOutlined,
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import AccountSidebar from "../../components/shared/account-sidebar";

const AddressesPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {addresses, addressLoading} = useSelector(selectAddress);
    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => { dispatch(getAddresses()); }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteAddress({id, showMessage: enqueueSnackbar}));
    };

    return (
        <Layout>
            {addressLoading && <LinearProgress color="secondary"/>}

            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 3, md: 5}, pb: {xs: 2, md: 4}}}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <PlaceOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Account</Typography>
                    </Stack>
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>My Addresses</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                        Manage your saved delivery addresses for faster checkout
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 5}}}>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 8}}>
                        {/* Header */}
                        <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{sm: 'center'}} spacing={2} sx={{mb: 3}}>
                            <Stack direction="row" spacing={1}>
                                <Chip size="small" icon={<LocalShippingOutlined sx={{fontSize: '14px !important'}}/>}
                                    label={`${addresses?.length || 0} Addresses`} variant="outlined"
                                    sx={{fontWeight: 600, fontSize: 11}}/>
                            </Stack>
                            <Button variant="contained" color="secondary"
                                onClick={() => navigate('/account/address/new')}
                                startIcon={<AddOutlined/>} sx={{fontWeight: 700}}>
                                Add New Address
                            </Button>
                        </Stack>

                        {/* Address Cards */}
                        {addresses?.length > 0 ? (
                            <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Grid container spacing={2}>
                                {addresses.map((address, i) => (
                                    <Grid key={address._id || i} size={{xs: 12, md: 6}}>
                                    <motion.div variants={fadeUp}>
                                        <Card variant="outlined" sx={{
                                            height: '100%', overflow: 'hidden',
                                            transition: 'transform 0.2s, box-shadow 0.2s',
                                            '&:hover': {transform: 'translateY(-2px)', boxShadow: 4},
                                        }}>
                                            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                            <CardContent sx={{p: 2.5}}>
                                                <Stack spacing={2}>
                                                    {/* Type badge */}
                                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Box sx={{display: 'flex', p: 0.5, borderRadius: 1,
                                                                backgroundColor: 'light.secondary', border: '1px solid', borderColor: 'divider'}}>
                                                                <LocalShippingOutlined sx={{fontSize: 20, color: 'secondary.main'}}/>
                                                            </Box>
                                                            <Chip size="small" label="Delivery"
                                                                sx={{backgroundColor: 'light.secondary', color: 'secondary.main', fontWeight: 700, fontSize: 11}}/>
                                                        </Stack>
                                                    </Stack>

                                                    {/* Contact */}
                                                    <Box>
                                                        <Typography variant="overline" sx={{color: 'text.secondary', fontSize: 10, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 1}}>
                                                            Contact
                                                        </Typography>
                                                        <Stack spacing={0.75}>
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <PersonOutlined sx={{fontSize: 16, color: 'text.secondary'}}/>
                                                                <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                                    {address.firstName} {address.lastName}
                                                                </Typography>
                                                            </Stack>
                                                            {address.phone && (
                                                                <Stack direction="row" spacing={1} alignItems="center">
                                                                    <PhoneOutlined sx={{fontSize: 16, color: 'text.secondary'}}/>
                                                                    <Typography variant="body2" color="text.secondary">{address.phone}</Typography>
                                                                </Stack>
                                                            )}
                                                        </Stack>
                                                    </Box>

                                                    {/* Location */}
                                                    <Box>
                                                        <Typography variant="overline" sx={{color: 'text.secondary', fontSize: 10, fontWeight: 600, letterSpacing: 1.2, display: 'block', mb: 1}}>
                                                            Location
                                                        </Typography>
                                                        <Stack spacing={0.75}>
                                                            <Stack direction="row" spacing={1} alignItems="flex-start">
                                                                <PlaceOutlined sx={{fontSize: 16, color: 'text.secondary', mt: 0.25}}/>
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {[address.addressLine1, address.addressLine2].filter(Boolean).join(', ')}
                                                                </Typography>
                                                            </Stack>
                                                            <Typography variant="body2" color="text.secondary" sx={{pl: 3}}>
                                                                {[address.city, address.state, address.zipCode, address.country].filter(Boolean).join(', ')}
                                                            </Typography>
                                                        </Stack>
                                                    </Box>

                                                    <Divider/>

                                                    {/* Actions */}
                                                    <Stack direction="row" spacing={1}>
                                                        <Button size="small" variant="outlined" color="secondary"
                                                            component={Link} to={`/account/address/${address._id}/edit`}
                                                            startIcon={<EditOutlined sx={{fontSize: 14}}/>}
                                                            sx={{fontSize: 12, fontWeight: 600, flex: 1}}>
                                                            Edit
                                                        </Button>
                                                        <Button size="small" variant="outlined"
                                                            onClick={() => handleDelete(address._id)}
                                                            startIcon={<DeleteOutlined sx={{fontSize: 14}}/>}
                                                            sx={{fontSize: 12, fontWeight: 600, color: 'error.main', borderColor: 'error.main',
                                                                '&:hover': {backgroundColor: 'light.red', borderColor: 'error.main'}}}>
                                                            Delete
                                                        </Button>
                                                    </Stack>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                    </Grid>
                                ))}
                            </Grid>
                            </motion.div>
                        ) : (
                            <Card variant="outlined" sx={{overflow: 'hidden', borderStyle: 'dashed'}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{py: 6, textAlign: 'center'}}>
                                    <PlaceOutlined sx={{fontSize: 48, color: 'text.disabled', mb: 1.5}}/>
                                    <Typography variant="h6" fontWeight={700} sx={{color: 'text.primary', mb: 0.5}}>
                                        No Addresses on File
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{mb: 3}}>
                                        Add a delivery address so we can remember it for faster checkout.
                                    </Typography>
                                    <Button variant="outlined" color="secondary" size="small"
                                        onClick={() => navigate('/account/address/new')}
                                        startIcon={<PlaceOutlined sx={{fontSize: 18}}/>}>
                                        Add Address
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
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

export default AddressesPage;
