import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import {useState} from "react";

const FAQ = ({faq}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <Accordion
            expanded={expanded}
            onChange={() => setExpanded(!expanded)}
            disableGutters
            elevation={0}
            sx={{
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden',
                mb: 1.5,
                '&:before': {display: 'none'},
                '&.Mui-expanded': {
                    margin: 0,
                    mb: 1.5,
                    borderColor: 'secondary.main',
                },
            }}>
            <AccordionSummary
                expandIcon={
                    expanded
                        ? <Remove sx={{color: 'secondary.main', fontSize: 20}}/>
                        : <Add sx={{color: 'text.secondary', fontSize: 20}}/>
                }
                sx={{
                    px: 3,
                    py: 1,
                    '& .MuiAccordionSummary-content': {my: 1.5},
                }}>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'text.primary',
                        fontWeight: expanded ? 600 : 400,
                        fontSize: 15,
                        textTransform: 'none',
                    }}>
                    {faq.question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{px: 3, pt: 0, pb: 2.5}}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        fontSize: 14,
                        lineHeight: 1.7,
                    }}>
                    {faq.answer}
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
};

export default FAQ;
