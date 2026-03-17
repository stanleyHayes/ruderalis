import {LinearProgress, Stack, Typography} from "@mui/material";
import {Star} from "@mui/icons-material";

const RatingLine = ({title, percentage}) => {
    return (
        <Stack direction="row" spacing={1.5} alignItems="center">
            <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 600, width: 12, textAlign: 'right'}}>
                {title}
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
};

export default RatingLine;
