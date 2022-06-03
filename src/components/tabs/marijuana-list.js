import {Box, Button, Grid} from "@mui/material";
import Empty from "../shared/empty";
import {getAllMarijuana} from "../../redux/features/marijuana/marijuana-slice";
import emptyIcon from "../../assets/images/empty.png";
import {useDispatch, useSelector} from "react-redux";
import {selectAuth} from "../../redux/features/auth/auth-slice";
import Marijuana from "../shared/marijuana";

const MarijuanaList = ({allMarijuana}) => {

    const dispatch = useDispatch();
    const {token} = useSelector(selectAuth);

    return (
        <Box>
            {allMarijuana?.length === 0 ? (
                <Box>
                    <Empty
                        title="No marijuana"
                        message="Oops looks like this shop has no marijuana in this shop."
                        button={
                            <Button
                                onClick={() => dispatch(getAllMarijuana(token))}
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
                    {allMarijuana?.map((marijuana, index) => {
                        return (
                            <Grid key={index} item={true} xs={12} md={4} lg={3}>
                                <Marijuana marijuana={marijuana}/>
                            </Grid>
                        )
                    })}
                </Grid>
            )}
        </Box>
    )
}

export default MarijuanaList;