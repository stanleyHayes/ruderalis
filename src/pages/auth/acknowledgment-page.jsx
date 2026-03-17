import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Stack,
    Typography,
    useTheme
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import {Link, useParams} from "react-router-dom";
import {CheckCircle, Error, ArrowRightAlt, LockOutlined} from "@mui/icons-material";
import Layout from "../../components/layout/layout";

const AcknowledgmentPage = () => {

    const {verdict} = useParams();
    const theme = useTheme();

    const isSuccess = verdict === 'success';

    return (
        <Layout>
            <Box
                sx={{
                    maxWidth: '100vw',
                    display: 'flex',
                    minHeight: '80vh',
                    backgroundColor: 'background.default',
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Container maxWidth="sm">
                    <Stack
                        direction="column"
                        spacing={4}
                        alignItems="center"
                        sx={{py: 4}}>

                        {/* Logo + Brand */}
                        <Stack alignItems="center" direction="row" spacing={2}>
                            <Link to="/" style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
                                <img
                                    src={logo}
                                    style={{
                                        width: 48,
                                        height: 48,
                                        objectFit: 'contain',
                                        objectPosition: 'center'
                                    }}
                                    alt="Ruderalis Logo"
                                />
                            </Link>
                            <Link to="/" style={{textDecoration: 'none'}}>
                                <Typography
                                    sx={{color: 'text.primary', fontWeight: 600}}
                                    
                                    variant="h5">
                                    Ruderalis
                                </Typography>
                            </Link>
                        </Stack>

                        {/* Result Card */}
                        <Card variant="outlined" elevation={0} sx={{width: '100%'}}>
                            <Box sx={{height: 3, backgroundColor: isSuccess ? 'secondary.main' : 'error.main'}}/>
                            <CardContent sx={{p: {xs: 3, md: 5}}}>
                                <Stack
                                    direction="column"
                                    spacing={3}
                                    alignItems="center">

                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: isSuccess
                                                ? 'light.secondary'
                                                : (t) => t.palette.error.main + '1A',
                                            borderRadius: '50%',
                                        }}>
                                        {isSuccess ? (
                                            <CheckCircle
                                                sx={{
                                                    fontSize: 48,
                                                    color: 'secondary.main',
                                                }}
                                            />
                                        ) : (
                                            <Error
                                                sx={{
                                                    fontSize: 48,
                                                    color: 'error.main',
                                                }}
                                            />
                                        )}
                                    </Box>

                                    <Typography
                                        variant="h4"
                                        align="center"
                                        sx={{
                                            color: isSuccess ? 'secondary.main' : 'error.main',
                                            
                                            fontWeight: 700,
                                        }}>
                                        {isSuccess ? 'Verification Complete' : 'Something went wrong'}
                                    </Typography>

                                    <Typography
                                        variant="body1"
                                        align="center"
                                        sx={{color: 'text.secondary', maxWidth: 400}}>
                                        {isSuccess
                                            ? 'Your dispensary account has been verified successfully. You can now sign in and start browsing premium medical cannabis products.'
                                            : 'We could not verify your account. The link may have expired or is invalid. Please try again or contact our support team.'}
                                    </Typography>

                                    <Link
                                        to="/auth/login"
                                        style={{textDecoration: 'none', width: '100%'}}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="secondary"
                                            size="large"
                                            disableElevation
                                            endIcon={<ArrowRightAlt/>}
                                            sx={{
                                                textTransform: 'none',
                                                py: 1.5,
                                                
                                                fontWeight: 600,
                                                fontSize: '1rem',
                                            }}>
                                            Go to Sign In
                                        </Button>
                                    </Link>

                                    {!isSuccess && (
                                        <Link
                                            to="/auth/otp/resend"
                                            style={{textDecoration: 'none', width: '100%'}}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color="secondary"
                                                size="large"
                                                disableElevation
                                                sx={{
                                                    textTransform: 'none',
                                                    py: 1.5,
                                                    
                                                    fontWeight: 600,
                                                    fontSize: '1rem',
                                                }}>
                                                Resend Verification Code
                                            </Button>
                                        </Link>
                                    )}

                                    <Divider sx={{width: '100%'}}/>

                                    <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                        <LockOutlined sx={{color: 'text.disabled', fontSize: 18}}/>
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            Your data is encrypted and secure
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    )
}

export default AcknowledgmentPage;
