import {Chip, Typography} from "@mui/material";
import currencyFormatter from "currency-formatter";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import airtelTigo from "./../assets/images/airteltigo.png";
import vodafone from "./../assets/images/Vodafone.jpg";
import mtn from "./../assets/images/mtn.jpg";

dayjs.extend(relativeTime);

const getInitials = (name) => {
    if (!name || !name.trim()) return '?';
    const parts = name.trim().split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const formatMoney = (amount, currency = 'USD') => {
    return currencyFormatter.format(amount, {code: currency});
};

const formatDate = (date, format = 'MMM D, YYYY') => {
    return dayjs(date).format(format);
};

const formatRelativeDate = (date) => {
    return dayjs(date).fromNow();
};

const calculatePrice = (price, discount) => {
    if (!discount) return price;
    if (discount.type === 'percentage') return price - (price * discount.value / 100);
    return price - discount.value;
};

const statusColor = (status) => {
    const map = {
        pending: 'warning', processing: 'info', shipped: 'info',
        delivered: 'success', completed: 'success', cancelled: 'error',
        refunded: 'error', active: 'success', inactive: 'error',
        open: 'success', closed: 'error',
    };
    return map[status?.toLowerCase()] || 'default';
};

const renderOrderStatus = (status) => (
    <Chip label={status} size="small" color={statusColor(status)} variant="filled"
          sx={{fontWeight: 600, textTransform: 'capitalize'}}/>
);

const renderTransactionStatus = (status) => (
    <Chip label={status} size="small" color={statusColor(status)} variant="outlined"
          sx={{fontWeight: 600, textTransform: 'capitalize'}}/>
);

const renderProviderImage = (provider) => {
    const map = {mtn, vodafone, airteltigo: airtelTigo};
    const img = map[provider?.toLowerCase()];
    if (img) return <img src={img} alt={provider} style={{width: 30, height: 30, objectFit: 'contain'}}/>;
    return <Typography variant="caption" sx={{fontWeight: 600}}>{provider}</Typography>;
};

const renderShopStatus = (status) => renderOrderStatus(status);
const renderProductStatus = (status) => renderOrderStatus(status);

const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + (item.product.price.amount * item.quantity), 0);
};

const calculateTotalQuantity = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
};

const strainColor = (strain) => {
    const map = {sativa: 'warning', indica: 'info', hybrid: 'secondary'};
    return map[strain?.toLowerCase()] || 'default';
};

const CART_STORAGE_KEY = 'RUDERALIS_CART';
const WISHLIST_STORAGE_KEY = 'RUDERALIS_WISHLISTS';

const getStoredCart = () => {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch { return []; }
};

const saveCart = (items) => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const getStoredWishlists = () => {
    try {
        const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch { return []; }
};

const saveWishlists = (items) => {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
};

export const UTILS = {
    getInitials, formatMoney, formatDate, formatRelativeDate,
    calculatePrice, statusColor, renderOrderStatus, renderTransactionStatus,
    renderProviderImage, renderShopStatus, renderProductStatus,
    calculateTotalPrice, calculateTotalQuantity, strainColor,
    getStoredCart, saveCart, getStoredWishlists, saveWishlists,
    CART_STORAGE_KEY, WISHLIST_STORAGE_KEY,
};
