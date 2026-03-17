import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {
    Avatar, Box, Button, Card, CardContent, Chip, Container,
    Divider, Grid, Stack, Typography, useMediaQuery, useTheme,
} from "@mui/material";
import {
    Timeline, TimelineItem, TimelineSeparator, TimelineConnector,
    TimelineContent, TimelineDot, TimelineOppositeContent,
} from "@mui/lab";
import {Link} from "react-router-dom";
import {
    ArrowForward, AutoStoriesOutlined, BoltOutlined,
    CheckCircleOutlined, EnergySavingsLeafOutlined,
    Gavel, Groups, Groups2Outlined, RocketLaunchOutlined,
    SpaOutlined, StarOutlined, StorefrontOutlined,
    TrendingUpOutlined, VerifiedUser,
} from "@mui/icons-material";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getFAQs, selectFAQs} from "../../redux/features/faq/faqs-slice";
import {getTestimonials, selectTestimonials} from "../../redux/features/testimonial/testimonials-slice";
import FAQ from "../../components/shared/faq";
import Testimonial from "../../components/shared/testimonial";
import logo from "../../assets/images/logo.png";
import PageBanner from "../../components/shared/page-banner";

const SectionHeader = ({icon, title, subtitle, chip}) => (
    <Box sx={{mb: 3}}>
        <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.5}}>
            {icon && (
                <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                    {icon}
                </Box>
            )}
            <Typography variant="h5" fontWeight={800} sx={{color: 'text.primary'}}>{title}</Typography>
            {chip && (
                <Chip size="small" label={chip} sx={{
                    backgroundColor: 'light.secondary', color: 'secondary.main',
                    fontWeight: 700, fontSize: 10,
                }}/>
            )}
        </Stack>
        {subtitle && (
            <Typography variant="body2" color="text.secondary" sx={{fontStyle: 'italic', lineHeight: 1.7}}>
                {subtitle}
            </Typography>
        )}
    </Box>
);

