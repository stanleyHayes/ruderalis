import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Alert, AlertTitle, Box, Button, Card, CardContent, Chip, Container,
    Grid, IconButton, InputAdornment, LinearProgress, MenuItem,
    OutlinedInput, Stack, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, TextField, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo, useState} from "react";
import {
    Add, Clear, GavelOutlined, SearchOutlined, VisibilityOutlined,
} from "@mui/icons-material";
import emptyIcon from "../../assets/images/empty.png";
import Empty from "../../components/shared/empty";
import {getConflicts, selectConflict} from "../../redux/features/conflict/conflict-slice";
import {UTILS} from "../../utils/utils";
import {Link} from "react-router-dom";
import AccountSidebar from "../../components/shared/account-sidebar";

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

const priorityColor = (priority) => {
    switch (priority) {
        case 'high': return {bg: 'rgba(239,68,68,0.1)', color: '#ef4444'};
        case 'medium': return {bg: 'rgba(245,158,11,0.1)', color: '#f59e0b'};
        case 'low': return {bg: 'rgba(34,197,94,0.1)', color: '#22c55e'};
        default: return {bg: 'rgba(107,114,128,0.1)', color: '#6b7280'};
    }
};

const ConflictsPage = () => {
    const {conflictLoading, conflicts, conflictError} = useSelector(selectConflict);
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');
    const [sortBy, setSortBy] = useState('');

    useEffect(() => { dispatch(getConflicts()); }, [dispatch]);

    const filtered = useMemo(() => {
        let list = conflicts || [];
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(c =>
                c._id?.toLowerCase().includes(q) ||
                c.subject?.toLowerCase().includes(q) ||
                c.reason?.toLowerCase().includes(q)
            );
        }
        if (status) list = list.filter(c => c.status === status);
        if (sortBy === 'date') list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (sortBy === 'priority') {
            const order = {high: 0, medium: 1, low: 2};
            list = [...list].sort((a, b) => (order[a.priority] ?? 3) - (order[b.priority] ?? 3));
        }
        return list;
    }, [conflicts, query, status, sortBy]);

    const activeFilters = (query.trim() ? 1 : 0) + (status ? 1 : 0) + (sortBy ? 1 : 0);

    return (
        <Layout>
            {conflictLoading && <LinearProgress color="secondary"/>}

            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 3, md: 5}, pb: {xs: 2, md: 4}}}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <GavelOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Dispute Center</Typography>
                    </Stack>
                    <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{sm: 'flex-end'}} spacing={2}>
                        <Box>
                            <Typography variant="h3" sx={{color: 'text.primary', mb: 0.5}}>My Disputes</Typography>
                            <Typography variant="body1" sx={{color: 'text.secondary'}}>
                                Raise and track order disputes with vendors
                            </Typography>
                        </Box>
                        <Button component={Link} to="/account/conflicts/new" variant="contained" color="secondary"
                            startIcon={<Add/>} sx={{textTransform: 'none', fontWeight: 700, px: 3}}>
                            New Dispute
                        </Button>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="xl" sx={{py: {xs: 3, md: 5}}}>
                <Grid container spacing={3}>
                    <Grid size={{xs: 12, md: 8}}>
                        {conflictError && (
                            <Alert sx={{mb: 3}} severity="error"><AlertTitle>{conflictError}</AlertTitle></Alert>
                        )}

                        {/* Toolbar */}
                        <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                        <Card variant="outlined" sx={{overflow: 'hidden', mb: 3}}>
                            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                            <CardContent sx={{p: 2}}>
                                <Grid container spacing={1.5} alignItems="center">
                                    <Grid size={{xs: 12, sm: 5}}>
                                        <OutlinedInput value={query} onChange={e => setQuery(e.target.value)}
                                            placeholder="Search disputes..." size="small" fullWidth color="secondary"
                                            startAdornment={<InputAdornment position="start"><SearchOutlined sx={{fontSize: 20, color: 'text.secondary'}}/></InputAdornment>}
                                            endAdornment={query ? <InputAdornment position="end"><IconButton size="small" onClick={() => setQuery('')}><Clear sx={{fontSize: 16}}/></IconButton></InputAdornment> : null}
                                        />
                                    </Grid>
                                    <Grid size={{xs: 6, sm: 3.5}}>
                                        <TextField select label="Status" size="small" fullWidth color="secondary"
                                            value={status} onChange={e => setStatus(e.target.value)}>
                                            <MenuItem value="">All</MenuItem>
                                            <MenuItem value="open">Open</MenuItem>
                                            <MenuItem value="in_progress">In Progress</MenuItem>
                                            <MenuItem value="escalated">Escalated</MenuItem>
                                            <MenuItem value="resolved">Resolved</MenuItem>
                                            <MenuItem value="closed">Closed</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid size={{xs: 6, sm: 3.5}}>
                                        <TextField select label="Sort by" size="small" fullWidth color="secondary"
                                            value={sortBy} onChange={e => setSortBy(e.target.value)}>
                                            <MenuItem value="">Default</MenuItem>
                                            <MenuItem value="date">Newest First</MenuItem>
                                            <MenuItem value="priority">Priority</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 1.5}}>
                                    <Typography variant="caption" color="text.secondary">
                                        {filtered.length} dispute{filtered.length !== 1 ? 's' : ''} found
                                    </Typography>
                                    {activeFilters > 0 && (
                                        <Chip size="small" label={`${activeFilters} filter${activeFilters !== 1 ? 's' : ''}`}
                                            color="secondary" variant="outlined" onDelete={() => { setQuery(''); setStatus(''); setSortBy(''); }}
                                            sx={{fontSize: 10, fontWeight: 600}}/>
                                    )}
                                </Stack>
                            </CardContent>
                        </Card>
                        </motion.div>

                        {/* Table */}
                        {filtered.length === 0 ? (
                            <Empty title="No disputes found" message="You haven't raised any disputes yet. If you have an issue with an order, click 'New Dispute' to get started."
                                image={emptyIcon}/>
                        ) : (
                            <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                            <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                <TableContainer>
                                    <Table size="medium">
                                        <TableHead>
                                            <TableRow sx={{bgcolor: 'action.hover'}}>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}}>#</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}}>Subject</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}}>Order</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}}>Status</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}}>Priority</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}}>Date</TableCell>
                                                <TableCell sx={{fontWeight: 700, color: 'text.secondary', fontSize: 12}} align="center">Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filtered.map((conflict, i) => {
                                                const sc = statusColor(conflict.status);
                                                const pc = priorityColor(conflict.priority);
                                                return (
                                                    <TableRow key={conflict._id || i} hover sx={{'&:last-child td': {border: 0}}}>
                                                        <TableCell><Typography variant="caption" color="text.secondary">{i + 1}</Typography></TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" fontWeight={600} sx={{color: 'text.primary', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                                                {conflict.subject || conflict.reason || 'Dispute'}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="caption" fontWeight={600} sx={{color: 'text.secondary'}}>
                                                                {conflict.order?._id ? conflict.order._id.substring(0, 8).toUpperCase() : conflict.order ? String(conflict.order).substring(0, 8).toUpperCase() : '—'}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip size="small" label={sc.label}
                                                                sx={{bgcolor: sc.bg, color: sc.color, fontWeight: 700, fontSize: '0.7rem', height: 24}}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Chip size="small" label={conflict.priority || 'medium'}
                                                                sx={{bgcolor: pc.bg, color: pc.color, fontWeight: 700, fontSize: '0.7rem', height: 24, textTransform: 'capitalize'}}/>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {UTILS.formatDate(conflict.createdAt)}
                                                            </Typography>
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <IconButton component={Link} to={`/account/conflicts/${conflict._id}`} size="small"
                                                                sx={{bgcolor: 'light.secondary', color: 'secondary.main'}}>
                                                                <VisibilityOutlined sx={{fontSize: 18}}/>
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>
                            </motion.div>
                        )}
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

export default ConflictsPage;
