import {Box, Breadcrumbs, Container, Stack, Typography} from "@mui/material";
import {NavigateNext} from "@mui/icons-material";
import {Link} from "react-router-dom";

const PageBanner = ({title, description, links}) => {
    return (
        <Box sx={{
            bgcolor: 'background.paper',
            borderBottom: '1px solid',
            borderColor: 'divider',
            py: {xs: 4, md: 6},
        }}>
            <Container maxWidth="xl">
                <Stack direction="column" spacing={1} alignItems="flex-start">
                    {links && links.length > 0 && (
                        <Breadcrumbs separator={<NavigateNext sx={{color: 'text.disabled', fontSize: 16}}/>} sx={{mb: 0.5}}>
                            {links.map((link, i) => (
                                <Link key={i} to={link.path} style={{textDecoration: 'none'}}>
                                    <Typography variant="body2" sx={{
                                        color: i === links.length - 1 ? 'secondary.main' : 'text.secondary',
                                        fontWeight: i === links.length - 1 ? 600 : 400,
                                    }}>
                                        {link.label}
                                    </Typography>
                                </Link>
                            ))}
                        </Breadcrumbs>
                    )}
                    <Typography variant="h3" sx={{color: 'text.primary', fontWeight: 800}}>
                        {title}
                    </Typography>
                    {description && (
                        <Typography variant="body1" sx={{color: 'text.secondary', maxWidth: 600}}>
                            {description}
                        </Typography>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};

export default PageBanner;
