import Layout from "../../components/layout/layout";
import {Container, Typography} from "@mui/material";

const TripsPage = () => {
    return (
        <Layout>
            <Container maxWidth="xl">
                <Typography sx={{color: 'text.primary'}} variant="h6">
                    Trips
                </Typography>
            </Container>
        </Layout>
    )
}

export default TripsPage;