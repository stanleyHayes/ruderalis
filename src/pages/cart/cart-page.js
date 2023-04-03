import Layout from "../../components/layout/layout";
import {
    Avatar,
    Box,
    Button, ButtonGroup,
    Card,
    CardContent,
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography
} from "@mui/material";
import {DeleteForever, Visibility} from "@mui/icons-material";
import Empty from "../../components/shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import {useDispatch, useSelector} from "react-redux";
import {addItem, clearCart, decreaseItem, removeItem, selectCart} from "../../redux/features/cart/cart-slice";
import {green, red} from "@mui/material/colors";
import currencyFormatter from "currency-formatter";
import Text from "../../components/shared/text";
import {UTILS} from "../../utils/utils";
import {Link} from "react-router-dom"
const CartPage = () => {
    const {items} = useSelector(selectCart);
    const dispatch = useDispatch();

    return (
        <Layout>
            <Container maxWidth="xl" sx={{py: 8}}>
                <Box sx={{pb: 1}}>
                    <Grid alignItems="center" container={true} spacing={2} justifyContent="space-between">
                        <Grid item={true} xs={12} md="auto">
                            <Typography variant="h4" sx={{color: 'text.primary'}}>
                                My Cart ({items && items.length})
                            </Typography>
                        </Grid>
                        {items && items.length > 0 && (
                            <Grid item={true} xs={12} md="auto">
                                <Button
                                    fullWidth={true}
                                    onClick={() => dispatch(clearCart())}
                                    sx={{
                                        backgroundColor: red[800],
                                        color: 'white'
                                    }} size="large">
                                    Clear Cart
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </Box>

                <Divider variant="fullWidth" sx={{my: 2}} light={true}/>

                {items && items.length === 0 ? (
                    <Box>
                        <TableContainer
                            sx={{}}
                            component={Paper} elevation={0}>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Unit Price</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <Box>
                            <Empty
                                title="No Items in Cart"
                                message="Oops looks like you have made no items in your cart. Go shopping!!"
                                icon={
                                    <img
                                        alt="Empty Icon"
                                        src={emptyIcon}
                                        style={{
                                            height: 100,
                                            width: 100,
                                            objectFit: 'cover',
                                            objectPosition: 'center'
                                        }}
                                    />}
                            />
                        </Box>
                    </Box>
                ) : (
                    <Box>
                        <Grid container={true} spacing={4}>
                            <Grid item={true} xs={12} md={9}>
                                <TableContainer
                                    sx={{}}
                                    component={Paper}
                                    elevation={0}>
                                    <Table size="medium">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">#</TableCell>
                                                <TableCell align="center">Product</TableCell>
                                                <TableCell align="center">Unit Price</TableCell>
                                                <TableCell align="center">Quantity</TableCell>
                                                <TableCell align="center">Total</TableCell>
                                                <TableCell align="center">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items && items.map((item, index) => {
                                                return (
                                                    <TableRow key={index} hover={true}>
                                                        <TableCell align="center">{index + 1}</TableCell>
                                                        <TableCell align="center">
                                                            <Text
                                                                text={
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{color: 'text.primary'}}>
                                                                        {item.product.name}
                                                                    </Typography>}
                                                                icon={
                                                                    <Avatar
                                                                        sx={{
                                                                            width: 40,
                                                                            height: 40,
                                                                            borderTopRightRadius: 32,
                                                                            borderBottomRightRadius: 0,
                                                                            borderBottomLeftRadius: 32,
                                                                            borderTopLeftRadius: 32
                                                                        }} variant="rounded" src={item.product?.image}
                                                                    />}
                                                            />
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {currencyFormatter.format(item.product?.price?.amount, {code: item.product?.price?.currency})}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <ButtonGroup>
                                                                <Button
                                                                    onClick={() => dispatch(decreaseItem(item.product))}
                                                                    sx={{
                                                                        backgroundColor: red[800],
                                                                        fontWeight: 700,
                                                                        color: 'white'
                                                                    }} size="large">
                                                                    -
                                                                </Button>

                                                                <Button
                                                                    sx={{
                                                                        color: 'text.primary',
                                                                        backgroundColor: 'background.default',
                                                                        fontWeight: 700
                                                                    }} size="large">
                                                                    {item.quantity}
                                                                </Button>

                                                                <Button
                                                                    onClick={() => dispatch(addItem(item.product))}
                                                                    sx={{
                                                                        color: 'white',
                                                                        backgroundColor: green[800],
                                                                        fontWeight: 700
                                                                    }} size="large">
                                                                    +
                                                                </Button>
                                                            </ButtonGroup>

                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {currencyFormatter.format(item.product?.price?.amount * item.quantity, {code: item.product?.price?.currency})}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Stack direction="row" spacing={1} justifyContent="center">
                                                                <Tooltip title="View order detail">
                                                                    <Visibility
                                                                        sx={{
                                                                            cursor: 'pointer',
                                                                            color: 'secondary.main',
                                                                            padding: 1,
                                                                            fontSize: 18,
                                                                            borderRadius: "15%",
                                                                            backgroundColor: 'light.secondary'
                                                                        }}/>
                                                                </Tooltip>
                                                                <Tooltip title="View order detail">
                                                                    <DeleteForever
                                                                        onClick={() => dispatch(removeItem(item))}
                                                                        sx={{
                                                                            cursor: 'pointer',
                                                                            color: red[800],
                                                                            padding: 1,
                                                                            fontSize: 18,
                                                                            borderRadius: "15%",
                                                                            backgroundColor: "light.red"
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            </Stack>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item={true} xs={12} md={3}>
                                <Card
                                    elevation={0}
                                    sx={{}}>
                                    <CardContent>
                                        <Stack
                                            divider={
                                                <Divider
                                                    variant="fullWidth"
                                                    light={true}
                                                    orientation="horizontal"
                                                />}
                                            spacing={1}
                                            direction="column">
                                            <Typography variant="body1" sx={{color: 'text.primary'}}>
                                                Order Summary
                                            </Typography>

                                            <Grid container={true} justifyContent="center">
                                                <Grid item={true} xs={6}>
                                                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                                        Quantity
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6}>
                                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                                        {UTILS.calculateTotalQuantity(items)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container={true} justifyContent="center">
                                                <Grid item={true} xs={6}>
                                                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                                        Sub-total
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6}>
                                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                                        {
                                                            currencyFormatter.format(
                                                                UTILS.calculateTotalPrice(items),
                                                                {code: items[0].product.price.currency}
                                                            )
                                                        }
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container={true} justifyContent="center">
                                                <Grid item={true} xs={6}>
                                                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                                        Total
                                                    </Typography>
                                                </Grid>
                                                <Grid item={true} xs={6}>
                                                    <Typography variant="body1" sx={{color: 'text.primary'}}>
                                                        Quantity
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                            <Link to="/checkout" style={{textDecoration: "none"}}>
                                                <Button
                                                    disableElevation={true}
                                                    fullWidth={true}
                                                    sx={{fontWeight: 500}}
                                                    size="large"
                                                    variant="contained"
                                                    color="secondary">
                                                    Continue to checkout
                                                </Button>
                                            </Link>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Container>
        </Layout>
    )
}

export default CartPage;