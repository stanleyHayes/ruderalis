import Layout from "../../components/layout/layout";
import {Box, Container} from "@mui/material";
import OrderConfirmation from "../../components/shared/order-confirmation";
import {motion} from 'framer-motion';
import {scaleIn} from "../../utils/animations";

const ConfirmationPage = () => {
    return (
        <Layout>
            <Box sx={{py: {xs: 4, md: 8}, bgcolor: 'background.default'}}>
                <Container maxWidth="md">
                    <motion.div variants={scaleIn} initial="initial" animate="animate">
                        <OrderConfirmation/>
                    </motion.div>
                </Container>
            </Box>
        </Layout>
    );
};

export default ConfirmationPage;
