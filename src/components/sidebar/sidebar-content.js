import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    CardMedia,
    Avatar,
    Box,
    Button,
    Divider,
    Stack,
    Typography
} from "@mui/material";
import {useSelector} from "react-redux";
import {selectUI} from "../../redux/features/ui/ui-slice";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import {UTILS} from "../../utils/utils";
import SidebarLink from "../shared/sidebar-link";
import beanie from "./../../assets/images/beanie.png";
import marijuana from "./../../assets/images/marijuana.png";
import product from "./../../assets/images/product.png";
import yucca from "./../../assets/images/yucca.png";
import star from "./../../assets/images/star.png";
import featured from "./../../assets/images/featured.png";

import {
    ChevronRight,
    DeleteForever,
    Edit,
    EditOutlined,
    ExitToApp,
    Face,
    FaceOutlined,
    Favorite,
    FavoriteBorder,
    Home,
    HomeOutlined,
    Info,
    InfoOutlined,
    Lock,
    LockOutlined,
    Shop,
    ShopOutlined,
    ShoppingBag,
    ShoppingBagOutlined,
    ShoppingBasket,
    ShoppingBasketOutlined
} from "@mui/icons-material";
import {red} from "@mui/material/colors";

const SidebarContent = () => {

    const {activePath} = useSelector(selectUI);
    const {authData} = useSelector(selectAuth);

    return (
        <Box sx={{minHeight: '100vh', minWidth: "80vw", py: 3}}>
            <Stack
                divider={<Divider variant="fullWidth" sx={{mt: 3}}/>} direction="column">
                <Stack sx={{px: 4}} direction="column" spacing={1}>
                    <Avatar
                        sx={{
                            width: 70,
                            height: 70,
                            borderTopRightRadius: 32,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 32,
                        }}>
                        <Typography variant="h4">{UTILS.getInitials(authData.fullName)}</Typography>
                    </Avatar>
                    <Typography sx={{color: 'text.primary'}} variant="h6">{authData.fullName}</Typography>
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
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <HomeOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32
                                }}/>
                        )}
                    />
                    <Accordion
                        square={true}
                        sx={{width: '100%', backgroundColor: "background.paper"}}
                        variant="elevation"
                        elevation={0}>
                        <AccordionSummary
                            sx={{backgroundColor: "background.paper"}}
                            expandIcon={
                                <ChevronRight
                                    sx={{
                                        cursor: 'pointer',
                                        color: activePath.includes('products') ? 'secondary.main' : 'text.primary',
                                        borderRadius: '1%',
                                        padding: 0.6,
                                        fontSize: 32,
                                    }}
                                />
                            }>
                            <Stack
                                sx={{
                                    justifyContent: 'flex-start',
                                    borderLeftWidth: activePath.includes('products') ? 3 : 0,
                                    borderLeftStyle: activePath.includes('products') ? 'solid' : false,
                                    borderLeftColor: activePath.includes('products') ? 'secondary.main' : false,
                                    backgroundColor: activePath.includes('products') ? 'light.secondary' : false,
                                    paddingLeft: 2,
                                    width: '100%'
                                }}
                                direction="row" justifyContent="space-between" alignItems="center">
                                <Button
                                    fullWidth={true}
                                    startIcon={
                                        activePath.includes('marijuana') ?
                                            <CardMedia
                                                component="img"
                                                src={product}
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    cursor: 'pointer',
                                                    color: 'secondary.main',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                    padding: 0.6,
                                                    fontSize: 36,
                                                    backgroundColor: 'light.secondary'
                                                }}
                                            /> :
                                            <CardMedia
                                                component="img"
                                                src={product}
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    cursor: 'pointer',
                                                    color: 'secondary.main',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                    padding: 0.6,
                                                    fontSize: 36,
                                                }}
                                            />
                                    }
                                    size="large"
                                    variant="text"
                                    sx={{
                                        marginLeft: -2,
                                        borderRadius: 0,
                                        justifyContent: 'flex-start',
                                        color: activePath.includes('products') ? 'secondary.main' : 'text.primary',
                                        textTransform: 'capitalize',
                                    }}>
                                    Products
                                </Button>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{backgroundColor: "background.paper"}}>
                            <Stack direction="column" spacing={1}>
                                <SidebarLink
                                    active={activePath.includes('marijuana')}
                                    label="Product"
                                    path="/products/marijuana"
                                    icon={activePath.includes('marijuana') ? (
                                        <CardMedia
                                            component="img"
                                            src={marijuana}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 0.6,
                                                fontSize: 36,
                                                backgroundColor: 'light.secondary'
                                            }}
                                        />) : (
                                        <CardMedia
                                            component="img"
                                            src={marijuana}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 0.6,
                                                fontSize: 32,
                                            }}
                                        />
                                    )
                                    }
                                />
                                <SidebarLink
                                    active={activePath.includes('edibles')}
                                    label="Edibles"
                                    path="/products/edibles"
                                    icon={activePath.includes('edibles') ? (
                                        <CardMedia
                                            component="img"
                                            src={yucca}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 0.6,
                                                fontSize: 36,
                                                backgroundColor: 'light.secondary'
                                            }}
                                        />) : (
                                        <CardMedia
                                            component="img"
                                            src={yucca}
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 0.6,
                                                fontSize: 32,
                                            }}
                                        />
                                    )}
                                />
                                <SidebarLink
                                    active={activePath.includes('accessories')}
                                    label="Accessories"
                                    path="/products/accessories"
                                    icon={activePath.includes('accessories') ? (
                                        <CardMedia
                                            component="img"
                                            src={beanie}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                backgroundColor: 'light.secondary'
                                            }}
                                        />) : (
                                        <CardMedia
                                            component="img"
                                            src={beanie}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                            }}
                                        />
                                    )}
                                />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>


                    <Accordion
                        square={true}
                        sx={{width: '100%', backgroundColor: "background.paper"}}
                        variant="elevation"
                        elevation={0}>
                        <AccordionSummary
                            sx={{backgroundColor: "background.paper"}}
                            expandIcon={
                                <ChevronRight
                                    sx={{
                                        cursor: 'pointer',
                                        color: activePath.includes('products') ? 'secondary.main' : 'text.primary',
                                        borderRadius: '1%',
                                        padding: 0.6,
                                        fontSize: 32,
                                    }}
                                />
                            }>
                            <Stack
                                sx={{
                                    justifyContent: 'flex-start',
                                    borderLeftWidth: activePath.includes('featured') ? 3 : 0,
                                    borderLeftStyle: activePath.includes('featured') ? 'solid' : false,
                                    borderLeftColor: activePath.includes('featured') ? 'secondary.main' : false,
                                    backgroundColor: activePath.includes('featured') ? 'light.secondary' : false,
                                    paddingLeft: 2,
                                    width: '100%'
                                }}
                                direction="row" justifyContent="space-between" alignItems="center">
                                <Button
                                    fullWidth={true}
                                    startIcon={
                                        activePath.includes('featured') && activePath.includes('marijuana') ?
                                            <CardMedia
                                                component="img"
                                                src={star}
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    cursor: 'pointer',
                                                    color: 'secondary.main',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                    backgroundColor: 'light.secondary'
                                                }}
                                            /> :
                                            <CardMedia
                                                component="img"
                                                src={featured}
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    cursor: 'pointer',
                                                    color: 'secondary.main',
                                                    borderTopRightRadius: 32,
                                                    borderBottomRightRadius: 0,
                                                    borderBottomLeftRadius: 32,
                                                    borderTopLeftRadius: 32,
                                                }}
                                            />
                                    }
                                    size="large"
                                    variant="text"
                                    sx={{
                                        marginLeft: -2,
                                        borderRadius: 0,
                                        justifyContent: 'flex-start',
                                        color: activePath.includes('featured') && activePath.includes('marijuana') ? 'secondary.main' : 'text.primary',
                                        textTransform: 'capitalize',
                                    }}>
                                    Featured
                                </Button>
                            </Stack>
                        </AccordionSummary>
                        <AccordionDetails
                            sx={{backgroundColor: "background.paper"}}>
                            <Stack direction="column" spacing={1}>
                                <SidebarLink
                                    active={activePath.includes('marijuana')}
                                    label="Product"
                                    path="/marijuana/featured"
                                    icon={activePath.includes('marijuana') ? (
                                        <CardMedia
                                            component="img"
                                            src={marijuana}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 0.6,
                                                fontSize: 36,
                                                backgroundColor: 'light.secondary'
                                            }}
                                        />) : (
                                        <CardMedia
                                            component="img"
                                            src={marijuana}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 0.6,
                                                fontSize: 36,
                                            }}
                                        />
                                    )
                                    }
                                />
                                <SidebarLink
                                    active={activePath.includes('edibles')}
                                    label="Edibles"
                                    path="/edibles/featured"
                                    icon={activePath.includes('edibles') ? (
                                        <CardMedia
                                            component="img"
                                            src={yucca}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 0.6,
                                                fontSize: 36,
                                                backgroundColor: 'light.secondary'
                                            }}
                                        />) : (
                                        <CardMedia
                                            component="img"
                                            src={yucca}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 0.6,
                                                fontSize: 36,
                                            }}
                                        />
                                    )}
                                />
                                <SidebarLink
                                    active={activePath.includes('accessories')}
                                    label="Accessories"
                                    path="/accessories/featured"
                                    icon={activePath.includes('accessories') ? (
                                        <CardMedia
                                            component="img"
                                            src={beanie}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 0.6,
                                                fontSize: 36,
                                                backgroundColor: 'light.secondary'
                                            }}
                                        />) : (
                                        <CardMedia
                                            component="img"
                                            src={beanie}
                                            sx={{
                                                width: 30,
                                                height: 30,
                                                cursor: 'pointer',
                                                color: 'secondary.main',
                                                borderTopRightRadius: 32,
                                                borderBottomRightRadius: 0,
                                                borderBottomLeftRadius: 32,
                                                borderTopLeftRadius: 32,
                                                padding: 0.6,
                                                fontSize: 36,
                                            }}
                                        />
                                    )}
                                />
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <SidebarLink
                        active={activePath === '/shops'}
                        label="Shops"
                        path="/shops"
                        icon={activePath === '/shops' ? (
                            <Shop
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <ShopOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32
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
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <InfoOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32
                                }}/>
                        )
                        }
                    />
                </Stack>
                <Stack sx={{pt: 3}} direction="column">
                    <SidebarLink
                        active={activePath === '/profile'}
                        label="Profile"
                        path="/profile"
                        icon={activePath === '/profile' ? (
                            <Face
                                sx={{
                                    cursor: 'pointer',
                                    color: 'secondary.main',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <FaceOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32
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
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <ShoppingBasketOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32
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
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <ShoppingBagOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32
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
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <FavoriteBorder
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32
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
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <EditOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32
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
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32,
                                    backgroundColor: 'light.secondary'
                                }}/>
                        ) : (
                            <LockOutlined
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    borderTopRightRadius: 32,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 32,
                                    borderTopLeftRadius: 32,
                                    padding: 0.6,
                                    fontSize: 32
                                }}/>
                        )}
                    />
                </Stack>
                <Stack sx={{px: 3, py: 3}} spacing={2} direction="column">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <ExitToApp
                            sx={{
                                cursor: 'pointer',
                                color: 'secondary.main',
                                borderTopRightRadius: 32,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 32,
                                padding: 1,
                                fontSize: 32,
                                backgroundColor: 'light.secondary'
                            }}/>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "secondary.main",
                                textTransform: 'capitalize',
                            }}>
                            Logout
                        </Typography>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <DeleteForever
                            sx={{
                                cursor: 'pointer',
                                color: red[800],
                                borderTopRightRadius: 32,
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 32,
                                borderTopLeftRadius: 32,
                                padding: 1,
                                fontSize: 32,
                                backgroundColor: "light.red"
                            }}/>
                        <Typography
                            variant="body1"
                            sx={{
                                color: red[800],
                                textTransform: 'capitalize',
                            }}>
                            Disable Account
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    )
}

export default SidebarContent;