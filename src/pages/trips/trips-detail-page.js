import Layout from "../../components/layout/layout";
import {Container, Typography} from "@mui/material";

const TripsDetailPage = () => {
    return (
        <Layout>
            <Container maxWidth="xl">
                <Typography sx={{color: 'text.primary'}} variant="h6">
                    Trips Detail
                </Typography>
            </Container>
        </Layout>
    )
}

export default TripsDetailPage;