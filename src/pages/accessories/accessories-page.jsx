import {motion} from "framer-motion";
import {fadeUp, stagger} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    LinearProgress,
    MenuItem,
    OutlinedInput,
    Select,
    Stack,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getAccessories, selectAccessories} from "../../redux/features/accessory/accessory-slice";
import Empty from "../../components/shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import {useEffect, useState} from "react";
import {Inventory2, Search} from "@mui/icons-material";
import Product from "../../components/shared/product";
import {useFormik} from "formik";
import * as yup from "yup";

const AccessoriesPage = () => {
    const {accessoryLoading, accessories, accessoryError} = useSelector(selectAccessories);
    const dispatch = useDispatch();

    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        dispatch(getAccessories({query: ''}));
    }, [dispatch]);

    const validationSchema = yup.object({
        searchQuery: yup.string().required('Field required')
    });
    const formik = useFormik({
        initialValues: {
            searchQuery: ''
        },
        onSubmit: values => {
            dispatch(getAccessories({query: values.searchQuery}));
        },
        validationSchema
    });

    return (
        <Layout>
            {accessoryLoading && <LinearProgress variant="query" color="secondary"/>}

            <Box sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                pt: {xs: 4, md: 6},
                pb: {xs: 3, md: 5},
            }}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            bgcolor: 'light.secondary',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Inventory2 sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>
                            Gear & Equipment
                        </Typography>
                    </Stack>
                    <Typography variant="h2" sx={{color: 'text.primary', mb: 1}}>
                        Accessories
                    </Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary', maxWidth: 480, mb: 3}}>
                        Premium rolling papers, vaporizers, glassware, and everything you need to elevate your experience.
                    </Typography>
                    {accessories && (
                        <Chip
                            label={`${accessories.length} items available`}
                            size="small"
                            sx={{bgcolor: 'light.secondary', color: 'secondary.main', fontWeight: 600}}
                        />
                    )}
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 4}}}>
                {accessoryError && (
                    <Alert sx={{mb: 3}} severity="error">
                        <AlertTitle>{accessoryError}</AlertTitle>
                    </Alert>
                )}

                {/* Search & Filter Bar */}
                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                <Card elevation={0} sx={{mb: 4}}>
                    <CardContent sx={{p: {xs: 2, md: 3}}}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid size={{xs: 12, md: 5}}>
                                <form onSubmit={formik.handleSubmit}>
                                    <FormControl fullWidth={true} variant="outlined">
                                        <OutlinedInput
                                            placeholder="Search accessories..."
                                            fullWidth={true}
                                            size="small"
                                            error={Boolean(formik.errors.searchQuery)}
                                            value={formik.values.searchQuery}
                                            onChange={formik.handleChange}
                                            name="searchQuery"
                                            id="searchQuery"
                                            color="secondary"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Search sx={{color: 'text.secondary', fontSize: 20}}/>
                                                </InputAdornment>
                                            }
                                        />
                                        {formik.errors.searchQuery && (
                                            <FormHelperText error={true}>{formik.errors.searchQuery}</FormHelperText>
                                        )}
                                    </FormControl>
                                </form>
                            </Grid>
                            <Grid size={{xs: 6, md: 3.5}}>
                                <FormControl fullWidth={true} variant="outlined" size="small">
                                    <InputLabel htmlFor="status">Status</InputLabel>
                                    <Select
                                        name="status"
                                        onChange={event => setStatus(event.target.value)}
                                        value={status}
                                        color="secondary"
                                        label="Status"
                                    >
                                        <MenuItem value="">All</MenuItem>
                                        <MenuItem value="featured">Featured</MenuItem>
                                        <MenuItem value="verified">Verified</MenuItem>
                                        <MenuItem value="regular">Regular</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{xs: 6, md: 3.5}}>
                                <FormControl fullWidth={true} variant="outlined" size="small">
                                    <InputLabel htmlFor="sortBy">Sort By</InputLabel>
                                    <Select
                                        name="sortBy"
                                        onChange={event => setSortBy(event.target.value)}
                                        value={sortBy}
                                        color="secondary"
                                        label="Sort By"
                                    >
                                        <MenuItem value="">Default</MenuItem>
                                        <MenuItem value="date">Newest</MenuItem>
                                        <MenuItem value="rating">Top Rated</MenuItem>
                                        <MenuItem value="price">Price</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                </motion.div>

                {/* Grid */}
                {accessories && accessories.length === 0 ? (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '40vh',
                    }}>
                        <Empty
                            title="No accessories available"
                            message="New accessories are on the way. Check back soon."
                            button={
                                <Button
                                    onClick={() => dispatch(getAccessories({query: ''}))}
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    disableElevation={true}
                                    sx={{textTransform: 'none'}}>
                                    Refresh
                                </Button>
                            }
                            icon={
                                <img
                                    alt="Empty Icon"
                                    src={emptyIcon}
                                    style={{height: 80, width: 80, objectFit: 'contain'}}
                                />
                            }
                        />
                    </Box>
                ) : (
                    <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Grid container spacing={3}>
                        {accessories && accessories.map((accessory, index) => (
                            <Grid key={index} size={{xs: 12, sm: 6, md: 4, lg: 3}}>
                                <motion.div variants={fadeUp}>
                                <Product product={accessory}/>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                    </motion.div>
                )}
            </Container>
        </Layout>
    )
}

export default AccessoriesPage;
