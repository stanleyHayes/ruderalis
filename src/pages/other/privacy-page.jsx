import {motion} from "framer-motion";
import {fadeUp} from "../../utils/animations";
import Layout from "../../components/layout/layout";
import {Box, Card, CardContent, Container, Divider, Stack, Typography} from "@mui/material";
import {Security} from "@mui/icons-material";

const PrivacyPage = () => {

    const sections = [
        {
            title: '1. Information We Collect',
            content: 'We collect information you provide directly when creating an account, making a purchase, or contacting us. This includes your name, email address, phone number, date of birth (for age verification), shipping address, medical recommendation details (where applicable), and payment information. We also collect purchase history data to provide personalized product recommendations.'
        },
        {
            title: '2. Medical & Purchase Data',
            content: 'As a medical cannabis dispensary, we may collect and store information related to your medical recommendations, patient ID numbers, and qualifying conditions as required by state regulations. Your purchase history, including product types, quantities, and frequency, is maintained for regulatory compliance. This medical and purchase data is treated with the highest level of confidentiality and is never shared for marketing purposes.'
        },
        {
            title: '3. Age & Identity Verification',
            content: 'We are legally required to verify that all customers meet the minimum age requirement for cannabis purchases in their jurisdiction. We may collect government-issued identification data, which is used solely for verification purposes and is stored using industry-standard encryption. Verification data is retained only as long as required by applicable cannabis regulations.'
        },
        {
            title: '4. How We Use Your Information',
            content: 'We use collected information to process orders, maintain regulatory compliance, provide personalized product recommendations, communicate about products and promotions (with your consent), improve our services, and prevent fraud. We do not sell your personal information to third parties. Purchase data may be reported to state regulatory agencies as required by law.'
        },
        {
            title: '5. Data Security & Encryption',
            content: 'All personal and medical data is encrypted both in transit and at rest using AES-256 encryption. We implement multi-factor authentication, regular security audits, and strict access controls. Payment information is processed through PCI-DSS compliant payment processors and is never stored on our servers.'
        },
        {
            title: '6. Data Retention & Deletion',
            content: 'We retain personal data for as long as your account is active or as needed to provide services. Purchase records are retained as required by cannabis regulatory agencies (typically 7 years). You may request deletion of your account and associated data by contacting our privacy team, subject to regulatory retention requirements.'
        },
        {
            title: '7. Your Rights',
            content: 'You have the right to access, correct, or delete your personal information. You may opt out of marketing communications at any time. You can request a copy of all data we hold about you. For California residents, additional rights under the CCPA apply. Contact our privacy team at privacy@ruderalis.com for any data-related requests.'
        },
        {
            title: '8. Contact Us',
            content: 'If you have questions about this Privacy Policy or how we handle your data, please contact our Privacy Officer through our support channels or email privacy@ruderalis.com. We take all privacy concerns seriously and will respond within 30 days.'
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
                            <Security sx={{color: 'secondary.main'}}/>
                        </Box>
                        <Box>
                            <Typography variant="h3" sx={{color: 'text.primary'}}>Privacy Policy</Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                Last updated: March 2026
                            </Typography>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{py: {xs: 3, md: 5}}}>
                <motion.div variants={fadeUp} initial="initial" whileInView="animate" viewport={{once: true}}>
                <Card elevation={0}>
                    <CardContent sx={{p: {xs: 3, md: 4}}}>
                        <Typography variant="body1" sx={{color: 'text.secondary', lineHeight: 1.8, mb: 3}}>
                            Ruderalis is committed to protecting the privacy and security of our patients and customers. This policy explains how we collect, use, and safeguard your personal and medical information in compliance with cannabis industry regulations and data protection laws.
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

export default PrivacyPage;
