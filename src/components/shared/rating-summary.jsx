import {Box, Grid, LinearProgress, Rating, Stack, Typography} from "@mui/material";
import {Star} from "@mui/icons-material";

const RatingBar = ({stars, percentage}) => (
    <Stack direction="row" spacing={1.5} alignItems="center">
        <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 600, width: 12, textAlign: 'right'}}>
            {stars}
        </Typography>
        <Star sx={{color: 'accent.main', fontSize: 14}}/>
        <LinearProgress
            variant="determinate"
            value={percentage || 0}
            sx={{
                flex: 1, height: 8, borderRadius: 4,
                bgcolor: 'divider',
                '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: 'accent.main',
                },
            }}
        />
        <Typography variant="caption" sx={{color: 'text.disabled', fontWeight: 500, width: 36, textAlign: 'right'}}>
            {percentage || 0}%
        </Typography>
    </Stack>
);

const RatingSummary = ({rating}) => {
    return (
        <Box sx={{p: 3, borderRadius: 3, border: '1px solid', borderColor: 'divider', bgcolor: 'background.paper'}}>
            <Grid container spacing={4} alignItems="center">
                <Grid size={{xs: 12, md: 4}}>
                    <Box sx={{textAlign: 'center'}}>
                        <Typography variant="h2" sx={{color: 'text.primary', fontWeight: 800, lineHeight: 1}}>
                            {rating?.average?.toFixed(1) || '0.0'}
                        </Typography>
                        <Rating
                            readOnly precision={0.1} value={rating?.average || 0} size="medium"
                            sx={{my: 1, '& .MuiRating-iconFilled': {color: 'accent.main'}}}
                        />
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                            {rating?.count || 0} reviews
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={{xs: 12, md: 8}}>
                    <Stack spacing={1}>
                        <RatingBar stars={5} percentage={rating?.details?.five}/>
                        <RatingBar stars={4} percentage={rating?.details?.four}/>
                        <RatingBar stars={3} percentage={rating?.details?.three}/>
                        <RatingBar stars={2} percentage={rating?.details?.two}/>
                        <RatingBar stars={1} percentage={rating?.details?.one}/>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RatingSummary;
