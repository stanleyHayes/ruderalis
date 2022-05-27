import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Rating,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import {AddShoppingCart, FavoriteBorder, Info} from "@mui/icons-material";
import {red} from "@mui/material/colors";
import currencyFormatter from "currency-formatter";

const Product = ({product}) => {
    return (
        <Card
            sx={{
                borderTopRightRadius: 16,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 16,
                borderTopLeftRadius: 16
            }}
            elevation={0}>
            <CardContent>
                <CardMedia
                    component="img"
                    sx={{
                        borderTopRightRadius: 16,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 16,
                        borderTopLeftRadius: 16,
                        height: 150,
                        width: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        mb: 2
                    }}
                    src={product.image}
                />
                <Stack direction="column" spacing={1}>
                    <Grid container={true} alignItems="center" justifyContent="space-between">
                        <Grid item={true}>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                                fontWeight: 'bold'
                            }}>{product.strain}</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography
                                sx={{color: 'text.secondary'}} fontWeight="bold" fontSize={20}
                                variant="body2">&middot;</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography
                                variant="body2"
                                sx={{color: 'text.secondary', fontWeight: 'bold'}}>{product.type}</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography
                                sx={{color: 'text.secondary'}} fontWeight="bold" fontSize={20}
                                variant="body2">&middot;</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Rating
                                precision={0.1}
                                readOnly={true}
                                value={product.rating}
                                size="small"
                            />
                        </Grid>
                    </Grid>
                    <Typography variant="h5" sx={{color: 'text.primary'}}>{product.name}</Typography>
                    <Typography variant="h5" sx={{color: 'text.secondary'}}>
                        {currencyFormatter.format(product.price.amount, {code: product.price.currency})}
                    </Typography>
                </Stack>
            </CardContent>
            <Divider light={true} variant="fullWidth"/>
            <CardActionArea>
                <Grid container={true}>
                    <Grid item={true} xs={4}>
                        <Tooltip title={`Add ${product.name} to favorites`}>
                            <Button
                                fullWidth={true}
                                variant="text"
                                startIcon={
                                    <FavoriteBorder
                                        sx={{
                                            cursor: 'pointer',
                                            color: red[800],
                                            borderRadius: '100%',
                                            padding: 1,
                                            fontSize: 24,
                                            backgroundColor: 'light.red'
                                        }}/>
                                }
                                sx={{
                                    textTransform: 'capitalize',
                                    color: red[800]
                                }}>
                                Favorite
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <Tooltip title={`View ${product.name}`}>
                            <Button
                                fullWidth={true}
                                variant="text"
                                startIcon={
                                    <Info
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'secondary.main',
                                            borderRadius: '100%',
                                            padding: 1,
                                            fontSize: 24,
                                            backgroundColor: 'light.secondary'
                                        }}/>
                                }
                                sx={{textTransform: 'capitalize', color: 'secondary.main'}}>
                                Details
                            </Button>
                        </Tooltip>
                    </Grid>
                    <Grid item={true} xs={4}>
                        <Tooltip title={`Add ${product.name} to cart`}>
                            <Button
                                fullWidth={true}
                                variant="text"
                                startIcon={
                                    <AddShoppingCart
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'secondary.main',
                                            borderRadius: '100%',
                                            padding: 1,
                                            fontSize: 24,
                                            backgroundColor: 'light.secondary'
                                        }}/>
                                }
                                sx={{textTransform: 'capitalize', color: 'secondary.main'}}>
                                Add
                            </Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    )
}

export default Product;