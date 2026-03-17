import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Alert, AlertTitle, Box, Button, Card, CardContent, Chip, Container,
    Grid, IconButton, InputAdornment, LinearProgress, MenuItem,
    OutlinedInput, Paper, Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TextField, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {Clear, ReceiptLongOutlined, SearchOutlined, VisibilityOutlined} from "@mui/icons-material";
import emptyIcon from "../../assets/images/empty.png";
import Empty from "../../components/shared/empty";
import currencyFormatter from "currency-formatter";
import {getOrders, selectOrder} from "../../redux/features/order/order-slice";
import {UTILS} from "../../utils/utils";
import {Link} from "react-router-dom";
import PageBanner from "../../components/shared/page-banner";
import AccountSidebar from "../../components/shared/account-sidebar";

const OrdersPage = () => {
    const {orderLoading, orders, orderError} = useSelector(selectOrder);
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => { dispatch(getOrders()); }, [dispatch]);

    const filtered = useMemo(() => {
        let list = orders || [];
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(o => o._id?.toLowerCase().includes(q));
        }
        if (status) list = list.filter(o => o.status === status);
        if (sortBy === 'date') list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (sortBy === 'total') list = [...list].sort((a, b) => (b.total || 0) - (a.total || 0));
        return list;
    }, [orders, query, status, sortBy]);

    const activeFilters = (query.trim() ? 1 : 0) + (status ? 1 : 0) + (sortBy ? 1 : 0);

    return (
        <Layout>
            {orderLoading && <LinearProgress color="secondary"/>}

            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 3, md: 5}, pb: {xs: 2, md: 4}}}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <ReceiptLongOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Purchase History</Typography>
                    </Stack>
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>Order History</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                        Track and manage all your dispensary orders in one place
                    </Typography>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 5}}}>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 8}}>
                        {orderError && (
                            <Alert sx={{mb: 3}} severity="error"><AlertTitle>{orderError}</AlertTitle></Alert>
                        )}

                        {/* Toolbar */}
                        <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                        <Card variant="outlined" sx={{overflow: 'hidden', mb: 3}}>
                            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                            <CardContent sx={{p: 2}}>
                                <Grid container spacing={1.5} alignItems="center">
                                    <Grid size={{xs: 12, sm: 5, lg: 5}}>
                                        <OutlinedInput value={query} onChange={e => { setQuery(e.target.value); }}
                                            placeholder="Search by order ID..." size="small" fullWidth color="secondary"
                                            startAdornment={<InputAdornment position="start"><SearchOutlined sx={{fontSize: 20, color: 'text.secondary'}}/></InputAdornment>}
                                            endAdornment={query ? <InputAdornment position="end"><IconButton size="small" onClick={() => setQuery('')}><Clear sx={{fontSize: 16}}/></IconButton></InputAdornment> : null}
                                        />
                                    </Grid>
                                    <Grid size={{xs: 6, sm: 3.5, lg: 3}}>
                                        <TextField select label="Status" size="small" fullWidth color="secondary"
                                            value={status} onChange={e => setStatus(e.target.value)}>
                                            <MenuItem value="">All Statuses</MenuItem>
                                            <MenuItem value="pending">Pending</MenuItem>
                                            <MenuItem value="processing">Processing</MenuItem>
                                            <MenuItem value="shipped">Shipped</MenuItem>
                                            <MenuItem value="delivered">Delivered</MenuItem>
                                            <MenuItem value="completed">Completed</MenuItem>
                                            <MenuItem value="cancelled">Cancelled</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid size={{xs: 6, sm: 3.5, lg: 3}}>
                                        <TextField select label="Sort by" size="small" fullWidth color="secondary"
                                            value={sortBy} onChange={e => setSortBy(e.target.value)}>
                                            <MenuItem value="">Default</MenuItem>
                                            <MenuItem value="date">Newest First</MenuItem>
                                            <MenuItem value="total">Highest Total</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 1.5}}>
                                    <Typography variant="caption" color="text.secondary">
                                        {filtered.length} order{filtered.length !== 1 ? 's' : ''} found
                                    </Typography>
                                    {activeFilters > 0 && (
                                        <Chip size="small" label={`${activeFilters} filter${activeFilters !== 1 ? 's' : ''} active`}
                                            color="secondary" variant="outlined" onDelete={() => { setQuery(''); setStatus(''); setSortBy(''); }}
                                            sx={{fontSize: 10, fontWeight: 600}}/>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                        </motion.div>

                        {/* Table */}
                        {filtered.length === 0 ? (
                            <Empty title="No orders found" message="Try adjusting your filters or browse our menu to place your first order."
                                image={emptyIcon}/>
                        ) : (
                            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                <TableContainer>
                                    <Table size="medium">
                                        <TableHead>
                                            <TableRow sx={{bgcolor: 'action.hover'}}>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}}>#</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}}>Order ID</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}}>Date</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}}>Status</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}} align="center">Items</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}} align="right">Total</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}} align="center">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filtered.map((order, i) => (
                                                <TableRow key={order._id || i} hover sx={{'&:last-child td': {border: 0}}}>
                                                    <TableCell><Typography variant="caption" color="text.secondary">{i + 1}</Typography></TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                                            {order._id ? order._id.substring(0, 8).toUpperCase() : `ORD-${i + 1}`}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {UTILS.formatDate(order.createdAt)}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>{UTILS.renderOrderStatus(order.status)}</TableCell>
                                                    <TableCell align="center">
                                                        <Typography variant="body2" color="text.secondary">{order.items?.length || 0}</Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography variant="body2" fontWeight={600} sx={{color: 'secondary.main'}}>
                                                            {currencyFormatter.format(
                                                                order.total || UTILS.calculateTotalPrice(order.items || []),
                                                                {code: order.currency || 'GHS'}
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <IconButton component={Link} to={`/orders/${order._id}`} size="small"
                                                            sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                                            <VisibilityOutlined sx={{fontSize: 18}}/>
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                            </motion.div>
                        )}
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <Box sx={{position: 'sticky', top: 80}}>
                            <AccountSidebar/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default OrdersPage;
