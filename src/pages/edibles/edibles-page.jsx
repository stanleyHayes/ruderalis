import {useMemo, useState, useEffect} from "react";
import {motion} from "framer-motion";
import {fadeUp, stagger} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Alert, AlertTitle, Box, Button, Card, CardContent, Chip, Container, Grid,
    IconButton, InputAdornment, LinearProgress, MenuItem,
    OutlinedInput, Pagination, Stack, TextField,
    ToggleButton, ToggleButtonGroup, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getEdibles, selectEdible} from "../../redux/features/edible/edible-slice";
import {
    Cake, Clear, SearchOutlined,
    ViewListOutlined, ViewModuleOutlined,
} from "@mui/icons-material";
import Edible from "../../components/shared/edible";

const PAGE_SIZES = [12, 24, 48];

const EdiblesPage = () => {
    const {edibleLoading, edibles, edibleError} = useSelector(selectEdible);
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('default');
    const [type, setType] = useState('');
    const [view, setView] = useState('grid');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    useEffect(() => {
        dispatch(getEdibles({query: ''}));
    }, [dispatch]);

    // Build dynamic type options from actual product data
    const typeOptions = useMemo(() => {
        const list = edibles || [];
        const types = new Set();
        list.forEach(p => {
            if (p.category) types.add(p.category);
            // Also extract type hints from tags
            if (p.tags?.length) p.tags.forEach(t => types.add(t));
        });
        return [...types].sort();
    }, [edibles]);

    const filtered = useMemo(() => {
        let list = edibles || [];
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(p =>
                p.name?.toLowerCase().includes(q) ||
                p.description?.toLowerCase().includes(q) ||
                p.category?.toLowerCase().includes(q)
            );
        }
        if (type) {
            const t = type.toLowerCase();
            list = list.filter(p =>
                p.category?.toLowerCase() === t ||
                p.name?.toLowerCase().includes(t) ||
                p.tags?.some(tag => tag.toLowerCase() === t)
            );
        }
        switch (sort) {
            case 'priceAsc': list = [...list].sort((a, b) => (a.price?.amount || 0) - (b.price?.amount || 0)); break;
            case 'priceDesc': list = [...list].sort((a, b) => (b.price?.amount || 0) - (a.price?.amount || 0)); break;
            case 'rating': list = [...list].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)); break;
            default: break;
        }
        return list;
    }, [edibles, query, sort, type]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paged = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);
    const activeFilters = (query.trim() ? 1 : 0) + (type ? 1 : 0) + (sort !== 'default' ? 1 : 0);
    const handleReset = () => { setQuery(''); setSort('default'); setType(''); setPage(1); };

    return (
        <Layout>
            {edibleLoading && <LinearProgress color="secondary"/>}

            {/* Page Header */}
            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 4, md: 6}, pb: {xs: 3, md: 5}}}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{
                            width: 44,
                            height: 44,
                            borderRadius: '50%',
                            bgcolor: 'light.accent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Cake sx={{color: 'accent.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'accent.main'}}>
                            Infused Treats
                        </Typography>
                    </Stack>
                    <Typography variant="h2" sx={{color: 'text.primary', mb: 1}}>
                        Edibles
                    </Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary', maxWidth: 480, mb: 3}}>
                        Precisely dosed cannabis-infused edibles for a consistent, controlled experience every time.
                    </Typography>
                    {edibles && (
                        <Chip
                            label={`${edibles.length} products available`}
                            size="small"
                            sx={{bgcolor: 'light.accent', color: 'accent.main', fontWeight: 600}}
                        />
                    )}
                </Container>
            </Box>

            <Box sx={{py: {xs: 4, md: 6}, backgroundColor: 'background.default'}}>
                <Container maxWidth="xl">
                    {edibleError && (
                        <Alert sx={{mb: 3}} severity="error">
                            <AlertTitle>{edibleError}</AlertTitle>
                        </Alert>
                    )}

                    {/* Toolbar */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Card variant="outlined" sx={{overflow: 'hidden', mb: 3}}>
                        <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                        <CardContent sx={{p: 2}}>
                            <Grid container spacing={1.5} alignItems="center">
                                <Grid size={{xs: 12, sm: 5, lg: 4}}>
                                    <OutlinedInput
                                        value={query}
                                        onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                                        placeholder="Search edibles..."
                                        size="small"
                                        fullWidth
                                        color="secondary"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchOutlined sx={{fontSize: 20, color: 'text.secondary'}}/>
                                            </InputAdornment>
                                        }
                                        endAdornment={query ? (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setQuery('')} size="small">
                                                    <Clear sx={{fontSize: 16}}/>
                                                </IconButton>
                                            </InputAdornment>
                                        ) : null}
                                    />
                                </Grid>
                                <Grid size={{xs: 6, sm: 3, lg: 2}}>
                                    <TextField
                                        select
                                        label="Sort by"
                                        size="small"
                                        fullWidth
                                        color="secondary"
                                        value={sort}
                                        onChange={(e) => { setPage(1); setSort(e.target.value); }}
                                    >
                                        <MenuItem value="default">Default</MenuItem>
                                        <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                                        <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                                        <MenuItem value="rating">Top Rated</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={{xs: 6, sm: 2, lg: 2}}>
                                    <TextField
                                        select
                                        label="Type"
                                        size="small"
                                        fullWidth
                                        color="secondary"
                                        value={type}
                                        onChange={(e) => { setPage(1); setType(e.target.value); }}
                                    >
                                        <MenuItem value="">All</MenuItem>
                                        {typeOptions.map(t => (
                                            <MenuItem key={t} value={t}>{t}</MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid size={{xs: 4, sm: 1, lg: 1}}>
                                    <TextField
                                        select
                                        label="Show"
                                        size="small"
                                        fullWidth
                                        color="secondary"
                                        value={pageSize}
                                        onChange={(e) => { setPage(1); setPageSize(Number(e.target.value)); }}
                                    >
                                        {PAGE_SIZES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                                    </TextField>
                                </Grid>
                                <Grid size={{xs: "auto"}}>
                                    <ToggleButtonGroup exclusive size="small" value={view} onChange={(_, v) => v && setView(v)}>
                                        <ToggleButton value="grid"><ViewModuleOutlined sx={{fontSize: 20}}/></ToggleButton>
                                        <ToggleButton value="list"><ViewListOutlined sx={{fontSize: 20}}/></ToggleButton>
                                    </ToggleButtonGroup>
                                </Grid>
                            </Grid>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{mt: 1.5}}>
                                <Typography variant="caption" color="text.secondary">
                                    {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
                                </Typography>
                                {activeFilters > 0 && (
                                    <Chip
                                        size="small"
                                        label={`${activeFilters} filter${activeFilters !== 1 ? 's' : ''} active`}
                                        color="secondary"
                                        variant="outlined"
                                        onDelete={handleReset}
                                        sx={{fontSize: 10, fontWeight: 600}}
                                    />
                                )}
                            </Stack>
                        </CardContent>
                    </Card>

                    </motion.div>

                    {/* Active chips */}
                    {activeFilters > 0 && (
                        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{mb: 2}}>
                            {query.trim() && (
                                <Chip
                                    size="small"
                                    label={`"${query}"`}
                                    onDelete={() => setQuery('')}
                                    sx={{fontWeight: 600, fontSize: 11}}
                                />
                            )}
                            {type && (
                                <Chip
                                    size="small"
                                    label={type}
                                    onDelete={() => setType('')}
                                    sx={{fontWeight: 600, fontSize: 11, backgroundColor: 'light.accent', color: 'accent.main'}}
                                />
                            )}
                        </Stack>
                    )}

                    {/* Grid */}
                    {paged.length > 0 ? (
                        <motion.div variants={stagger} initial="initial" whileInView="animate" viewport={{once: true}}>
                        <Grid container spacing={2}>
                            {paged.map((edible, i) => (
                                <Grid key={edible._id || i} size={{xs: view === 'list' ? 12 : 6, sm: view === 'list' ? 12 : 6, md: view === 'list' ? 12 : 4, lg: view === 'list' ? 12 : 3}}>
                                    <Edible edible={edible} variant={view}/>
                                </Grid>
                            ))}
                        </Grid>
                        </motion.div>
                    ) : (
                        <Card variant="outlined" sx={{overflow: 'hidden', borderStyle: 'dashed'}}>
                            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                            <CardContent sx={{py: 8, textAlign: 'center'}}>
                                <Box sx={{
                                    width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 3,
                                    backgroundColor: 'light.accent', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                }}>
                                    <Cake sx={{fontSize: 36, color: 'accent.main'}}/>
                                </Box>
                                <Typography variant="h5" fontWeight={800} sx={{mb: 1, color: 'text.primary'}}>
                                    No Edibles Found
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{mb: 3, maxWidth: 400, mx: 'auto'}}>
                                    Try adjusting your search or filters.
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={handleReset}
                                    sx={{fontWeight: 700, px: 4, textTransform: 'none'}}
                                >
                                    Reset Filters
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* Pagination */}
                    {filtered.length > pageSize && (
                        <Stack alignItems="center" sx={{mt: 4}}>
                            <Pagination
                                color="secondary"
                                page={page}
                                onChange={(_, p) => setPage(p)}
                                count={totalPages}
                                shape="rounded"
                                showFirstButton
                                showLastButton
                            />
                            <Typography variant="caption" sx={{mt: 1, color: 'text.secondary'}}>
                                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
                            </Typography>
                        </Stack>
                    )}
                </Container>
            </Box>
        </Layout>
    );
};

export default EdiblesPage;
