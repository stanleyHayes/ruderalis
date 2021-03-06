import {Avatar, Typography} from "@mui/material";
import {green, grey, red} from "@mui/material/colors";
import airtelTigo from "./../assets/images/airteltigo.png";
import vodafone from "./../assets/images/Vodafone.jpg";
import mtn from "./../assets/images/mtn.jpg";
import {Close, DeleteForever, HourglassBottom, Verified} from "@mui/icons-material";

const getInitials = name => {
    const names = name.split(" ");
    if (names.length === 1) return names[0][0];
    else if (name.length > 1) return `${names[0][0]}${names[1][0]}`;
    return 'A';
}

const renderOrderStatus = status => {
    switch (status) {
        case 'pending':
            return <Typography fontWeight={600} variant="body1" sx={{color: grey[600]}}>{status}</Typography>;
        case 'completed':
            return <Typography fontWeight={600} variant="body1" sx={{color: green[600]}}>{status}</Typography>;
        case 'failed':
            return <Typography fontWeight={600} variant="body1" sx={{color: red[600]}}>{status}</Typography>;
        default:
            return <Typography fontWeight={600} variant="body1" sx={{color: grey[600]}}>{status}</Typography>;
    }
}

const renderTransactionStatus = status => {
    switch (status) {
        case 'pending':
            return <Typography fontWeight={600} variant="body1" sx={{color: grey[600]}}>{status}</Typography>;
        case 'completed':
            return <Typography fontWeight={600} variant="body1" sx={{color: green[600]}}>{status}</Typography>;
        case 'failed':
            return <Typography fontWeight={600} variant="body1" sx={{color: red[600]}}>{status}</Typography>;
        default:
            return <Typography fontWeight={600} variant="body1" sx={{color: grey[600]}}>{status}</Typography>;
    }
}


const renderProductStatus = status => {
    switch (status) {
        case 'featured':
            return <Typography fontWeight={600} variant="body1" sx={{color: grey[600]}}>{status}</Typography>;
        case 'sponsored':
            return <Typography fontWeight={600} variant="body1" sx={{color: green[600]}}>{status}</Typography>;
        case 'regular':
            return <Typography fontWeight={600} variant="body1" sx={{color: red[600]}}>{status}</Typography>;
        default:
            return <Typography fontWeight={600} variant="body1" sx={{color: grey[600]}}>{status}</Typography>;
    }
}


const renderProviderImage = provider => {
    switch (provider) {
        case 'mtn':
            return <Avatar sx={{width: 40, height: 40}} src={mtn} variant="rounded"/>;
        case 'airtelTigo':
            return <Avatar sx={{width: 40, height: 40}} src={airtelTigo} variant="rounded"/>;
        case 'vodafone':
            return <Avatar sx={{width: 40, height: 40}} src={vodafone} variant="rounded"/>;
        default:
            return <Avatar sx={{width: 40, height: 40}} src={mtn} variant="rounded"/>;
    }
}

const renderShopStatus = status => {
    switch (status) {
        case 'pending':
            return <HourglassBottom
                sx={{
                    cursor: 'pointer',
                    color: 'secondary.main',
                    borderRadius: '25%',
                    padding: 1,
                    fontSize: 24,
                    backgroundColor: 'light.secondary',
                    borderTopRightRadius: 32,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 32,
                    borderTopLeftRadius: 32,
                }}
            />;
        case 'verified':
            return <Verified
                sx={{
                    cursor: 'pointer',
                    color: 'secondary.main',
                    borderRadius: '25%',
                    padding: 1,
                    fontSize: 24,
                    backgroundColor: 'light.secondary',
                    borderTopRightRadius: 32,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 32,
                    borderTopLeftRadius: 32,
                }}
            />
        case 'closed':
            return <Close
                sx={{
                    cursor: 'pointer',
                    color: 'secondary.main',
                    borderRadius: '25%',
                    padding: 1,
                    fontSize: 24,
                    backgroundColor: 'light.secondary',
                    borderTopRightRadius: 32,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 32,
                    borderTopLeftRadius: 32,
                }}
            />;
        case 'suspended':
            return <DeleteForever
                sx={{
                    cursor: 'pointer',
                    color: 'secondary.main',
                    borderRadius: '25%',
                    padding: 1,
                    fontSize: 24,
                    backgroundColor: 'light.secondary',
                    borderTopRightRadius: 32,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 32,
                    borderTopLeftRadius: 32,
                }}
            />
        default:
            return <HourglassBottom
                sx={{
                    cursor: 'pointer',
                    color: 'secondary.main',
                    borderRadius: '25%',
                    padding: 1,
                    fontSize: 24,
                    backgroundColor: 'light.secondary',
                    borderTopRightRadius: 32,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 32,
                    borderTopLeftRadius: 32,
                }}
            />;
    }
}

const showMessage = (message, options, callback) => {
    callback(message, options);
}

const calculateTotalPrice = items => {
    return items.reduce((accumulator, item) => {
        return accumulator + (item.product?.price?.amount * item.quantity);
    }, 0);
}

const calculateTotalQuantity = items => {
    return items.reduce((accumulator, item) => {
        return accumulator + item.quantity;
    }, 0);
}


export const UTILS = {
    getInitials,
    showMessage,
    calculateTotalPrice,
    calculateTotalQuantity,
    renderOrderStatus,
    renderTransactionStatus,
    renderProviderImage,
    renderShopStatus,
    renderProductStatus
};