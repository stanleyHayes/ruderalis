import {
    Button,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Link as MUILink,
    Rating,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import {Call, Info} from "@mui/icons-material";
import {Link} from "react-router-dom";

const Shop = ({shop}) => {

    return (
        <Card
            sx={{
                borderTopRightRadius: 32,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 32,
                borderTopLeftRadius: 32
            }}
            elevation={1}>
            <CardContent>
                <CardMedia
                    component="img"
                    sx={{
                        borderTopRightRadius: 32,
                        borderBottomRightRadius: 0,
                        borderBottomLeftRadius: 32,
                        borderTopLeftRadius: 32,
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
                            <Rating precision={0.1} readOnly={true} value={shop.rating.average} size="small"/>
                        </Grid>
                    </Grid>
                    <Typography variant="h5" sx={{color: 'text.primary'}}>{shop.name}</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary'}}>{shop.description}</Typography>
                </Stack>
            </CardContent>
            <Divider sx={{backgroundColor: 'divider'}} variant="fullWidth"/>
            <Grid container={true}>
                <Grid item={true} xs={6}>
                    <Tooltip title={`Call ${shop.name}`}>
                        <MUILink underline="none" href={`tel:${shop.contact.phone}`}>
                            <Button
                                fullWidth={true}
                                variant="text"
                                startIcon={
                                    <Call
                                        sx={{
                                            cursor: 'pointer',
                                            color: 'secondary.main',
                                            borderRadius: '100%',
                                            padding: 1,
                                            fontSize: 24,
                                        }}/>
                                }
                                sx={{
                                    textTransform: 'capitalize',
                                    color: 'secondary.main'
                                }}>
                                Call
                            </Button>
                        </MUILink>
                    </Tooltip>
                </Grid>
                <Grid item={true} xs={6}>
                    <Tooltip title={`View ${shop.name}`}>
                        <Link style={{textDecoration: 'none'}} to={`/shops/${shop._id}`}>
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
                                        }}/>
                                }
                                sx={{textTransform: 'capitalize', color: 'secondary.main'}}>
                                Details
                            </Button>
                        </Link>
                    </Tooltip>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Shop;