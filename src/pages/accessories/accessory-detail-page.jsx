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
    Call,
    Favorite,
    FavoriteBorder,
    Inventory2,
    Mail,
    RateReview,
    Verified
} from "@mui/icons-material";
import moment from "moment";
import RatingSummary from "../../components/shared/rating-summary";
import {useEffect, useState} from "react";
import Reviews from "../../components/tabs/reviews";
import ReviewForm from "../../components/dialogs/review-form";
import {useFormik} from "formik";
import * as yup from "yup";
import {LoadingButton} from "@mui/lab";
import {useParams} from "react-router";
import {useSnackbar} from "notistack";
import currencyFormatter from "currency-formatter";
import {getAccessory, selectAccessories} from "../../redux/features/accessory/accessory-slice";
import {addItem} from "../../redux/features/cart/cart-slice";
import {addToWishlist} from "../../redux/features/wishlist/wishlist-slice";
import {selectWishlist} from "../../redux/features/wishlist/wishlist-slice";
import {createReview} from "../../redux/features/review/review-slice";

const AccessoryDetailPage = () => {
    const {accessoryLoading, accessoryError, accessoryDetail} = useSelector(selectAccessories);
    const {wishlists} = useSelector(selectWishlist);
    const {productID} = useParams();
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();

    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
    const [tab, setTab] = useState(0);

    useEffect(() => {
        if (productID) {
            dispatch(getAccessory({id: productID}));
        }
    }, [dispatch, productID]);

    const isWishlist = () => {
        return wishlists?.find(item => item._id === accessoryDetail?._id);
    };

    const handleAddToCart = () => {
        if (accessoryDetail) {
            dispatch(addItem(accessoryDetail));
            enqueueSnackbar(`Added ${accessoryDetail.name} to your cart.`, {variant: 'success'});
        }
    };

    const handleAddToWishlist = () => {
        if (accessoryDetail) {
            dispatch(addToWishlist({
                data: {product: accessoryDetail._id},
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
                review: {...values, product: accessoryDetail?._id},
                showMessage: enqueueSnackbar,
                handleClose: () => {
                    setReviewDialogOpen(false);
                    formikHelpers.resetForm();
                }
            }));
        },
        initialValues: {text: '', rating: ''}
    });

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Layout>
            {accessoryLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container maxWidth="lg" sx={{py: {xs: 3, md: 5}}}>
                {accessoryError && (
                    <Alert sx={{mb: 3}} severity="error">
                        <AlertTitle>{accessoryError}</AlertTitle>
                    </Alert>
                )}

                <Grid container spacing={4}>
                    {/* Image */}
                    <Grid size={{xs: 12, md: 6}}>
                        {accessoryLoading ? (
                            <Skeleton variant="rounded" animation="wave" sx={{width: '100%', height: 500, borderRadius: 4}}/>
                        ) : (
                            <Box sx={{position: 'relative'}}>
                                <Box
                                    component="img"
                                    src={accessoryDetail?.image}
                                    alt={`${accessoryDetail?.name} accessory`}
                                    sx={{
                                        width: '100%',
                                        height: {xs: 350, md: 500},
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                        borderRadius: 4,
                                    }}
                                />
                                <Chip
                                    icon={<Inventory2 sx={{fontSize: 16}}/>}
                                    label="Accessory"
                                    size="small"
                                    sx={{
                                        position: 'absolute', top: 16, left: 16,
                                        bgcolor: 'background.paper', color: 'secondary.main',
                                        fontWeight: 600, backdropFilter: 'blur(10px)',
                                    }}
                                />
                            </Box>
                        )}

                        <Card elevation={0} sx={{mt: 2}}>
                            <CardContent>
                                <Stack direction="row" alignItems="center" justifyContent="space-between">
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Avatar sx={{bgcolor: 'light.secondary', width: 48, height: 48}}>
                                            <Typography sx={{color: 'secondary.main'}} variant="body1">
                                                {UTILS.getInitials(accessoryDetail?.owner?.fullName)}
                                            </Typography>
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 600}}>
                                                {accessoryDetail?.owner?.fullName}
                                            </Typography>
                                            <Stack direction="row" spacing={0.5} alignItems="center">
                                                <Verified sx={{color: 'secondary.main', fontSize: 14}}/>
                                                <Typography variant="caption" sx={{color: 'text.secondary'}}>Verified Seller</Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                    <IconButton component={Link} href={`tel:${accessoryDetail?.owner?.phone}`}
                                        sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                        <Call fontSize="small"/>
                                    </IconButton>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Info */}
                    <Grid size={{xs: 12, md: 6}}>
                        <Stack spacing={2.5}>
                            {UTILS.renderProductStatus(accessoryDetail?.status)}

                            {accessoryLoading ? (
                                <Skeleton variant="text" animation="wave" width="60%"/>
                            ) : (
                                <Typography variant="h3" sx={{color: 'text.primary'}}>{accessoryDetail?.name}</Typography>
                            )}

                            {accessoryLoading ? (
                                <Skeleton variant="text" animation="wave" width="30%"/>
                            ) : (
                                <Typography variant="h4" sx={{color: 'secondary.main', fontWeight: 700}}>
                                    {accessoryDetail?.price && currencyFormatter.format(accessoryDetail.price.amount, {code: accessoryDetail.price.currency})}
                                </Typography>
                            )}

                            <Stack direction="row" spacing={1} alignItems="center">
                                <Rating precision={0.1} readOnly={true} value={accessoryDetail?.rating?.average || 0} size="medium"/>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    ({accessoryDetail?.rating?.count || 0} reviews)
                                </Typography>
                            </Stack>

                            {accessoryDetail?.category && (
                                <Chip label={accessoryDetail.category} size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main', width: 'fit-content'}}/>
                            )}

                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                Listed {moment(accessoryDetail?.createdAt).fromNow()}
                            </Typography>

                            <Divider/>

                            {accessoryLoading ? (
                                <Skeleton variant="text" animation="wave"/>
                            ) : (
                                <Typography variant="body1" sx={{color: 'text.secondary', lineHeight: 1.8}}>
                                    {accessoryDetail?.description}
                                </Typography>
                            )}

                            <Divider/>

                            <Stack direction="row" spacing={2}>
                                <Button onClick={handleAddToCart} variant="contained" color="secondary" size="large"
                                    fullWidth={true} startIcon={<AddShoppingCart/>} disableElevation={true}
                                    sx={{textTransform: 'none', py: 1.5}}>
                                    Add to Cart
                                </Button>
                                <Button onClick={handleAddToWishlist} variant="outlined" size="large"
                                    startIcon={isWishlist() ? <Favorite sx={{color: 'error.main'}}/> : <FavoriteBorder sx={{color: 'error.main'}}/>}
                                    sx={{textTransform: 'none', color: 'error.main', borderColor: 'divider', '&:hover': {borderColor: 'error.main', bgcolor: 'light.red'}}}>
                                    Save
                                </Button>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <Link underline="none" href={`tel:${accessoryDetail?.shop?.contact?.phone}`}>
                                    <IconButton size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}><Call fontSize="small"/></IconButton>
                                </Link>
                                <Link underline="none" href={`mailto:${accessoryDetail?.shop?.contact?.email}`}>
                                    <IconButton size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}><Mail fontSize="small"/></IconButton>
                                </Link>
                                <Button onClick={() => setReviewDialogOpen(true)} variant="text" color="secondary" size="small"
                                    startIcon={<RateReview/>} sx={{textTransform: 'none'}}>
                                    Write a Review
                                </Button>
                            </Stack>

                            <Card elevation={0}>
                                <CardContent><RatingSummary rating={accessoryDetail?.rating}/></CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Tabs */}
                <Box sx={{mt: 6}}>
                    <Tabs value={tab} onChange={handleTabChange} textColor="secondary" indicatorColor="secondary"
                        sx={{borderBottom: '1px solid', borderColor: 'divider', mb: 3}}>
                        <Tab label="Details" sx={{textTransform: 'none'}}/>
                        <Tab label="Reviews" sx={{textTransform: 'none'}}/>
                    </Tabs>

                    {tab === 0 && (
                        <Card elevation={0}>
                            <CardContent sx={{p: 3}}>
                                <Grid container spacing={3}>
                                    {[
                                        {label: 'Product Name', value: accessoryDetail?.name},
                                        {label: 'Category', value: accessoryDetail?.category},
                                        {label: 'Status', value: accessoryDetail?.status},
                                        {label: 'Price', value: accessoryDetail?.price && currencyFormatter.format(accessoryDetail.price.amount, {code: accessoryDetail.price.currency})},
                                    ].map((field, index) => (
                                        <Grid key={index} size={{xs: 12, md: 6}}>
                                            <Typography variant="overline" sx={{color: 'text.secondary'}}>{field.label}</Typography>
                                            <Typography variant="body1" sx={{color: 'text.primary', fontWeight: 500}}>{field.value || 'N/A'}</Typography>
                                        </Grid>
                                    ))}
                                    <Grid size={{xs: 12}}>
                                        <Typography variant="overline" sx={{color: 'text.secondary'}}>Description</Typography>
                                        <Typography variant="body1" sx={{color: 'text.primary', lineHeight: 1.8}}>{accessoryDetail?.description}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    )}

                    {tab === 1 && <Reviews reviews={accessoryDetail?.reviews}/>}
                </Box>
            </Container>

            {reviewDialogOpen && (
                <ReviewForm open={reviewDialogOpen} handleClose={() => setReviewDialogOpen(false)}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h6" sx={{color: 'text.primary'}}>Write a review for {accessoryDetail?.name}</Typography>
                            <TextField required={true} label="Review" name="text" onChange={formik.handleChange} onBlur={formik.handleBlur}
                                fullWidth={true} multiline={true} minRows={4} placeholder="Share your experience..."
                                value={formik.values.text} error={formik.touched.text && formik.errors.text}
                                helperText={formik.touched.text && formik.errors.text}/>
                            <Box>
                                <Typography variant="body2" sx={{color: 'text.secondary', mb: 1}}>Click or drag to rate</Typography>
                                <Rating name="rating" size="large" onChange={formik.handleChange} defaultValue={0}
                                    value={Number(formik.values.rating)} precision={0.1} max={5} min={0} draggable={true} color="secondary"/>
                            </Box>
                            <LoadingButton type="submit" loading={formik.isSubmitting} loadingPosition="start"
                                loadingIndicator={formik.isSubmitting && <CircularProgress color="secondary" size={20}/>}
                                fullWidth={true} size="large" variant="contained" color="secondary" disableElevation={true}
                                sx={{textTransform: 'none', py: 1.5}}>
                                Submit Review
                            </LoadingButton>
                        </Stack>
                    </form>
                </ReviewForm>
            )}
        </Layout>
    )
}

export default AccessoryDetailPage;
