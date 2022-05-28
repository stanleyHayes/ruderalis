import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
    InputLabel,
    LinearProgress,
    MenuItem, OutlinedInput,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getShops} from "../../redux/features/shop/shop-slice";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {useState} from "react";
import {Search, Visibility} from "@mui/icons-material";
import {useFormik} from "formik";
import * as yup from "yup";
import emptyIcon from "../../assets/images/empty.png";
import Empty from "../../components/shared/empty";
import {UTILS} from "../../utils/utils";
import currencyFormatter from "currency-formatter";
import moment from "moment";
import {selectOrder} from "../../redux/features/order/order-slice";

const OrdersPage = () => {
    const {orderLoading, orders, orderError} = useSelector(selectOrder);
    const {token} = useSelector(selectAuth);
    const dispatch = useDispatch();

    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");

    const validationSchema = yup.object({
        searchQuery: yup.string('Search email').required('Field required')
    });
    const formik = useFormik({
        initialValues: {
            searchQuery: ''
        },
        onSubmit: values => {
            console.log(values);
        },
        validationSchema
    });

    return (
        <Layout>
            {orderLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container sx={{py: 4}}>
                {orderError && (
                    <Alert sx={{my: 2}} severity="error">
                        <AlertTitle>{orderError}</AlertTitle>
                    </Alert>
                )}
                <Box sx={{pb: 3}}>
                    <Grid alignItems="center" container={true} spacing={2}>
                        <Grid item={true} xs={12} md={6}>
                            <Typography variant="h4" sx={{color: 'text.primary'}}>
                                Orders ({orders && orders.length})
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={6}>
                            <FormControl fullWidth={true} variant="outlined">
                                <InputLabel htmlFor="searchQuery">Search</InputLabel>
                                <form onSubmit={formik.handleSubmit}>
                                    <OutlinedInput
                                        variant="outlined"
                                        placeholder="Search Shop"
                                        label="Search"
                                        fullWidth={true}
                                        required={true}
                                        size="medium"
                                        error={Boolean(formik.errors.searchQuery)}
                                        value={formik.values.searchQuery}
                                        onChange={formik.handleChange}
                                        name="searchQuery"
                                        id="searchQuery"
                                        notched={true}
                                        color="secondary"
                                        endAdornment={
                                            <InputAdornment
                                                sx={{cursor: 'pointer'}}
                                                position="end">
                                                <Search/>
                                            </InputAdornment>
                                        }
                                    />
                                    {formik.errors.searchQuery &&
                                        <FormHelperText error={true}>{formik.errors.searchQuery}</FormHelperText>}
                                </form>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Box sx={{pb: 3}}>
                    <Grid spacing={2} container={true} alignItems="center">
                        <Grid item={true} xs={12} md={4}>
                            <Typography sx={{color: 'text.secondary'}} variant="h6">Filter By:</Typography>
                        </Grid>
                        <Grid item={true} xs={12} md={4}>
                            <FormControl fullWidth={true} variant="outlined">
                                <InputLabel htmlFor="searchQuery">Status</InputLabel>
                                <Select
                                    name="status"
                                    onChange={event => setStatus(event.target.value)}
                                    value={status}
                                    fullWidth={true}
                                    color="secondary"
                                    label="Status"
                                    variant="outlined">
                                    <MenuItem value="featured">Featured</MenuItem>
                                    <MenuItem value="verified">Verified</MenuItem>
                                    <MenuItem value="regular">Regular</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item={true} xs={12} md={4}>
                            <FormControl fullWidth={true} variant="outlined">
                                <InputLabel htmlFor="sortBy">Sort By</InputLabel>
                                <Select
                                    name="sortBy"
                                    onChange={event => setSortBy(event.target.value)}
                                    value={sortBy}
                                    fullWidth={true}
                                    color="secondary"
                                    label="Sort By"
                                    variant="outlined">
                                    <MenuItem value="date">Date Created</MenuItem>
                                    <MenuItem value="rating">Rating</MenuItem>
                                    <MenuItem value="status">Status</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Divider variant="fullWidth" sx={{my: 3}} light={true}/>

                {orders && orders.length === 0 ? (
                    <Box>
                        <TableContainer
                            sx={{
                                borderTopRightRadius: 16,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 16,
                                borderTopLeftRadius: 16
                            }}
                            component={Paper} elevation={0}>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Subtotal</TableCell>
                                        <TableCell>Delivery Fee</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <Box>
                            <Empty
                                title="No Orders"
                                message="Oops looks like you have made no orders. Really!!"
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
                    </Box>
                ) : (
                    <Box>
                        <TableContainer
                            sx={{
                                borderTopRightRadius: 16,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 16,
                                borderTopLeftRadius: 16
                            }}
                            component={Paper}
                            elevation={0}>
                            <Table size="medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">#</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="center">Subtotal</TableCell>
                                        <TableCell align="center">Delivery Fee</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Total</TableCell>
                                        <TableCell align="center">Date</TableCell>
                                        <TableCell align="center">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders && orders.map((order, index) => {
                                        return (
                                            <TableRow hover={true}>
                                                <TableCell align="center">{index + 1}</TableCell>
                                                <TableCell align="center">
                                                    {UTILS.calculateTotalQuantity(order.items)}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {currencyFormatter.format(
                                                        UTILS.calculateTotalPrice(order.items),
                                                        {code: order.deliveryFee.currency}
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {currencyFormatter.format(
                                                        order.deliveryFee.amount,
                                                        {code: order.deliveryFee.currency}
                                                    )}
                                                </TableCell>
                                                <TableCell align="center">{UTILS.renderOrderStatus(order.status)}</TableCell>
                                                <TableCell align="center">
                                                    {currencyFormatter.format(
                                                        UTILS.calculateTotalPrice(order.items) + order.deliveryFee.amount,
                                                        {code: order.deliveryFee.currency})
                                                    }
                                                </TableCell>
                                                <TableCell align="center">
                                                    {moment(order.updatedAt).fromNow()}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Stack direction="row" spacing={1} justifyContent="center">
                                                        <Tooltip title="View order detail">
                                                            <Visibility
                                                                sx={{
                                                                    cursor: 'pointer',
                                                                    color: 'secondary.main',
                                                                    borderRadius: '100%',
                                                                    padding: 1,
                                                                    fontSize: 24,
                                                                    backgroundColor: 'light.secondary'
                                                                }}/>
                                                        </Tooltip>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Container>
        </Layout>
    )
}

export default OrdersPage;