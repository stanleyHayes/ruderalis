import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Grid,
    LinearProgress,
    Link,
    Paper,
    Rating,
    Skeleton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import LoadingItem from "../../components/shared/loading-text";
import ContactLink from "../../components/shared/contact-link";
import {UTILS} from "../../utils/utils";
import {Call, Mail} from "@mui/icons-material";
import moment from "moment";
import RatingSummary from "../../components/shared/rating-summary";
import {useState} from "react";
import Reviews from "../../components/tabs/reviews";
import ReviewForm from "../../components/dialogs/review-form";
import {useFormik} from "formik";
import * as yup from "yup";
import {LoadingButton} from "@mui/lab";
import {selectEdible} from "../../redux/features/edible/edible-slice";

const EdibleDetailPage = () => {
    const {edibleLoading, edibleError, edibleDetail} = useSelector(selectEdible);
    // const {edibleID} = useParams();

    const [reviewDialogOpen, setReviewDialogOpen] = useState(false);

    const formik = useFormik({
        validationSchema: yup.object({
            text: yup.string().max(200, "Can't exceed 200 characters").required('Review required'),
            rating: yup.string().min(0, "Can't go beneath 0").max(5, "Can't exceed 5").required('Review required')
        }),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, formikHelpers) => {
        },
        initialValues: {
            text: '',
            rating: '',
        }
    })
    return (
        <Layout>
            {edibleLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container sx={{py: 4}}>
                {edibleError && (
                    <Alert sx={{my: 2}} severity="error">
                        <AlertTitle>{edibleError}</AlertTitle>
                    </Alert>
                )}
                <Box sx={{pt: 4}}>
                    <Grid sx={{mb: 4}} container={true} spacing={4}>
                        <Grid item={true} xs={12} md={6} sx={{width: '100%', height: '100%'}}>
                            <LoadingItem
                                mb={2}
                                item={
                                    <img
                                        src={edibleDetail?.image}
                                        title={`${edibleDetail?.name} edible`}
                                        alt={`${edibleDetail?.name} edible`}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            objectPosition: 'center',
                                            borderTopRightRadius: 32,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 32,
                                            borderTopLeftRadius: 32,
                                        }}
                                    />
                                }
                                loading={edibleLoading}
                                skeleton={
                                    <Skeleton
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            borderTopRightRadius: 16,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 16,
                                            borderTopLeftRadius: 16,
                                        }}
                                        variant="rectangular"
                                        animation="wave"
                                    />}
                            />
                            <Paper
                                elevation={1}
                                sx={{
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                }}>
                                <ContactLink
                                    startIcon={
                                        <Avatar
                                            sx={{
                                                backgroundColor: 'light.secondary',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                            }}>
                                            <Typography
                                                sx={{color: 'secondary.main'}}
                                                variant="h6">
                                                {UTILS.getInitials(edibleDetail?.owner?.fullName)}
                                            </Typography>
                                        </Avatar>
                                    }
                                    text={
                                        <Typography
                                            variant="h6"
                                            sx={{color: 'text.primary'}}>
                                            {edibleDetail?.owner?.fullName}
                                        </Typography>}
                                    link={`tel:${edibleDetail?.owner?.phone}`}
                                    endIcon={
                                        <Call
                                            sx={{
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderRadius: '25%',
                                                padding: 1,
                                                fontSize: 24,
                                                backgroundColor: 'light.secondary',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                            }}
                                        />
                                    }/>
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={12} md={6}>
                            {UTILS.renderProductStatus(edibleDetail?.status)}
                            <LoadingItem
                                mb={2}
                                item={
                                    <Typography variant="h5" sx={{color: 'text.primary'}}>
                                        {edibleDetail?.name}
                                    </Typography>
                                }
                                loading={edibleLoading}
                                skeleton={<Skeleton variant="text" animation="wave"/>}
                            />
                            <Typography variant="body1" sx={{color: 'text.secondary', mb: 2}}>
                                {`Created ${moment(edibleDetail?.createdAt).fromNow()}`}
                            </Typography>
                            <Stack mb={2} direction="row" justifyContent="space-between"
                                   alignItems="center">
                                <Link underline="none" href={`tel:${edibleDetail?.shop?.contact.phone}`}>
                                    <Call
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'secondary.main',
                                            borderRadius: '25%',
                                            padding: 1,
                                            fontSize: 24,
                                            backgroundColor: 'light.secondary',
                                            borderTopRightRadius: 32,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 32,
                                            borderTopLeftRadius: 32,
                                        }}
                                    />
                                </Link>
                                <Link underline="none" href={`mailto:${edibleDetail?.shop?.contact.email}`}>
                                    <Mail
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'secondary.main',
                                            borderRadius: '25%',
                                            padding: 1,
                                            fontSize: 24,
                                            backgroundColor: 'light.secondary',
                                            borderTopRightRadius: 32,
                                            borderBottomRightRadius: 0,
                                            borderBottomLeftRadius: 32,
                                            borderTopLeftRadius: 32,
                                        }}
                                    />
                                </Link>
                                <Button
                                    onClick={() => setReviewDialogOpen(true)}
                                    size="medium"
                                    variant="outlined"
                                    sx={{
                                        color: 'secondary.main',
                                        textTransform: 'capitalize',
                                        borderTopRightRadius: 16,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 16,
                                        borderTopLeftRadius: 16,
                                        backgroundColor: 'light.secondary'
                                    }}>
                                    Write a Review
                                </Button>
                            </Stack>
                            <LoadingItem
                                mb={2}
                                item={
                                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                        {edibleDetail && edibleDetail.description}
                                    </Typography>
                                }
                                loading={edibleLoading}
                                skeleton={<Skeleton variant="text" animation="wave"/>}
                            />

                            <Box>
                                <Card
                                    elevation={1}
                                    sx={{
                                        borderTopRightRadius: 32,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 32,
                                        borderTopLeftRadius: 32,
                                    }}>
                                    <CardContent>
                                        <RatingSummary rating={edibleDetail?.rating}/>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box>
                        <Reviews reviews={edibleDetail?.reviews} />
                    </Box>
                </Box>
            </Container>

            {reviewDialogOpen && (
                <ReviewForm
                    open={reviewDialogOpen}
                    handleClose={() => setReviewDialogOpen(false)}>
                    <form onSubmit={formik.handleSubmit}>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="h6" sx={{color: 'text.primary'}}>
                                Write a review for {edibleDetail?.name}
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
                                    borderTopRightRadius: 16,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 16,
                                    borderTopLeftRadius: 16,
                                    backgroundColor: 'light.secondary',
                                    py: 1.5
                                }}>
                                Write a Review
                            </LoadingButton>
                        </Stack>
                    </form>
                </ReviewForm>
            )}
        </Layout>
    )
}

export default EdibleDetailPage;