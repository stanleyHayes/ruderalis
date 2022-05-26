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
            <Box sx={{pt: {xs: 8, lg: 8.5}}}>
                {children}
            </Box>
            <SwipeableDrawer
                onOpen={openDrawer()}
                open={drawerOpen}
                onClose={() => dispatch(closeDrawer())}>
                <SidebarContent/>
            </SwipeableDrawer>
        </Box>
    )
}

export default Layout;