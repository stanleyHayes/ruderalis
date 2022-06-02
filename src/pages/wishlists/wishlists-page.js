import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    LinearProgress,
    MenuItem,
    OutlinedInput,
    Select,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import Empty from "../../components/shared/empty";
import emptyIcon from "./../../assets/images/empty.png";
import {useState} from "react";
import {Search} from "@mui/icons-material";
import Product from "../../components/shared/product";
import {useFormik} from "formik";
import * as yup from "yup";
import {selectWishlist} from "../../redux/features/wishlist/wishlist-slice";

const WishlistsPage = () => {
    const {wishlistLoading, wishlists, wishlistError} = useSelector(selectWishlist);

    const [status, setStatus] = useState("");
    const [type, setType] = useState("");
    const [sortBy, setSortBy] = useState("");

    const validationSchema = yup.object({
        searchQuery: yup.string().required('Field required')
    });
    const formik = useFormik({
        initialValues: {
            searchQuery: ''
        },
        onSubmit: values => {
            console.log(values);
        },
        validationSchema
    });

    return (
        <Layout>
            {wishlistLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container sx={{py: 4}}>
                {wishlistError && (
                    <Alert sx={{my: 2}} severity="error">
                        <AlertTitle>{wishlistError}</AlertTitle>
                    </Alert>
                )}
                <Box sx={{pb: 3}}>
                    <Grid alignItems="center" container={true} spacing={2}>
                        <Grid item={true} xs={12} md={6}>
                            <Typography variant="h4" sx={{color: 'text.primary'}}>
                                wishlists ({wishlists && wishlists.length})
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={6}>
                            <FormControl fullWidth={true} variant="outlined">
                                <InputLabel htmlFor="searchQuery">Search</InputLabel>
                                <form onSubmit={formik.handleSubmit}>
                                    <OutlinedInput
                                        variant="outlined"
                                        placeholder="Search product"
                                        label="Search"
                                        fullWidth={true}
                                        required={true}
                                        size="medium"
                                        error={Boolean(formik.errors.searchQuery)}
                                        value={formik.values.searchQuery}
                                        onChange={formik.handleChange}
                                        name="searchQuery"
                                        id="searchQuery"
                                        notched={true}
                                        color="secondary"
                                        endAdornment={
                                            <InputAdornment
                                                sx={{cursor: 'pointer'}}
                                                position="end">
                                                <Search/>
                                            </InputAdornment>
                                        }
                                    />
                                    {formik.errors.searchQuery &&
                                        <FormHelperText error={true}>{formik.errors.searchQuery}</FormHelperText>}
                                </form>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{pb: 3}}>
                    <Grid spacing={2} container={true} alignItems="center">
                        <Grid item={true} xs={12} md={3}>
                            <Typography sx={{color: 'text.secondary'}} variant="h6">Filter By:</Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={3}>
                            <FormControl fullWidth={true} variant="outlined">
                                <InputLabel htmlFor="searchQuery">Status</InputLabel>
                                <Select
                                    name="status"
                                    onChange={event => setStatus(event.target.value)}
                                    value={status}
                                    fullWidth={true}
                                    color="secondary"
                                    label="Status"
                                    variant="outlined">
                                    <MenuItem value="featured">Featured</MenuItem>
                                    <MenuItem value="verified">Verified</MenuItem>
                                    <MenuItem value="regular">Regular</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item={true} xs={12} md={3}>
                            <FormControl fullWidth={true} variant="outlined">
                                <InputLabel htmlFor="sortBy">Sort By</InputLabel>
                                <Select
                                    name="sortBy"
                                    onChange={event => setSortBy(event.target.value)}
                                    value={sortBy}
                                    fullWidth={true}
                                    color="secondary"
                                    label="Sort By"
                                    variant="outlined">
                                    <MenuItem value="date">Date Created</MenuItem>
                                    <MenuItem value="rating">Rating</MenuItem>
                                    <MenuItem value="status">Status</MenuItem>
                                    <MenuItem value="price">Price</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item={true} xs={12} md={3}>
                            <FormControl fullWidth={true} variant="outlined">
                                <InputLabel htmlFor="type">Type</InputLabel>
                                <Select
                                    name="type"
                                    onChange={event => setType(event.target.value)}
                                    value={type}
                                    fullWidth={true}
                                    color="secondary"
                                    label="Type"
                                    variant="outlined">
                                    <MenuItem value="weed">Weed</MenuItem>
                                    <MenuItem value="ecstasy">Ecstasy</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Divider variant="fullWidth" sx={{my: 3}} light={true}/>

                <Grid container={true} spacing={2}>
                    {wishlists && wishlists.length === 0 ? (
                        <Grid item={true} xs={12}>
                            <Box>
                                <Empty
                                    title="No wishlists"
                                    message="Oops looks like there are no wishlists available"
                                    button={
                                        <Button
                                            variant="contained"
                                            size="large"
                                            color="secondary"
                                            disableElevation={true}
                                            sx={{
                                                textTransform: 'capitalize',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32
                                            }}>
                                            Refresh
                                        </Button>
                                    }
                                    icon={
                                        <img
                                            alt="Empty Icon"
                                            src={emptyIcon}
                                            style={{
                                                height: 100,
                                                width: 100,
                                                objectFit: 'cover',
                                                objectPosition: 'center'
                                            }}/>}/>
                            </Box>
                        </Grid>
                    ) : (
                        wishlists && wishlists.map((product, index) => {
                            return (
                                <Grid key={index} item={true} xs={12} md={4}>
                                    <Product product={product}/>
                                </Grid>
                            )
                        })
                    )}
                </Grid>
            </Container>
        </Layout>
    )
}

export default WishlistsPage;