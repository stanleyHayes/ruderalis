import Layout from "../../components/layout/layout";
import {Container, Typography} from "@mui/material";

const AccessoriesPage = () => {
    return (
        <Layout>
            <Container maxWidth="xl">
                <Typography sx={{color: 'text.primary'}} variant="h6">
                    Accessories Page
                </Typography>
            </Container>
        </Layout>
    )
}

export default AccessoriesPage;