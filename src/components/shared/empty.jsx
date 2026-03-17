import {motion} from "framer-motion";
import {scaleIn} from "../../utils/animations";
import {Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {InboxOutlined} from "@mui/icons-material";

const Empty = ({title, message, icon, image, description, button}) => {
    return (
        <motion.div variants={scaleIn} initial="initial" animate="animate">
        <Card variant="outlined" sx={{overflow: 'hidden', borderStyle: 'dashed', width: '100%'}}>
            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
            <CardContent sx={{py: {xs: 6, md: 8}, textAlign: 'center'}}>
                <Box sx={{
                    width: 80, height: 80, borderRadius: '50%', mx: 'auto', mb: 3,
                    backgroundColor: 'light.secondary',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    {image ? (
                        <Box component="img" src={image}
                            sx={{width: 44, height: 44, objectFit: 'contain'}}/>
                    ) : icon ? (
                        <Box sx={{color: 'secondary.main', display: 'flex'}}>{icon}</Box>
                    ) : (
                        <InboxOutlined sx={{fontSize: 36, color: 'secondary.main'}}/>
                    )}
                </Box>
                <Typography variant="h6" fontWeight={800} sx={{color: 'text.primary', mb: 1}}>
                    {title || 'Nothing here yet'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{maxWidth: 360, mx: 'auto', lineHeight: 1.7, mb: button ? 3 : 0}}>
                    {message || description || 'Check back later for updates.'}
                </Typography>
                {button && <Box>{button}</Box>}
            </CardContent>
        </Card>
        </motion.div>
    );
};

export default Empty;
