import Layout from "../../components/layout/layout";
import {Container, Typography} from "@mui/material";

const FeaturedShopsPage = () => {
    return (
        <Layout>
            <Container maxWidth="xl">
                <Typography sx={{color: 'text.primary'}} variant="h6">
                    Featured Shops
                </Typography>
            </Container>
        </Layout>
    )
}

export default FeaturedShopsPage;