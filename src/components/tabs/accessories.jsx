import {Box, Grid} from "@mui/material";
import Empty from "../shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import Product from "../shared/product";

const Accessories = ({accessories}) => {
    return (
        <Box>
            {accessories?.length === 0 ? (
                <Empty
                    title="No accessories found"
                    message="This shop doesn't have any accessories listed yet. Check back soon."
                    image={emptyIcon}
                />
            ) : (
                <Grid container spacing={2}>
                    {accessories?.map((accessory, index) => (
                        <Grid key={index} item xs={12} md={4} lg={3}>
                            <Product product={accessory}/>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default Accessories;
