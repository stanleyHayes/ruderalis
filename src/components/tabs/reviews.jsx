import {Box, Button, Chip, Grid, Stack, Typography} from "@mui/material";
import Empty from "../shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import Review from "../shared/review";
import RatingSummary from "../shared/rating-summary";
import {RateReviewOutlined, SortOutlined} from "@mui/icons-material";

const Reviews = ({reviews, rating, onWriteReview}) => {
    return (
        <Box>
            {/* Rating Summary */}
            {rating && (
                <Box sx={{mb: 4}}>
                    <RatingSummary rating={rating}/>
                </Box>
            )}

            {/* Header */}
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 3}}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600}}>
                        Reviews
                    </Typography>
                    {reviews?.length > 0 && (
                        <Chip label={`${reviews.length}`} size="small" color="secondary" variant="outlined"
                            sx={{fontWeight: 700, height: 24}}/>
                    )}
                </Stack>
                <Stack direction="row" spacing={1}>
                    {onWriteReview && (
                        <Button
                            onClick={onWriteReview}
                            variant="contained"
                            color="secondary"
                            size="small"
                            startIcon={<RateReviewOutlined sx={{fontSize: 18}}/>}>
                            Write a Review
                        </Button>
                    )}
                </Stack>
            </Stack>

            {/* Reviews Grid */}
            {reviews?.length === 0 || !reviews ? (
                <Box sx={{py: 4}}>
                    <Empty
                        title="No reviews yet"
                        message="Be the first to share your experience. Your feedback helps other patients make informed decisions."
                        image={emptyIcon}
                    />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {reviews.map((review, index) => (
                        <Grid key={review._id || index} item xs={12} md={6}>
                            <Review review={review}/>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default Reviews;
