import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Container,
    Divider,
    Grid,
    IconButton,
    LinearProgress,
    Link,
    Rating,
    Skeleton,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {UTILS} from "../../utils/utils";
import {
    AddShoppingCart,
    Cake,
    Call,
    Favorite,
    FavoriteBorder,
    Mail,
    RateReview,
    Science,
    Verified
} from "@mui/icons-material";
import moment from "moment";
import RatingSummary from "../../components/shared/rating-summary";
import {useEffect, useState} from "react";
import Reviews from "../../components/tabs/reviews";
import ReviewForm from "../../components/dialogs/review-form";
import {useFormik} from "formik";
import * as yup from "yup";
import {useParams} from "react-router";
import {useSnackbar} from "notistack";
import currencyFormatter from "currency-formatter";
import {getEdible, selectEdible} from "../../redux/features/edible/edible-slice";
import {addItem} from "../../redux/features/cart/cart-slice";
import {addToWishlist} from "../../redux/features/wishlist/wishlist-slice";
import {selectWishlist} from "../../redux/features/wishlist/wishlist-slice";
import {createReview} from "../../redux/features/review/review-slice";

const EdibleDetailPage = () => {
    const {edibleLoading, edibleError, edibleDetail, edibles, featuredEdibles} = useSelector(selectEdible);
    const {wishlists} = useSelector(selectWishlist);
    const {edibleID, productID} = useParams();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        const id = edibleID || productID;
        if (id) {
            dispatch(getEdible({id}));
        }
    }, [dispatch, edibleID, productID]);

    const id = edibleID || productID;
    const edibleData = edibleDetail || [...(edibles || []), ...(featuredEdibles || [])].find(p => p._id === id) || null;

    const isWishlist = () => {
        return wishlists?.find(item => item._id === edibleData?._id);
    };

    const handleAddToCart = () => {
        if (edibleDetail) {
            dispatch(addItem(edibleDetail));
            enqueueSnackbar(`Added ${edibleData?.name} to your cart.`, {variant: 'success'});
        }
    };

    const handleAddToWishlist = () => {
        if (edibleDetail) {
            dispatch(addToWishlist({
                data: {product: edibleData?._id},
                showMessage: enqueueSnackbar
            }));
        }
    };

    const formik = useFormik({
        validationSchema: yup.object({
            text: yup.string().max(200, "Can't exceed 200 characters").required('Review required'),
            rating: yup.string().min(0, "Can't go beneath 0").max(5, "Can't exceed 5").required('Review required')
        }),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, formikHelpers) => {
            dispatch(createReview({
                review: {...values, product: edibleData?._id},
                showMessage: enqueueSnackbar,
                handleClose: () => {
                    setReviewDialogOpen(false);
                    formikHelpers.resetForm();
                }
            }));
        },
        initialValues: {
            text: '',
            rating: '',
        }
    });

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Layout>
            {edibleLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container maxWidth="lg" sx={{py: {xs: 3, md: 5}}}>
                {edibleError && (
                    <Alert sx={{mb: 3}} severity="error">
                        <AlertTitle>{edibleError}</AlertTitle>
                    </Alert>
                )}

                <Grid container spacing={4}>
                    {/* Edible Image */}
                    <Grid size={{xs: 12, md: 6}}>
                        {edibleLoading ? (
                            <Skeleton variant="rounded" animation="wave" sx={{width: '100%', height: 500, borderRadius: 4}}/>
                        ) : (
                            <Box sx={{position: 'relative'}}>
                                <Box
                                    component="img"
                                    src={edibleData?.image}
                                    alt={`${edibleData?.name} edible`}
                                    sx={{
                                        width: '100%',
                                        height: {xs: 350, md: 500},
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        borderRadius: 4,
                                    }}
                                />
                                <Chip
                                    icon={<Cake sx={{fontSize: 16}}/>}
                                    label="Edible"
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 16,
                                        left: 16,
                                        bgcolor: 'background.paper',
                                        color: 'accent.main',
                                        fontWeight: 600,
                                        backdropFilter: 'blur(10px)',
                                    }}
                                />
                            </Box>
                        )}

                        {/* Seller Card */}
                        <Card elevation={0} sx={{mt: 2}}>
                            <CardContent>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar sx={{bgcolor: 'light.secondary', width: 48, height: 48}}>
                                            <Typography sx={{color: 'secondary.main'}} variant="body1">
                                                {UTILS.getInitials(edibleData?.owner?.fullName)}
                                            </Typography>
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                                                {edibleData?.owner?.fullName}
                                            </Typography>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Verified sx={{color: 'secondary.main', fontSize: 14}}/>
                                                <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                                    Verified Dispensary
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                    <IconButton
                                        component={Link}
                                        href={`tel:${edibleData?.owner?.phone}`}
                                        sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                        <Call fontSize="small"/>
                                    </IconButton>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Edible Info */}
                    <Grid size={{xs: 12, md: 6}}>
                        <Stack spacing={2.5}>
                            {UTILS.renderProductStatus(edibleData?.status)}

                            {edibleLoading ? (
                                <Skeleton variant="text" animation="wave" width="60%"/>
                            ) : (
                                <Typography variant="h3" sx={{color: 'text.primary'}}>
                                    {edibleData?.name}
                                </Typography>
                            )}

                            {edibleLoading ? (
                                <Skeleton variant="text" animation="wave" width="30%"/>
                            ) : (
                                <Typography variant="h4" sx={{color: 'secondary.main', fontWeight: 700}}>
                                    {edibleData?.price && currencyFormatter.format(
                                        edibleData?.price.amount,
                                        {code: edibleData?.price.currency}
                                    )}
                                </Typography>
                            )}

                            <Stack direction="row" spacing={1} alignItems="center">
                                <Rating precision={0.1} readOnly={true} value={edibleData?.rating?.average || 0} size="medium"/>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    ({edibleData?.rating?.count || 0} reviews)
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                {edibleData?.strain && (
                                    <Chip label={edibleData?.strain} size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}/>
                                )}
                                {edibleData?.category && (
                                    <Chip label={edibleData?.category} size="small" sx={{bgcolor: 'light.accent', color: 'accent.main'}}/>
                                )}
                                {edibleData?.thc && (
                                    <Chip icon={<Science sx={{fontSize: 14}}/>} label={`THC: ${edibleData?.thc}`} size="small" variant="outlined" color="secondary"/>
                                )}
                                {edibleData?.cbd && (
                                    <Chip icon={<Science sx={{fontSize: 14}}/>} label={`CBD: ${edibleData?.cbd}`} size="small" variant="outlined" color="secondary"/>
                                )}
                            </Stack>

                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                Listed {moment(edibleData?.createdAt).fromNow()}
                            </Typography>

                            <Divider/>

                            {edibleLoading ? (
                                <Skeleton variant="text" animation="wave"/>
                            ) : (
                                <Typography variant="body1" sx={{color: 'text.secondary', lineHeight: 1.8}}>
                                    {edibleData?.description}
                                </Typography>
                            )}

                            <Divider/>

                            <Stack direction="row" spacing={2}>
                                <Button
                                    onClick={handleAddToCart}
                                    variant="contained"
                                    color="secondary"
                                    size="large"
                                    fullWidth={true}
                                    startIcon={<AddShoppingCart/>}
                                    disableElevation={true}
                                    sx={{textTransform: 'none', py: 1.5}}>
                                    Add to Cart
                                </Button>
                                <Button
                                    onClick={handleAddToWishlist}
                                    variant="outlined"
                                    size="large"
                                    startIcon={isWishlist() ? <Favorite sx={{color: 'error.main'}}/> : <FavoriteBorder sx={{color: 'error.main'}}/>}
                                    sx={{
                                        textTransform: 'none',
                                        color: 'error.main',
                                        borderColor: 'divider',
                                        '&:hover': {borderColor: 'error.main', bgcolor: 'light.red'}
                                    }}>
                                    Save
                                </Button>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <Link underline="none" href={`tel:${edibleData?.shop?.contact?.phone}`}>
                                    <IconButton size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                        <Call fontSize="small"/>
                                    </IconButton>
                                </Link>
                                <Link underline="none" href={`mailto:${edibleData?.shop?.contact?.email}`}>
                                    <IconButton size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                        <Mail fontSize="small"/>
                                    </IconButton>
                                </Link>
                                <Button
                                    onClick={() => setReviewDialogOpen(true)}
                                    variant="text"
                                    color="secondary"
                                    size="small"
                                    startIcon={<RateReview/>}
                                    sx={{textTransform: 'none'}}>
                                    Write a Review
                                </Button>
                            </Stack>

                            <Card elevation={0}>
                                <CardContent>
                                    <RatingSummary rating={edibleData?.rating}/>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Tabs */}
                <Box sx={{mt: 6}}>
                    <Tabs
                        value={tab}
                        onChange={handleTabChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        sx={{borderBottom: '1px solid', borderColor: 'divider', mb: 3}}
                    >
                        <Tab label="Details" sx={{textTransform: 'none'}}/>
                        <Tab label="Reviews" sx={{textTransform: 'none'}}/>
                    </Tabs>

                    {tab === 0 && (
                        <Card elevation={0}>
                            <CardContent sx={{p: 3}}>
                                <Grid container spacing={3}>
                                    {[
                                        {label: 'Product Name', value: edibleData?.name},
                                        {label: 'Category', value: edibleData?.category},
                                        {label: 'Strain Type', value: edibleData?.strain},
                                        {label: 'THC Content', value: edibleData?.thc},
                                        {label: 'CBD Content', value: edibleData?.cbd},
                                        {label: 'Status', value: edibleData?.status},
                                    ].map((field, index) => (
                                        <Grid key={index} size={{xs: 12, md: 6}}>
                                            <Typography variant="overline" sx={{color: 'text.secondary'}}>{field.label}</Typography>
                                            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 500}}>{field.value || 'N/A'}</Typography>
                                        </Grid>
                                    ))}
                                    <Grid size={{xs: 12}}>
                                        <Typography variant="overline" sx={{color: 'text.secondary'}}>Description</Typography>
                                        <Typography variant="body1" sx={{color: 'text.primary', lineHeight: 1.8}}>{edibleData?.description}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}

                    {tab === 1 && <Reviews reviews={edibleData?.reviews}/>}
                </Box>
            </Container>

            {reviewDialogOpen && (
                <ReviewForm open={reviewDialogOpen} handleClose={() => setReviewDialogOpen(false)}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h6" sx={{color: 'text.primary'}}>
                                Write a review for {edibleData?.name}
                            </Typography>
                            <TextField
                                required={true} label="Review" name="text"
                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                fullWidth={true} multiline={true} minRows={4}
                                placeholder="Share your experience with this edible..."
                                value={formik.values.text}
                                error={formik.touched.text && formik.errors.text}
                                helperText={formik.touched.text && formik.errors.text}
                            />
                            <Box>
                                <Typography variant="body2" sx={{color: 'text.secondary', mb: 1}}>Click or drag to rate</Typography>
                                <Rating name="rating" size="large" onChange={formik.handleChange} defaultValue={0}
                                    value={Number(formik.values.rating)} precision={0.1} max={5} min={0} draggable={true} color="secondary"/>
                            </Box>
                            <Button
                                type="submit" loading={formik.isSubmitting}
                                fullWidth={true} size="large" variant="contained" color="secondary"
                                disableElevation={true} sx={{textTransform: 'none', py: 1.5}}>
                                Submit Review
                            </Button>
                        </Stack>
                    </form>
                </ReviewForm>
            )}
        </Layout>
    )
}

export default EdibleDetailPage;
