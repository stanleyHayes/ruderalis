import './App.css';
import {Route, Routes} from "react-router";
import {useSelector} from "react-redux";
import {selectUI} from "./redux/features/ui/ui-slice";
import {THEMES} from "./themes/themes";
import {CssBaseline, ThemeProvider} from "@mui/material";
import {lazy, Suspense} from "react";
import Splash from "./components/shared/splash";
import RequireAuth from "./components/shared/require-auth";
import ErrorBoundary from "./components/shared/error-boundary";

// Auth
const LoginPage = lazy(() => import('./pages/auth/login-page'));
const RegisterPage = lazy(() => import('./pages/auth/register-page'));
const ForgotPasswordPage = lazy(() => import('./pages/auth/forgot-password-page'));
const ResetPasswordPage = lazy(() => import('./pages/auth/reset-password-page'));
const VerifyOtpPage = lazy(() => import('./pages/auth/verify-otp-page'));
const VerifyAccountPage = lazy(() => import('./pages/auth/verify-account-page'));
const ResendOTPPage = lazy(() => import('./pages/auth/resend-otp-page'));
const AcknowledgmentPage = lazy(() => import('./pages/auth/acknowledgment-page'));

// Home
const HomePage = lazy(() => import('./pages/home/home-page'));

// Products
const ProductsPage = lazy(() => import('./pages/products/products-page'));
const ProductDetailPage = lazy(() => import('./pages/products/product-detail-page'));
const FeaturedProductsPage = lazy(() => import('./pages/products/featured-products-page'));

// Edibles
const EdiblesPage = lazy(() => import('./pages/edibles/edibles-page'));
const EdibleDetailPage = lazy(() => import('./pages/edibles/edible-detail-page'));

// Accessories
const AccessoriesPage = lazy(() => import('./pages/accessories/accessories-page'));
const AccessoryDetailPage = lazy(() => import('./pages/accessories/accessory-detail-page'));

// Shops
const ShopsPage = lazy(() => import('./pages/shops/shops-page'));
const ShopDetailPage = lazy(() => import('./pages/shops/shop-detail-page'));
const FeaturedShopsPage = lazy(() => import('./pages/shops/featured-shops-page'));

// Cart & Checkout
const CartPage = lazy(() => import('./pages/cart/cart-page'));
const CheckoutPage = lazy(() => import('./pages/cart/checkout-page'));
const ConfirmationPage = lazy(() => import('./pages/cart/confirmation-page'));

// Account
const ProfilePage = lazy(() => import('./pages/account/profile-page'));
const UpdateProfilePage = lazy(() => import('./pages/account/update-profile-page'));
const ChangePasswordPage = lazy(() => import('./pages/account/change-password-page'));
const DashboardPage = lazy(() => import('./pages/account/dashboard-page'));
const AddressesPage = lazy(() => import('./pages/account/addresses-page'));
const NewAddressPage = lazy(() => import('./pages/account/new-address-page'));

// Orders
const OrdersPage = lazy(() => import('./pages/orders/orders-page'));
const OrderDetailPage = lazy(() => import('./pages/orders/order-detail-page'));

// Conflicts / Disputes
const ConflictsPage = lazy(() => import('./pages/conflicts/conflicts-page'));
const ConflictDetailPage = lazy(() => import('./pages/conflicts/conflict-detail-page'));
const NewConflictPage = lazy(() => import('./pages/conflicts/new-conflict-page'));

// Wishlists
const WishlistsPage = lazy(() => import('./pages/wishlists/wishlists-page'));

// Funds
const FundsPage = lazy(() => import('./pages/funds/funds-page'));
const LoadFundsPage = lazy(() => import('./pages/funds/load-funds-page'));

// Tracking
const TrackingPage = lazy(() => import('./pages/shop/tracking-page'));

// Blog (real implementations in /others/)
const BlogPage = lazy(() => import('./pages/others/blog-page'));
const BlogDetailPage = lazy(() => import('./pages/others/blog-detail-page'));

// Other pages (real implementations in /others/)
const ContactPage = lazy(() => import('./pages/others/contact-page'));
const NewsletterPage = lazy(() => import('./pages/others/newsletter-page'));
const CouponsPage = lazy(() => import('./pages/others/coupons-page'));
const AboutPage = lazy(() => import('./pages/other/about-page'));
const PrivacyPage = lazy(() => import('./pages/other/privacy-page'));
const TermsPage = lazy(() => import('./pages/other/terms-page'));
const AcceptableUsePolicyPage = lazy(() => import('./pages/other/acceptable-use-policy-page'));

// Trips
const TripsPage = lazy(() => import('./pages/trips/trips-page'));
const TripsDetailPage = lazy(() => import('./pages/trips/trips-detail-page'));

// 404
const NotFoundPage = lazy(() => import('./pages/404/not-found-page'));

