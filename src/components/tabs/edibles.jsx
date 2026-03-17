import {Box, Button, Grid} from "@mui/material";
import Empty from "../shared/empty";
import emptyIcon from "../../assets/images/empty.png";
import Edible from "../shared/edible";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";

const Edibles = ({edibles}) => {
    return (
        <Box>
            {edibles?.length === 0 ? (
                <Empty
                    title="No edibles found"
                    message="This shop doesn't have any edibles listed yet. Check back soon."
                    image={emptyIcon}
                />
            ) : (
                <Grid container spacing={2}>
                    {edibles?.map((edible, index) => (
                        <Grid key={index} item xs={12} md={4} lg={3}>
                            <Edible edible={edible}/>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default Edibles;
