import Layout from "../../components/layout/layout";
import {Typography, Container, Box, Stack, Divider, Button, useTheme, useMediaQuery, Grid} from "@mui/material";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getProducts, selectProduct} from "../../redux/features/product/product-slice";
import Carousel from "nuka-carousel";
import Product from "../../components/shared/product";
import {ChevronRight} from "@mui/icons-material";
import Shop from "../../components/shared/shop";
import {getShops, selectShop} from "../../redux/features/shop/shop-slice";
import Empty from "../../components/shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import {selectAuth} from "../../redux/features/auth/auth-slice";

const HomePage = () => {

    const {featuredProducts, productLoading, products, onSaleProducts} = useSelector(selectProduct);
    const {featuredShops, shopLoading, shops} = useSelector(selectShop);

    const dispatch = useDispatch();
    const {token} = useSelector(selectAuth);

    const theme = useTheme();

    const small = useMediaQuery(theme.breakpoints.up('xs'));
    const medium = useMediaQuery(theme.breakpoints.up('md'));
    const large = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Layout>
            <Container maxWidth="xl">
                <Box sx={{minHeight: '50vh', paddingY: 4}}>
                    <Stack direction="column" spacing={2}>
                        <Typography
                            sx={{color: 'text.primary'}}
                            align="center"
                            variant="h4">
                            Featured Products
                        </Typography>

                        <Typography
                            sx={{color: 'text.secondary'}}
                            align="center"
                            variant="body1">
                            View our featured products
                        </Typography>

                        <Divider variant="fullWidth" sx={{my: 2}} light={true}/>

                        <Carousel
                            style={{paddingTop: 8, paddingBottom: 8}}
                            withoutControls={true}
                            wrapAround={true}
                            swiping={true}
                            cellAlign="center"
                            pauseOnHover={true}
                            dragging={true}
                            autoplay={true}
                            enableKeyboardControls={true}
                            slidesToShow={large ? 4 : medium ? 3 : small ? 1 : 3}
                            animation="zoom"
                            cellSpacing={8}>
                            {productLoading ? (
                                <Box>

                                </Box>
                            ) : (
                                featuredProducts && featuredProducts.map((product, index) => {
                                    return (
                                        <Box sx={{py: 2}} key={index}>
                                            <Product product={product}/>
                                        </Box>
                                    )
                                })
                            )}
                        </Carousel>
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to="/products/special/featured" style={{textDecoration: 'none'}}>
                                <Button
                                    endIcon={<ChevronRight/>}
                                    color="secondary"
                                    size="large" sx={{textTransform: 'capitalize'}}
                                    variant="text">
                                    View All
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Box>

                <Box sx={{minHeight: '50vh', paddingY: 4}}>
                    <Stack direction="column" spacing={2}>
                        <Typography
                            sx={{color: 'text.primary'}}
                            align="center"
                            variant="h4">
                            Featured Shops
                        </Typography>

                        <Typography
                            sx={{color: 'text.secondary'}}
                            align="center"
                            variant="body1">
                            View our featured shops
                        </Typography>

                        <Divider variant="fullWidth" sx={{my: 2}} light={true}/>

                        <Carousel
                            style={{paddingTop: 8, paddingBottom: 8}}
                            withoutControls={true}
                            wrapAround={true}
                            swiping={true}
                            cellAlign="center"
                            pauseOnHover={true}
                            dragging={true}
                            autoplay={true}
                            enableKeyboardControls={true}
                            slidesToShow={large ? 4 : medium ? 3 : small ? 1 : 3}
                            animation="zoom"
                            cellSpacing={8}>
                            {shopLoading ? (
                                <Box>

                                </Box>
                            ) : (
                                featuredShops && featuredShops.map((shop, index) => {
                                    return (
                                        <Box sx={{py: 2}} key={index}>
                                            <Shop shop={shop}/>
                                        </Box>
                                    )
                                })
                            )}
                        </Carousel>
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to="/shops/special/featured" style={{textDecoration: 'none'}}>
                                <Button
                                    endIcon={<ChevronRight/>}
                                    color="secondary"
                                    size="large" sx={{textTransform: 'capitalize'}}
                                    variant="text">
                                    View All
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Box>

                <Box sx={{minHeight: '50vh', paddingY: 4}}>
                    <Stack direction="column" spacing={2}>
                        <Typography
                            sx={{color: 'text.primary'}}
                            align="center"
                            variant="h4">
                            on Sale Products
                        </Typography>

                        <Typography
                            sx={{color: 'text.secondary'}}
                            align="center"
                            variant="body1">
                            Here is our products on Sale
                        </Typography>

                        <Divider variant="fullWidth" sx={{my: 2}} light={true}/>
                        <Carousel
                            style={{paddingTop: 8, paddingBottom: 8}}
                            withoutControls={true}
                            wrapAround={true}
                            swiping={true}
                            cellAlign="center"
                            pauseOnHover={true}
                            dragging={true}
                            autoplay={true}
                            enableKeyboardControls={true}
                            slidesToShow={large ? 4 : medium ? 3 : small ? 1 : 3}
                            animation="zoom"
                            cellSpacing={8}>
                            {productLoading ? (
                                <Box>

                                </Box>
                            ) : (
                                onSaleProducts && onSaleProducts.map((product, index) => {
                                    return (
                                        <Box sx={{py: 2}} key={index}>
                                            <Product product={product}/>
                                        </Box>
                                    )
                                })
                            )}
                        </Carousel>
                        <Stack direction="row" justifyContent="flex-end">
                            <Link to="/products/special/featured" style={{textDecoration: 'none'}}>
                                <Button
                                    endIcon={<ChevronRight/>}
                                    color="secondary"
                                    size="large" sx={{textTransform: 'capitalize'}}
                                    variant="text">
                                    View All
                                </Button>
                            </Link>
                        </Stack>
                    </Stack>
                </Box>

                <Box sx={{minHeight: '50vh', paddingY: 4}}>
                    <Box>
                        <Typography
                            sx={{color: 'text.primary', mb: 2}}
                            align="center"
                            variant="h4">
                            All Shops
                        </Typography>

                        <Typography
                            sx={{color: 'text.secondary', mb: 2}}
                            align="center"
                            variant="body1">
                            View our shops
                        </Typography>

                        <Divider variant="fullWidth" sx={{my: 2}} light={true}/>

                        <Grid container={true} spacing={2}>
                            {shops && shops.length === 0 ? (
                                <Grid item={true} xs={12}>
                                    <Box>
                                        <Empty
                                            title="No Shops"
                                            message="Oops looks like there are no shops available"
                                            button={
                                                <Button
                                                    onClick={() => dispatch(getShops(token))}
                                                    variant="contained"
                                                    size="large"
                                                    color="secondary"
                                                    disableElevation={true}
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        borderTopRightRadius: 16,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 16,
                                                        borderTopLeftRadius: 16
                                                    }}>
                                                    Refresh
                                                </Button>
                                            }
                                            icon={
                                                <img
                                                    alt="Empty Icon"
                                                    src={emptyIcon}
                                                    style={{
                                                        height: 100,
                                                        width: 100,
                                                        objectFit: 'cover',
                                                        objectPosition: 'center'
                                                    }}/>}/>
                                    </Box>
                                </Grid>
                            ) : (
                                shops && shops.map((shop, index) => {
                                    return (
                                        <Grid key={index} item={true} xs={12} md={4} lg={3}>
                                            <Shop shop={shop}/>
                                        </Grid>
                                    )
                                })

                            )}
                        </Grid>

                        <Stack direction="row" justifyContent="flex-end">
                            <Link to="/shops" style={{textDecoration: 'none'}}>
                                <Button
                                    endIcon={<ChevronRight/>}
                                    color="secondary"
                                    size="large" sx={{textTransform: 'capitalize'}}
                                    variant="text">
                                    View All
                                </Button>
                            </Link>
                        </Stack>
                    </Box>
                </Box>

                <Box sx={{minHeight: '50vh', paddingY: 4}}>
                    <Box>
                        <Typography
                            sx={{color: 'text.primary', mb: 2}}
                            align="center"
                            variant="h4">
                            All Products
                        </Typography>

                        <Typography
                            sx={{color: 'text.secondary', mb: 2}}
                            align="center"
                            variant="body1">
                            View all our products
                        </Typography>

                        <Divider variant="fullWidth" sx={{my: 2}} light={true}/>

                        <Grid container={true} spacing={2}>
                            {products && products.length === 0 ? (
                                <Grid item={true} xs={12}>
                                    <Box>
                                        <Empty
                                            title="No products"
                                            message="Oops looks like there are no products available"
                                            button={
                                                <Button
                                                    onClick={() => dispatch(getProducts(token))}
                                                    variant="contained"
                                                    size="large"
                                                    color="secondary"
                                                    disableElevation={true}
                                                    sx={{
                                                        textTransform: 'capitalize',
                                                        borderTopRightRadius: 16,
                                                        borderBottomRightRadius: 0,
                                                        borderBottomLeftRadius: 16,
                                                        borderTopLeftRadius: 16
                                                    }}>
                                                    Refresh
                                                </Button>
                                            }
                                            icon={
                                                <img
                                                    alt="Empty Icon"
                                                    src={emptyIcon}
                                                    style={{
                                                        height: 100,
                                                        width: 100,
                                                        objectFit: 'cover',
                                                        objectPosition: 'center'
                                                    }}/>}/>
                                    </Box>
                                </Grid>
                            ) : (
                                products && products.map((product, index) => {
                                    return (
                                        <Grid key={index} item={true} xs={12} md={4} lg={3}>
                                            <Product product={product}/>
                                        </Grid>
                                    )
                                })

                            )}
                        </Grid>

                        <Stack direction="row" justifyContent="flex-end">
                            <Link to="/products" style={{textDecoration: 'none'}}>
                                <Button
                                    endIcon={<ChevronRight/>}
                                    color="secondary"
                                    size="large" sx={{textTransform: 'capitalize'}}
                                    variant="text">
                                    View All
                                </Button>
                            </Link>
                        </Stack>
                    </Box>
                </Box>

            </Container>
        </Layout>
    )
}

export default HomePage;