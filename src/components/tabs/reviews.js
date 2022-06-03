import {Box, Button, Grid} from "@mui/material";
import Empty from "../shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import Review from "../shared/review";

const Reviews = ({reviews}) => {

    return (
        <Box>
            {reviews?.length === 0 ? (
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
                    {reviews?.map((review, index) => {
                        return (
                            <Grid key={index} item={true} xs={12} md={4} lg={3}>
                                <Review review={review}/>
                            </Grid>
                        )
                    })}
                </Grid>
            )}
        </Box>
    )
}

export default Reviews;