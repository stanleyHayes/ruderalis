import {Component} from "react";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {ErrorOutline, RefreshOutlined} from "@mui/icons-material";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false, error: null};
    }

    static getDerivedStateFromError(error) {
        return {hasError: true, error};
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box sx={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default'}}>
                    <Container maxWidth="sm">
                        <Stack alignItems="center" spacing={3} sx={{textAlign: 'center'}}>
                            <Box sx={{
                                width: 80, height: 80, borderRadius: '50%',
                                bgcolor: 'light.red', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                                <ErrorOutline sx={{fontSize: 40, color: 'error.main'}}/>
                            </Box>
                            <Typography variant="h5" fontWeight={700} sx={{color: 'text.primary'}}>
                                Something went wrong
                            </Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary', maxWidth: 400}}>
                                An unexpected error occurred. Please try refreshing the page or go back to the homepage.
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" color="secondary" startIcon={<RefreshOutlined/>}
                                    onClick={() => window.location.reload()}>
                                    Refresh Page
                                </Button>
                                <Button variant="outlined" color="secondary"
                                    onClick={() => { this.setState({hasError: false, error: null}); window.location.href = '/'; }}>
                                    Go Home
                                </Button>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
