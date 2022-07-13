import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    LinearProgress,
    OutlinedInput,
    Rating,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Link} from "react-router-dom";
import Carousel from "nuka-carousel";
import Product from "../../components/shared/product";
import {ChevronRight} from "@mui/icons-material";
import Shop from "../../components/shared/shop";
import FAQ from "../../components/shared/faq";
import {LoadingButton} from "@mui/lab";
import Empty from "../../components/shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import Testimonial from "../../components/shared/testimonial";
import {useSelector} from "react-redux";
import {selectProducts} from "../../redux/features/product/product-slice";
import {selectShop} from "../../redux/features/shop/shop-slice";
import {selectFAQs} from "../../redux/features/faq/faqs-slice";
import {selectTestimonials} from "../../redux/features/testimonial/testimonials-slice";
import {useFormik} from "formik";
import * as yup from "yup";
import ReviewForm from "../../components/dialogs/review-form";
import {useState} from "react";
import Banner from "../../components/shared/banner";
import banner from "../../assets/images/banner.jpg";

const AboutPage = () => {

    const {featuredProducts, productLoading,} = useSelector(selectProducts);
    const {featuredShops, shopLoading} = useSelector(selectShop);
    const {faqLoading, faqs, faqError} = useSelector(selectFAQs);
    const {testimonialLoading, testimonials, testimonialError} = useSelector(selectTestimonials);
    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

    const theme = useTheme();

    const small = useMediaQuery(theme.breakpoints.up('xs'));
    const medium = useMediaQuery(theme.breakpoints.up('md'));
    const large = useMediaQuery(theme.breakpoints.up('lg'));

    const formik = useFormik({
        initialValues: {
            subject: '',
            text: ''
        },
        onSubmit: (values, formikHelpers) => {
            console.log(values, formikHelpers);
        },
        validateOnBlur: true,
        validateOnChange: true,
        validationSchema: yup.object({
            subject: yup.string().required('Subject required'),
            text: yup.string().required('Message required'),
        })
    });


    return (
        <Layout>
            <Box sx={{
                height: {xs: '90vh', md: '80vh', lg: '70vh'},
                width: '100vw',
                maxWidth: '100vw',
                overflow: 'hidden',
                mb: 4
            }}>
                <Banner
                    image={
                        <img
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                maxWidth: '100vw'
                            }}
                            alt=""
                            src={banner}
                        />
                    }
                    children={
                        <Box>
                            <Container maxWidth="xl">
                                <Stack direction="column" spacing={3}>
                                    <Typography
                                        align="center"
                                        sx={{color: 'secondary.main'}}
                                        variant="h3">
                                        Ruderalis
                                    </Typography>
                                    <Typography
                                        sx={{color: 'white'}}
                                        align="center"
                                        variant="h6">
                                        Sons & Daughters of the most High
                                    </Typography>
                                    <Typography
                                        sx={{color: 'white'}}
                                        align="center"
                                        variant="h6">
                                        Get as high as Olympus
                                    </Typography>

                                    <Stack direction="row" justifyContent="center">
                                        <Link
                                            style={{textDecoration: 'none'}}
                                            to="/products">
                                            <Button
                                                disableElevation={true}
                                                sx={{
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                    textTransform: 'capitalize'
                                                }}
                                                variant="contained"
                                                size="large">
                                                Order some high grade
                                            </Button>
                                        </Link>
                                    </Stack>
                                </Stack>
                            </Container>
                        </Box>
                    }
                />
            </Box>

            <Container maxWidth="xl">

                <Box sx={{minHeight: '50vh', paddingY: 4}}>
                    <Grid spacing={4} container={true}>
                        <Grid item={true} xs={12} md={6}>
                            <Box>

                                <Typography sx={{color: 'text.primary'}} variant="h6">
                                    FAQ
                                </Typography>
                                <Typography sx={{color: 'text.secondary'}} variant="body2">
                                    Get the answers you need to your questions
                                </Typography>

                                <Divider sx={{mb: 2}} variant="fullWidth" light={true}/>

                                {faqError && (
                                    <Alert severity="error">
                                        <AlertTitle>{faqError}</AlertTitle>
                                    </Alert>
                                )}
                            </Box>


                            <Stack direction="column" spacing={2}>
                                {faqs && faqs.map((faq, index) => {
                                    return (
                                        <Box key={index}>
                                            <FAQ faq={faq}/>
                                        </Box>
                                    )
                                })}
                            </Stack>

                        </Grid>
                        <Grid item={true} xs={12} md={6}>
                            <Card
                                elevation={0}
                                sx={{
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32
                                }}>
                                {faqLoading && <LinearProgress color="secondary" variant="query"/>}
                                <CardContent>
                                    <Stack direction="column" spacing={2}>
                                        <Typography sx={{color: 'text.primary'}} variant="h6">
                                            Send us a message
                                        </Typography>
                                        <Typography sx={{color: 'text.secondary'}} variant="body2">
                                            Question not found in FAQ?
                                        </Typography>

                                        <Divider variant="fullWidth" light={true}/>

                                        {faqError && (
                                            <Alert severity="error">
                                                <AlertTitle>{faqError}</AlertTitle>
                                            </Alert>
                                        )}
                                        <Box>
                                            <form onSubmit={formik.handleSubmit}>
                                                <Stack direction="column" spacing={2}>
                                                    <FormControl fullWidth={true} variant="outlined">
                                                        <InputLabel htmlFor="subject">Subject</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth={true}
                                                            sx={{}}
                                                            value={formik.values.subject}
                                                            id="subject"
                                                            name="subject"
                                                            type="text"
                                                            error={formik.touched.subject && formik.errors.subject}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter subject"
                                                            required={true}
                                                            label="Subject"
                                                            size="medium"
                                                            margin="dense"
                                                        />
                                                        {formik.touched.subject && formik.errors.subject && (
                                                            <FormHelperText
                                                                error={true}>
                                                                {formik.errors.subject}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <FormControl fullWidth={true} variant="outlined">
                                                        <InputLabel htmlFor="subject">Message</InputLabel>
                                                        <OutlinedInput
                                                            fullWidth={true}
                                                            sx={{}}
                                                            value={formik.values.text}
                                                            id="text"
                                                            name="text"
                                                            type="text"
                                                            error={formik.touched.text && formik.errors.text}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter message"
                                                            required={true}
                                                            label="Message"
                                                            size="medium"
                                                            margin="dense"
                                                            multiline={true}
                                                            minRows={5}
                                                        />
                                                        {formik.touched.text && formik.errors.text && (
                                                            <FormHelperText
                                                                error={true}>
                                                                {formik.errors.text}
                                                            </FormHelperText>
                                                        )}
                                                    </FormControl>
                                                    <LoadingButton
                                                        size="large"
                                                        color="secondary"
                                                        sx={{
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                            textTransform: 'capitalize',
                                                            py: 1.2
                                                        }}
                                                        loadingPosition="start"
                                                        startIcon={formik.isSubmitting ?
                                                            <CircularProgress color="secondary"/> : null}
                                                        loadingIndicator={formik.isSubmitting ?
                                                            <CircularProgress color="secondary"/> : null}
                                                        loading={formik.isSubmitting}
                                                        fullWidth={true}
                                                        variant="contained"
                                                        disableElevation={true}>
                                                        {formik.isSubmitting ? 'Sending...' : 'Send Message'}
                                                    </LoadingButton>
                                                </Stack>
                                            </form>
                                        </Box>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{minHeight: '50vh', paddingY: 4}}>
                    {testimonialLoading && <LinearProgress variant="query" color="secondary"/>}
                    {testimonialError && (
                        <Alert severity="error">
                            <AlertTitle>{testimonialError}</AlertTitle>
                        </Alert>
                    )}
                    <Grid
                        container={true}
                        spacing={2}
                        justifyContent="space-between"
                        alignItems="center">
                        <Grid item={true} xs={12} md="auto">
                            <Typography variant="h4" sx={{color: 'text.primary'}}>
                                Testimonials
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} md="auto">
                            <Button
                                onClick={() => setReviewDialogOpen(true)}
                                size="medium"
                                fullWidth={true}
                                variant="outlined"
                                sx={{
                                    color: 'secondary.main',
                                    textTransform: 'capitalize',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    backgroundColor: 'light.secondary'
                                }}>
                                Write a Review
                            </Button>
                        </Grid>
                    </Grid>

                    <Box sx={{mt: 4}}>
                        {testimonials?.length === 0 ? (
                            <Box>
                                <Empty
                                    title="No reviews"
                                    message="Oops looks like this shop has no reviews. Be the first to review."
                                    button={
                                        <Button
                                            variant="contained"
                                            size="large"
                                            color="secondary"
                                            disableElevation={true}
                                            sx={{
                                                textTransform: 'capitalize',
                                                borderTopRightRadius: 16,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 16,
                                                borderTopLeftRadius: 16
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
                                            }}/>}
                                />
                            </Box>
                        ) : (
                            <Grid container={true} spacing={2}>
                                {testimonials?.map((testimonial, index) => {
                                    return (
                                        <Grid key={index} item={true} xs={12} md={4} lg={3}>
                                            <Testimonial testimonial={testimonial}/>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        )}
                    </Box>

                </Box>

                <Box sx={{minHeight: '50vh', paddingY: 4}}>

                    <Typography
                        sx={{color: 'text.primary'}}
                        align="center"
                        variant="h4">
                        Featured Marijuana
                    </Typography>

                    <Typography
                        sx={{color: 'text.secondary'}}
                        align="center"
                        variant="body1">
                        View our featured product
                    </Typography>

                    <Divider variant="fullWidth" sx={{my: 2}} light={true}/>

                    <Carousel
                        style={{paddingTop: 8, paddingBottom: 8, maxWidth: '100vw'}}
                        withoutControls={true}
                        wrapAround={true}
                        swiping={true}
                        cellAlign="center"
                        pauseOnHover={true}
                        dragging={true}
                        autoplay={true}
                        enableKeyboardControls={true}
                        slidesToShow={large ? 4 : medium ? 3 : small ? 1 : 3}
                        animation="zoom">
                        {productLoading ? (
                            <Box>

                            </Box>
                        ) : (
                            featuredProducts && featuredProducts.map((product, index) => {
                                return (
                                    <Box sx={{py: 2}} key={index}>
                                        <Product product={product}/>
                                    </Box>
                                )
                            })
                        )}
                    </Carousel>

                    <Link to="/products/special/featured" style={{textDecoration: 'none'}}>
                        <Button
                            endIcon={<ChevronRight/>}
                            color="secondary"
                            size="large" sx={{textTransform: 'capitalize'}}
                            variant="text">
                            View All
                        </Button>
                    </Link>
                </Box>

                <Box sx={{minHeight: '50vh', paddingY: 4}}>
                    <Typography
                        sx={{color: 'text.primary'}}
                        align="center"
                        variant="h4">
                        Featured Shops
                    </Typography>

                    <Typography
                        sx={{color: 'text.secondary'}}
                        align="center"
                        variant="body1">
                        View our featured shops
                    </Typography>

                    <Divider variant="fullWidth" sx={{my: 2}} light={true}/>
                    <Carousel
                        style={{paddingTop: 8, paddingBottom: 8}}
                        withoutControls={true}
                        wrapAround={true}
                        swiping={true}
                        cellAlign="center"
                        pauseOnHover={true}
                        dragging={true}
                        autoplay={true}
                        enableKeyboardControls={true}
                        slidesToShow={large ? 4 : medium ? 3 : small ? 1 : 3}
                        animation="zoom"
                        cellSpacing={8}>
                        {shopLoading ? (
                            <Box>

                            </Box>
                        ) : (
                            featuredShops && featuredShops.map((shop, index) => {
                                return (
                                    <Box sx={{py: 2}} key={index}>
                                        <Shop shop={shop}/>
                                    </Box>
                                )
                            })
                        )}
                    </Carousel>


                    <Link to="/shops/special/featured" style={{textDecoration: 'none'}}>
                        <Button
                            endIcon={<ChevronRight/>}
                            color="secondary"
                            size="large" sx={{textTransform: 'capitalize'}}
                            variant="text">
                            View All
                        </Button>
                    </Link>
                </Box>

                {reviewDialogOpen && (
                    <ReviewForm
                        open={reviewDialogOpen}
                        handleClose={() => setReviewDialogOpen(false)}>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack direction="column" spacing={2}>
                                <Typography variant="h6" sx={{color: 'text.primary'}}>
                                    Write a review for Ruderalis
                                </Typography>
                                <TextField
                                    required={true}
                                    label="Review"
                                    name="text"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    fullWidth={true}
                                    multiline={true}
                                    minRows={4}
                                    placeholder="Write a review..."
                                    value={formik.values.text}
                                    error={formik.touched.text && formik.errors.text}
                                    helperText={formik.touched.text && formik.errors.text}
                                />
                                <Box>
                                    <Typography variant="body1" sx={{color: 'text.secondary', mb: 2}}>
                                        Click or drag to rate
                                    </Typography>
                                    <Rating
                                        name="rating"
                                        size="large"
                                        onChange={formik.handleChange}
                                        defaultValue={0}
                                        value={Number(formik.values.rating)}
                                        precision={0.1}
                                        max={5}
                                        min={0}
                                        draggable={true}
                                        color="secondary"
                                    />
                                </Box>
                                <LoadingButton
                                    loading={formik.isSubmitting}
                                    loadingPosition="start"
                                    loadingIndicator={formik.isSubmitting &&
                                        <CircularProgress color="secondary" size={20}/>}
                                    fullWidth={true}
                                    onClick={() => setReviewDialogOpen(true)}
                                    size="medium"
                                    variant="outlined"
                                    sx={{
                                        color: 'secondary.main',
                                        textTransform: 'capitalize',
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
                                        backgroundColor: 'light.secondary',
                                        py: 1.5
                                    }}>
                                    Write a Review
                                </LoadingButton>
                            </Stack>
                        </form>
                    </ReviewForm>
                )}
            </Container>
        </Layout>
    )
}

export default AboutPage;