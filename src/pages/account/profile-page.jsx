import {motion} from "framer-motion";
import {fadeUp, stagger} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    IconButton,
    Stack,
    Typography
} from "@mui/material";
import Info from "../../components/shared/info";
import AccountSidebar from "../../components/shared/account-sidebar";
import {useDispatch, useSelector} from "react-redux";
import {AUTH_ACTION_CREATORS, selectAuth} from "../../redux/features/auth/auth-slice";
import {
    Call,
    ChevronRight,
    DeleteForever,
    Edit,
    ExitToApp,
    Lock,
    LocationOn,
    Mail,
    Person,
    PersonOutlined,
    Security,
    Shield
} from "@mui/icons-material";
import {UTILS} from "../../utils/utils";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";

const ProfilePage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authData} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();

    const showMessage = (message, options) => {
        enqueueSnackbar(message, options);
    }

    const handleLogout = () => {
        dispatch(AUTH_ACTION_CREATORS.logout({navigate, showMessage}));
    }

    return (
        <Layout>
            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 3, md: 5}, pb: {xs: 2, md: 4}}}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <PersonOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Account</Typography>
                    </Stack>
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>My Profile</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>View and manage your personal information</Typography>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 5}}}>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 8}}>
                        <motion.div variants={stagger} initial="initial" animate="animate">
                        <Grid container spacing={3}>
                            {/* Profile Sidebar */}
                            <Grid size={{xs: 12, md: 5}}>
                                <motion.div variants={fadeUp}>
                                <Stack direction="column" spacing={3}>
                                    <Card elevation={0}>
                                        <CardContent sx={{textAlign: 'center', py: 4}}>
                                            <Avatar
                                                sx={{
                                                    bgcolor: 'light.secondary',
                                                    width: 100, height: 100,
                                                    mx: 'auto', mb: 2
                                                }}>
                                                <Typography sx={{color: 'secondary.main'}} variant="h3">
                                                    {UTILS.getInitials(authData?.fullName)}
                                                </Typography>
                                            </Avatar>
                                            <Typography variant="h5" sx={{color: 'text.primary', fontWeight: 600}}>
                                                {authData?.fullName}
                                            </Typography>
                                            <Typography variant="body2" sx={{color: 'text.secondary', mt: 0.5}}>
                                                {authData?.email}
                                            </Typography>

                                            <Divider sx={{my: 2.5}}/>

                                            <Stack direction="row" justifyContent="center" spacing={1}>
                                                <Link to="/update-profile" style={{textDecoration: 'none'}}>
                                                    <IconButton sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                                        <Edit fontSize="small"/>
                                                    </IconButton>
                                                </Link>
                                                <Link to="/change-password" style={{textDecoration: 'none'}}>
                                                    <IconButton sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                                        <Lock fontSize="small"/>
                                                    </IconButton>
                                                </Link>
                                                <IconButton onClick={handleLogout} sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                                    <ExitToApp fontSize="small"/>
                                                </IconButton>
                                            </Stack>
                                        </CardContent>
                                    </Card>

                                    {/* Quick Actions */}
                                    <Card elevation={0}>
                                        <CardContent>
                                            <Typography variant="overline" sx={{color: 'text.secondary', mb: 1, display: 'block'}}>
                                                Quick Actions
                                            </Typography>
                                            <Stack direction="column" spacing={0} divider={<Divider/>}>
                                                {[
                                                    {label: 'Edit Profile', icon: <Edit fontSize="small"/>, to: '/update-profile'},
                                                    {label: 'Change Password', icon: <Lock fontSize="small"/>, to: '/change-password'},
                                                    {label: 'Order History', icon: <Shield fontSize="small"/>, to: '/orders'},
                                                ].map((action, index) => (
                                                    <Link key={index} to={action.to} style={{textDecoration: 'none'}}>
                                                        <Stack sx={{cursor: 'pointer', py: 1.5}} justifyContent="space-between"
                                                            alignItems="center" direction="row">
                                                            <Stack spacing={2} direction="row" alignItems="center">
                                                                <IconButton size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                                                    {action.icon}
                                                                </IconButton>
                                                                <Typography sx={{color: 'text.primary'}} variant="body2">{action.label}</Typography>
                                                            </Stack>
                                                            <ChevronRight sx={{color: 'text.secondary', fontSize: 20}}/>
                                                        </Stack>
                                                    </Link>
                                                ))}

                                                <Stack sx={{cursor: 'pointer', py: 1.5}} onClick={handleLogout}
                                                    justifyContent="space-between" alignItems="center" direction="row">
                                                    <Stack spacing={2} direction="row" alignItems="center">
                                                        <IconButton size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                                            <ExitToApp fontSize="small"/>
                                                        </IconButton>
                                                        <Typography sx={{color: 'text.primary'}} variant="body2">Logout</Typography>
                                                    </Stack>
                                                    <ChevronRight sx={{color: 'text.secondary', fontSize: 20}}/>
                                                </Stack>

                                                <Stack
                                                    sx={{cursor: 'pointer', py: 1.5}}
                                                    onClick={() => dispatch(AUTH_ACTION_CREATORS.deleteAccount({navigate, showMessage}))}
                                                    justifyContent="space-between" alignItems="center" direction="row">
                                                    <Stack spacing={2} direction="row" alignItems="center">
                                                        <IconButton size="small" sx={{bgcolor: 'light.red', color: 'error.main'}}>
                                                            <DeleteForever fontSize="small"/>
                                                        </IconButton>
                                                        <Typography sx={{color: 'error.main'}} variant="body2">Delete Account</Typography>
                                                    </Stack>
                                                    <ChevronRight sx={{color: 'error.main', fontSize: 20}}/>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Stack>
                                </motion.div>
                            </Grid>

                            {/* Profile Details */}
                            <Grid size={{xs: 12, md: 7}}>
                                <motion.div variants={fadeUp}>
                                <Stack direction="column" spacing={3}>
                                    <Card elevation={0}>
                                        <CardContent sx={{p: 3}}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
                                                <Stack direction="row" spacing={1.5} alignItems="center">
                                                    <IconButton size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                                        <Person fontSize="small"/>
                                                    </IconButton>
                                                    <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600}}>
                                                        Personal Information
                                                    </Typography>
                                                </Stack>
                                                <Link to="/update-profile" style={{textDecoration: 'none'}}>
                                                    <Button size="small" variant="text" color="secondary" sx={{textTransform: 'none'}}>Edit</Button>
                                                </Link>
                                            </Stack>

                                            <Divider sx={{mb: 3}}/>

                                            <Grid container spacing={3}>
                                                <Grid size={{xs: 12, md: 6}}>
                                                    <Info icon={<Mail sx={{color: 'secondary.main', fontSize: 20}}/>}
                                                        title={<Typography sx={{color: 'text.secondary'}} variant="caption">Email</Typography>}
                                                        value={<Typography sx={{color: 'text.primary'}} variant="body1">{authData?.email}</Typography>}/>
                                                </Grid>
                                                <Grid size={{xs: 12, md: 6}}>
                                                    <Info icon={<Call sx={{color: 'secondary.main', fontSize: 20}}/>}
                                                        title={<Typography sx={{color: 'text.secondary'}} variant="caption">Phone</Typography>}
                                                        value={<Typography sx={{color: 'text.primary'}} variant="body1">{authData?.phone}</Typography>}/>
                                                </Grid>
                                                <Grid size={{xs: 12, md: 6}}>
                                                    <Info icon={<Person sx={{color: 'secondary.main', fontSize: 20}}/>}
                                                        title={<Typography sx={{color: 'text.secondary'}} variant="caption">Username</Typography>}
                                                        value={<Typography sx={{color: 'text.primary'}} variant="body1">{authData?.username}</Typography>}/>
                                                </Grid>
                                                <Grid size={{xs: 12, md: 6}}>
                                                    <Info icon={<Security sx={{color: 'secondary.main', fontSize: 20}}/>}
                                                        title={<Typography sx={{color: 'text.secondary'}} variant="caption">Account Status</Typography>}
                                                        value={<Typography sx={{color: 'text.primary'}} variant="body1">{authData?.status}</Typography>}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>

                                    <Card elevation={0}>
                                        <CardContent sx={{p: 3}}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
                                                <Stack direction="row" spacing={1.5} alignItems="center">
                                                    <IconButton size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                                        <LocationOn fontSize="small"/>
                                                    </IconButton>
                                                    <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600}}>
                                                        Address Information
                                                    </Typography>
                                                </Stack>
                                                <Link to="/update-profile" style={{textDecoration: 'none'}}>
                                                    <Button size="small" variant="text" color="secondary" sx={{textTransform: 'none'}}>Edit</Button>
                                                </Link>
                                            </Stack>

                                            <Divider sx={{mb: 3}}/>

                                            <Grid container spacing={3}>
                                                {[
                                                    {label: 'Country', value: authData?.address?.country},
                                                    {label: 'Region', value: authData?.address?.region},
                                                    {label: 'City', value: authData?.address?.city},
                                                    {label: 'Street', value: authData?.address?.street},
                                                ].map((field, index) => (
                                                    <Grid key={index} size={{xs: 12, md: 6}}>
                                                        <Typography variant="caption" sx={{color: 'text.secondary'}}>{field.label}</Typography>
                                                        {field.value ? (
                                                            <Typography variant="body1" sx={{color: 'text.primary'}}>{field.value}</Typography>
                                                        ) : (
                                                            <Link to="/update-profile" style={{textDecoration: 'none'}}>
                                                                <Button endIcon={<ChevronRight/>} variant="outlined" color="secondary"
                                                                    size="small" sx={{textTransform: 'none', mt: 0.5}}>
                                                                    Update Profile
                                                                </Button>
                                                            </Link>
                                                        )}
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Stack>
                                </motion.div>
                            </Grid>
                        </Grid>
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

export default ProfilePage;
