import Layout from "../../components/layout/layout";
import {Box, Button, Card, CardContent, Chip, Container, Stack, Typography} from "@mui/material";
import {Explore, Notifications} from "@mui/icons-material";
import {Link} from "react-router-dom";

const TripsDetailPage = () => {
    return (
        <Layout>
            <Box sx={{minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Container maxWidth="sm">
                    <Card elevation={0}>
                        <CardContent sx={{p: {xs: 4, md: 6}, textAlign: 'center'}}>
                            <Stack spacing={3} alignItems="center">
                                <Box sx={{
                                    width: 100, height: 100, borderRadius: '50%',
                                    bgcolor: 'light.secondary',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Explore sx={{fontSize: 48, color: 'secondary.main'}}/>
                                </Box>

                                <Chip label="Coming Soon" color="secondary" size="small" sx={{fontWeight: 600}}/>

                                <Typography sx={{color: 'text.primary'}} variant="h3" align="center">
                                    Delivery Details
                                </Typography>

                                <Typography sx={{color: 'text.secondary', maxWidth: 380}} variant="body1" align="center">
                                    Detailed delivery tracking with live map updates will be available when the Delivery Tracking feature launches.
                                </Typography>

                                <Stack direction="row" spacing={1} alignItems="center"
                                    sx={{bgcolor: 'light.secondary', borderRadius: 2, px: 2, py: 1}}>
                                    <Notifications sx={{color: 'secondary.main', fontSize: 18}}/>
                                    <Typography variant="body2" sx={{color: 'secondary.main', fontWeight: 500}}>
                                        Stay tuned for updates
                                    </Typography>
                                </Stack>

                                <Link to="/trips" style={{textDecoration: 'none'}}>
                                    <Button
                                        variant="contained" color="secondary" size="large"
                                        disableElevation={true} sx={{textTransform: 'none', px: 4}}>
                                        Back to Deliveries
                                    </Button>
                                </Link>
                            </Stack>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </Layout>
    )
}

export default TripsDetailPage;
