import {
    Alert,
    AlertTitle,
    Box, Card, CardContent,
    CircularProgress,
    Container, Divider,
    FormControl,
    FormHelperText,
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
import {LoadingButton} from "@mui/lab";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {useState} from "react";
import {useSelector} from "react-redux";
import {selectFund} from "../../redux/features/fund/fund-slice";
import Layout from "../../components/layout/layout";

const LoadFundsPage = () => {

    const formik = useFormik({
        initialValues: {
            recipientPhone: {
                number: '',
                provider: ''
            },
            senderPhone: {
                number: '',
                provider: ''
            },
            amount: {
                price: '',
                currency: 'GHS'
            },
            paymentMethod: '',
            transactionID: '',
            pin: ''
        },
        validationSchema: yup.object({}),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values, formikHelpers) => {
            console.log(values, formikHelpers);
        }
    });

    const [showPin, setShowPin] = useState(false);
    const {fundLoading, fundError} = useSelector(selectFund);

    return (
        <Layout>
            {fundLoading && <LinearProgress variant="query" color="secondary"/>}
            <Container sx={{py: 4}}>
                {fundError && (
                    <Alert sx={{my: 2}} severity="error">
                        <AlertTitle>{fundError}</AlertTitle>
                    </Alert>
                )}
                <Typography variant="h4" sx={{color: 'text.primary'}}>
                    Adding Funds
                </Typography>

                <Divider sx={{my: 4}} variant="fullWidth" light={true}/>

                <Stack sx={{mb: 4}} direction="column" spacing={2}>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                        Select your provider and enter your number
                    </Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                        Select the number provider and select number you're transferring money to.
                    </Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                        Enter the transaction ID for the transaction after sending funds.
                    </Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                        Enter the amount of funds transferred and select the currency.
                    </Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>
                        Be patient and wait for approval.
                    </Typography>
                </Stack>

                <Card elevation={1} sx={{}}>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <Stack direction="column" spacing={2}>

                                <Box>
                                    <FormControl fullWidth={true} variant="outlined">
                                        <InputLabel htmlFor="senderPhone">Sender Phone</InputLabel>
                                        <OutlinedInput
                                            fullWidth={true}
                                            sx={{}}
                                            value={formik.values.senderPhone.number}
                                            name="senderPhone.number"
                                            id="senderPhone"
                                            type="tel"
                                            error={formik.touched.senderPhone?.number && formik.errors.senderPhone?.number}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter phone"
                                            required={true}
                                            label="Phone"
                                            size="medium"
                                            margin="dense"
                                        />
                                        {formik.touched.senderPhone?.number && formik.errors.senderPhone?.number && (
                                            <FormHelperText
                                                error={true}>
                                                {formik.errors.senderPhone?.number}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl fullWidth={true} variant="outlined">
                                        <TextField
                                            fullWidth={true}
                                            sx={{}}
                                            value={formik.values.senderPhone.provider}
                                            name="senderPhone.provider"
                                            id="senderProvider"
                                            select={true}
                                            error={formik.touched.senderPhone?.provider && formik.errors.senderPhone?.provider}
                                            helperText={formik.touched.senderPhone?.provider && formik.errors.senderPhone?.provider}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            required={true}
                                            label="Sender Provider"
                                            size="medium"
                                            margin="dense">
                                            <MenuItem value="">Select Sender Provider</MenuItem>
                                            <MenuItem value="mtn">MTN</MenuItem>
                                            <MenuItem value="vodafone">Vodafone</MenuItem>
                                            <MenuItem value="airtelTigo">AitelTigo</MenuItem>
                                        </TextField>
                                        {formik.touched.senderPhone?.provider && formik.errors.senderPhone?.provider && (
                                            <FormHelperText
                                                error={true}>
                                                {formik.errors.senderPhone?.provider}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl fullWidth={true} variant="outlined">
                                        <InputLabel htmlFor="recipientPhone">Recipient Phone</InputLabel>
                                        <OutlinedInput
                                            fullWidth={true}
                                            sx={{}}
                                            value={formik.values.recipientPhone.number}
                                            name="recipientPhone.number"
                                            id="recipientPhone"
                                            type="tel"
                                            error={formik.touched.recipientPhone?.number && formik.errors.recipientPhone?.number}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter recipient phone"
                                            required={true}
                                            label="Recipient Phone"
                                            size="medium"
                                            margin="dense"
                                        />
                                        {formik.touched.recipientPhone?.number && formik.errors.recipientPhone?.number && (
                                            <FormHelperText
                                                error={true}>
                                                {formik.errors.recipientPhone?.number}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl fullWidth={true} variant="outlined">
                                        <TextField
                                            fullWidth={true}
                                            sx={{}}
                                            value={formik.values.recipientPhone.provider}
                                            name="recipientPhone.provider"
                                            id="recipientProvider"
                                            select={true}
                                            error={formik.touched.recipientPhone?.provider && formik.errors.recipientPhone?.provider}
                                            helperText={formik.touched.recipientPhone?.provider && formik.errors.recipientPhone?.provider}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            required={true}
                                            label="Recipient Provider"
                                            size="medium"
                                            margin="dense">
                                            <MenuItem value="">Select Recipient Provider</MenuItem>
                                            <MenuItem value="mtn">MTN</MenuItem>
                                            <MenuItem value="vodafone">Vodafone</MenuItem>
                                            <MenuItem value="airtelTigo">AitelTigo</MenuItem>
                                        </TextField>
                                        {formik.touched.recipientPhone?.provider && formik.errors.recipientPhone?.provider && (
                                            <FormHelperText
                                                error={true}>
                                                {formik.errors.recipientPhone?.provider}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl fullWidth={true} variant="outlined">
                                        <InputLabel htmlFor="pin">Pin</InputLabel>
                                        <OutlinedInput
                                            fullWidth={true}
                                            sx={{}}
                                            id="pin"
                                            value={formik.values.pin}
                                            name="pin"
                                            type={showPin ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    {showPin ?
                                                        <VisibilityOff
                                                            onClick={() => setShowPin(false)}
                                                            sx={{
                                                                borderTopRightRadius: 16,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 16,
                                                                borderTopLeftRadius: 16,
                                                                cursor: 'pointer',
                                                                color: 'secondary.main',
                                                                borderRadius: '100%',
                                                                padding: 1,
                                                                fontSize: 24,
                                                            }}
                                                        /> :
                                                        <Visibility
                                                            onClick={() => setShowPin(true)}
                                                            sx={{
                                                                borderTopRightRadius: 16,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 16,
                                                                borderTopLeftRadius: 16,
                                                                cursor: 'pointer',
                                                                color: 'secondary.main',
                                                                borderRadius: '100%',
                                                                padding: 1,
                                                                fontSize: 24,
                                                            }}
                                                        />}
                                                </InputAdornment>
                                            }
                                            helperText={formik.touched.pin && formik.errors.pin}
                                            error={formik.touched.pin && formik.errors.pin}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter pin"
                                            required={true}
                                            label="pin"
                                            size="medium"
                                            margin="dense"
                                        />
                                        {formik.touched.pin && formik.errors.pin && (
                                            <FormHelperText
                                                error={true}>
                                                {formik.errors.pin}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl fullWidth={true} variant="outlined">
                                        <TextField
                                            fullWidth={true}
                                            sx={{}}
                                            value={formik.values.recipientPhone.provider}
                                            name="recipientPhone.provider"
                                            id="recipientProvider"
                                            select={true}
                                            error={formik.touched.recipientPhone?.provider && formik.errors.recipientPhone?.provider}
                                            helperText={formik.touched.recipientPhone?.provider && formik.errors.recipientPhone?.provider}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            required={true}
                                            label="Recipient Provider"
                                            size="medium"
                                            margin="dense">
                                            <MenuItem value="">Select Recipient Provider</MenuItem>
                                            <MenuItem value="mtn">MTN</MenuItem>
                                            <MenuItem value="vodafone">Vodafone</MenuItem>
                                            <MenuItem value="airtelTigo">AitelTigo</MenuItem>
                                        </TextField>
                                        {formik.touched.recipientPhone?.provider && formik.errors.recipientPhone?.provider && (
                                            <FormHelperText
                                                error={true}>
                                                {formik.errors.recipientPhone?.provider}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl fullWidth={true} variant="outlined">
                                        <InputLabel htmlFor="pin">Pin</InputLabel>
                                        <OutlinedInput
                                            fullWidth={true}
                                            sx={{}}
                                            id="pin"
                                            value={formik.values.pin}
                                            name="pin"
                                            type={showPin ? 'text' : 'password'}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    {showPin ?
                                                        <VisibilityOff
                                                            onClick={() => setShowPin(false)}
                                                            sx={{
                                                                borderTopRightRadius: 16,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 16,
                                                                borderTopLeftRadius: 16,
                                                                cursor: 'pointer',
                                                                color: 'secondary.main',
                                                                borderRadius: '100%',
                                                                padding: 1,
                                                                fontSize: 24,
                                                            }}
                                                        /> :
                                                        <Visibility
                                                            onClick={() => setShowPin(true)}
                                                            sx={{
                                                                borderTopRightRadius: 16,
                                                                borderBottomRightRadius: 0,
                                                                borderBottomLeftRadius: 16,
                                                                borderTopLeftRadius: 16,
                                                                cursor: 'pointer',
                                                                color: 'secondary.main',
                                                                borderRadius: '100%',
                                                                padding: 1,
                                                                fontSize: 24,
                                                            }}
                                                        />}
                                                </InputAdornment>
                                            }
                                            helperText={formik.touched.pin && formik.errors.pin}
                                            error={formik.touched.pin && formik.errors.pin}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter pin"
                                            required={true}
                                            label="pin"
                                            size="medium"
                                            margin="dense"
                                        />
                                        {formik.touched.pin && formik.errors.pin && (
                                            <FormHelperText
                                                error={true}>
                                                {formik.errors.pin}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl fullWidth={true} variant="outlined">
                                        <TextField
                                            fullWidth={true}
                                            sx={{}}
                                            value={formik.values.paymentMethod}
                                            name="paymentMethod"
                                            id="recipientProvider"
                                            select={true}
                                            error={formik.touched.paymentMethod && formik.errors.paymentMethod}
                                            helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            required={true}
                                            label="Payment Method"
                                            size="medium"
                                            margin="dense">
                                            <MenuItem value="">Payment Method</MenuItem>
                                            <MenuItem value="mtn">MTN</MenuItem>
                                            <MenuItem value="vodafone">Vodafone</MenuItem>
                                            <MenuItem value="airtelTigo">AitelTigo</MenuItem>
                                        </TextField>
                                        {formik.touched.recipientPhone?.provider && formik.errors.recipientPhone?.provider && (
                                            <FormHelperText
                                                error={true}>
                                                {formik.errors.recipientPhone?.provider}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                <Box>
                                    <FormControl fullWidth={true} variant="outlined">
                                        <InputLabel htmlFor="recipientPhone">Transaction ID</InputLabel>
                                        <OutlinedInput
                                            fullWidth={true}
                                            sx={{}}
                                            value={formik.values.transactionID}
                                            name="transactionID"
                                            id="transactionID"
                                            type="text"
                                            error={formik.touched.transactionID && formik.errors.transactionID}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="Enter transaction ID"
                                            required={true}
                                            label="Transaction ID"
                                            size="medium"
                                            margin="dense"
                                        />
                                        {formik.touched.transactionID && formik.errors.transactionID && (
                                            <FormHelperText
                                                error={true}>
                                                {formik.errors.transactionID}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Box>

                                <LoadingButton
                                    size="large"
                                    color="secondary"
                                    sx={{
                                        borderTopRightRadius: 16,
                                        borderBottomRightRadius: 0,
                                        borderBottomLeftRadius: 16,
                                        borderTopLeftRadius: 16,
                                        textTransform: 'capitalize',
                                        py: 1.2
                                    }}
                                    loadingPosition="start"
                                    startIcon={formik.isSubmitting ?
                                        <CircularProgress color="secondary"/> : null}
                                    loadingIndicator={formik.isSubmitting ?
                                        <CircularProgress color="secondary"/> : null}
                                    loading={formik.isSubmitting}
                                    fullWidth={true}
                                    variant="contained"
                                    disableElevation={true}>
                                    {formik.isSubmitting ? 'Submitting...' : 'Submit'}
                                </LoadingButton>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </Layout>
    )
}

export default LoadFundsPage;