import {Avatar, Box, Card, Stack, Typography} from "@mui/material";
import currencyFormatter from "currency-formatter";

const CartSummary = ({items}) => {
    return (
        <Card variant="outlined" sx={{borderWidth: 2}}>
            <Stack direction="column">
            {items.map((item, index) => {
                return (
                    <Box key={index}>
                        <Stack alignItems="center" direction="row" spacing={3}>
                            <Avatar src={item.product.image} sx={{}} variant="rounded" />
                            <Typography variant="body2" sx={{color: "text.primary", fontWeight: 500}}>
                                {item.product.name}
                            </Typography>
                            <Typography variant="body2" sx={{color: "text.secondary"}}>
                                {currencyFormatter.format(
                                    item.product?.price?.amount,
                                    {code: item.product?.price?.currency}
                                )}
                            </Typography>
                        </Stack>
                    </Box>
                )
            })}
            </Stack>
        </Card>
    )
}

export default CartSummary;