import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Chip,
    Container,
    Grid,
    LinearProgress,
    Stack,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getFeaturedShops, selectShop} from "../../redux/features/shop/shop-slice";
import {useEffect} from "react";
import Shop from "../../components/shared/shop";
import Empty from "../../components/shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import {Link} from "react-router-dom";
import {Star, Storefront} from "@mui/icons-material";

const FeaturedShopsPage = () => {
    const dispatch = useDispatch();
    const {featuredShops, shopLoading, shopError} = useSelector(selectShop);

    useEffect(() => {
        dispatch(getFeaturedShops());
    }, [dispatch]);

    return (
        <Layout>
            {shopLoading && <LinearProgress variant="query" color="secondary"/>}

            <Box sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                pt: {xs: 4, md: 6},
                pb: {xs: 3, md: 5},
            }}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{
                            width: 44, height: 44, borderRadius: '50%',
                            bgcolor: 'light.accent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <Storefront sx={{color: 'accent.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'accent.main'}}>
                            Top Rated
                        </Typography>
                    </Stack>
                    <Typography variant="h2" sx={{color: 'text.primary', mb: 1}}>
                        Featured Dispensaries
                    </Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary', maxWidth: 520, mb: 3}}>
                        Top-rated dispensaries trusted by our community. Each location has been vetted for quality, compliance, and customer service.
                    </Typography>
                    {featuredShops && (
                        <Chip
                            icon={<Star sx={{fontSize: 16}}/>}
                            label={`${featuredShops.length} featured locations`}
                            size="small"
                            sx={{bgcolor: 'light.accent', color: 'accent.main', fontWeight: 600}}
                        />
                    )}
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 4}}}>
                {shopError && (
                    <Alert sx={{mb: 3}} severity="error">
                        <AlertTitle>{shopError}</AlertTitle>
                    </Alert>
                )}

                {!shopLoading && featuredShops && featuredShops.length === 0 && (
                    <Box sx={{minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Empty
                            title="No featured dispensaries yet"
                            message="Our team is reviewing dispensaries for the featured list. Check back soon."
                            icon={<img alt="No featured shops" src={emptyIcon} style={{width: 80, height: 80, objectFit: 'contain'}}/>}
                            button={
                                <Link to="/shops" style={{textDecoration: 'none'}}>
                                    <Button variant="contained" disableElevation={true} size="large" color="secondary" sx={{textTransform: 'none'}}>
                                        Browse All Dispensaries
                                    </Button>
                                </Link>
                            }
                        />
                    </Box>
                )}

                {featuredShops && featuredShops.length > 0 && (
                    <Grid container={true} spacing={3}>
                        {featuredShops.map((shop) => (
                            <Grid key={shop._id} item={true} xs={12} sm={6} md={4} lg={3}>
                                <Shop shop={shop}/>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Layout>
    )
}

export default FeaturedShopsPage;
