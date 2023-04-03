import {Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {CheckCircleOutlineOutlined} from "@mui/icons-material";

const OrderConfirmation = () => {
    return (
        <Card variant="outlined" sx={{borderWidth: 3}}>
            <CardContent>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h3" sx={{fontWeight: 700, color: "secondary.main"}} align="center">
                            Payment Accepted
                        </Typography>
                    </Box>
                    <Box>
                        <Stack direction="row" justifyContent="center">
                            <CheckCircleOutlineOutlined
                                color="secondary"
                                sx={{color: "secondary", fontSize: 80}}
                            />
                        </Stack>
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{color: "text.primary"}} align="center">
                            Thank you for your order
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" sx={{color: "text.secondary"}} align="center">
                            Get Higher child of the most high
                        </Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default OrderConfirmation;