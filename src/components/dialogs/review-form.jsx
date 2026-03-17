import {
    Box, Button, Dialog, DialogActions, DialogContent,
    IconButton, LinearProgress, Rating, Stack, TextField, Typography,
} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {createReview, selectReview} from "../../redux/features/review/review-slice";
import {useSnackbar} from "notistack";
import {Close, Star} from "@mui/icons-material";

const ratingLabels = {1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Great', 5: 'Excellent'};

const ReviewForm = ({open, handleClose, productId}) => {
    const dispatch = useDispatch();
    const {reviewLoading} = useSelector(selectReview);
    const {enqueueSnackbar} = useSnackbar();

    const formik = useFormik({
        initialValues: {text: '', rating: 0},
        validationSchema: yup.object({
            text: yup.string().max(500, "Can't exceed 500 characters").required('Review is required'),
            rating: yup.number().min(1, 'Please select a rating').max(5).required('Rating is required'),
        }),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, formikHelpers) => {
            dispatch(createReview({
                review: {...values, product: productId},
                showMessage: enqueueSnackbar,
                handleClose: () => { handleClose(); formikHelpers.resetForm(); },
            }));
        },
    });

    const charCount = formik.values.text.length;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            {reviewLoading && <LinearProgress color="secondary"/>}

            {/* Header */}
            <Box sx={{px: 3, pt: 3, pb: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <Box>
                    <Typography variant="h5" sx={{color: 'text.primary', fontWeight: 700}}>
                        Write a Review
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary', mt: 0.5}}>
                        Your feedback helps other patients find the right products
                    </Typography>
                </Box>
                <IconButton onClick={handleClose} size="small" sx={{color: 'text.secondary'}}>
                    <Close sx={{fontSize: 20}}/>
                </IconButton>
            </Box>

            <DialogContent sx={{px: 3, pt: 3}}>
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={3}>
                        {/* Rating */}
                        <Box sx={{
                            p: 3, borderRadius: 3, bgcolor: 'background.default',
                            border: '1px solid', borderColor: formik.touched.rating && formik.errors.rating ? 'error.main' : 'divider',
                            textAlign: 'center',
                        }}>
                            <Typography variant="subtitle2" sx={{color: 'text.primary', mb: 1.5}}>
                                How would you rate this product?
                            </Typography>
                            <Rating
                                name="rating"
                                size="large"
                                value={Number(formik.values.rating)}
                                onChange={(_, newValue) => formik.setFieldValue('rating', newValue)}
                                sx={{
                                    fontSize: 40,
                                    '& .MuiRating-iconFilled': {color: 'accent.main'},
                                    '& .MuiRating-iconHover': {color: 'accent.light'},
                                }}
                            />
                            {formik.values.rating > 0 && (
                                <Typography variant="body2" sx={{color: 'secondary.main', fontWeight: 600, mt: 1}}>
                                    {ratingLabels[formik.values.rating]}
                                </Typography>
                            )}
                            {formik.touched.rating && formik.errors.rating && (
                                <Typography variant="caption" sx={{color: 'error.main', display: 'block', mt: 0.5}}>
                                    {formik.errors.rating}
                                </Typography>
                            )}
                        </Box>

                        {/* Review Text */}
                        <Box>
                            <TextField
                                fullWidth multiline minRows={4} maxRows={8}
                                label="Your review"
                                placeholder="Tell us about your experience — effects, flavor, how it helped you..."
                                name="text" color="secondary"
                                value={formik.values.text}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.text && Boolean(formik.errors.text)}
                                helperText={formik.touched.text && formik.errors.text}
                            />
                            <Typography variant="caption" sx={{
                                color: charCount > 450 ? 'warning.main' : 'text.disabled',
                                display: 'block', textAlign: 'right', mt: 0.5,
                            }}>
                                {charCount}/500
                            </Typography>
                        </Box>
                    </Stack>
                </form>
            </DialogContent>

            <DialogActions sx={{px: 3, pb: 3, gap: 1}}>
                <Button onClick={handleClose} variant="outlined" color="secondary" size="large" fullWidth>
                    Cancel
                </Button>
                <Button
                    onClick={formik.handleSubmit}
                    disabled={reviewLoading}
                    variant="contained" color="secondary" size="large" fullWidth>
                    Submit Review
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewForm;
