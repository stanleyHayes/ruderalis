import './App.css';
import {Route, Routes} from "react-router";
import HomePage from "./pages/home/home-page";
import NotFound from "./pages/404/not-found";
import {useSelector} from "react-redux";
import {selectUI} from "./redux/features/ui/ui-slice";
import {THEMES} from "./themes/themes";
import {ThemeProvider} from "@mui/material";
import ProductsPage from "./pages/products/products-page";
import ProductDetailPage from "./pages/products/product-detail-page";
import OrdersPage from "./pages/orders/orders-page";
import OrderDetailPage from "./pages/orders/order-detail-page";
import TransactionsPage from "./pages/transactions/transactions-page";
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
                <Route element={<UpdateProfilePage/>} exact={true} path="/update-profile"/>
                <Route element={<ProductsPage/>} exact={true} path="/products"/>
                <Route element={<ProductDetailPage/>} exact={true} path="/products/:productID"/>
                <Route element={<OrderDetailPage/>} exact={true} path="/orders/:orderID"/>
                <Route element={<OrdersPage/>} exact={true} path="/orders"/>
                <Route element={<ShopDetailPage/>} exact={true} path="/shops/:shopID"/>
                <Route element={<ShopsPage/>} exact={true} path="/shops"/>
                <Route element={<TransactionsPage/>} exact={true} path="/transactions"/>
                <Route element={<NotFound/>} exact={true} path="*"/>
            </Routes>
        </ThemeProvider>
    );
}

export default App;
