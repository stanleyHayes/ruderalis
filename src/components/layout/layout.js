import {Box, SwipeableDrawer} from "@mui/material";
import Header from "../headers/header";
import SidebarContent from "../sidebar/sidebar-content";
import {useDispatch, useSelector} from "react-redux";
import {closeDrawer, openDrawer, selectUI} from "../../redux/features/ui/ui-slice";

const Layout = ({children}) => {

    const {drawerOpen} = useSelector(selectUI);
    const dispatch = useDispatch();

    return (
        <Box sx={{backgroundColor: 'background.default', minHeight: '100vh'}}>
            <Box>
                <Header/>
            </Box>
            <Box sx={{pt: {xs: 7, lg: 8}, maxWidth: '100vw'}}>
                {children}
            </Box>
            <SwipeableDrawer
                onOpen={() => dispatch(openDrawer())}
                open={drawerOpen}
                onClose={() => dispatch(closeDrawer())}>
                <SidebarContent/>
            </SwipeableDrawer>
        </Box>
    )
}

export default Layout;