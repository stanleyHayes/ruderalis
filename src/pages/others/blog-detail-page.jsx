import Layout from "../../components/layout/layout";
import {
    Avatar, Box, Button, Card, CardContent, CardMedia, Chip,
    Container, Divider, Grid, IconButton, Stack, Typography,
} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getBlog, getBlogs, selectBlog} from "../../redux/features/blog/blog-slice";
import {useParams} from "react-router";
import {ArrowBack, ArrowForward, Schedule} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {UTILS} from "../../utils/utils";
import {useEffect} from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

const BlogDetailPage = () => {
    const {blogID} = useParams();
    const dispatch = useDispatch();
    const {blogDetail, blogs} = useSelector(selectBlog);

    useEffect(() => {
        if (blogID) dispatch(getBlog({id: blogID}));
        if (!blogs?.length) dispatch(getBlogs());
    }, [dispatch, blogID]);

    const post = blogDetail?._id === blogID ? blogDetail : blogs?.find(b => b._id === blogID);
    const relatedPosts = blogs?.filter(b => b._id !== blogID)?.slice(0, 3) || [];

    if (!post) {
        return (
            <Layout>
                <Container maxWidth="md" sx={{py: 10, textAlign: 'center'}}>
                    <Typography variant="h5" sx={{color: 'text.primary', mb: 2}}>Post not found</Typography>
                    <Button component={Link} to="/blog" variant="contained" color="secondary">Back to Blog</Button>
                </Container>
            </Layout>
        );
    }

    return (
        <Layout>
            {/* Hero Image */}
            <Box sx={{
                width: '100%', height: {xs: 280, md: 450},
                backgroundImage: `url(${post.image})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                position: 'relative',
                '&::after': {
                    content: '""', position: 'absolute', inset: 0,
                    background: 'linear-gradient(180deg, transparent 30%, rgba(0,0,0,0.7) 100%)',
                },
            }}>
                <Container maxWidth="lg" sx={{position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', pb: 4}}>
                    <Button component={Link} to="/blog" startIcon={<ArrowBack/>} size="small"
                        sx={{color: 'common.white', alignSelf: 'flex-start', mb: 2, '&:hover': {bgcolor: 'rgba(255,255,255,0.1)'}}}>
                        Back to Blog
                    </Button>
                    <Stack direction="row" spacing={1} sx={{mb: 2}}>
                        <Chip label={post.category} size="small" sx={{bgcolor: 'secondary.main', color: 'common.white', fontWeight: 600}}/>
                        {post.tags?.map(tag => (
                            <Chip key={tag} label={tag} size="small" variant="outlined"
                                sx={{borderColor: 'rgba(255,255,255,0.3)', color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem'}}/>
                        ))}
                    </Stack>
                    <Typography variant="h3" sx={{color: 'common.white', fontWeight: 700, maxWidth: 700, lineHeight: 1.2}}>
                        {post.title}
                    </Typography>
                </Container>
            </Box>

            {/* Meta bar */}
            <Box sx={{bgcolor: 'background.paper', borderBottom: '1px solid', borderColor: 'divider'}}>
                <Container maxWidth="lg">
                    <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="space-between" alignItems={{sm: 'center'}} sx={{py: 2.5}} spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{
                                width: 44, height: 44,
                                background: (t) => `linear-gradient(135deg, ${t.palette.secondary.main}, ${t.palette.secondary.dark})`,
                                fontSize: 16, fontWeight: 700,
                            }}>
                                {UTILS.getInitials(getAuthorName(post.author))}
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 600}}>
                                    {getAuthorName(post.author)}
                                </Typography>
                                <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                    {post.author?.role || 'Contributor'} at Ruderalis
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={3} alignItems="center">
                            <Typography variant="caption" sx={{color: 'text.secondary'}}>
                                {UTILS.formatDate(post.createdAt, 'MMMM D, YYYY')}
                            </Typography>
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                <Schedule sx={{color: 'text.disabled', fontSize: 16}}/>
                                <Typography variant="caption" sx={{color: 'text.secondary'}}>{getReadTime(post)}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Content */}
            <Container maxWidth="lg" sx={{py: {xs: 4, md: 6}}}>
                <Grid container spacing={5}>
                    <Grid size={{xs: 12, md: 8}}>
                        <Typography variant="h6" sx={{color: 'text.secondary', fontWeight: 400, fontStyle: 'italic', mb: 4, lineHeight: 1.6}}>
                            {getExcerpt(post)}
                        </Typography>
                        <Divider sx={{mb: 4}}/>
                        <Box sx={{
                            color: 'text.primary',
                            lineHeight: 2,
                            '& h1': {fontSize: '2rem', fontWeight: 700, mt: 4, mb: 2, color: 'text.primary'},
                            '& h2': {fontSize: '1.5rem', fontWeight: 700, mt: 3.5, mb: 1.5, color: 'text.primary'},
                            '& h3': {fontSize: '1.25rem', fontWeight: 700, mt: 3, mb: 1, color: 'text.primary'},
                            '& h4': {fontSize: '1.1rem', fontWeight: 600, mt: 2.5, mb: 1, color: 'text.primary'},
                            '& p': {mb: 2, lineHeight: 2, color: 'text.primary'},
                            '& a': {color: 'secondary.main', textDecoration: 'none', fontWeight: 600, '&:hover': {textDecoration: 'underline'}},
                            '& strong': {fontWeight: 700, color: 'text.primary'},
                            '& em': {fontStyle: 'italic'},
                            '& ul, & ol': {pl: 3, mb: 2},
                            '& li': {mb: 0.75, lineHeight: 1.8, color: 'text.primary'},
                            '& blockquote': {
                                borderLeft: '4px solid', borderColor: 'secondary.main',
                                pl: 2.5, py: 0.5, my: 3, mx: 0,
                                bgcolor: 'action.hover', borderRadius: '0 8px 8px 0',
                                '& p': {color: 'text.secondary', fontStyle: 'italic', mb: 0},
                            },
                            '& code': {
                                fontFamily: 'monospace', fontSize: '0.875em',
                                bgcolor: 'action.hover', px: 0.75, py: 0.25, borderRadius: 1,
                            },
                            '& pre': {
                                bgcolor: 'action.hover', p: 2.5, borderRadius: 2,
                                overflow: 'auto', mb: 2.5, border: '1px solid', borderColor: 'divider',
                                '& code': {bgcolor: 'transparent', px: 0, py: 0},
                            },
                            '& img': {maxWidth: '100%', height: 'auto', borderRadius: 2, my: 2},
                            '& hr': {my: 3, borderColor: 'divider'},
                            '& table': {
                                width: '100%', borderCollapse: 'collapse', mb: 2.5,
                                '& th, & td': {
                                    border: '1px solid', borderColor: 'divider',
                                    px: 2, py: 1, textAlign: 'left',
                                },
                                '& th': {bgcolor: 'action.hover', fontWeight: 700},
                            },
                        }}>
                            <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
                        </Box>

                        <Divider sx={{my: 5}}/>

                        {/* Author Card */}
                        <Card elevation={0}>
                            <CardContent sx={{p: 3}}>
                                <Stack direction="row" spacing={2.5} alignItems="center">
                                    <Avatar sx={{
                                        width: 64, height: 64,
                                        background: (t) => `linear-gradient(135deg, ${t.palette.secondary.main}, ${t.palette.secondary.dark})`,
                                        fontSize: 22, fontWeight: 700,
                                    }}>
                                        {UTILS.getInitials(getAuthorName(post.author))}
                                    </Avatar>
                                    <Box sx={{flex: 1}}>
                                        <Typography variant="caption" sx={{color: 'text.disabled'}}>Written by</Typography>
                                        <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600}}>
                                            {getAuthorName(post.author)}
                                        </Typography>
                                        <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                            {post.author?.role || 'Cannabis wellness contributor'} at Ruderalis. Passionate about evidence-based cannabis education and patient wellness.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Sidebar */}
                    <Grid size={{xs: 12, md: 4}}>
                        <Box sx={{position: 'sticky', top: 90}}>
                            {/* CTA Card */}
                            <Card elevation={0} sx={{
                                bgcolor: 'light.secondary', border: '1px solid',
                                borderColor: 'secondary.main', mb: 3,
                            }}>
                                <CardContent sx={{p: 3, textAlign: 'center'}}>
                                    <Typography variant="h6" sx={{color: 'text.primary', mb: 1}}>
                                        Ready to explore?
                                    </Typography>
                                    <Typography variant="body2" sx={{color: 'text.secondary', mb: 2}}>
                                        Browse our curated selection of lab-tested cannabis products.
                                    </Typography>
                                    <Button component={Link} to="/products/marijuana" variant="contained" color="secondary"
                                        fullWidth endIcon={<ArrowForward/>}>
                                        Shop Menu
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Related Posts */}
                            {relatedPosts.length > 0 && (
                                <>
                                    <Typography variant="subtitle2" sx={{color: 'text.primary', fontWeight: 700, mb: 2}}>
                                        Related Articles
                                    </Typography>
                                    <Stack spacing={2}>
                                        {relatedPosts.map(related => (
                                            <Card key={related._id} component={Link} to={`/blog/${related._id}`}
                                                elevation={0} sx={{textDecoration: 'none', cursor: 'pointer'}}>
                                                <Stack direction="row" spacing={2}>
                                                    <CardMedia
                                                        component="img"
                                                        image={related.image}
                                                        alt={related.title}
                                                        sx={{width: 80, height: 80, borderRadius: 2, objectFit: 'cover', flexShrink: 0}}
                                                    />
                                                    <Box sx={{py: 0.5}}>
                                                        <Chip label={related.category} size="small" variant="outlined" color="secondary"
                                                            sx={{mb: 0.5, height: 20, fontSize: '0.65rem'}}/>
                                                        <Typography variant="body2" sx={{
                                                            color: 'text.primary', fontWeight: 600, lineHeight: 1.4,
                                                            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                                                        }}>
                                                            {related.title}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </Card>
                                        ))}
                                    </Stack>
                                </>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
};

export default BlogDetailPage;
