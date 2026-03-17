import {useMemo, useState, useEffect} from "react";
import Layout from "../../components/layout/layout";
import {
    Box, Button, Card, CardContent, CardMedia, Chip, Container, Grid,
    IconButton, InputAdornment, LinearProgress, MenuItem,
    OutlinedInput, Pagination, Stack, TextField,
    ToggleButton, ToggleButtonGroup, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts, selectProducts} from "../../redux/features/product/product-slice";
import {
    Clear, LocalFloristOutlined, SearchOutlined, Star,
    ViewListOutlined, ViewModuleOutlined,
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import currencyFormatter from "currency-formatter";
import Product from "../../components/shared/product";
import {motion} from 'framer-motion';
import {fadeUp} from "../../utils/animations";

const PAGE_SIZES = [12, 24, 48];

const ProductsPage = () => {
    const {productLoading, products} = useSelector(selectProducts);
    const dispatch = useDispatch();

    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('default');
    const [strain, setStrain] = useState('');
    const [view, setView] = useState('grid');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

    useEffect(() => { dispatch(getAllProducts({query: ''})); }, [dispatch]);

    const filtered = useMemo(() => {
        let list = products || [];
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(p => p.name?.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.strain?.toLowerCase().includes(q));
        }
        if (strain) list = list.filter(p => p.strain?.toLowerCase() === strain.toLowerCase());
        switch (sort) {
            case 'priceAsc': list = [...list].sort((a, b) => a.price.amount - b.price.amount); break;
            case 'priceDesc': list = [...list].sort((a, b) => b.price.amount - a.price.amount); break;
            case 'rating': list = [...list].sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)); break;
            default: break;
        }
        return list;
    }, [products, query, sort, strain]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paged = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);
    const activeFilters = (query.trim() ? 1 : 0) + (strain ? 1 : 0) + (sort !== 'default' ? 1 : 0);
    const handleReset = () => { setQuery(''); setSort('default'); setStrain(''); setPage(1); };

    return (
        <Layout>
            {productLoading && <LinearProgress color="secondary"/>}
            {/* Page Header */}
            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider', pt: {xs: 4, md: 6}, pb: {xs: 3, md: 5}}}>
                <Container maxWidth="xl">
                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{width: 44, height: 44, borderRadius: '50%', bgcolor: 'light.secondary',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <LocalFloristOutlined sx={{color: 'secondary.main', fontSize: 22}}/>
                        </Box>
                        <Typography variant="overline" sx={{color: 'secondary.main'}}>Premium Strains</Typography>
                    </Stack>
                    <Typography variant="h2" sx={{color: 'text.primary', mb: 1}}>Flower</Typography>
                    <Typography variant="body1" sx={{color: 'text.secondary', maxWidth: 480, mb: 3}}>
                        Hand-selected cannabis strains cultivated for potency, flavor, and therapeutic benefit.
                    </Typography>
                    {products && (
                        <Chip label={`${products.length} products available`} size="small"
                            sx={{bgcolor: 'light.secondary', color: 'secondary.main', fontWeight: 600}}/>
                    )}
                </Container>
            </Box>

            <Box sx={{py: {xs: 4, md: 6}, backgroundColor: 'background.default'}}>
                <Container maxWidth="xl">
                    {/* Toolbar */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Card variant="outlined" sx={{overflow: 'hidden', mb: 3}}>
                        <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                        <CardContent sx={{p: 2}}>
                            <Grid container spacing={1.5} alignItems="center">
                                <Grid size={{xs: 12, sm: 5, lg: 4}}>
                                    <OutlinedInput value={query} onChange={(e) => { setPage(1); setQuery(e.target.value); }}
                                        placeholder="Search strains..." size="small" fullWidth color="secondary"
                                        startAdornment={<InputAdornment position="start"><SearchOutlined sx={{fontSize: 20, color: 'text.secondary'}}/></InputAdornment>}
                                        endAdornment={query ? <InputAdornment position="end"><IconButton onClick={() => setQuery('')} size="small"><Clear sx={{fontSize: 16}}/></IconButton></InputAdornment> : null}/>
                                </Grid>
                                <Grid size={{xs: 6, sm: 3, lg: 2}}>
                                    <TextField select label="Sort by" size="small" fullWidth color="secondary"
                                        value={sort || 'default'} onChange={(e) => { setPage(1); setSort(e.target.value); }}>
                                        <MenuItem value="default">Default</MenuItem>
                                        <MenuItem value="priceAsc">Price: Low → High</MenuItem>
                                        <MenuItem value="priceDesc">Price: High → Low</MenuItem>
                                        <MenuItem value="rating">Top Rated</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={{xs: 6, sm: 2, lg: 2}}>
                                    <TextField select label="Strain" size="small" fullWidth color="secondary"
                                        value={strain || 'all'} onChange={(e) => { setPage(1); setStrain(e.target.value === 'all' ? '' : e.target.value); }}>
                                        <MenuItem value="all">All Strains</MenuItem>
                                        <MenuItem value="Sativa">Sativa</MenuItem>
                                        <MenuItem value="Indica">Indica</MenuItem>
                                        <MenuItem value="Hybrid">Hybrid</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid size={{xs: 4, sm: 1, lg: 1}}>
                                    <TextField select label="Show" size="small" fullWidth color="secondary"
                                        value={pageSize} onChange={(e) => { setPage(1); setPageSize(Number(e.target.value)); }}>
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
                                    <Chip size="small" label={`${activeFilters} filter${activeFilters !== 1 ? 's' : ''} active`}
                                        color="secondary" variant="outlined" onDelete={handleReset} sx={{fontSize: 10, fontWeight: 600}}/>
                                )}
                            </Stack>
                        </CardContent>
                    </Card>

                    </motion.div>

                    {/* Active chips */}
                    {activeFilters > 0 && (
                        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap sx={{mb: 2}}>
                            {query.trim() && <Chip size="small" label={`"${query}"`} onDelete={() => setQuery('')} sx={{fontWeight: 600, fontSize: 11}}/>}
                            {strain && <Chip size="small" label={strain} onDelete={() => setStrain('')}
                                sx={{fontWeight: 600, fontSize: 11, backgroundColor: 'light.secondary', color: 'secondary.main'}}/>}
                        </Stack>
                    )}

                    {/* Grid */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    {paged.length > 0 ? (
                        view === 'list' ? (
                        <Stack spacing={2}>
                            {paged.map((product, i) => (
                                <Card key={product._id || i} component={Link} to={`/products/marijuana/${product._id}`}
                                    variant="outlined" sx={{textDecoration: 'none', overflow: 'hidden', cursor: 'pointer',
                                        transition: 'all 0.2s', '&:hover': {borderColor: 'secondary.main'}}}>
                                    <Stack direction="row" alignItems="stretch">
                                        <CardMedia component="img" src={product.image} alt={product.name}
                                            sx={{width: {xs: 120, sm: 180}, objectFit: 'cover', flexShrink: 0}}/>
                                        <CardContent sx={{flex: 1, p: 2.5, '&:last-child': {pb: 2.5}}}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                                                <Box>
                                                    <Stack direction="row" spacing={1} sx={{mb: 1}}>
                                                        {product.strain && (
                                                            <Chip label={product.strain} size="small"
                                                                color={product.strain === 'Sativa' ? 'warning' : product.strain === 'Indica' ? 'info' : 'secondary'}
                                                                sx={{fontWeight: 700, fontSize: '0.65rem', height: 22}}/>
                                                        )}
                                                        {product.sale && <Chip label="Sale" size="small" color="error" sx={{fontWeight: 700, fontSize: '0.65rem', height: 22}}/>}
                                                    </Stack>
                                                    <Typography variant="subtitle1" fontWeight={600} sx={{color: 'text.primary', mb: 0.5}}>{product.name}</Typography>
                                                    <Typography variant="body2" sx={{color: 'text.secondary', mb: 1,
                                                        display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                                                        {product.description}
                                                    </Typography>
                                                    {(product.thc || product.cbd) && (
                                                        <Typography variant="caption" sx={{color: 'text.disabled'}}>
                                                            {product.thc ? `THC ${product.thc}%` : ''}{product.thc && product.cbd ? ' · ' : ''}{product.cbd ? `CBD ${product.cbd}%` : ''}
                                                        </Typography>
                                                    )}
                                                </Box>
                                                <Stack alignItems="flex-end" spacing={0.5} sx={{ml: 2, flexShrink: 0}}>
                                                    <Typography variant="h6" sx={{color: 'secondary.main', fontWeight: 700}}>
                                                        {currencyFormatter.format(product.price?.amount, {code: product.price?.currency})}
                                                    </Typography>
                                                    {product.rating && (
                                                        <Stack direction="row" spacing={0.3} alignItems="center">
                                                            <Star sx={{color: 'accent.main', fontSize: 14}}/>
                                                            <Typography variant="caption" sx={{color: 'text.secondary', fontWeight: 600}}>
                                                                {product.rating?.average?.toFixed(1)}
                                                            </Typography>
                                                        </Stack>
                                                    )}
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </Stack>
                                </Card>
                            ))}
                        </Stack>
                        ) : (
                        <Grid container spacing={2}>
                            {paged.map((product, i) => (
                                <Grid key={product._id || i} size={{xs: 6, sm: 6, md: 4, lg: 3}}>
                                    <Product product={product}/>
                                </Grid>
                            ))}
                        </Grid>
                        )
                    ) : (
                        <Card variant="outlined" sx={{overflow: 'hidden', borderStyle: 'dashed'}}>
                            <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                            <CardContent sx={{py: 8, textAlign: 'center'}}>
                                <Box sx={{width: 72, height: 72, borderRadius: '50%', mx: 'auto', mb: 3,
                                    backgroundColor: 'light.secondary', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <LocalFloristOutlined sx={{fontSize: 36, color: 'secondary.main'}}/>
                                </Box>
                                <Typography variant="h5" fontWeight={800} sx={{mb: 1, color: 'text.primary'}}>No Products Found</Typography>
                                <Typography variant="body2" color="text.secondary" sx={{mb: 3, maxWidth: 400, mx: 'auto'}}>
                                    Try adjusting your search or filters.
                                </Typography>
                                <Button variant="contained" color="secondary" onClick={handleReset} sx={{fontWeight: 700, px: 4}}>
                                    Reset Filters
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    </motion.div>

                    {/* Pagination */}
                    {filtered.length > pageSize && (
                        <Stack alignItems="center" sx={{mt: 4}}>
                            <Pagination color="secondary" page={page} onChange={(_, p) => setPage(p)}
                                count={totalPages} shape="rounded" showFirstButton showLastButton/>
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

export default ProductsPage;