const AboutPage = () => {
    const dispatch = useDispatch();
    const {faqs} = useSelector(selectFAQs);
    const {testimonials} = useSelector(selectTestimonials);
    useEffect(() => {
        dispatch(getFAQs());
        dispatch(getTestimonials());
    }, [dispatch]);
    const theme = useTheme();
    const md = useMediaQuery(theme.breakpoints.up('md'));

    const values = [
        {title: 'Quality First', text: 'Every product is rigorously lab-tested for potency, purity, terpene profile, and contaminants before reaching our shelves.', color: 'secondary'},
        {title: 'Full Compliance', text: 'We operate under full state and local cannabis licensing. Every transaction is tracked, taxed, and transparent.', color: 'secondary'},
        {title: 'Patient Safety', text: 'Age-verified purchasing, secure encrypted payments, child-resistant packaging, and discreet delivery on every order.', color: 'secondary'},
        {title: 'Community Driven', text: 'We invest in cannabis education, support expungement efforts, and partner with local organizations for social equity.', color: 'secondary'},
        {title: 'Sustainability', text: 'Our cultivation partners use organic practices, sustainable farming, and energy-efficient facilities to minimize environmental impact.', color: 'secondary'},
        {title: 'Innovation', text: 'We continuously develop new product lines, delivery methods, and technologies to better serve our patients evolving needs.', color: 'secondary'},
    ];

    const team = [
        {name: 'Dr. Maya Chen', role: 'Chief Medical Officer', bio: 'Board-certified physician specializing in cannabinoid therapeutics with 15 years of clinical experience.'},
        {name: 'James Okafor', role: 'Head of Cultivation', bio: 'Award-winning cultivator and cannabis geneticist focused on developing therapeutic strain profiles.'},
        {name: 'Sarah Mitchell', role: 'Director of Compliance', bio: 'Former state regulator with deep expertise in cannabis law, licensing, and regulatory compliance.'},
    ];

    const timeline = [
        {year: '2020', title: 'Founded', text: 'Ruderalis was established with a mission to provide safe, legal access to medical cannabis.'},
        {year: '2021', title: 'First Dispensary', text: 'Opened our flagship dispensary in Las Vegas, serving over 500 patients in the first month.'},
        {year: '2022', title: 'Online Platform', text: 'Launched our e-commerce platform with discreet delivery, serving patients statewide.'},
        {year: '2023', title: 'Expansion', text: 'Grew to 8 dispensary locations and introduced our premium edibles line.'},
        {year: '2024', title: '10,000 Patients', text: 'Reached 10,000 active patients and launched our same-day delivery program.'},
        {year: '2025', title: 'Innovation Lab', text: 'Opened our R&D facility for developing next-generation cannabis therapeutics.'},
    ];

    const bullets = [
        'All products are third-party lab tested with publicly accessible Certificates of Analysis (COA)',
        'Licensed and compliant with all state and local cannabis regulations',
        'Knowledgeable patient consultants available in-store and online',
        'Same-day delivery in select areas for orders placed before 2 PM',
        'Seed-to-sale tracking on every product for full transparency',
        'Secure, encrypted transactions with discreet packaging',
        'Ongoing patient education programs and wellness resources',
    ];

    return (
        <Layout>
            <PageBanner
                title="About Ruderalis"
                description="Wellness through cannabis — premium medical marijuana delivered with care, compliance, and community."
                links={[{path: '/', label: 'Home'}, {path: '/about', label: 'About'}]}
            />
            <Box sx={{py: {xs: 6, md: 8}, backgroundColor: 'background.default'}}>
                <Container maxWidth="lg">

                    {/* ═══════════ QUOTE ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Card variant="outlined" sx={{overflow: 'hidden', mb: 6}}>
                        <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                        <CardContent sx={{p: 3}}>
                            <Stack direction="row" spacing={2} alignItems="center" sx={{mb: 2}}>
                                <img src={logo} alt="Ruderalis" style={{width: 36, height: 36, objectFit: 'contain'}}/>
                                <Typography variant="h6" fontFamily="TTSquares" fontWeight={700} sx={{color: 'text.primary'}}>
                                    Ruderalis
                                </Typography>
                            </Stack>
                            <Typography variant="h6" fontWeight={800} sx={{lineHeight: 1.5, letterSpacing: 0.2, color: 'text.primary'}}>
                                "Cannabis is not just a plant — it's a pathway to wellness that has been used for thousands of years. We're here to make that pathway safe, legal, and accessible."
                            </Typography>
                            <Chip size="small" label="Our Manifesto" color="secondary" variant="outlined" sx={{mt: 2, fontWeight: 600}}/>
                        </CardContent>
                    </Card>
                    </motion.div>

                    {/* ═══════════ OUR STORY ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Box sx={{mb: 6}}>
                        <SectionHeader
                            icon={<AutoStoriesOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>}
                            title="Our Story"
                        />
                        <Typography variant="body1" color="text.secondary" sx={{lineHeight: 1.8}}>
                            Ruderalis was founded with a simple belief: every patient deserves access to safe, high-quality medical cannabis. What started as a single dispensary in Las Vegas has grown into a trusted network of licensed locations, serving thousands of patients across the state.
                            {'\n\n'}
                            We work directly with licensed cultivators who share our commitment to organic practices, sustainable farming, and rigorous testing. Every product on our shelves has been third-party lab tested and meets our stringent quality standards. Our team of patient consultants, physicians, and cannabis experts are dedicated to helping you find the right products for your unique needs.
                        </Typography>
                    </Box>
                    </motion.div>

                    {/* ═══════════ MISSION & VISION ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Grid container spacing={2} sx={{mb: 6}}>
                        <Grid size={{xs: 12, md: 6}}>
                            <Card variant="outlined" sx={{height: '100%', overflow: 'hidden'}}>
                                <Box sx={{height: 3, backgroundColor: 'info.main'}}/>
                                <CardContent sx={{p: 2.5}}>
                                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1.5}}>
                                        <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                            <BoltOutlined sx={{fontSize: 20, color: 'secondary.main'}}/>
                                        </Box>
                                        <Typography variant="h6" fontWeight={800} sx={{color: 'text.primary'}}>Mission</Typography>
                                    </Stack>
                                    <Divider sx={{mb: 1.5}}/>
                                    <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.7}}>
                                        To provide safe, legal, and accessible medical cannabis products that improve the quality of life for our patients. We are committed to quality, compliance, education, and compassionate care in everything we do.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid size={{xs: 12, md: 6}}>
                            <Card variant="outlined" sx={{height: '100%', overflow: 'hidden'}}>
                                <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                                <CardContent sx={{p: 2.5}}>
                                    <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1.5}}>
                                        <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                            <RocketLaunchOutlined sx={{fontSize: 20, color: 'secondary.main'}}/>
                                        </Box>
                                        <Typography variant="h6" fontWeight={800} sx={{color: 'text.primary'}}>Vision</Typography>
                                    </Stack>
                                    <Divider sx={{mb: 1.5}}/>
                                    <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.7}}>
                                        To be the most trusted name in medical cannabis — a company known for the highest product standards, the most knowledgeable team, and a genuine commitment to patient wellness and community impact.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    </motion.div>

                    {/* ═══════════ CORE VALUES ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Box sx={{mb: 6}}>
                        <SectionHeader
                            icon={<StarOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>}
                            title="Core Values"
                            subtitle="The principles that guide everything we do"
                            chip={`${values.length} Values`}
                        />
                        <Card variant="outlined">
                            <CardContent sx={{p: 0, '&:last-child': {pb: 0}}}>
                                {values.map((v, i) => (
                                    <Box key={i}>
                                        <Stack direction="row" spacing={2.5} alignItems="flex-start" sx={{p: 2.5}}>
                                            <Box sx={{
                                                display: 'flex', p: 0.75, borderRadius: 1,
                                                backgroundColor: 'light.secondary',
                                                border: '1px solid', borderColor: 'divider',
                                                flexShrink: 0, mt: 0.25,
                                            }}>
                                                <StarOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>
                                            </Box>
                                            <Box>
                                                <Typography variant="subtitle2" fontWeight={700} sx={{color: 'text.primary', mb: 0.5}}>
                                                    {v.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.6}}>
                                                    {v.text}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        {i < values.length - 1 && <Divider/>}
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Box>
                    </motion.div>

                    {/* ═══════════ WHY CHOOSE US ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Box sx={{mb: 6}}>
                        <SectionHeader
                            icon={<TrendingUpOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>}
                            title="Why Choose Ruderalis"
                        />
                        <Card variant="outlined">
                            <CardContent sx={{p: 2.5}}>
                                <Stack spacing={1}>
                                    {bullets.map((b, i) => (
                                        <Stack key={i} direction="row" spacing={1.5} alignItems="flex-start">
                                            <CheckCircleOutlined sx={{fontSize: 16, color: 'secondary.main', mt: 0.25, flexShrink: 0}}/>
                                            <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.6}}>
                                                {b}
                                            </Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>
                    </motion.div>

                    {/* ═══════════ TEAM ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Box sx={{mb: 6}}>
                        <SectionHeader
                            icon={<Groups2Outlined sx={{fontSize: 18, color: 'secondary.main'}}/>}
                            title="Our Team"
                            chip={`${team.length} Leaders`}
                        />
                        <Card variant="outlined">
                            <CardContent sx={{p: 0, '&:last-child': {pb: 0}}}>
                                {team.map((m, i) => (
                                    <Box key={i}>
                                        <Stack direction={{xs: 'column', sm: 'row'}} spacing={2.5} alignItems={{sm: 'center'}} sx={{p: 2.5}}>
                                            <Avatar sx={{
                                                width: 56, height: 56, bgcolor: 'secondary.main',
                                                fontSize: 18, fontWeight: 700, color: 'common.white', flexShrink: 0,
                                            }}>
                                                {m.name.split(' ').map(n => n[0]).join('')}
                                            </Avatar>
                                            <Box sx={{flex: 1}}>
                                                <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.5}}>
                                                    <Typography variant="subtitle1" fontWeight={700} sx={{color: 'text.primary'}}>
                                                        {m.name}
                                                    </Typography>
                                                    <Chip label={m.role} size="small" sx={{
                                                        backgroundColor: 'light.secondary', color: 'secondary.main',
                                                        fontWeight: 600, fontSize: 10, height: 22,
                                                    }}/>
                                                </Stack>
                                                <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.6}}>
                                                    {m.bio}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        {i < team.length - 1 && <Divider/>}
                                    </Box>
                                ))}
                            </CardContent>
                        </Card>
                    </Box>
                    </motion.div>

                    {/* ═══════════ COMMUNITY ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Card variant="outlined" sx={{overflow: 'hidden', mb: 6}}>
                        <Box sx={{height: 3, backgroundColor: 'secondary.main'}}/>
                        <CardContent sx={{p: 3}}>
                            <Stack direction="row" spacing={1.5} alignItems="center" sx={{mb: 1.5}}>
                                <Box sx={{display: 'flex', p: 0.5, borderRadius: 1, backgroundColor: 'light.secondary'}}>
                                    <Groups sx={{fontSize: 20, color: 'secondary.main'}}/>
                                </Box>
                                <Typography variant="h6" fontWeight={800} sx={{color: 'text.primary'}}>Community Impact</Typography>
                            </Stack>
                            <Box sx={{pl: 1.5, borderLeft: '3px solid', borderColor: 'secondary.main', mb: 2}}>
                                <Typography variant="subtitle1" sx={{fontWeight: 700, fontStyle: 'italic', lineHeight: 1.5, color: 'text.primary'}}>
                                    "We believe cannabis should be a force for positive change — in individual lives and in our communities."
                                </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.7}}>
                                Beyond selling premium cannabis, we're actively invested in our community. We support cannabis expungement programs, fund patient education initiatives, and partner with local nonprofits focused on social equity in the cannabis industry. A portion of every sale goes toward our Community Wellness Fund, which provides discounted access to medical cannabis for qualifying low-income patients.
                            </Typography>
                        </CardContent>
                    </Card>
                    </motion.div>

                    {/* ═══════════ TIMELINE ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Box sx={{mb: 6}}>
                        <SectionHeader
                            icon={<StorefrontOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>}
                            title="Our Journey"
                        />
                        <Timeline position="right" sx={{
                            '& .MuiTimelineDot-root': {backgroundColor: 'secondary.main', boxShadow: 'none'},
                            '& .MuiTimelineConnector-root': {backgroundColor: 'divider'},
                        }}>
                            {timeline.map((item, i) => (
                                <TimelineItem key={i}>
                                    <TimelineOppositeContent sx={{flex: 0.2}}>
                                        <Chip size="small" label={item.year} sx={{
                                            backgroundColor: 'light.secondary', color: 'secondary.main',
                                            fontWeight: 800, fontSize: 11,
                                        }}/>
                                    </TimelineOppositeContent>
                                    <TimelineSeparator>
                                        <TimelineDot/>
                                        {i < timeline.length - 1 && <TimelineConnector/>}
                                    </TimelineSeparator>
                                    <TimelineContent>
                                        <Typography variant="subtitle2" fontWeight={800} sx={{color: 'text.primary'}}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{lineHeight: 1.6}}>
                                            {item.text}
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </Box>
                    </motion.div>

                    {/* ═══════════ FAQ ═══════════ */}
                    {faqs?.length > 0 && (
                        <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                        <Box sx={{mb: 6}}>
                            <SectionHeader
                                icon={<SpaOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>}
                                title="Frequently Asked Questions"
                                chip={`${faqs.length} Questions`}
                            />
                            <Stack spacing={1.5}>
                                {faqs.map((faq, i) => <FAQ key={i} faq={faq}/>)}
                            </Stack>
                        </Box>
                        </motion.div>
                    )}

                    {/* ═══════════ TESTIMONIALS ═══════════ */}
                    {testimonials?.length > 0 && (
                        <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                        <Box sx={{mb: 6}}>
                            <SectionHeader
                                icon={<StarOutlined sx={{fontSize: 18, color: 'secondary.main'}}/>}
                                title="What Our Patients Say"
                                chip={`${testimonials.length} Reviews`}
                            />
                            <Grid container spacing={2}>
                                {testimonials.slice(0, md ? 3 : 2).map((t, i) => (
                                    <Grid key={i} size={{xs: 12, sm: 6, md: 4}}>
                                        <Testimonial testimonial={t}/>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        </motion.div>
                    )}

                    {/* ═══════════ CTA ═══════════ */}
                    <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                    <Stack direction={{xs: 'column', sm: 'row'}} spacing={2} justifyContent="center">
                        <Button component={Link} to="/products/marijuana" variant="contained" color="secondary"
                            size="large" endIcon={<ArrowForward/>} sx={{fontWeight: 700, px: 4}}>
                            Browse Our Menu
                        </Button>
                        <Button component={Link} to="/shops" variant="outlined" color="secondary"
                            size="large" sx={{fontWeight: 600}}>
                            Find a Dispensary
                        </Button>
                        <Button component={Link} to="/contact" variant="outlined" color="secondary"
                            size="large" sx={{fontWeight: 600}}>
                            Contact Us
                        </Button>
                    </Stack>
                    </motion.div>

                </Container>
            </Box>
        </Layout>
    );
};

export default AboutPage;
