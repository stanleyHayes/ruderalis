import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import {FavoriteBorder, Info} from "@mui/icons-material";
import {red} from "@mui/material/colors";

const Shop = ({shop}) => {
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
                    src={shop.image}
                />
                <Stack direction="column" spacing={1}>
                    <Grid container={true} spacing={1} alignItems="center" justifyContent="space-between">
                        <Grid item={true}>
                            <Typography variant="body2" sx={{
                                color: 'text.secondary',
                                fontWeight: 'bold'
                            }}>{shop.owner.fullName}</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography
                                sx={{color: 'text.secondary'}} fontWeight="bold" fontSize={20}
                                variant="body2">&middot;</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography
                                variant="body2"
                                sx={{color: 'text.secondary', fontWeight: 'bold'}}>{shop.status}</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography
                                sx={{color: 'text.secondary'}} fontWeight="bold" fontSize={20}
                                variant="body2">&middot;</Typography>
                        </Grid>
                        <Grid item={true}>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    fontWeight: 'bold'
                                }}>{shop.productCount} Products</Typography>
                        </Grid>
                    </Grid>
                    <Typography variant="h5" sx={{color: 'text.primary'}}>{shop.name}</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>{shop.description} Products</Typography>
                </Stack>
            </CardContent>
            <Divider light={true} variant="fullWidth"/>
            <CardActionArea>
                <Grid container={true}>
                    <Grid item={true} xs={6}>
                        <Tooltip title={`Add ${shop.name} to favorites`}>
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
                    <Grid item={true} xs={6}>
                        <Tooltip title={`View ${shop.name}`}>
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
                </Grid>
            </CardActionArea>
        </Card>
    )
}

export default Shop;