import {Avatar, Box, Card, Divider, Grid, Stack, Typography} from "@mui/material";
import currencyFormatter from "currency-formatter";
import {UTILS} from "../../utils/utils";

const CartSummary = ({items}) => {
    return (
        <Card
            elevation={0}
            variant="elevation"
            sx={{
                px: 2,
                py: 1,
                backgroundColor: "background.paper"
            }}>
            <Stack direction="column" divider={<Divider variant="inset" light={true} sx={{}}/>} spacing={1}>
                {items.map((item, index) => {
                    return (
                        <Stack
                            key={index}
                            alignItems="center"
                            direction="row"
                            justifyContent="space-between"
                            spacing={3}>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar src={item.product.image} sx={{}} variant="rounded"/>
                                <Box>
                                    <Typography
                                        variant="body1"
                                        sx={{color: "text.primary", fontWeight: 500, mb: 1}}>
                                        {item.product.name}
                                    </Typography>
                                    <Stack direction="row" spacing={1}>
                                        <Typography variant="body2" sx={{color: "text.secondary"}}>
                                            {item.quantity} {" "} x {" "}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: "text.secondary"}}>
                                            {currencyFormatter.format(
                                                item.product?.price?.amount,
                                                {code: item.product?.price?.currency}
                                            )}
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Stack>

                            <Typography variant="body2" sx={{color: "text.secondary"}}>
                                {currencyFormatter.format(
                                    item.product?.price?.amount * item.quantity,
                                    {code: item.product?.price?.currency}
                                )}
                            </Typography>

                        </Stack>
                    )
                })}
            </Stack>
            <Divider variant="fullWidth" light={true} sx={{my: 3}}/>
            <Stack
                direction="column"
                divider={<Divider variant="inset" light={true} sx={{}}/>}
                spacing={1}>
                <Box>
                    <Grid container={true} justifyContent="space-between" alignItems="center">
                        <Grid item={true} xs={6} md="auto">
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                Discount
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={6} md="auto">
                            <Typography variant="body1" sx={{color: 'text.primary'}}>

                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Grid container={true} justifyContent="space-between" alignItems="center">
                        <Grid item={true} xs={6} md="auto">
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                Grand Total
                            </Typography>
                        </Grid>
                        <Grid item={true} xs={6} md="auto">
                            <Typography variant="body1" sx={{color: 'text.primary'}}>
                                {
                                    currencyFormatter.format(
                                        UTILS.calculateTotalPrice(items),
                                        {code: items[0].product.price.currency}
                                    )
                                }
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Card>
    )
}

export default CartSummary;