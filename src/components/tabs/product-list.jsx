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
                <Empty
                    title="No products found"
                    message="This shop doesn't have any products listed yet. Check back soon."
                    button={
                        <Button
                            onClick={() => dispatch(getAllProducts(token))}
                            variant="contained"
                            size="large"
                            color="secondary"
                            disableElevation
                            sx={{textTransform: 'none'}}>
                            Refresh
                        </Button>
                    }
                    image={emptyIcon}
                />
            ) : (
                <Grid container spacing={2}>
                    {products?.map((product, index) => (
                        <Grid key={index} item xs={12} md={4} lg={3}>
                            <Product product={product}/>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default ProductList;
