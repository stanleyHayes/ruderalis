import {Box, Button, Grid} from "@mui/material";
import Empty from "../shared/empty";
import {getAllProducts} from "../../redux/features/product/product-slice";
import emptyIcon from "../../assets/images/empty.png";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import Product from "../shared/product";

const ProductList = ({products}) => {

    const dispatch = useDispatch();
    const {token} = useSelector(selectAuth);

    return (
        <Box>
            {products?.length === 0 ? (
                <Box>
                    <Empty
                        title="No product"
                        message="Oops looks like this shop has no product in this shop."
                        button={
                            <Button
                                onClick={() => dispatch(getAllProducts(token))}
                                variant="contained"
                                size="large"
                                color="secondary"
                                disableElevation={true}
                                sx={{
                                    textTransform: 'capitalize',
                                    borderTopRightRadius: 16,
                                    borderBottomRightRadius: 0,
                                    borderBottomLeftRadius: 16,
                                    borderTopLeftRadius: 16
                                }}>
                                Refresh
                            </Button>
                        }
                        icon={
                            <img
                                alt="Empty Icon"
                                src={emptyIcon}
                                style={{
                                    height: 100,
                                    width: 100,
                                    objectFit: 'cover',
                                    objectPosition: 'center'
                                }}/>}
                    />
                </Box>
            ) : (
                <Grid container={true} spacing={2}>
                    {products?.map((product, index) => {
                        return (
                            <Grid key={index} item={true} xs={12} md={4} lg={3}>
                                <Product product={product}/>
                            </Grid>
                        )
                    })}
                </Grid>
            )}
        </Box>
    )
}

export default ProductList;