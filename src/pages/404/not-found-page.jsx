import Layout from "../../components/layout/layout";
import {Box, Button, Card, CardContent, Container, Divider, Stack, Typography} from "@mui/material";
import {Home, SearchOff, Storefront} from "@mui/icons-material";
import {Link} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <Layout>
            <Box sx={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Container maxWidth="sm">
                    <Card elevation={0}>
                        <CardContent sx={{p: {xs: 4, md: 6}, textAlign: 'center'}}>
                            <Stack spacing={3} alignItems="center">
                                <Box sx={{
                                    width: 120, height: 120, borderRadius: '50%',
                                    bgcolor: 'light.secondary',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <SearchOff sx={{fontSize: 56, color: 'secondary.main'}}/>
                                </Box>

                                <Typography variant="h1" sx={{color: 'secondary.main', fontSize: {xs: '4rem', md: '6rem'}}}>
                                    404
                                </Typography>

                                <Typography variant="h4" sx={{color: 'text.primary'}}>
                                    Page Not Found
                                </Typography>

                                <Typography variant="body1" sx={{color: 'text.secondary', maxWidth: 380}}>
                                    The page you are looking for does not exist or has been moved. Let us get you back to browsing our menu.
                                </Typography>

                                <Divider sx={{width: '100%'}}/>

                                <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} sx={{width: '100%'}}>
                                    <Link to="/" style={{textDecoration: 'none', flex: 1}}>
                                        <Button
                                            variant="contained" color="secondary" size="large"
                                            fullWidth={true} startIcon={<Home/>}
                                            disableElevation={true} sx={{textTransform: 'none', py: 1.5}}>
                                            Back to Home
                                        </Button>
                                    </Link>
                                    <Link to="/products" style={{textDecoration: 'none', flex: 1}}>
                                        <Button
                                            variant="outlined" color="secondary" size="large"
                                            fullWidth={true} startIcon={<Storefront/>}
                                            sx={{textTransform: 'none', py: 1.5}}>
                                            Browse Menu
                                        </Button>
                                    </Link>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Layout>
    )
}

export default NotFoundPage;
