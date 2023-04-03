import Layout from "../../components/layout/layout";
import {Box, Container} from "@mui/material";
import OrderConfirmation from "../../components/shared/order-confirmation";

const ConfirmationPage = () => {

    return (
        <Layout>
            <Box sx={{minHeight: "90vh", display: "flex", alignItems: "center"}}>
                <Container>
                    <OrderConfirmation/>
                </Container>
            </Box>
        </Layout>
    )
}

export default ConfirmationPage;