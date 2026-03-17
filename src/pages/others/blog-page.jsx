import Layout from "../../components/layout/layout";
import PageBanner from "../../components/shared/page-banner";
import {
    Avatar, Box, Card, CardContent, CardMedia, Chip, Container,
    Divider, FormControl, Grid, InputAdornment, InputLabel, LinearProgress,
    OutlinedInput, Pagination, Stack, Tab, Tabs, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getBlogs, selectBlog} from "../../redux/features/blog/blog-slice";
import {ArticleOutlined, Schedule, SearchOutlined, TrendingUpOutlined} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {UTILS} from "../../utils/utils";
import {useEffect, useMemo, useState} from "react";
import {motion} from 'framer-motion';
import {fadeUp} from "../../utils/animations";

const getAuthorName = (author) => {
    if (!author) return 'Ruderalis';
    if (author.name) return author.name;
    return [author.firstName, author.lastName].filter(Boolean).join(' ') || 'Ruderalis';
};

const getExcerpt = (blog) => blog.excerpt || blog.summary || (blog.content ? blog.content.substring(0, 160) + '...' : '');

const getReadTime = (blog) => {
    if (blog.readTime) return blog.readTime;
    const words = (blog.content || '').split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 200));
    return `${mins} min read`;
};

const BlogPage = () => {
    const dispatch = useDispatch();
    const {blogs, blogLoading} = useSelector(selectBlog);
    const [tab, setTab] = useState('All');
    const [query, setQuery] = useState('');

    useEffect(() => { dispatch(getBlogs()); }, [dispatch]);

    const categories = useMemo(() => {
        const cats = new Set(blogs?.map(b => b.category).filter(Boolean));
        return ['All', ...Array.from(cats)];
    }, [blogs]);

    const filtered = useMemo(() => {
        let list = blogs || [];
        if (tab !== 'All') list = list.filter(b => b.category === tab);
        if (query.trim()) {
            const q = query.toLowerCase();
            list = list.filter(b => b.title?.toLowerCase().includes(q) || b.summary?.toLowerCase().includes(q) || b.excerpt?.toLowerCase().includes(q));
        }
        return list;
    }, [blogs, tab, query]);

    const featured = filtered[0];
    const latest = filtered.slice(1);

    return (
        <Layout>
            {blogLoading && <LinearProgress color="secondary"/>}
            <PageBanner title="Cannabis Journal" description="Education, wellness insights, and the latest in cannabis science" links={[{path: '/', label: 'Home'}, {path: '/blog', label: 'Blog'}]}/>

            <Box sx={{py: {xs: 4, md: 6}, backgroundColor: 'background.default'}}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        {/* ═══════════ MAIN ═══════════ */}
                        <Grid size={{xs: 12, md: 8}}>
                            {/* Search + Tabs */}
                            <Card variant="outlined" sx={{overflow: 'hidden', mb: 4}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{p: 2.5}}>
                                    <FormControl fullWidth variant="outlined" sx={{mb: 2}}>
                                        <InputLabel htmlFor="blog-search">Search articles</InputLabel>
                                        <OutlinedInput id="blog-search" value={query} onChange={e => setQuery(e.target.value)}
                                            label="Search articles" placeholder="Search by title, topic..." color="secondary"
                                            startAdornment={<InputAdornment position="start"><SearchOutlined sx={{fontSize: 20, color: 'text.secondary'}}/></InputAdornment>}/>
                                    </FormControl>
                                    <Tabs textColor="secondary" indicatorColor="secondary" value={tab}
                                        onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto"
                                        sx={{minHeight: 36, '& .MuiTab-root': {minHeight: 36, textTransform: 'none', fontWeight: 600, fontSize: 13}}}>
                                        {categories.map(c => <Tab key={c} value={c} label={c}/>)}
                                    </Tabs>
                                </CardContent>
                            </Card>

                            {/* Featured */}
                            {featured && (
                                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                                <Box sx={{mb: 4}}>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                        <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                            <TrendingUpOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                        </Box>
                                        <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>Featured</Typography>
                                    </Stack>
                                    <Card component={Link} to={`/blog/${featured._id}`} variant="outlined"
                                        sx={{overflow: 'hidden', textDecoration: 'none', cursor: 'pointer'}}>
                                        <CardMedia component="img" src={featured.image} alt={featured.title}
                                            sx={{width: '100%', height: {xs: 200, md: 300}, objectFit: 'cover'}}/>
                                        <CardContent sx={{p: 2.5}}>
                                            <Stack direction="row" spacing={1} sx={{mb: 1.5}}>
                                                <Chip size="small" label={featured.category} color="secondary" variant="outlined" sx={{fontWeight: 600, fontSize: 11}}/>
                                                <Chip size="small" label={getReadTime(featured)} sx={{fontWeight: 600, fontSize: 11}}/>
                                            </Stack>
                                            <Typography variant="h5" fontWeight={800} sx={{color: 'text.primary', mb: 1}}>{featured.title}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.7, mb: 2}}>{getExcerpt(featured)}</Typography>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Avatar sx={{width: 32, height: 32, bgcolor: 'secondary.main', fontSize: 12, fontWeight: 700, color: 'common.white'}}>
                                                    {UTILS.getInitials(getAuthorName(featured.author))}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="caption" fontWeight={600} sx={{color: 'text.primary'}}>{getAuthorName(featured.author)}</Typography>
                                                    <Typography variant="caption" sx={{color: 'text.disabled', display: 'block'}}>{UTILS.formatDate(featured.createdAt)}</Typography>
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Box>
                                </motion.div>
                            )}

                            {/* Latest */}
                            {latest.length > 0 && (
                                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                                <Box>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
                                        <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                            <ArticleOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                        </Box>
                                        <Typography variant="subtitle1" fontWeight={800} sx={{color: 'text.primary'}}>Latest Posts</Typography>
                                        <Chip size="small" label={`${latest.length} articles`} sx={{fontSize: 10, fontWeight: 600}}/>
                                    </Stack>
                                    <Stack spacing={2}>
                                        {latest.map(post => (
                                            <Card key={post._id} component={Link} to={`/blog/${post._id}`} variant="outlined"
                                                sx={{textDecoration: 'none', cursor: 'pointer', overflow: 'hidden'}}>
                                                <Stack direction={{xs: 'column', sm: 'row'}}>
                                                    <Box sx={{width: {xs: '100%', sm: 200}, height: {xs: 180, sm: 180}, flexShrink: 0, overflow: 'hidden'}}>
                                                        <Box component="img" src={post.image} alt={post.title}
                                                            sx={{width: '100%', height: '100%', objectFit: 'cover', display: 'block'}}/>
                                                    </Box>
                                                    <CardContent sx={{p: 2.5, flex: 1}}>
                                                        <Stack direction="row" spacing={1} sx={{mb: 1}}>
                                                            <Chip size="small" label={post.category} color="secondary" variant="outlined" sx={{fontWeight: 600, fontSize: 10, height: 22}}/>
                                                            <Chip size="small" icon={<Schedule sx={{fontSize: '12px !important'}}/>} label={getReadTime(post)} sx={{fontWeight: 600, fontSize: 10, height: 22}}/>
                                                        </Stack>
                                                        <Typography variant="subtitle1" fontWeight={700} sx={{color: 'text.primary', mb: 0.5, lineHeight: 1.3}}>{post.title}</Typography>
                                                        <Typography variant="body2" color="text.secondary" sx={{
                                                            lineHeight: 1.6, mb: 1.5,
                                                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                                        }}>{getExcerpt(post)}</Typography>
                                                        <Stack direction="row" spacing={1} alignItems="center">
                                                            <Avatar sx={{width: 24, height: 24, bgcolor: 'secondary.main', fontSize: 10, fontWeight: 700, color: 'common.white'}}>
                                                                {UTILS.getInitials(getAuthorName(post.author))}
                                                            </Avatar>
                                                            <Typography variant="caption" sx={{color: 'text.secondary'}}>{getAuthorName(post.author)} · {UTILS.formatDate(post.createdAt)}</Typography>
                                                        </Stack>
                                                    </CardContent>
                                                </Stack>
                                            </Card>
                                        ))}
                                    </Stack>
                                </Box>
                                </motion.div>
                            )}
                        </Grid>

                        {/* ═══════════ SIDEBAR ═══════════ */}
                        <Grid size={{xs: 12, md: 4}}>
                            <Box sx={{position: 'sticky', top: 80}}>
                                {/* Categories */}
                                <Card variant="outlined" sx={{overflow: 'hidden', mb: 3}}>
                                    <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                    <CardContent sx={{p: 2.5}}>
                                        <Typography variant="subtitle2" fontWeight={800} sx={{color: 'text.primary', mb: 1.5}}>Categories</Typography>
                                        <Divider sx={{mb: 1.5}}/>
                                        <Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
                                            {categories.filter(c => c !== 'All').map(c => (
                                                <Chip key={c} size="small" label={c} clickable variant="outlined"
                                                    color={tab === c ? 'secondary' : 'default'}
                                                    onClick={() => setTab(c)}
                                                    sx={{fontWeight: 600, fontSize: 11}}/>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>

                                {/* Popular */}
                                <Card variant="outlined" sx={{overflow: 'hidden'}}>
                                    <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                    <CardContent sx={{p: 2.5}}>
                                        <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 1.5}}>
                                            <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                                <TrendingUpOutlined sx={{fontSize: 16, color: 'secondary.main'}}/>
                                            </Box>
                                            <Typography variant="subtitle2" fontWeight={800} sx={{color: 'text.primary'}}>Popular Posts</Typography>
                                        </Stack>
                                        <Divider sx={{mb: 2}}/>
                                        <Stack spacing={2}>
                                            {(blogs || []).slice(0, 4).map((post, i) => (
                                                <Stack key={post._id} component={Link} to={`/blog/${post._id}`}
                                                    direction="row" spacing={1.5} sx={{textDecoration: 'none', cursor: 'pointer'}}>
                                                    <CardMedia component="img" src={post.image} alt={post.title}
                                                        sx={{width: 64, height: 64, borderRadius: 1.5, objectFit: 'cover', flexShrink: 0}}/>
                                                    <Box>
                                                        <Typography variant="body2" fontWeight={600} sx={{
                                                            color: 'text.primary', lineHeight: 1.3, mb: 0.5,
                                                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                                        }}>{post.title}</Typography>
                                                        <Typography variant="caption" sx={{color: 'text.disabled'}}>{UTILS.formatDate(post.createdAt)}</Typography>
                                                    </Box>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Layout>
    );
};

export default BlogPage;