function App() {
    const {themeVariant} = useSelector(selectUI);
    const theme = themeVariant === 'dark' ? THEMES.darkTheme : THEMES.lightTheme;
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme={true}/>
            <ErrorBoundary>
            <Suspense fallback={<Splash/>}>
                <Routes>
                    {/* Home */}
                    <Route path="/" element={<RequireAuth><HomePage/></RequireAuth>}/>

                    {/* Auth */}
                    <Route path="/auth/login" element={<LoginPage/>}/>
                    <Route path="/auth/register" element={<RegisterPage/>}/>
                    <Route path="/auth/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/auth/reset-password" element={<ResetPasswordPage/>}/>
                    <Route path="/auth/otp/:token/verify" element={<VerifyOtpPage/>}/>
                    <Route path="/auth/verify/:token" element={<VerifyAccountPage/>}/>
                    <Route path="/auth/otp/resend" element={<ResendOTPPage/>}/>
                    <Route path="/auth/verify/acknowledgment/:verdict" element={<AcknowledgmentPage/>}/>

                    {/* Products */}
                    <Route path="/products" element={<ProductsPage/>}/>
                    <Route path="/products/marijuana" element={<ProductsPage/>}/>
                    <Route path="/products/marijuana/:productID" element={<ProductDetailPage/>}/>
                    <Route path="/products/:productID" element={<ProductDetailPage/>}/>
                    <Route path="/products/edibles" element={<EdiblesPage/>}/>
                    <Route path="/products/edibles/:productID" element={<EdibleDetailPage/>}/>
                    <Route path="/products/accessories" element={<AccessoriesPage/>}/>
                    <Route path="/products/accessories/:productID" element={<AccessoryDetailPage/>}/>
                    <Route path="/featured/:product" element={<FeaturedProductsPage/>}/>
                    <Route path="/edibles" element={<EdiblesPage/>}/>
                    <Route path="/edibles/:edibleID" element={<EdibleDetailPage/>}/>

                    {/* Shops */}
                    <Route path="/shops" element={<ShopsPage/>}/>
                    <Route path="/shops/:shopID" element={<ShopDetailPage/>}/>
                    <Route path="/shops/featured" element={<FeaturedShopsPage/>}/>

                    {/* Cart & Checkout */}
                    <Route path="/cart" element={<CartPage/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/checkout/order/confirmed" element={<ConfirmationPage/>}/>

                    {/* Account */}
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/update-profile" element={<UpdateProfilePage/>}/>
                    <Route path="/change-password" element={<ChangePasswordPage/>}/>
                    <Route path="/account/dashboard" element={<DashboardPage/>}/>
                    <Route path="/account/addresses" element={<AddressesPage/>}/>
                    <Route path="/account/address/new" element={<NewAddressPage/>}/>
                    <Route path="/account/address/:addressID/edit" element={<NewAddressPage/>}/>

                    {/* Orders */}
                    <Route path="/orders" element={<OrdersPage/>}/>
                    <Route path="/orders/:orderID" element={<OrderDetailPage/>}/>

                    {/* Conflicts / Disputes */}
                    <Route path="/account/conflicts" element={<ConflictsPage/>}/>
                    <Route path="/account/conflicts/new" element={<NewConflictPage/>}/>
                    <Route path="/account/conflicts/:conflictID" element={<ConflictDetailPage/>}/>

                    {/* Wishlists */}
                    <Route path="/wishlists" element={<WishlistsPage/>}/>

                    {/* Funds */}
                    <Route path="/funds" element={<FundsPage/>}/>
                    <Route path="/funds/load" element={<LoadFundsPage/>}/>

                    {/* Tracking */}
                    <Route path="/tracking" element={<TrackingPage/>}/>
                    <Route path="/tracking/:code" element={<TrackingPage/>}/>

                    {/* Blog */}
                    <Route path="/blog" element={<BlogPage/>}/>
                    <Route path="/blog/:blogID" element={<BlogDetailPage/>}/>

                    {/* Other */}
                    <Route path="/about" element={<AboutPage/>}/>
                    <Route path="/contact" element={<ContactPage/>}/>
                    <Route path="/newsletter" element={<NewsletterPage/>}/>
                    <Route path="/coupons" element={<CouponsPage/>}/>
                    <Route path="/privacy" element={<PrivacyPage/>}/>
                    <Route path="/terms" element={<TermsPage/>}/>
                    <Route path="/acceptable-use-policy" element={<AcceptableUsePolicyPage/>}/>

                    {/* Trips */}
                    <Route path="/trips" element={<TripsPage/>}/>
                    <Route path="/trips/:tripsID" element={<TripsDetailPage/>}/>

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </Suspense>
            </ErrorBoundary>
        </ThemeProvider>
    );
}

export default App;
