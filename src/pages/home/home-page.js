import Layout from "../../components/layout/layout";
import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
    Link as MUILink
} from "@mui/material";
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
import Banner from "../../components/shared/banner";
import banner from "../../assets/images/banner.jpg";


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
            <Box>
                <Carousel
                    withoutControls={true}
                    wrapAround={true}
                    swiping={true}
                    cellAlign="center"
                    pauseOnHover={true}
                    dragging={true}
                    autoplay={true}
                    enableKeyboardControls={true}
                    slidesToShow={1}
                    animation="zoom">
                    <Box
                        sx={{
                            height: {xs: '90vh', md: '80vh', lg: '70vh'},
                            width: '100vw'
                        }}>
                        <Banner
                            image={
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                    alt=""
                                    src={banner}
                                />
                            }
                            children={
                                <Box>
                                    <Container maxWidth="xl">
                                        <Stack direction="column" spacing={3}>
                                            <Typography
                                                align="center"
                                                sx={{color: 'secondary.main'}}
                                                variant="h3">
                                                Stores
                                            </Typography>
                                            <Typography
                                                sx={{color: 'white'}}
                                                align="center"
                                                variant="h6">
                                                See available shops and see what's in stock for the shop.
                                            </Typography>

                                            <Stack direction="row" justifyContent="center">
                                                <Link
                                                    style={{textDecoration: 'none'}}
                                                    to="/shops">
                                                    <Button
                                                        disableElevation={true}
                                                        sx={{
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                            textTransform: 'capitalize'
                                                        }}
                                                        variant="contained"
                                                        size="large">
                                                        Visit Shops
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        </Stack>
                                    </Container>
                                </Box>
                            }/>
                    </Box>
                    <Box
                        sx={{
                            height: {xs: '90vh', md: '80vh', lg: '70vh'},
                            width: '100vw'
                        }}>
                        <Banner
                            image={
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                    alt=""
                                    src={banner}
                                />
                            }
                            children={
                                <Box>
                                    <Container maxWidth="xl">
                                        <Stack direction="column" spacing={3}>
                                            <Typography
                                                align="center"
                                                sx={{color: 'secondary.main'}}
                                                variant="h3">
                                                Vendors
                                            </Typography>
                                            <Typography
                                                sx={{color: 'white'}}
                                                align="center"
                                                variant="h6">
                                                Sign up as a vendor and sell your products
                                            </Typography>
                                            <Stack direction="row" justifyContent="center">
                                                <MUILink
                                                    underline="none"
                                                    href="https://ruderalis-vendor.vercel.app/auth/login">
                                                    <Button
                                                        disableElevation={true}
                                                        sx={{
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                            textTransform: 'capitalize'
                                                        }}
                                                        variant="contained"
                                                        size="large">
                                                        Sign Up As Vendor
                                                    </Button>
                                                </MUILink>
                                            </Stack>
                                        </Stack>
                                    </Container>
                                </Box>
                            }/>
                    </Box>
                    <Box
                        sx={{
                            height: {xs: '90vh', md: '80vh', lg: '70vh'},
                            width: '100vw'
                        }}>
                        <Banner
                            image={
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                    alt=""
                                    src={banner}
                                />
                            }
                            children={
                                <Box>
                                    <Container maxWidth="xl">
                                        <Stack direction="column" spacing={3}>
                                            <Typography
                                                align="center"
                                                sx={{color: 'secondary.main'}}
                                                variant="h3">
                                                High Grade
                                            </Typography>
                                            <Typography
                                                sx={{color: 'white'}}
                                                align="center"
                                                variant="h6">
                                                See our collection of high grade and order some shit.
                                            </Typography>

                                            <Stack direction="row" justifyContent="center">
                                                <Link
                                                    style={{textDecoration: 'none'}}
                                                    to="/products">
                                                    <Button
                                                        disableElevation={true}
                                                        sx={{
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                            textTransform: 'capitalize'
                                                        }}
                                                        variant="contained"
                                                        size="large">
                                                        Order some high grade
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        </Stack>
                                    </Container>
                                </Box>
                            }/>
                    </Box>
                    <Box
                        sx={{
                            height: {xs: '90vh', md: '80vh', lg: '70vh'},
                            width: '100vw'
                        }}>
                        <Banner
                            image={
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                    alt=""
                                    src={banner}
                                />
                            }
                            children={
                                <Box>
                                    <Container maxWidth="xl">
                                        <Stack direction="column" spacing={3}>
                                            <Typography
                                                align="center"
                                                sx={{color: 'secondary.main'}}
                                                variant="h3">
                                                Edibles
                                            </Typography>
                                            <Typography
                                                sx={{color: 'white'}}
                                                align="center"
                                                variant="h6">
                                                Prefer the edibles? We got you covered!
                                            </Typography>

                                            <Stack direction="row" justifyContent="center">
                                                <Link
                                                    style={{textDecoration: 'none'}}
                                                    to="/edibles">
                                                    <Button
                                                        disableElevation={true}
                                                        sx={{
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                            textTransform: 'capitalize'
                                                        }}
                                                        variant="contained"
                                                        size="large">
                                                        Checkout our edibles
                                                    </Button>
                                                </Link>
                                            </Stack>
                                        </Stack>
                                    </Container>
                                </Box>
                            }/>
                    </Box>
                    <Box
                        sx={{
                            height: {xs: '90vh', md: '80vh', lg: '70vh'},
                            width: '100vw'
                        }}>
                        <Banner
                            image={
                                <img
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center'
                                    }}
                                    alt=""
                                    src={banner}
                                />
                            }
                            children={
                                <Box>
                                    <Container maxWidth="xl">
                                        <Stack direction="column" spacing={3}>
                                            <Typography
                                                align="center"
                                                sx={{color: 'secondary.main'}}
                                                variant="h3">
                                                Revenue & Reports
                                            </Typography>
                                            <Typography
                                                sx={{color: 'white'}}
                                                align="center"
                                                variant="h6">
                                                See how much you have earned within a specific period
                                            </Typography>

                                            <Stack direction="row" justifyContent="center">
                                                <MUILink
                                                    underline="none"
                                                    href="https://ruderalis-vendor.vercel.app/auth/login">
                                                    <Button
                                                        disableElevation={true}
                                                        sx={{
                                                            borderTopRightRadius: 32,
                                                            borderBottomRightRadius: 0,
                                                            borderBottomLeftRadius: 32,
                                                            borderTopLeftRadius: 32,
                                                            textTransform: 'capitalize'
                                                        }}
                                                        variant="contained"
                                                        size="large">
                                                        Sign Up As Vendor
                                                    </Button>
                                                </MUILink>
                                            </Stack>
                                        </Stack>
                                    </Container>
                                </Box>
                            }/>
                    </Box>
                </Carousel>
            </Box>
            <Container sx={{mt: 4}} maxWidth="xl">
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