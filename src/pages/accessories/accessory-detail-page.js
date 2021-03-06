import Layout from "../../components/layout/layout";
import {Container, Typography} from "@mui/material";

const AccessoriesDetailPage = () => {
    return (
        <Layout>
            <Container maxWidth="xl">
                <Typography sx={{color: 'text.primary'}} variant="h6">
                    Accessories Detail
                </Typography>
            </Container>
        </Layout>
    )
}

export default AccessoriesDetailPage;