import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Alert, AlertTitle, Avatar, Box, Button, Card, CardContent, Chip, Container,
    Divider, Grid, LinearProgress, OutlinedInput, Stack, Step, StepLabel,
    Stepper, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    ArrowBack, ChatBubbleOutline, CheckCircleOutline, ErrorOutline,
    EscalatorWarningOutlined, GavelOutlined, InfoOutlined, PriorityHighOutlined,
    ReportProblemOutlined, SendOutlined, WarningAmberOutlined,
} from "@mui/icons-material";
import {addMessage, escalateConflict, getConflict, resolveConflict, selectConflict} from "../../redux/features/conflict/conflict-slice";
import {UTILS} from "../../utils/utils";
import {Link, useParams} from "react-router-dom";
import {useSnackbar} from "notistack";
import AccountSidebar from "../../components/shared/account-sidebar";
import {selectAuth} from "../../redux/features/auth/auth-slice";

const statusSteps = ['open', 'in_progress', 'resolved', 'closed'];
const statusLabels = {open: 'Opened', in_progress: 'In Progress', resolved: 'Resolved', closed: 'Closed'};

const statusColor = (status) => {
    switch (status) {
        case 'open': return {bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', label: 'Open'};
        case 'in_progress': return {bg: 'rgba(245,158,11,0.1)', color: '#f59e0b', label: 'In Progress'};
        case 'resolved': return {bg: 'rgba(34,197,94,0.1)', color: '#22c55e', label: 'Resolved'};
        case 'escalated': return {bg: 'rgba(239,68,68,0.1)', color: '#ef4444', label: 'Escalated'};
        case 'closed': return {bg: 'rgba(107,114,128,0.1)', color: '#6b7280', label: 'Closed'};
        default: return {bg: 'rgba(107,114,128,0.1)', color: '#6b7280', label: status || 'Unknown'};
    }
};

const priorityIcon = (priority) => {
    switch (priority) {
        case 'high': return <PriorityHighOutlined sx={{fontSize: 16, color: '#ef4444'}}/>;
        case 'medium': return <WarningAmberOutlined sx={{fontSize: 16, color: '#f59e0b'}}/>;
        case 'low': return <InfoOutlined sx={{fontSize: 16, color: '#22c55e'}}/>;
        default: return <InfoOutlined sx={{fontSize: 16, color: '#6b7280'}}/>;
    }
};

const ConflictDetailPage = () => {
    const {conflictID} = useParams();
    const dispatch = useDispatch();
    const {conflictLoading, conflictDetail, conflictError} = useSelector(selectConflict);
    const {authData} = useSelector(selectAuth);
    const {enqueueSnackbar} = useSnackbar();
    const [message, setMessage] = useState('');
    const [resolution, setResolution] = useState('');

    const showMessage = (msg, opts) => enqueueSnackbar(msg, opts);

    useEffect(() => {
        if (conflictID) dispatch(getConflict({id: conflictID}));
    }, [dispatch, conflictID]);

    const conflict = conflictDetail;
    const sc = statusColor(conflict?.status);
    const isOpen = conflict?.status === 'open' || conflict?.status === 'in_progress';
    const isEscalated = conflict?.status === 'escalated';
    const activeStep = statusSteps.indexOf(conflict?.status === 'escalated' ? 'in_progress' : conflict?.status);

    const handleSendMessage = () => {
        if (!message.trim()) return;
        dispatch(addMessage({id: conflictID, data: {message: message.trim()}, showMessage}));
        setMessage('');
    };

    const handleResolve = () => {
        dispatch(resolveConflict({id: conflictID, data: {resolution: resolution.trim() || undefined}, showMessage}));
        setResolution('');
    };

    const handleEscalate = () => {
        dispatch(escalateConflict({id: conflictID, showMessage}));
    };

    return (
        <Layout>
            {conflictLoading && <LinearProgress color="secondary"/>}

            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 3, md: 5}, pb: {xs: 2, md: 4}}}>
                <Container maxWidth="xl">
                    <Button component={Link} to="/account/conflicts" startIcon={<ArrowBack/>} sx={{mb: 2, textTransform: 'none', color: 'text.secondary'}}>
                        Back to Disputes
                    </Button>
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <GavelOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Dispute Details</Typography>
                    </Stack>
                    <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>
                        {conflict?.subject || 'Dispute'}
                    </Typography>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Chip size="small" label={sc.label} sx={{bgcolor: sc.bg, color: sc.color, fontWeight: 700, fontSize: '0.7rem', height: 24}}/>
                        {conflict?.priority && (
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                {priorityIcon(conflict.priority)}
                                <Typography variant="caption" sx={{textTransform: 'capitalize', color: 'text.secondary'}}>
                                    {conflict.priority} priority
                                </Typography>
                            </Stack>
                        )}
                        <Typography variant="caption" color="text.secondary">
                            Opened {UTILS.formatDate(conflict?.createdAt)}
                        </Typography>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 5}}}>
                {conflictError && (
                    <Alert sx={{mb: 3}} severity="error"><AlertTitle>{conflictError}</AlertTitle></Alert>
                )}

                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 8}}>
                        <Stack spacing={3}>
                            {/* Progress Stepper */}
                            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{p: 3}}>
                                    <Stepper activeStep={activeStep >= 0 ? activeStep : 0} alternativeLabel
                                        sx={{
                                            '& .MuiStepIcon-root.Mui-active': {color: 'secondary.main'},
                                            '& .MuiStepIcon-root.Mui-completed': {color: 'secondary.main'},
                                        }}>
                                        {statusSteps.map(s => (
                                            <Step key={s}>
                                                <StepLabel>{statusLabels[s]}</StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    {isEscalated && (
                                        <Alert severity="warning" icon={<ReportProblemOutlined/>} sx={{mt: 2}}>
                                            This dispute has been escalated to an administrator for review.
                                        </Alert>
                                    )}
                                </CardContent>
                            </Card>
                            </motion.div>

                            {/* Dispute Info */}
                            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{p: 3}}>
                                    <Typography variant="subtitle2" fontWeight={800} sx={{mb: 2}}>Dispute Information</Typography>
                                    <Grid container spacing={2}>
                                        <Grid size={{xs: 12, sm: 6}}>
                                            <Typography variant="caption" color="text.secondary">Dispute ID</Typography>
                                            <Typography variant="body2" fontWeight={600}>{conflict?._id?.substring(0, 12).toUpperCase() || '—'}</Typography>
                                        </Grid>
                                        <Grid size={{xs: 12, sm: 6}}>
                                            <Typography variant="caption" color="text.secondary">Order ID</Typography>
                                            <Typography variant="body2" fontWeight={600} component={Link} to={`/orders/${conflict?.order?._id || conflict?.order}`}
                                                sx={{color: 'secondary.main', textDecoration: 'none', '&:hover': {textDecoration: 'underline'}}}>
                                                {(conflict?.order?._id || conflict?.order || '').toString().substring(0, 12).toUpperCase() || '—'}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs: 12, sm: 6}}>
                                            <Typography variant="caption" color="text.secondary">Reason</Typography>
                                            <Typography variant="body2" fontWeight={600} sx={{textTransform: 'capitalize'}}>
                                                {conflict?.reason?.replace(/_/g, ' ') || '—'}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{xs: 12, sm: 6}}>
                                            <Typography variant="caption" color="text.secondary">Vendor</Typography>
                                            <Typography variant="body2" fontWeight={600}>
                                                {conflict?.vendor?.name || conflict?.shop?.name || '—'}
                                            </Typography>
                                        </Grid>
                                        {conflict?.resolution && (
                                            <Grid size={{xs: 12}}>
                                                <Alert severity="success" icon={<CheckCircleOutline/>}>
                                                    <AlertTitle>Resolution</AlertTitle>
                                                    {conflict.resolution}
                                                </Alert>
                                            </Grid>
                                        )}
                                    </Grid>
                                </CardContent>
                            </Card>
                            </motion.div>

                            {/* Description */}
                            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{p: 3}}>
                                    <Typography variant="subtitle2" fontWeight={800} sx={{mb: 1}}>Description</Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.8}}>
                                        {conflict?.description || 'No description provided.'}
                                    </Typography>
                                </CardContent>
                            </Card>
                            </motion.div>

                            {/* Messages / Timeline */}
                            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{p: 3}}>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                        <ChatBubbleOutline sx={{fontSize: 18, color: 'secondary.main'}}/>
                                        <Typography variant="subtitle2" fontWeight={800}>
                                            Messages ({conflict?.messages?.length || 0})
                                        </Typography>
                                    </Stack>

                                    {conflict?.messages?.length > 0 ? (
                                        <Stack spacing={2} sx={{mb: 3}}>
                                            {conflict.messages.map((msg, i) => {
                                                const isMe = msg.sender?._id === authData?._id || msg.sender === authData?._id || msg.senderRole === 'customer';
                                                return (
                                                    <Box key={msg._id || i} sx={{
                                                        display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start',
                                                    }}>
                                                        <Stack direction="row" spacing={1.5} alignItems="flex-start"
                                                            sx={{maxWidth: '80%', flexDirection: isMe ? 'row-reverse' : 'row'}}>
                                                            <Avatar sx={{
                                                                width: 32, height: 32,
                                                                bgcolor: isMe ? 'secondary.main' : 'action.hover',
                                                                color: isMe ? 'common.white' : 'text.primary',
                                                                fontSize: 14, fontWeight: 700,
                                                            }}>
                                                                {(msg.sender?.firstName || msg.senderRole || 'U')[0]?.toUpperCase()}
                                                            </Avatar>
                                                            <Box sx={{
                                                                bgcolor: isMe ? 'secondary.main' : 'action.hover',
                                                                color: isMe ? 'common.white' : 'text.primary',
                                                                borderRadius: 2.5,
                                                                px: 2, py: 1.25,
                                                                borderTopRightRadius: isMe ? 4 : 20,
                                                                borderTopLeftRadius: isMe ? 20 : 4,
                                                            }}>
                                                                <Typography variant="body2" sx={{lineHeight: 1.6}}>
                                                                    {msg.message || msg.text || msg.content}
                                                                </Typography>
                                                                <Typography variant="caption" sx={{
                                                                    display: 'block', mt: 0.5,
                                                                    opacity: 0.7, textAlign: isMe ? 'right' : 'left',
                                                                }}>
                                                                    {UTILS.formatDate(msg.createdAt)}
                                                                </Typography>
                                                            </Box>
                                                        </Stack>
                                                    </Box>
                                                );
                                            })}
                                        </Stack>
                                    ) : (
                                        <Box sx={{textAlign: 'center', py: 3}}>
                                            <ChatBubbleOutline sx={{fontSize: 40, color: 'text.disabled', mb: 1}}/>
                                            <Typography variant="body2" color="text.secondary">
                                                No messages yet. Start the conversation below.
                                            </Typography>
                                        </Box>
                                    )}

                                    {(isOpen || isEscalated) && (
                                        <>
                                            <Divider sx={{my: 2}}/>
                                            <Stack direction="row" spacing={1.5}>
                                                <OutlinedInput
                                                    fullWidth size="small" color="secondary"
                                                    placeholder="Type a message..."
                                                    value={message}
                                                    onChange={e => setMessage(e.target.value)}
                                                    onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                                                    sx={{borderRadius: 3}}
                                                />
                                                <Button variant="contained" color="secondary" onClick={handleSendMessage}
                                                    disabled={!message.trim() || conflictLoading}
                                                    sx={{minWidth: 48, borderRadius: 3}}>
                                                    <SendOutlined sx={{fontSize: 20}}/>
                                                </Button>
                                            </Stack>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                            </motion.div>

                            {/* Actions */}
                            {isOpen && (
                                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                                <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                    <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                    <CardContent sx={{p: 3}}>
                                        <Typography variant="subtitle2" fontWeight={800} sx={{mb: 2}}>Actions</Typography>
                                        <Stack spacing={2}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                                                    If you're satisfied with the vendor's response, mark this dispute as resolved.
                                                </Typography>
                                                <OutlinedInput
                                                    fullWidth size="small" color="secondary" multiline rows={2}
                                                    placeholder="Optional resolution notes..."
                                                    value={resolution} onChange={e => setResolution(e.target.value)}
                                                    sx={{mb: 1.5}}
                                                />
                                                <Button variant="contained" color="secondary" onClick={handleResolve}
                                                    startIcon={<CheckCircleOutline/>} disabled={conflictLoading}
                                                    sx={{textTransform: 'none', fontWeight: 700}}>
                                                    Mark as Resolved
                                                </Button>
                                            </Box>
                                            <Divider/>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" sx={{mb: 1}}>
                                                    Not satisfied? Escalate this dispute to an administrator for further review.
                                                </Typography>
                                                <Button variant="outlined" color="error" onClick={handleEscalate}
                                                    startIcon={<ErrorOutline/>} disabled={conflictLoading}
                                                    sx={{textTransform: 'none', fontWeight: 700}}>
                                                    Escalate to Admin
                                                </Button>
                                            </Box>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                </motion.div>
                            )}
                        </Stack>
                    </Grid>
                    <Grid size={{xs: 12, md: 4}}>
                        <Box sx={{position: 'sticky', top: 80}}>
                            <AccountSidebar/>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default ConflictDetailPage;
