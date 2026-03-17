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
import {getFeaturedProducts, selectProducts} from "../../redux/features/product/product-slice";
import {useEffect} from "react";
import Product from "../../components/shared/product";
import Empty from "../../components/shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import {Link} from "react-router-dom";
import {AutoAwesome, Star} from "@mui/icons-material";

const FeaturedProductsPage = () => {
    const dispatch = useDispatch();
    const {featuredProducts, productLoading, productError} = useSelector(selectProducts);

    useEffect(() => {
        dispatch(getFeaturedProducts());
    }, [dispatch]);

    return (
        <Layout>
            {productLoading && <LinearProgress variant="query" color="secondary"/>}

            {/* Hero Header */}
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
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            bgcolor: 'light.accent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <AutoAwesome sx={{color: 'accent.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'accent.main'}}>
                            Curated Selection
                        </Typography>
                    </Stack>
                    <Typography variant="h2" sx={{color: 'text.primary', mb: 1}}>
                        Featured Collection
                    </Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary', maxWidth: 520, mb: 3}}>
                        Hand-picked premium strains chosen by our experts. Only the finest cannabis makes it to our featured collection.
                    </Typography>
                    {featuredProducts && (
                        <Chip
                            icon={<Star sx={{fontSize: 16}}/>}
                            label={`${featuredProducts.length} featured strains`}
                            size="small"
                            sx={{bgcolor: 'light.accent', color: 'accent.main', fontWeight: 600}}
                        />
                    )}
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 4}}}>
                {productError && (
                    <Alert sx={{mb: 3}} severity="error">
                        <AlertTitle>{productError}</AlertTitle>
                    </Alert>
                )}

                {/* Empty State */}
                {!productLoading && featuredProducts && featuredProducts.length === 0 && (
                    <Box sx={{
                        minHeight: '50vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <Empty
                            title="No featured strains yet"
                            message="Our team is curating the next featured collection. Check back soon."
                            icon={
                                <img
                                    alt="No featured products"
                                    src={emptyIcon}
                                    style={{width: 80, height: 80, objectFit: 'contain'}}
                                />
                            }
                            button={
                                <Link to="/products" style={{textDecoration: 'none'}}>
                                    <Button
                                        variant="contained"
                                        disableElevation={true}
                                        size="large"
                                        color="secondary"
                                        sx={{textTransform: 'none'}}
                                    >
                                        Browse All Flower
                                    </Button>
                                </Link>
                            }
                        />
                    </Box>
                )}

                {/* Products Grid */}
                {featuredProducts && featuredProducts.length > 0 && (
                    <Grid container={true} spacing={3}>
                        {featuredProducts.map((product, index) => (
                            <Grid key={product._id || index} item={true} xs={12} sm={6} md={4} lg={3}>
                                <Product product={product}/>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Layout>
    )
}

export default FeaturedProductsPage;
