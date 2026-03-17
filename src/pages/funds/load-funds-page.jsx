import {
    Alert,
    AlertTitle,
    Box,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    LinearProgress,
    MenuItem,
    OutlinedInput,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {AccountBalanceWallet, AccountBalanceWalletOutlined, Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadFunds, selectFund} from "../../redux/features/fund/fund-slice";
import Layout from "../../components/layout/layout";
import {useNavigate} from "react-router";
import {useSnackbar} from "notistack";
import AccountSidebar from "../../components/shared/account-sidebar";

const LoadFundsPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

    const formik = useFormik({
        initialValues: {
            recipientPhone: {number: '', provider: ''},
            senderPhone: {number: '', provider: ''},
            amount: {price: '', currency: 'GHS'},
            paymentMethod: '',
            transactionID: '',
            pin: ''
        },
        validationSchema: yup.object({}),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, {setSubmitting, resetForm}) => {
            dispatch(loadFunds({
                data: values, navigate, showMessage: enqueueSnackbar, setSubmitting, resetForm
            }));
        }
    });

    const [showPin, setShowPin] = useState(false);
    const {fundLoading, fundError} = useSelector(selectFund);

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
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>Load Funds</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>Add money to your account</Typography>
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

                        <Card elevation={0} sx={{mb: 3}}>
                            <CardContent sx={{p: 3}}>
                                <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 2}}>
                                    How it works
                                </Typography>
                                <Stack spacing={2}>
                                    {[
                                        'Enter your mobile money number and provider',
                                        'Enter the recipient details',
                                        'Complete the transfer on your phone',
                                        'Enter the transaction ID received',
                                        'Wait for approval (usually within minutes)'
                                    ].map((step, index) => (
                                        <Stack key={index} direction="row" spacing={2} alignItems="flex-start">
                                            <Box sx={{
                                                width: 28, height: 28, borderRadius: '50%',
                                                bgcolor: 'light.secondary', display: 'flex',
                                                alignItems: 'center', justifyContent: 'center', flexShrink: 0
                                            }}>
                                                <Typography variant="caption" sx={{color: 'secondary.main', fontWeight: 700}}>
                                                    {index + 1}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                                {step}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>

                        <Box>
                        <Card elevation={0}>
                            <CardContent sx={{p: {xs: 3, md: 4}}}>
                                <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 1}}>
                                    Transfer Details
                                </Typography>
                                <Divider sx={{mb: 3}}/>

                                <form onSubmit={formik.handleSubmit}>
                                    <Stack direction="column" spacing={3}>
                                        <Grid container spacing={3}>
                                            <Grid size={{xs: 12, md: 6}}>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel htmlFor="senderPhone">Sender Phone</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true} value={formik.values.senderPhone.number}
                                                        name="senderPhone.number" id="senderPhone" type="tel"
                                                        error={formik.touched.senderPhone?.number && formik.errors.senderPhone?.number}
                                                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                        placeholder="Enter phone" required={true}
                                                        label="Sender Phone" size="medium"
                                                    />
                                                    {formik.touched.senderPhone?.number && formik.errors.senderPhone?.number && (
                                                        <FormHelperText error={true}>{formik.errors.senderPhone?.number}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid size={{xs: 12, md: 6}}>
                                                <TextField fullWidth={true} value={formik.values.senderPhone.provider}
                                                    name="senderPhone.provider" select={true}
                                                    error={formik.touched.senderPhone?.provider && formik.errors.senderPhone?.provider}
                                                    helperText={formik.touched.senderPhone?.provider && formik.errors.senderPhone?.provider}
                                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                    required={true} label="Sender Provider" size="medium">
                                                    <MenuItem value="">Select Provider</MenuItem>
                                                    <MenuItem value="mtn">MTN</MenuItem>
                                                    <MenuItem value="vodafone">Vodafone</MenuItem>
                                                    <MenuItem value="airtelTigo">AirtelTigo</MenuItem>
                                                </TextField>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={3}>
                                            <Grid size={{xs: 12, md: 6}}>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel htmlFor="recipientPhone">Recipient Phone</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true} value={formik.values.recipientPhone.number}
                                                        name="recipientPhone.number" id="recipientPhone" type="tel"
                                                        error={formik.touched.recipientPhone?.number && formik.errors.recipientPhone?.number}
                                                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                        placeholder="Enter recipient phone" required={true}
                                                        label="Recipient Phone" size="medium"
                                                    />
                                                    {formik.touched.recipientPhone?.number && formik.errors.recipientPhone?.number && (
                                                        <FormHelperText error={true}>{formik.errors.recipientPhone?.number}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid size={{xs: 12, md: 6}}>
                                                <TextField fullWidth={true} value={formik.values.recipientPhone.provider}
                                                    name="recipientPhone.provider" select={true}
                                                    error={formik.touched.recipientPhone?.provider && formik.errors.recipientPhone?.provider}
                                                    helperText={formik.touched.recipientPhone?.provider && formik.errors.recipientPhone?.provider}
                                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                    required={true} label="Recipient Provider" size="medium">
                                                    <MenuItem value="">Select Provider</MenuItem>
                                                    <MenuItem value="mtn">MTN</MenuItem>
                                                    <MenuItem value="vodafone">Vodafone</MenuItem>
                                                    <MenuItem value="airtelTigo">AirtelTigo</MenuItem>
                                                </TextField>
                                            </Grid>
                                        </Grid>

                                        <FormControl fullWidth={true} variant="outlined">
                                            <InputLabel htmlFor="pin">Pin</InputLabel>
                                            <OutlinedInput
                                                fullWidth={true} id="pin" value={formik.values.pin}
                                                name="pin" type={showPin ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton onClick={() => setShowPin(!showPin)} edge="end" sx={{color: 'secondary.main'}}>
                                                            {showPin ? <VisibilityOff fontSize="small"/> : <Visibility fontSize="small"/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                error={formik.touched.pin && formik.errors.pin}
                                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                placeholder="Enter pin" required={true} label="Pin" size="medium"
                                            />
                                            {formik.touched.pin && formik.errors.pin && (
                                                <FormHelperText error={true}>{formik.errors.pin}</FormHelperText>
                                            )}
                                        </FormControl>

                                        <Grid container spacing={3}>
                                            <Grid size={{xs: 12, md: 6}}>
                                                <FormControl fullWidth={true} variant="outlined">
                                                    <InputLabel htmlFor="amount">Amount</InputLabel>
                                                    <OutlinedInput
                                                        fullWidth={true} value={formik.values.amount.price}
                                                        name="amount.price" id="amount" type="number"
                                                        error={formik.touched.amount?.price && formik.errors.amount?.price}
                                                        onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                        placeholder="Enter amount" required={true}
                                                        label="Amount" size="medium"
                                                    />
                                                    {formik.touched.amount?.price && formik.errors.amount?.price && (
                                                        <FormHelperText error={true}>{formik.errors.amount?.price}</FormHelperText>
                                                    )}
                                                </FormControl>
                                            </Grid>
                                            <Grid size={{xs: 12, md: 6}}>
                                                <TextField fullWidth={true} value={formik.values.paymentMethod}
                                                    name="paymentMethod" select={true}
                                                    error={formik.touched.paymentMethod && formik.errors.paymentMethod}
                                                    helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
                                                    onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                    required={true} label="Payment Method" size="medium">
                                                    <MenuItem value="">Select Method</MenuItem>
                                                    <MenuItem value="mtn">MTN</MenuItem>
                                                    <MenuItem value="vodafone">Vodafone</MenuItem>
                                                    <MenuItem value="airtelTigo">AirtelTigo</MenuItem>
                                                </TextField>
                                            </Grid>
                                        </Grid>

                                        <FormControl fullWidth={true} variant="outlined">
                                            <InputLabel htmlFor="transactionID">Transaction ID</InputLabel>
                                            <OutlinedInput
                                                fullWidth={true} value={formik.values.transactionID}
                                                name="transactionID" id="transactionID" type="text"
                                                error={formik.touched.transactionID && formik.errors.transactionID}
                                                onChange={formik.handleChange} onBlur={formik.handleBlur}
                                                placeholder="Enter transaction ID" required={true}
                                                label="Transaction ID" size="medium"
                                            />
                                            {formik.touched.transactionID && formik.errors.transactionID && (
                                                <FormHelperText error={true}>{formik.errors.transactionID}</FormHelperText>
                                            )}
                                        </FormControl>

                                        <Button
                                            type="submit" size="large" color="secondary"
                                            sx={{textTransform: 'none', py: 1.5}}
                                           
                                            startIcon={formik.isSubmitting ? <CircularProgress color="secondary" size={20}/> : null}
                                            loading={formik.isSubmitting} fullWidth={true}
                                            variant="contained" disableElevation={true}>
                                            {formik.isSubmitting ? 'Processing...' : 'Submit Transfer'}
                                        </Button>
                                    </Stack>
                                </form>
                            </CardContent>
                        </Card>
                        </Box>
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

export default LoadFundsPage;
