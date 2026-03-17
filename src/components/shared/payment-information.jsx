import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Radio,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import {useSelector} from "react-redux";
import {selectPaymentMethod} from "../../redux/features/payment-method/payment-method-slice";
import {useFormik} from "formik";
import * as yup from "yup";
import {useState} from "react";
import {
    AddOutlined,
    CheckCircleOutlined,
    CreditCardOutlined,
    KeyboardArrowLeft,
    LocalShippingOutlined,
    PhoneAndroidOutlined,
} from "@mui/icons-material";

const PAYMENT_TYPES = [
    {key: 'mobile_money', label: 'Mobile Money', icon: PhoneAndroidOutlined},
    {key: 'card', label: 'Card', icon: CreditCardOutlined},
    {key: 'cash_on_delivery', label: 'Cash on Delivery', icon: LocalShippingOutlined},
];

const PaymentInformation = ({previous, onSubmitOrder}) => {
    const {paymentMethods} = useSelector(selectPaymentMethod);
    const [selectedMethod, setSelectedMethod] = useState(
        paymentMethods?.find(pm => pm.is_default)?._id || paymentMethods?.[0]?._id || 'new'
    );
    const [paymentType, setPaymentType] = useState('mobile_money');

    const isNew = selectedMethod === 'new';

    const momoFormik = useFormik({
        initialValues: {network: '', phone: '', accountName: ''},
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: yup.object().shape({
            network: yup.string().oneOf(['MTN', 'VODAFONE', 'AIRTEL_TIGO']).required('Network required'),
            phone: yup.string().required('Phone number required'),
            accountName: yup.string().required('Account name required'),
        }),
        onSubmit: () => {
            if (onSubmitOrder) onSubmitOrder();
        },
    });

    const cardFormik = useFormik({
        initialValues: {cardNumber: '', cardName: '', expiry: '', cvc: ''},
        validateOnChange: true,
        validateOnBlur: true,
        validationSchema: yup.object().shape({
            cardNumber: yup.string().required('Card number required'),
            cardName: yup.string().required('Name on card required'),
            expiry: yup.string().required('Expiry date required'),
            cvc: yup.string().required('CVC required'),
        }),
        onSubmit: () => {
            if (onSubmitOrder) onSubmitOrder();
        },
    });

    const handlePayNow = () => {
        if (!isNew) {
            if (onSubmitOrder) onSubmitOrder();
            return;
        }
        if (paymentType === 'mobile_money') {
            momoFormik.handleSubmit();
        } else if (paymentType === 'card') {
            cardFormik.handleSubmit();
        } else {
            if (onSubmitOrder) onSubmitOrder();
        }
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
        },
    };

    const renderSavedMethods = () => (
        <Box sx={{mb: 3}}>
            <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary', mb: 2}}>
                Saved Payment Methods
            </Typography>
            <Stack spacing={1.5}>
                {paymentMethods.map(pm => (
                    <Card
                        key={pm._id}
                        variant="outlined"
                        onClick={() => setSelectedMethod(pm._id)}
                        sx={{
                            cursor: 'pointer',
                            borderColor: selectedMethod === pm._id ? 'secondary.main' : 'divider',
                            bgcolor: selectedMethod === pm._id ? 'light.secondary' : 'transparent',
                            borderTop: selectedMethod === pm._id ? '3px solid' : '1px solid',
                            borderTopColor: selectedMethod === pm._id ? 'secondary.main' : 'divider',
                            transition: 'all 0.2s',
                            '&:hover': {transform: 'none'},
                        }}>
                        <CardContent sx={{p: 2, '&:last-child': {pb: 2}}}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Radio
                                    checked={selectedMethod === pm._id}
                                    color="secondary"
                                    size="small"
                                />
                                <Box sx={{flex: 1}}>
                                    <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary'}}>
                                        {pm.method_name}
                                    </Typography>
                                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                        {pm.momo
                                            ? `${pm.momo.network} - ${pm.momo.account_number}`
                                            : pm.type}
                                    </Typography>
                                </Box>
                                {pm.is_default && (
                                    <Typography variant="caption" sx={{
                                        color: 'secondary.main',
                                        fontWeight: 600,
                                        bgcolor: 'light.secondary',
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: 1,
                                    }}>
                                        Default
                                    </Typography>
                                )}
                                {selectedMethod === pm._id && (
                                    <CheckCircleOutlined sx={{color: 'secondary.main', fontSize: 20}}/>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>
                ))}

                <Card
                    variant="outlined"
                    onClick={() => setSelectedMethod('new')}
                    sx={{
                        cursor: 'pointer',
                        borderColor: isNew ? 'secondary.main' : 'divider',
                        bgcolor: isNew ? 'light.secondary' : 'transparent',
                        borderStyle: 'dashed',
                        transition: 'all 0.2s',
                        '&:hover': {transform: 'none'},
                    }}>
                    <CardContent sx={{p: 2, '&:last-child': {pb: 2}}}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Radio checked={isNew} color="secondary" size="small"/>
                            <AddOutlined sx={{color: 'secondary.main', fontSize: 20}}/>
                            <Typography variant="body2" fontWeight={600} sx={{color: 'secondary.main'}}>
                                Add new payment method
                            </Typography>
                        </Stack>
                    </CardContent>
                </Card>
            </Stack>
        </Box>
    );

    const renderPaymentTypeSelector = () => (
        <Box sx={{mb: 3}}>
            <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary', mb: 2}}>
                Payment Type
            </Typography>
            <Grid container spacing={1.5}>
                {PAYMENT_TYPES.map(({key, label, icon: Icon}) => (
                    <Grid key={key} size={{xs: 4}}>
                        <Card
                            variant="outlined"
                            onClick={() => setPaymentType(key)}
                            sx={{
                                cursor: 'pointer',
                                borderColor: paymentType === key ? 'secondary.main' : 'divider',
                                bgcolor: paymentType === key ? 'light.secondary' : 'transparent',
                                borderTop: '3px solid',
                                borderTopColor: paymentType === key ? 'secondary.main' : 'transparent',
                                transition: 'all 0.2s',
                                '&:hover': {transform: 'none'},
                            }}>
                            <CardContent sx={{p: 2, '&:last-child': {pb: 2}, textAlign: 'center'}}>
                                <Icon sx={{
                                    color: paymentType === key ? 'secondary.main' : 'text.secondary',
                                    fontSize: 28,
                                    mb: 0.5,
                                }}/>
                                <Typography
                                    variant="caption"
                                    display="block"
                                    sx={{
                                        color: paymentType === key ? 'secondary.main' : 'text.secondary',
                                        fontWeight: 600,
                                    }}>
                                    {label}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );

    const renderMomoForm = () => (
        <Stack spacing={2.5}>
            <FormControl variant="outlined" fullWidth sx={inputSx}>
                <InputLabel htmlFor="network">Network</InputLabel>
                <Select
                    onChange={momoFormik.handleChange}
                    onBlur={momoFormik.handleBlur}
                    value={momoFormik.values.network}
                    error={Boolean(momoFormik.touched.network && momoFormik.errors.network)}
                    id="network"
                    name="network"
                    fullWidth
                    required
                    label="Network"
                    variant="outlined"
                    color="secondary">
                    <MenuItem value="MTN">MTN</MenuItem>
                    <MenuItem value="VODAFONE">Vodafone</MenuItem>
                    <MenuItem value="AIRTEL_TIGO">AirtelTigo</MenuItem>
                </Select>
                {momoFormik.touched.network && momoFormik.errors.network && (
                    <FormHelperText error>{momoFormik.errors.network}</FormHelperText>
                )}
            </FormControl>

            <FormControl variant="outlined" fullWidth sx={inputSx}>
                <InputLabel htmlFor="phone">Phone Number</InputLabel>
                <OutlinedInput
                    fullWidth
                    value={momoFormik.values.phone}
                    id="phone"
                    name="phone"
                    type="tel"
                    error={momoFormik.touched.phone && Boolean(momoFormik.errors.phone)}
                    onChange={momoFormik.handleChange}
                    onBlur={momoFormik.handleBlur}
                    placeholder="e.g. 024 123 4567"
                    required
                    label="Phone Number"
                    size="medium"
                    margin="dense"
                    color="secondary"
                />
                {momoFormik.touched.phone && momoFormik.errors.phone && (
                    <FormHelperText error>{momoFormik.errors.phone}</FormHelperText>
                )}
            </FormControl>

            <FormControl variant="outlined" fullWidth sx={inputSx}>
                <InputLabel htmlFor="accountName">Account Name</InputLabel>
                <OutlinedInput
                    fullWidth
                    value={momoFormik.values.accountName}
                    id="accountName"
                    name="accountName"
                    type="text"
                    error={momoFormik.touched.accountName && Boolean(momoFormik.errors.accountName)}
                    onChange={momoFormik.handleChange}
                    onBlur={momoFormik.handleBlur}
                    placeholder="Name on mobile money account"
                    required
                    label="Account Name"
                    size="medium"
                    margin="dense"
                    color="secondary"
                />
                {momoFormik.touched.accountName && momoFormik.errors.accountName && (
                    <FormHelperText error>{momoFormik.errors.accountName}</FormHelperText>
                )}
            </FormControl>
        </Stack>
    );

    const renderCardForm = () => (
        <Stack spacing={2.5}>
            <FormControl variant="outlined" fullWidth sx={inputSx}>
                <InputLabel htmlFor="cardNumber">Card Number</InputLabel>
                <OutlinedInput
                    fullWidth
                    value={cardFormik.values.cardNumber}
                    id="cardNumber"
                    name="cardNumber"
                    type="text"
                    error={cardFormik.touched.cardNumber && Boolean(cardFormik.errors.cardNumber)}
                    onChange={cardFormik.handleChange}
                    onBlur={cardFormik.handleBlur}
                    placeholder="1234 5678 9012 3456"
                    required
                    label="Card Number"
                    size="medium"
                    margin="dense"
                    color="secondary"
                />
                {cardFormik.touched.cardNumber && cardFormik.errors.cardNumber && (
                    <FormHelperText error>{cardFormik.errors.cardNumber}</FormHelperText>
                )}
            </FormControl>

            <FormControl variant="outlined" fullWidth sx={inputSx}>
                <InputLabel htmlFor="cardName">Name on Card</InputLabel>
                <OutlinedInput
                    fullWidth
                    value={cardFormik.values.cardName}
                    id="cardName"
                    name="cardName"
                    type="text"
                    error={cardFormik.touched.cardName && Boolean(cardFormik.errors.cardName)}
                    onChange={cardFormik.handleChange}
                    onBlur={cardFormik.handleBlur}
                    placeholder="Full name as shown on card"
                    required
                    label="Name on Card"
                    size="medium"
                    margin="dense"
                    color="secondary"
                />
                {cardFormik.touched.cardName && cardFormik.errors.cardName && (
                    <FormHelperText error>{cardFormik.errors.cardName}</FormHelperText>
                )}
            </FormControl>

            <Grid container spacing={2}>
                <Grid size={{xs: 6}}>
                    <FormControl variant="outlined" fullWidth sx={inputSx}>
                        <InputLabel htmlFor="expiry">Expiry</InputLabel>
                        <OutlinedInput
                            fullWidth
                            value={cardFormik.values.expiry}
                            id="expiry"
                            name="expiry"
                            type="text"
                            error={cardFormik.touched.expiry && Boolean(cardFormik.errors.expiry)}
                            onChange={cardFormik.handleChange}
                            onBlur={cardFormik.handleBlur}
                            placeholder="MM/YY"
                            required
                            label="Expiry"
                            size="medium"
                            margin="dense"
                            color="secondary"
                        />
                        {cardFormik.touched.expiry && cardFormik.errors.expiry && (
                            <FormHelperText error>{cardFormik.errors.expiry}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
                <Grid size={{xs: 6}}>
                    <FormControl variant="outlined" fullWidth sx={inputSx}>
                        <InputLabel htmlFor="cvc">CVC</InputLabel>
                        <OutlinedInput
                            fullWidth
                            value={cardFormik.values.cvc}
                            id="cvc"
                            name="cvc"
                            type="text"
                            error={cardFormik.touched.cvc && Boolean(cardFormik.errors.cvc)}
                            onChange={cardFormik.handleChange}
                            onBlur={cardFormik.handleBlur}
                            placeholder="123"
                            required
                            label="CVC"
                            size="medium"
                            margin="dense"
                            color="secondary"
                        />
                        {cardFormik.touched.cvc && cardFormik.errors.cvc && (
                            <FormHelperText error>{cardFormik.errors.cvc}</FormHelperText>
                        )}
                    </FormControl>
                </Grid>
            </Grid>

            <Typography variant="caption" sx={{color: 'text.secondary'}}>
                Card payments are not yet functional. This is a placeholder for future implementation.
            </Typography>
        </Stack>
    );

    const renderCashOnDelivery = () => (
        <Card
            variant="outlined"
            sx={{
                borderTop: '3px solid',
                borderTopColor: 'secondary.main',
                '&:hover': {transform: 'none'},
            }}>
            <CardContent sx={{p: 3}}>
                <Stack spacing={1} alignItems="center" sx={{py: 2}}>
                    <LocalShippingOutlined sx={{color: 'secondary.main', fontSize: 40}}/>
                    <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 600}}>
                        Cash on Delivery
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary', textAlign: 'center'}}>
                        Pay with cash when your order is delivered to your door. Please have the exact amount ready for the delivery rider.
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );

    const renderNewPaymentForm = () => (
        <Box>
            {renderPaymentTypeSelector()}
            {paymentType === 'mobile_money' && renderMomoForm()}
            {paymentType === 'card' && renderCardForm()}
            {paymentType === 'cash_on_delivery' && renderCashOnDelivery()}
        </Box>
    );

    return (
        <Box>
            <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 1}}>
                Payment Information
            </Typography>
            <Typography variant="body2" sx={{color: 'text.secondary', mb: 3}}>
                Select a payment method to complete your order
            </Typography>

            {paymentMethods?.length > 0 && renderSavedMethods()}
            {isNew && renderNewPaymentForm()}

            <Stack
                direction={{xs: 'column-reverse', md: 'row'}}
                justifyContent="space-between"
                spacing={2}
                sx={{mt: 4}}>
                <Button
                    onClick={previous}
                    variant="text"
                    color="secondary"
                    startIcon={<KeyboardArrowLeft/>}
                    size="large"
                    sx={{textTransform: 'none'}}>
                    Back
                </Button>
                <Button
                    onClick={handlePayNow}
                    disableElevation
                    variant="contained"
                    color="secondary"
                    size="large"
                    sx={{textTransform: 'none', fontWeight: 600}}>
                    Pay Now
                </Button>
            </Stack>
        </Box>
    );
};

export default PaymentInformation;
