import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import {Box, Button, Card, CardContent, Chip, Container, Stack, Typography} from "@mui/material";
import {LocalShipping, Notifications} from "@mui/icons-material";
import {Link} from "react-router-dom";

const TripsPage = () => {
    return (
        <Layout>
            <PageBanner title="Delivery Tracking" description="Coming soon — real-time delivery tracking" links={[{path: '/', label: 'Home'}, {path: '/trips', label: 'Trips'}]}/>
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
                                    <LocalShipping sx={{fontSize: 48, color: 'secondary.main'}}/>
                                </Box>

                                <Chip label="Coming Soon" color="secondary" size="small" sx={{fontWeight: 600}}/>

                                <Typography sx={{color: 'text.primary'}} variant="h3" align="center">
                                    Delivery Tracking
                                </Typography>

                                <Typography sx={{color: 'text.secondary', maxWidth: 380}} variant="body1" align="center">
                                    Real-time delivery tracking is on the way. Soon you will be able to track your dispensary orders from dispatch to your door.
                                </Typography>

                                <Stack direction="row" spacing={1} alignItems="center"
                                    sx={{bgcolor: 'light.secondary', borderRadius: 2, px: 2, py: 1}}>
                                    <Notifications sx={{color: 'secondary.main', fontSize: 18}}/>
                                    <Typography variant="body2" sx={{color: 'secondary.main', fontWeight: 500}}>
                                        We will notify you when this feature launches
                                    </Typography>
                                </Stack>

                                <Link to="/" style={{textDecoration: 'none'}}>
                                    <Button
                                        variant="contained" color="secondary" size="large"
                                        disableElevation={true} sx={{textTransform: 'none', px: 4}}>
                                        Back to Home
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

export default TripsPage;
