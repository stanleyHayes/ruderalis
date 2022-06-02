import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {KeyboardArrowDown} from "@mui/icons-material";

const FAQ = ({faq}) => {
    return (
        <Accordion
            variant="elevation"
            elevation={0}>
            <AccordionSummary
                sx={{
                    borderTopRightRadius: 32,
                    borderBottomRightRadius: 0,
                    borderBottomLeftRadius: 32,
                    borderTopLeftRadius: 32,
                    cursor: 'pointer',
                    backgroundColor: 'background.paper'
                }}
                expandIcon={
                    <KeyboardArrowDown
                        sx={{
                            borderTopRightRadius: 32,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 32,
                            borderTopLeftRadius: 32,
                            cursor: 'pointer',
                            color: 'secondary.main',
                            padding: 1,
                            fontSize: 24,
                            backgroundColor: 'light.secondary'
                        }}
                    />}>
                <Typography variant="body1" sx={{color: 'text.primary'}}>
                    {faq.question}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                    {faq.answer}
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default FAQ;