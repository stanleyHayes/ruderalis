import Layout from "../../components/layout/layout";
import {Typography, Container} from "@mui/material";

const TransactionsPage = () => {
    return (
        <Layout>
            <Container>
                <Typography sx={{color: 'text.secondary'}} variant="h3">Home Page</Typography>
            </Container>
        </Layout>
    )
}

export default TransactionsPage;