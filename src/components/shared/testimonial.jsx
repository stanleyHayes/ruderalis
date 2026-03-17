import {motion} from "framer-motion";
import {fadeIn} from "../../utils/animations";
import {Avatar, Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {UTILS} from "../../utils/utils";
import {Star} from "@mui/icons-material";

const Testimonial = ({testimonial}) => {
    return (
        <motion.div variants={fadeIn} initial="initial" animate="animate" style={{height: '100%'}}>
        <Card elevation={0} sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
            <CardContent sx={{p: 3, flex: 1, display: 'flex', flexDirection: 'column', '&:last-child': {pb: 3}}}>
                {/* Rating */}
                <Stack direction="row" spacing={0.25} sx={{mb: 2}}>
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} sx={{fontSize: 16, color: i < Math.round(testimonial.rating || 5) ? 'accent.main' : 'divider'}}/>
                    ))}
                </Stack>

                {/* Review text */}
                <Typography variant="body2" sx={{color: 'text.primary', lineHeight: 1.8, flex: 1, mb: 3}}>
                    "{testimonial.text}"
                </Typography>

                {/* Author */}
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{borderTop: '1px solid', borderColor: 'divider', pt: 2}}>
                    <Avatar sx={{width: 36, height: 36, bgcolor: 'secondary.main', fontSize: 13, fontWeight: 700, color: 'common.white'}}>
                        {UTILS.getInitials(testimonial.user?.fullName)}
                    </Avatar>
                    <Box>
                        <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 600, lineHeight: 1.3}}>
                            {testimonial.user?.fullName}
                        </Typography>
                        <Typography variant="caption" sx={{color: 'text.secondary'}}>Verified Patient</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
        </motion.div>
    );
};

export default Testimonial;
