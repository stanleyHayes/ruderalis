import {AppBar, Box, Container, Divider, Stack, Typography} from "@mui/material";
import DesktopHeader from "./desktop-header";
import MobileHeader from "./mobile-header";
import {Link} from "react-router-dom";
import {
    EmailOutlined, LocalPhoneOutlined, LocalShippingOutlined,
    VerifiedOutlined,
} from "@mui/icons-material";

const TopBar = () => (
    <Box sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid', borderColor: 'divider',
        display: {xs: 'none', md: 'block'},
    }}>
        <Container maxWidth="xl">
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{py: 0.75}}>
                <Stack direction="row" spacing={3}>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                        <LocalPhoneOutlined sx={{fontSize: 13, color: 'text.disabled'}}/>
                        <Typography variant="caption" sx={{color: 'text.secondary', fontSize: 11}}>
                            +1 (702) 420-0042
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                        <EmailOutlined sx={{fontSize: 13, color: 'text.disabled'}}/>
                        <Typography variant="caption" sx={{color: 'text.secondary', fontSize: 11}}>
                            hello@ruderalis.com
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={3} alignItems="center">
                    <Stack direction="row" spacing={0.75} alignItems="center">
                        <LocalShippingOutlined sx={{fontSize: 13, color: 'secondary.main'}}/>
                        <Typography variant="caption" sx={{color: 'text.secondary', fontSize: 11}}>
                            Free delivery on orders over $50
                        </Typography>
                    </Stack>
                    <Divider orientation="vertical" flexItem/>
                    <Stack direction="row" spacing={2}>
                        {[
                            {label: 'Track Order', to: '/tracking'},
                            {label: 'Help', to: '/contact'},
                            {label: 'Blog', to: '/blog'},
                        ].map(link => (
                            <Typography key={link.to} component={Link} to={link.to} variant="caption" sx={{
                                color: 'text.secondary', textDecoration: 'none', fontSize: 11, fontWeight: 500,
                                transition: 'color 0.15s', '&:hover': {color: 'secondary.main'},
                            }}>
                                {link.label}
                            </Typography>
                        ))}
                    </Stack>
                    <Divider orientation="vertical" flexItem/>
                    <Stack direction="row" spacing={0.75} alignItems="center">
                        <VerifiedOutlined sx={{fontSize: 13, color: 'secondary.main'}}/>
                        <Typography variant="caption" sx={{color: 'secondary.main', fontSize: 11, fontWeight: 600}}>
                            Licensed Dispensary
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Container>
    </Box>
);

const Header = () => {
    return (
        <AppBar position="sticky" elevation={0} sx={{borderBottom: '1px solid', borderBottomColor: 'divider'}}>
            <TopBar/>
            <Box sx={{display: {xs: 'none', lg: 'block'}}}>
                <DesktopHeader/>
            </Box>
            <Box sx={{display: {xs: 'block', lg: 'none'}}}>
                <MobileHeader/>
            </Box>
        </AppBar>
    );
};

export default Header;
