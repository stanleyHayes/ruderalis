import Layout from "../../components/layout/layout";
import {Box, Card, CardContent, Container, Divider, Stack, Typography} from "@mui/material";
import {Policy} from "@mui/icons-material";

const AcceptableUsePolicyPage = () => {

    const sections = [
        {
            title: '1. Purpose',
            content: 'This Acceptable Use Policy outlines the rules and guidelines for using the Ruderalis platform. As a licensed cannabis dispensary, we are committed to maintaining a safe, legal, and responsible marketplace. By using our platform, you agree to comply with this policy, our Terms of Service, and all applicable federal, state, and local laws governing cannabis.'
        },
        {
            title: '2. Age & Legal Requirements',
            content: 'Users must meet the legal age requirement (21+ for recreational, 18+ for medical with valid recommendation) to access and use the platform. Any attempt to access our services by underage individuals is strictly prohibited. Users must not assist or facilitate purchases for individuals who do not meet age or medical eligibility requirements.'
        },
        {
            title: '3. Prohibited Activities',
            content: 'You may not use our platform to: purchase cannabis for resale or distribution without proper licensing; transport cannabis across state lines; exceed purchase limits established by state regulations; create multiple accounts to circumvent purchase limits; make purchases on behalf of ineligible individuals; engage in any activity that violates applicable cannabis regulations; post false, misleading, or defamatory reviews; or attempt to gain unauthorized access to our systems.'
        },
        {
            title: '4. Responsible Use',
            content: 'Ruderalis advocates for responsible cannabis use. Users should: consume cannabis products responsibly and as directed; never operate vehicles or heavy machinery under the influence; store all cannabis products securely away from children and pets; adhere to all local laws regarding public consumption; consult with a healthcare provider before using cannabis for medical purposes; and report any adverse reactions to products through our support channels.'
        },
        {
            title: '5. Content & Communication Standards',
            content: 'All user-generated content, including reviews and communications, must be truthful, respectful, and not misleading. Users must not make unverified medical claims about cannabis products, post content that promotes illegal activity, harass other users or our staff, or upload harmful or malicious content. We reserve the right to remove any content that violates these standards.'
        },
        {
            title: '6. Enforcement & Consequences',
            content: 'Violations of this policy may result in: warning and content removal for first offenses; temporary account suspension for repeated violations; permanent account termination for serious violations; reporting to law enforcement or regulatory agencies when illegal activity is suspected; and legal action where appropriate. We maintain sole discretion in determining violations and appropriate consequences.'
        },
        {
            title: '7. Reporting Violations',
            content: 'If you encounter any violations of this policy or suspect illegal activity on our platform, please report them immediately through our support channels or by emailing compliance@ruderalis.com. All reports are treated confidentially and will be investigated promptly. We take all reports seriously and appreciate our community helping us maintain a safe and compliant marketplace.'
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
                            <Policy sx={{color: 'secondary.main'}}/>
                        </Box>
                        <Box>
                            <Typography variant="h3" sx={{color: 'text.primary'}}>Acceptable Use Policy</Typography>
                            <Typography variant="body2" sx={{color: 'text.secondary'}}>Last updated: March 2026</Typography>
                        </Box>
                    </Stack>
                </Container>
            </Box>

            <Container maxWidth="md" sx={{py: {xs: 3, md: 5}}}>
                <Card elevation={0}>
                    <CardContent sx={{p: {xs: 3, md: 4}}}>
                        <Typography variant="body1" sx={{color: 'text.secondary', lineHeight: 1.8, mb: 3}}>
                            Ruderalis is committed to providing a safe, legal, and responsible cannabis marketplace. This policy ensures all users understand their responsibilities and helps us maintain compliance with cannabis industry regulations.
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
            </Container>
        </Layout>
    )
}

export default AcceptableUsePolicyPage;
