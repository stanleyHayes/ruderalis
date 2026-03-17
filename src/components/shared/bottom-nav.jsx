import {Badge, BottomNavigation, BottomNavigationAction, Box} from "@mui/material";
import {
    HomeOutlined,
    Home,
    StorefrontOutlined,
    Storefront,
    ShoppingCartOutlined,
    ShoppingCart,
    PersonOutline,
    Person,
} from "@mui/icons-material";
import {useSelector} from "react-redux";
import {selectCart} from "../../redux/features/cart/cart-slice";
import {useLocation, useNavigate} from "react-router";

const BottomNav = () => {
    const {items} = useSelector(selectCart);
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;

    const getActiveTab = () => {
        if (pathname === '/') return 0;
        if (pathname.includes('/products')) return 1;
        if (pathname === '/cart') return 2;
        if (pathname === '/profile' || pathname.includes('/account')) return 3;
        return -1;
    };

    const handleChange = (event, newValue) => {
        const routes = ['/', '/products/marijuana', '/cart', '/profile'];
        navigate(routes[newValue]);
    };

    const actionSx = {
        color: 'text.secondary',
        minWidth: 0,
        py: 1,
        '&.Mui-selected': {
            color: 'secondary.main',
        },
        '& .MuiBottomNavigationAction-label': {
            fontSize: 11,
            fontWeight: 500,
            textTransform: 'none',
            '&.Mui-selected': {
                fontSize: 11,
                fontWeight: 600,
            },
        },
    };

    return (
        <Box
            sx={{
                display: {xs: 'block', md: 'none'},
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1200,
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <BottomNavigation
                value={getActiveTab()}
                onChange={handleChange}
                showLabels
                sx={{
                    backgroundColor: 'background.paper',
                    height: 64,
                }}
            >
                <BottomNavigationAction
                    label="Home"
                    icon={getActiveTab() === 0 ? <Home/> : <HomeOutlined/>}
                    sx={actionSx}
                />
                <BottomNavigationAction
                    label="Shop"
                    icon={getActiveTab() === 1 ? <Storefront/> : <StorefrontOutlined/>}
                    sx={actionSx}
                />
                <BottomNavigationAction
                    label="Cart"
                    icon={
                        <Badge
                            badgeContent={items?.length || 0}
                            color="secondary"
                            max={99}
                            sx={{
                                '& .MuiBadge-badge': {
                                    fontSize: 9,
                                    fontWeight: 700,
                                    minWidth: 14,
                                    height: 14,
                                    top: -2,
                                    right: -2,
                                },
                            }}
                        >
                            {getActiveTab() === 2 ? <ShoppingCart/> : <ShoppingCartOutlined/>}
                        </Badge>
                    }
                    sx={actionSx}
                />
                <BottomNavigationAction
                    label="Account"
                    icon={getActiveTab() === 3 ? <Person/> : <PersonOutline/>}
                    sx={actionSx}
                />
            </BottomNavigation>
        </Box>
    );
};

export default BottomNav;
