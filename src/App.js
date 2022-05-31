import './App.css';
import {Route, Routes} from "react-router";
import HomePage from "./pages/home/home-page";
import NotFoundPage from "./pages/404/not-found-page";
import {useSelector} from "react-redux";
import {selectUI} from "./redux/features/ui/ui-slice";
import {THEMES} from "./themes/themes";
import {ThemeProvider} from "@mui/material";
import ProductsPage from "./pages/products/products-page";
import ProductDetailPage from "./pages/products/product-detail-page";
import OrdersPage from "./pages/orders/orders-page";
import OrderDetailPage from "./pages/orders/order-detail-page";
import ChangePasswordPage from "./pages/account/change-password-page";
import ProfilePage from "./pages/account/profile-page";
import UpdateProfilePage from "./pages/account/update-profile-page";
import RegisterPage from "./pages/auth/register-page";
import LoginPage from "./pages/auth/login-page";
import ResetPasswordPage from "./pages/auth/reset-password-page";
import ForgotPasswordPage from "./pages/auth/forgot-password-page";
import VerifyAccountPage from "./pages/auth/verify-account-page";
import AcknowledgmentPage from "./pages/auth/acknowledgment-page";
import ShopsPage from "./pages/shops/shops-page";
import ShopDetailPage from "./pages/shops/shop-detail-page";
import WishlistsPage from "./pages/wishlists/wishlists-page";
import CartPage from "./pages/cart/cart-page";
import AboutPage from "./pages/other/about-page";
import PrivacyPage from "./pages/other/privacy-page";
import TermsPage from "./pages/other/terms-page";
import AcceptableUsePolicyPage from "./pages/other/acceptable-use-policy-page";
import EdiblesPage from "./pages/edibles/edibles-page";
import EdibleDetailPage from "./pages/edibles/edible-detail-page";

function App() {
    const {themeVariant} = useSelector(selectUI);
    const theme = themeVariant === 'dark' ? THEMES.darkTheme : THEMES.lightTheme;
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route element={<HomePage/>} exact={true} path="/"/>
                <Route element={<AcknowledgmentPage/>} exact={true} path="/auth/verify/acknowledgment/:verdict"/>
                <Route element={<VerifyAccountPage/>} exact={true} path="/auth/verify/:token"/>
                <Route element={<RegisterPage/>} exact={true} path="/auth/register"/>
                <Route element={<LoginPage/>} exact={true} path="/auth/login"/>
                <Route element={<ResetPasswordPage/>} exact={true} path="/auth/reset-password"/>
                <Route element={<ForgotPasswordPage/>} exact={true} path="/auth/forgot-password"/>
                <Route element={<ChangePasswordPage/>} exact={true} path="/change-password"/>
                <Route element={<ProfilePage/>} exact={true} path="/profile"/>
                <Route element={<CartPage/>} exact={true} path="/cart"/>
                <Route element={<AboutPage/>} exact={true} path="/about"/>
                <Route element={<UpdateProfilePage/>} exact={true} path="/update-profile"/>
                <Route element={<ProductsPage/>} exact={true} path="/products"/>
                <Route element={<WishlistsPage/>} exact={true} path="/wishlists"/>
                <Route element={<ProductDetailPage/>} exact={true} path="/products/:productID"/>
                <Route element={<OrderDetailPage/>} exact={true} path="/orders/:orderID"/>
                <Route element={<OrdersPage/>} exact={true} path="/orders"/>
                <Route element={<EdiblesPage/>} exact={true} path="/edibles"/>
                <Route element={<ShopDetailPage/>} exact={true} path="/shops/:shopID"/>
                <Route element={<EdibleDetailPage/>} exact={true} path="/edibles/:edibleID"/>
                <Route element={<ShopsPage/>} exact={true} path="/shops"/>
                <Route element={<PrivacyPage/>} exact={true} path="/privacy"/>
                <Route element={<TermsPage/>} exact={true} path="/terms"/>
                <Route element={<AcceptableUsePolicyPage/>} exact={true} path="/acceptable-use-policy"/>
                <Route element={<NotFoundPage/>} exact={true} path="*"/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
