import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {Box, Card, CardContent, Container, Divider, Stack, Typography} from "@mui/material";
import {Gavel} from "@mui/icons-material";

const TermsPage = () => {

    const sections = [
        {
            title: '1. Age Verification & Eligibility',
            content: 'You must be at least 21 years of age (or 18 with a valid medical cannabis recommendation where permitted by law) to create an account, browse products, or make purchases on Ruderalis. By using our platform, you confirm that you meet the legal age requirement in your jurisdiction. We reserve the right to request valid government-issued identification at any point to verify your age and identity.'
        },
        {
            title: '2. Medical Cannabis Compliance',
            content: 'Ruderalis operates in full compliance with applicable state and local cannabis regulations. Medical cannabis products are available only to patients with valid medical recommendations from a licensed healthcare provider. You agree to provide accurate medical documentation when required. Recreational products are available only in jurisdictions where legally permitted. We do not ship cannabis products across state lines.'
        },
        {
            title: '3. Account Responsibilities',
            content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities conducted under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate. Sharing account credentials or allowing others to use your account to purchase cannabis products is strictly prohibited and may result in account termination.'
        },
        {
            title: '4. Products, Pricing & Orders',
            content: 'All cannabis products listed on our platform are subject to availability and may vary by location. Product descriptions, including THC/CBD percentages, are based on laboratory testing and may vary slightly between batches. Prices are subject to change without notice. We reserve the right to limit purchase quantities in accordance with state regulations. Orders may be cancelled if we cannot verify your age, identity, or medical authorization.'
        },
        {
            title: '5. Purchase Limits & Regulations',
            content: 'Cannabis purchases are subject to daily and monthly purchase limits as defined by applicable state law. Ruderalis tracks purchase history to ensure compliance with these limits. Attempting to circumvent purchase limits by using multiple accounts or other means is a violation of these terms and applicable law, and will result in immediate account termination and potential reporting to regulatory authorities.'
        },
        {
            title: '6. Returns & Refunds',
            content: 'Due to the nature of cannabis products and regulatory requirements, returns of opened cannabis products are generally not accepted. Defective or incorrect orders will be addressed on a case-by-case basis. Refunds, when approved, will be processed to the original payment method within 5-10 business days. Non-cannabis accessories follow our standard return policy of 30 days from delivery.'
        },
        {
            title: '7. Limitation of Liability',
            content: 'Ruderalis provides cannabis products for adult use as permitted by law. We make no medical claims about our products. Cannabis products should be used responsibly and in accordance with applicable laws. Ruderalis shall not be liable for any adverse effects resulting from product use, misuse, or use in jurisdictions where cannabis is prohibited. By purchasing, you assume all risks associated with cannabis use.'
        },
        {
            title: '8. Changes to Terms',
            content: 'We reserve the right to modify these terms at any time to reflect changes in regulations, business practices, or legal requirements. Material changes will be communicated via email and posted on this page with an updated revision date. Continued use of our platform after changes constitutes acceptance of the revised terms.'
        },
    ];

    return (
        <Layout>
            <Box sx={{
                bgcolor: 'background.paper',
                borderBottom: '1px solid',
                borderColor: 'divider',
                pt: {xs: 4, md: 6},
                pb: {xs: 3, md: 5},
            }}>
                <Container maxWidth="md">
                    <Stack direction="row" spacing={2} alignItems="center" sx={{mb: 1}}>
                        <Box sx={{
                            width: 48, height: 48, borderRadius: '50%',
                            bgcolor: 'light.secondary',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Gavel sx={{color: 'secondary.main'}}/>
                        </Box>
                        <Box>
                            <Typography variant="h3" sx={{color: 'text.primary'}}>Terms of Service</Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>Last updated: March 2026</Typography>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{py: {xs: 3, md: 5}}}>
                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                <Card elevation={0}>
                    <CardContent sx={{p: {xs: 3, md: 4}}}>
                        <Typography variant="body1" sx={{color: 'text.secondary', lineHeight: 1.8, mb: 3}}>
                            By accessing and using Ruderalis, you accept and agree to be bound by these terms and all applicable cannabis laws and regulations. If you do not agree to these terms, please do not use our platform.
                        </Typography>

                        <Stack spacing={4}>
                            {sections.map((section, index) => (
                                <Box key={index}>
                                    {index > 0 && <Divider sx={{mb: 3}}/>}
                                    <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 600, mb: 1.5}}>
                                        {section.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{color: 'text.secondary', lineHeight: 1.8}}>
                                        {section.content}
                                    </Typography>
                                </Box>
                            ))}
                        </Stack>
                    </CardContent>
                </Card>
                </motion.div>
            </Container>
        </Layout>
    )
}

export default TermsPage;
