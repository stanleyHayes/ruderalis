import {Box, SwipeableDrawer} from "@mui/material";
import Header from "../headers/header";
import Footer from "../footer/footer";
import SidebarContent from "../sidebar/sidebar-content";
import BottomNav from "../shared/bottom-nav";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, openDrawer, selectUI} from "../../redux/features/ui/ui-slice";
import ScrollToTop from "../shared/scroll-to-top";
import PageTransition from "../shared/page-transition";

const Layout = ({children}) => {
    const {drawerOpen} = useSelector(selectUI);
    const dispatch = useDispatch();

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundColor: 'background.default',
        }}>
            <ScrollToTop/>
            <Header/>
            <Box component="main" sx={{flex: 1, pb: {xs: '64px', md: 0}}}>
                <PageTransition>
                    {children}
                </PageTransition>
            </Box>
            <Footer/>
            <BottomNav/>
            <SwipeableDrawer
                onOpen={() => dispatch(openDrawer())}
                open={drawerOpen}
                onClose={() => dispatch(closeDrawer())}>
                <SidebarContent/>
            </SwipeableDrawer>
        </Box>
    );
};

export default Layout;
