import Layout from "../../components/layout/layout";
import {Box, Container, Divider, Stack, Typography} from "@mui/material";
import notFoundImage from "./../../assets/images/error-404.png";
const NotFoundPage = () => {
    return (
        <Layout>
            <Container sx={{my: 4}}>
                <Typography sx={{color: 'text.primary'}} variant="h3">
                    404
                </Typography>
                <Divider variant="fullWidth" light={true} sx={{my: 2}} />
                <Box sx={{py: 5, backgroundColor: 'background.paper'}}>
                    <Typography sx={{color: 'text.primary'}} mb={4} align="center" variant="h5">
                        Page Not Found
                    </Typography>
                    <Stack justifyContent="center" mb={2} alignItems="center">
                        <img
                            style={{objectFit: 'cover', objectPosition: 'center', width: 128, height: 128}}
                            src={notFoundImage}
                            alt="Page not found"
                            title="Page not found"
                        />
                    </Stack>
                    <Typography sx={{color: 'text.secondary'}} align="center" variant="h6">
                        Looks like you lost your way
                    </Typography>
                </Box>
            </Container>
        </Layout>
    )
}

export default NotFoundPage;