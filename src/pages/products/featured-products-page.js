import Layout from "../../components/layout/layout";
import {Container, Typography} from "@mui/material";

const FeaturedProductsPage = () => {
    return (
        <Layout>
            <Container maxWidth="xl">
                <Typography sx={{color: 'text.primary'}} variant="h6">
                    Featured Products
                </Typography>
            </Container>
        </Layout>
    )
}

export default FeaturedProductsPage;