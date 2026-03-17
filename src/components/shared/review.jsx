import {motion} from "framer-motion";
import {fadeIn} from "../../utils/animations";
import {Avatar, Box, Card, CardContent, Chip, IconButton, Rating, Stack, Typography} from "@mui/material";
import {UTILS} from "../../utils/utils";
import {Star, ThumbUpOutlined, VerifiedOutlined} from "@mui/icons-material";

const Review = ({review}) => {
    return (
        <motion.div variants={fadeIn} initial="initial" animate="animate">
        <Card elevation={0} sx={{height: '100%'}}>
            <CardContent sx={{p: 3, '&:last-child': {pb: 3}}}>
                {/* Header: User + Rating */}
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{mb: 2}}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{
                            width: 44, height: 44,
                            background: (t) => `linear-gradient(135deg, ${t.palette.secondary.main}, ${t.palette.secondary.dark})`,
                            fontSize: 15, fontWeight: 700,
                        }}>
                            {UTILS.getInitials(review.user?.fullName)}
                        </Avatar>
                        <Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 600}}>
                                    {review.user?.fullName}
                                </Typography>
                                <VerifiedOutlined sx={{color: 'secondary.main', fontSize: 15}}/>
                            </Stack>
                            <Typography variant="caption" sx={{color: 'text.disabled'}}>
                                {UTILS.formatRelativeDate(review.createdAt)}
                            </Typography>
                        </Box>
                    </Stack>
                    <Box sx={{
                        display: 'flex', alignItems: 'center', gap: 0.5,
                        bgcolor: 'light.secondary', px: 1.5, py: 0.5, borderRadius: 2,
                    }}>
                        <Star sx={{color: 'accent.main', fontSize: 16}}/>
                        <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 700}}>
                            {review.rating?.toFixed(1) || '5.0'}
                        </Typography>
                    </Box>
                </Stack>

                {/* Stars */}
                <Rating
                    readOnly precision={0.1} value={review.rating} size="small"
                    sx={{mb: 1.5, '& .MuiRating-iconFilled': {color: 'accent.main'}}}
                />

                {/* Review text */}
                <Typography variant="body2" sx={{color: 'text.secondary', lineHeight: 1.8, mb: 2}}>
                    {review.text}
                </Typography>

                {/* Footer */}
                <Box sx={{borderTop: '1px solid', borderColor: 'divider', pt: 1.5}}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={0.5} alignItems="center">
                            <IconButton size="small" sx={{color: 'text.disabled', '&:hover': {color: 'secondary.main'}}}>
                                <ThumbUpOutlined sx={{fontSize: 16}}/>
                            </IconButton>
                            <Typography variant="caption" sx={{color: 'text.disabled'}}>Helpful</Typography>
                        </Stack>
                        <Chip label="Verified Purchase" size="small" variant="outlined"
                            sx={{height: 22, fontSize: '0.65rem', fontWeight: 600, borderColor: 'divider', color: 'text.disabled'}}/>
                    </Stack>
                </Box>
            </CardContent>
        </Card>
        </motion.div>
    );
};

export default Review;
