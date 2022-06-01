import {Avatar, Box, Button, Divider, Stack, Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {selectUI} from "../../redux/features/ui/ui-slice";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {UTILS} from "../../utils/utils";
import SidebarLink from "../shared/sidebar-link";
import {
    AcUnit, AcUnitOutlined, Cake, CakeOutlined,
    ChevronRight,
    DeleteForever, Edit, EditOutlined,
    ExitToApp, Face, FaceOutlined, Favorite, FavoriteBorder,
    Home,
    HomeOutlined, Info, InfoOutlined, Lock,
    LockOutlined,
    Notifications, Shop, ShopOutlined, ShoppingBag, ShoppingBagOutlined, ShoppingBasket, ShoppingBasketOutlined
} from "@mui/icons-material";
import {red} from "@mui/material/colors";

const SidebarContent = () => {

    const {activePath} = useSelector(selectUI);
    const {authData} = useSelector(selectAuth);

    return (
        <Box sx={{minHeight: '100vh', minWidth: "80vw", py: 3}}>
            <Stack divider={<Divider variant="fullWidth"/>} direction="column" spacing={2}>
                <Stack sx={{px: 4}} direction="column" spacing={1}>
                    <Avatar sx={{width: 100, height: 100}}>
                        <Typography variant="h2">{UTILS.getInitials(authData.fullName)}</Typography>
                    </Avatar>
                    <Typography sx={{color: 'text.primary'}} variant="h6">{authData.fullName}</Typography>
                    <Typography sx={{color: 'text.primary'}} variant="body2">{authData.email}</Typography>
                </Stack>
                <Stack direction="column">
                    <SidebarLink
                        active={activePath === '/'}
                        label="Home"
                        path="/"
                        icon={activePath === '/' ? (
                            <Home
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <HomeOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />
                    <SidebarLink
                        active={activePath === '/products'}
                        label="Products"
                        path="/products"
                        icon={activePath === '/products' ? (
                            <AcUnit
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <AcUnitOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                    }
                    />

                    <SidebarLink
                        active={activePath === '/edibles'}
                        label="Edibles"
                        path="/edibles"
                        icon={activePath === '/edibles' ? (
                            <Cake
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <CakeOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )}
                    />

                    <SidebarLink
                        active={activePath === '/shops'}
                        label="Shops"
                        path="/shops"
                        icon={activePath === '/shops' ? (
                            <Shop
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <ShopOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />
                    <SidebarLink
                        active={activePath === '/about'}
                        label="About"
                        path="/about"
                        icon={activePath === '/about' ? (
                            <Info
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <InfoOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />
                </Stack>
                <Stack direction="column">
                    <SidebarLink
                        active={activePath === '/profile'}
                        label="Profile"
                        path="/profile"
                        icon={activePath === '/profile' ? (
                            <Face
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <FaceOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />
                    <SidebarLink
                        active={activePath === '/cart'}
                        label="Cart"
                        path="/cart"
                        icon={activePath === '/cart' ? (
                            <ShoppingBasket
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <ShoppingBasketOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />

                    <SidebarLink
                        active={activePath === '/orders'}
                        label="Orders"
                        path="/orders"
                        icon={activePath === '/orders' ? (
                            <ShoppingBag
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <ShoppingBagOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />

                    <SidebarLink
                        active={activePath === '/wishlist'}
                        label="Wishlist"
                        path="/"
                        icon={activePath === '/wishlist' ? (
                            <Favorite
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <FavoriteBorder
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />

                    <SidebarLink
                        active={activePath === '/update-profile'}
                        label="Update Profile"
                        path="/update-profile"
                        icon={activePath === '/update-profile' ? (
                            <Edit
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <EditOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )
                        }
                    />
                    <SidebarLink
                        active={activePath === '/change-password'}
                        label="Change Password"
                        path="/change-password"
                        icon={activePath === '/change-password' ? (
                            <Lock
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <LockOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderRadius: '100%',
                                    padding: 1,
                                    fontSize: 24
                                }}/>
                        )}
                    />
                </Stack>
                <Stack direction="column">
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Button
                            size="large"
                            sx={{
                                px: 3,
                                justifyContent: 'flex-start',
                                color: 'secondary.main',
                                textTransform: 'capitalize'
                            }}
                            fullWidth={true}
                            variant="text"
                            startIcon={
                                <ExitToApp
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'secondary.main',
                                        borderRadius: '100%',
                                        padding: 1,
                                        fontSize: 24,
                                        backgroundColor: 'light.secondary'
                                    }}/>}>
                            Logout
                        </Button>

                        <ChevronRight
                            sx={{
                                cursor: 'pointer',
                                color: 'secondary.main',
                                borderRadius: '1%',
                                padding: 1,
                                fontSize: 24,
                            }}/>
                    </Stack>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Button
                            size="large"
                            sx={{
                                px: 3,
                                justifyContent: 'flex-start',
                                color: red[800],
                                textTransform: 'capitalize'
                            }}
                            fullWidth={true}
                            variant="text"
                            startIcon={
                                <DeleteForever
                                    sx={{
                                        cursor: 'pointer',
                                        color: red[800],
                                        borderRadius: '100%',
                                        padding: 1,
                                        fontSize: 24,
                                        backgroundColor: 'light.red'
                                    }}/>}>
                            Disable Account
                        </Button>
                        <ChevronRight
                            sx={{
                                cursor: 'pointer',
                                color: red[800],
                                borderRadius: '1%',
                                padding: 1,
                                fontSize: 24,
                            }}/>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default SidebarContent;