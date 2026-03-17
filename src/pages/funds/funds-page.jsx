import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    LinearProgress,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
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
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {useEffect, useState} from "react";
import {AccountBalanceWallet, AccountBalanceWalletOutlined, Add, Search, Visibility} from "@mui/icons-material";
import {useFormik} from "formik";
import * as yup from "yup";
import emptyIcon from "../../assets/images/empty.png";
import Empty from "../../components/shared/empty";
import {UTILS} from "../../utils/utils";
import currencyFormatter from "currency-formatter";
import moment from "moment";
import {getFunds, selectFund} from "../../redux/features/fund/fund-slice";
import Text from "../../components/shared/text";
import {Link} from "react-router-dom";
import AccountSidebar from "../../components/shared/account-sidebar";

const FundsPage = () => {
    const {fundLoading, funds, fundError} = useSelector(selectFund);
    const {token} = useSelector(selectAuth);
    const dispatch = useDispatch();

    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [senderProvider, setSenderProvider] = useState("");
    const [recipientProvider, setRecipientProvider] = useState("");

    useEffect(() => {
        dispatch(getFunds());
    }, [dispatch]);

    const validationSchema = yup.object({
        searchQuery: yup.string().required('Field required')
    });
    const formik = useFormik({
        initialValues: {searchQuery: ''},
        onSubmit: values => { console.log(values); },
        validationSchema
    });

    return (
        <Layout>
            {fundLoading && <LinearProgress variant="query" color="secondary"/>}

            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 3, md: 5}, pb: {xs: 2, md: 4}}}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <AccountBalanceWalletOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Wallet</Typography>
                    </Stack>
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>My Funds</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>View your transaction history and balance</Typography>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 5}}}>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 8}}>
                        {fundError && (
                            <Alert sx={{mb: 3}} severity="error">
                                <AlertTitle>{fundError}</AlertTitle>
                            </Alert>
                        )}

                        <Stack direction={{xs: 'column', md: 'row'}} justifyContent="space-between" alignItems={{md: 'center'}} spacing={2} sx={{mb: 3}}>
                            <Box sx={{maxWidth: 350, width: '100%'}}>
                                <form onSubmit={formik.handleSubmit}>
                                    <OutlinedInput
                                        placeholder="Search transactions..."
                                        fullWidth={true} size="small"
                                        value={formik.values.searchQuery}
                                        onChange={formik.handleChange}
                                        name="searchQuery" color="secondary"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <Search sx={{color: 'text.secondary', fontSize: 20}}/>
                                            </InputAdornment>
                                        }
                                    />
                                </form>
                            </Box>
                            <Link style={{textDecoration: 'none'}} to="/funds/load">
                                <Button variant="contained" color="secondary" startIcon={<Add/>}
                                    disableElevation={true} sx={{textTransform: 'none'}}>
                                    Load Funds
                                </Button>
                            </Link>
                        </Stack>

                        <Grid container spacing={2} sx={{mb: 3}}>
                            {[
                                {label: 'Status', value: status, setter: setStatus, options: [{v: '', l: 'All'}, {v: 'pending', l: 'Pending'}, {v: 'completed', l: 'Completed'}, {v: 'Failed', l: 'Failed'}]},
                                {label: 'Sender', value: senderProvider, setter: setSenderProvider, options: [{v: '', l: 'All'}, {v: 'mtn', l: 'MTN'}, {v: 'vodafone', l: 'Vodafone'}, {v: 'aitelTigo', l: 'AirtelTigo'}]},
                                {label: 'Recipient', value: recipientProvider, setter: setRecipientProvider, options: [{v: '', l: 'All'}, {v: 'mtn', l: 'MTN'}, {v: 'vodafone', l: 'Vodafone'}, {v: 'aitelTigo', l: 'AirtelTigo'}]},
                                {label: 'Sort By', value: sortBy, setter: setSortBy, options: [{v: '', l: 'Default'}, {v: 'date', l: 'Date'}, {v: 'amount', l: 'Amount'}, {v: 'status', l: 'Status'}]},
                            ].map((filter, i) => (
                                <Grid key={i} size={{xs: 6, md: 3}}>
                                    <FormControl fullWidth={true} size="small">
                                        <InputLabel>{filter.label}</InputLabel>
                                        <Select name={filter.label} onChange={e => filter.setter(e.target.value)}
                                            value={filter.value} color="secondary" label={filter.label}>
                                            {filter.options.map(o => <MenuItem key={o.v} value={o.v}>{o.l}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            ))}
                        </Grid>

                        {funds && funds.length === 0 ? (
                            <Box sx={{py: 8, display: 'flex', justifyContent: 'center'}}>
                                <Empty
                                    title="No transactions"
                                    message="You haven't loaded any funds yet. Load funds to start shopping."
                                    button={
                                        <Button onClick={() => dispatch(getFunds())} variant="contained" size="large"
                                            color="secondary" disableElevation={true} sx={{textTransform: 'none'}}>Refresh</Button>
                                    }
                                    icon={<img alt="Empty" src={emptyIcon} style={{height: 80, width: 80, objectFit: 'contain'}}/>}
                                />
                            </Box>
                        ) : (
                            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <TableContainer component={Paper} elevation={0} sx={{borderRadius: 3}}>
                                <Table size="medium">
                                    <TableHead>
                                        <TableRow sx={{bgcolor: 'background.default'}}>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}}>#</TableCell>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}}>Amount</TableCell>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}}>Sender</TableCell>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}}>Recipient</TableCell>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}}>Status</TableCell>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}}>Date</TableCell>
                                            <TableCell sx={{fontWeight: 600, color: 'text.secondary'}} align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {funds && funds.map((fund, index) => (
                                            <TableRow key={index} hover={true} sx={{'&:last-child td': {border: 0}}}>
                                                <TableCell>{index + 1}</TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{fontWeight: 600, color: 'text.primary'}}>
                                                        {currencyFormatter.format(fund.price.amount, {code: fund.price.currency})}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Text
                                                        text={<Typography variant="body2" sx={{color: 'text.primary'}}>{fund.senderPhone.number}</Typography>}
                                                        icon={UTILS.renderProviderImage(fund.senderPhone.provider)}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Text
                                                        text={<Typography variant="body2" sx={{color: 'text.primary'}}>{fund.recipientPhone.number}</Typography>}
                                                        icon={UTILS.renderProviderImage(fund.recipientPhone.provider)}
                                                    />
                                                </TableCell>
                                                <TableCell>{UTILS.renderTransactionStatus(fund.status)}</TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                        {moment(fund.updatedAt).fromNow()}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="View details">
                                                        <IconButton size="small" sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                                            <Visibility fontSize="small"/>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
    )
}

export default FundsPage;
