import {
    Avatar, Box, Button, Card, Chip, CircularProgress, Divider,
    FormControl, OutlinedInput, Stack, Typography,
} from "@mui/material";
import currencyFormatter from "currency-formatter";
import {UTILS} from "../../utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {selectCart} from "../../redux/features/cart/cart-slice";
import {clearCouponResult, getCoupons, selectPromotion, validateCoupon} from "../../redux/features/promotion/promotion-slice";
import {useEffect, useState} from "react";
import {
    CheckCircleOutlined, ContentPasteOutlined, LocalOfferOutlined,
    StorefrontOutlined, VerifiedOutlined,
} from "@mui/icons-material";

const CartSummary = ({items: propItems}) => {
    const dispatch = useDispatch();
    const {items: reduxItems} = useSelector(selectCart);
    const {couponResult, couponLoading, couponError, coupons} = useSelector(selectPromotion);
    const items = propItems || reduxItems || [];

    const [promoCode, setPromoCode] = useState('');

    useEffect(() => { if (!coupons?.length) dispatch(getCoupons()); }, [dispatch, coupons?.length]);

    const vendor = items[0]?.product?.shop || items[0]?.product?.vendor || null;
    const currency = items[0]?.product?.price?.currency || 'GHS';
    const subtotal = UTILS.calculateTotalPrice(items);
    const itemCount = UTILS.calculateTotalQuantity(items);

    const shippingPolicy = vendor?.shippingPolicy || vendor?.shipping_policy || null;
    const freeAbove = shippingPolicy?.freeAbove ?? shippingPolicy?.free_above ?? 100;
    const baseFee = shippingPolicy?.baseFee ?? shippingPolicy?.base_fee ?? 15;
    const deliveryFee = subtotal >= freeAbove ? 0 : baseFee;

    const discount = couponResult?.calculatedDiscount
        ?? couponResult?.discountAmount
        ?? (typeof couponResult?.discount === 'number' ? couponResult.discount : 0);
    const taxRate = 0.05;
    const taxAmount = subtotal * taxRate;
    const total = Math.max(0, subtotal - discount) + deliveryFee + taxAmount;

    const handleApplyPromo = (code) => {
        const c = code || promoCode.trim();
        if (!c) return;
        setPromoCode(c);
        dispatch(validateCoupon({code: c, orderAmount: subtotal}));
    };

    const handleRemovePromo = () => {
        dispatch(clearCouponResult());
        setPromoCode('');
    };

    const fmt = (amount) => currencyFormatter.format(amount, {code: currency});

    const appliedCode = couponResult?.code || couponResult?.coupon?.code || promoCode;

    const now = new Date();
    const qualifiedCoupons = (coupons || []).filter(c => {
        if (c.active === false) return false;
        if (c.endDate && new Date(c.endDate) < now) return false;
        if (c.maxUses && c.usedCount >= c.maxUses) return false;
        if (c.minOrderAmount && subtotal < c.minOrderAmount) return false;
        return true;
    }).slice(0, 4);

    const handlePaste = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text?.trim()) setPromoCode(text.trim());
        } catch (_) {}
    };

    return (
        <Card
            variant="outlined"
            sx={{
                backgroundColor: 'background.paper',
                borderTop: '3px solid',
                borderTopColor: 'secondary.main',
                p: 0,
                position: 'sticky',
                top: 100,
                '&:hover': {transform: 'none'},
            }}>
            <Box sx={{p: 2.5}}>
                {/* Vendor Info */}
                {vendor && (
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 2.5}}>
                        <StorefrontOutlined sx={{color: 'secondary.main', fontSize: 20}}/>
                        <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 600}}>
                            {vendor.name || vendor.shopName || 'Vendor'}
                        </Typography>
                        {(vendor.verified || vendor.is_verified) && (
                            <VerifiedOutlined sx={{color: 'secondary.main', fontSize: 16}}/>
                        )}
                    </Stack>
                )}

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{mb: 2}}>
                    <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 600}}>
                        Order Summary
                    </Typography>
                    <Chip
                        label={`${itemCount} item${itemCount !== 1 ? 's' : ''}`}
                        size="small"
                        sx={{bgcolor: 'light.secondary', color: 'secondary.main', fontWeight: 600}}
                    />
                </Stack>

                {/* Items List */}
                <Stack direction="column" spacing={2}>
                    {items.map((item, index) => (
                        <Stack key={index} alignItems="center" direction="row" justifyContent="space-between" spacing={2}>
                            <Stack direction="row" spacing={1.5} alignItems="center" sx={{flex: 1, minWidth: 0}}>
                                <Avatar src={item.product.image} variant="rounded" sx={{width: 44, height: 44}}/>
                                <Box sx={{minWidth: 0}}>
                                    <Typography variant="body2" sx={{
                                        color: 'text.primary', fontWeight: 500,
                                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                                    }}>
                                        {item.product.name}
                                    </Typography>
                                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                        {item.quantity} x{' '}
                                        {currencyFormatter.format(item.product?.price?.amount, {code: item.product?.price?.currency})}
                                    </Typography>
                                </Box>
                            </Stack>
                            <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 500, flexShrink: 0}}>
                                {currencyFormatter.format(item.product?.price?.amount * item.quantity, {code: item.product?.price?.currency})}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>

                <Divider sx={{borderColor: 'divider', my: 2.5}}/>

                {/* Promo Code */}
                <Box sx={{mb: 2.5}}>
                    <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 600, mb: 1, display: 'block'}}>
                        Promo Code
                    </Typography>
                    {couponResult && discount > 0 ? (
                        <Stack direction="row" alignItems="center" justifyContent="space-between"
                            sx={{bgcolor: 'light.secondary', borderRadius: 2, px: 2, py: 1.5}}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <CheckCircleOutlined sx={{color: 'secondary.main', fontSize: 18}}/>
                                <Typography variant="body2" sx={{color: 'secondary.main', fontWeight: 600}}>
                                    {appliedCode}
                                </Typography>
                                <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                    (-{fmt(discount)})
                                </Typography>
                            </Stack>
                            <Button size="small" onClick={handleRemovePromo}
                                sx={{textTransform: 'none', color: 'error.main', fontWeight: 600, minWidth: 'auto'}}>
                                Remove
                            </Button>
                        </Stack>
                    ) : (
                        <Stack direction="row" spacing={1}>
                            <FormControl variant="outlined" size="small" sx={{flex: 1}}>
                                <OutlinedInput
                                    value={promoCode}
                                    onChange={(e) => setPromoCode(e.target.value)}
                                    placeholder="Enter or paste code"
                                    size="small"
                                    color="secondary"
                                    startAdornment={<LocalOfferOutlined sx={{color: 'text.secondary', fontSize: 18, mr: 1}}/>}
                                    endAdornment={
                                        !promoCode && (
                                            <Button size="small" onClick={handlePaste}
                                                startIcon={<ContentPasteOutlined sx={{fontSize: '14px !important'}}/>}
                                                sx={{
                                                    textTransform: 'none', fontWeight: 600, fontSize: '0.7rem',
                                                    color: 'secondary.main', minWidth: 'auto', whiteSpace: 'nowrap', px: 1,
                                                }}>
                                                Paste
                                            </Button>
                                        )
                                    }
                                    onKeyDown={(e) => { if (e.key === 'Enter') handleApplyPromo(); }}
                                />
                            </FormControl>
                            <Button variant="outlined" color="secondary" size="small" onClick={() => handleApplyPromo()}
                                disabled={couponLoading || !promoCode.trim()}
                                sx={{textTransform: 'none', fontWeight: 600, px: 2}}>
                                {couponLoading ? <CircularProgress size={18} color="inherit"/> : 'Apply'}
                            </Button>
                        </Stack>
                    )}
                    {couponError && (
                        <Typography variant="caption" sx={{color: 'error.main', mt: 0.5, display: 'block'}}>
                            {couponError}
                        </Typography>
                    )}
                    {qualifiedCoupons.length > 0 && !(couponResult && discount > 0) && (
                        <Box sx={{mt: 1.5}}>
                            <Typography variant="caption" sx={{color: 'text.disabled', display: 'block', mb: 0.75}}>
                                You qualify for
                            </Typography>
                            <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                                {qualifiedCoupons.map(c => (
                                    <Chip key={c._id} label={c.code} size="small" variant="outlined"
                                        icon={<LocalOfferOutlined sx={{fontSize: '14px !important'}}/>}
                                        onClick={() => handleApplyPromo(c.code)}
                                        disabled={couponLoading}
                                        sx={{
                                            fontWeight: 700, fontSize: '0.7rem', letterSpacing: 0.5,
                                            cursor: 'pointer', borderColor: 'secondary.main', color: 'secondary.main',
                                            transition: 'all 0.2s ease',
                                            '&:hover': {bgcolor: 'light.secondary', borderColor: 'secondary.main'},
                                        }}/>
                                ))}
                            </Stack>
                        </Box>
                    )}
                </Box>

                <Divider sx={{borderColor: 'divider', mb: 2}}/>

                {/* Price Breakdown */}
                <Stack spacing={1.5}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>Subtotal</Typography>
                        <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 500}}>{fmt(subtotal)}</Typography>
                    </Stack>

                    {discount > 0 && (
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>Discount</Typography>
                            <Typography variant="body2" sx={{color: 'secondary.main', fontWeight: 600}}>-{fmt(discount)}</Typography>
                        </Stack>
                    )}

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>Delivery</Typography>
                        <Typography variant="body2" sx={{
                            color: deliveryFee === 0 ? 'secondary.main' : 'text.primary', fontWeight: 500,
                        }}>
                            {deliveryFee === 0 ? 'Free' : fmt(deliveryFee)}
                        </Typography>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" sx={{color: 'text.secondary'}}>Tax (5%)</Typography>
                        <Typography variant="body2" sx={{color: 'text.primary', fontWeight: 500}}>{fmt(taxAmount)}</Typography>
                    </Stack>

                    <Divider sx={{borderColor: 'divider'}}/>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 600}}>Total</Typography>
                        <Typography variant="subtitle1" sx={{color: 'secondary.main', fontWeight: 700}}>{fmt(total)}</Typography>
                    </Stack>
                </Stack>
            </Box>
        </Card>
    );
};

export default CartSummary;
