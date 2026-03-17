import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Rating,
    Slider,
    Stack,
    SwipeableDrawer,
    Switch,
    Typography,
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";

const FilterDrawer = ({open, onClose, onApply, filters, onFilterChange}) => {

    const handleCategoryChange = (category) => {
        const categories = filters.categories || [];
        const updated = categories.includes(category)
            ? categories.filter((c) => c !== category)
            : [...categories, category];
        onFilterChange({...filters, categories: updated});
    };

    const handleStrainChange = (strain) => {
        const strains = filters.strains || [];
        const updated = strains.includes(strain)
            ? strains.filter((s) => s !== strain)
            : [...strains, strain];
        onFilterChange({...filters, strains: updated});
    };

    const handlePriceChange = (event, newValue) => {
        onFilterChange({...filters, priceRange: newValue});
    };

    const handleRatingChange = (event, newValue) => {
        onFilterChange({...filters, rating: newValue});
    };

    const handleSwitchChange = (field) => (event) => {
        onFilterChange({...filters, [field]: event.target.checked});
    };

    const handleClearAll = () => {
        onFilterChange({
            categories: [],
            strains: [],
            priceRange: [0, 500],
            rating: 0,
            inStockOnly: false,
            onSale: false,
        });
    };

    const accordionSx = {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '&:before': {display: 'none'},
        '&.Mui-expanded': {margin: 0},
    };

    const summaryTypographySx = {
        color: 'text.primary',
        fontWeight: 600,
        fontSize: 14,
        textTransform: 'none',
    };

    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={onClose}
            onOpen={() => {}}
        >
            <Box
                sx={{
                    width: {xs: '85vw', sm: 360},
                    maxWidth: 400,
                    backgroundColor: 'background.default',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{px: 3, py: 2.5, borderBottom: '1px solid', borderColor: 'divider'}}>
                    <Typography variant="h6" sx={{color: 'text.primary', fontWeight: 700, textTransform: 'none'}}>
                        Filters
                    </Typography>
                </Box>

                <Box sx={{flex: 1, overflowY: 'auto', py: 1}}>
                    <Accordion defaultExpanded disableGutters sx={accordionSx}>
                        <AccordionSummary expandIcon={<ExpandMore sx={{color: 'text.secondary'}}/>} sx={{px: 3}}>
                            <Typography sx={summaryTypographySx}>Categories</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{px: 3, pt: 0}}>
                            <FormGroup>
                                {['Flower', 'Edibles', 'Accessories'].map((category) => (
                                    <FormControlLabel
                                        key={category}
                                        control={
                                            <Checkbox
                                                checked={(filters.categories || []).includes(category)}
                                                onChange={() => handleCategoryChange(category)}
                                                sx={{color: 'text.secondary', '&.Mui-checked': {color: 'secondary.main'}}}
                                                size="small"
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" sx={{color: 'text.primary', textTransform: 'none'}}>
                                                {category}
                                            </Typography>
                                        }
                                    />
                                ))}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded disableGutters sx={accordionSx}>
                        <AccordionSummary expandIcon={<ExpandMore sx={{color: 'text.secondary'}}/>} sx={{px: 3}}>
                            <Typography sx={summaryTypographySx}>Strain Type</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{px: 3, pt: 0}}>
                            <FormGroup>
                                {['Sativa', 'Indica', 'Hybrid'].map((strain) => (
                                    <FormControlLabel
                                        key={strain}
                                        control={
                                            <Checkbox
                                                checked={(filters.strains || []).includes(strain)}
                                                onChange={() => handleStrainChange(strain)}
                                                sx={{color: 'text.secondary', '&.Mui-checked': {color: 'secondary.main'}}}
                                                size="small"
                                            />
                                        }
                                        label={
                                            <Typography variant="body2" sx={{color: 'text.primary', textTransform: 'none'}}>
                                                {strain}
                                            </Typography>
                                        }
                                    />
                                ))}
                            </FormGroup>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded disableGutters sx={accordionSx}>
                        <AccordionSummary expandIcon={<ExpandMore sx={{color: 'text.secondary'}}/>} sx={{px: 3}}>
                            <Typography sx={summaryTypographySx}>Price Range</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{px: 3, pt: 0}}>
                            <Slider
                                value={filters.priceRange || [0, 500]}
                                onChange={handlePriceChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={500}
                                color="secondary"
                                sx={{color: 'secondary.main'}}
                            />
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="caption" sx={{color: 'text.secondary', textTransform: 'none'}}>
                                    ${(filters.priceRange || [0, 500])[0]}
                                </Typography>
                                <Typography variant="caption" sx={{color: 'text.secondary', textTransform: 'none'}}>
                                    ${(filters.priceRange || [0, 500])[1]}
                                </Typography>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded disableGutters sx={accordionSx}>
                        <AccordionSummary expandIcon={<ExpandMore sx={{color: 'text.secondary'}}/>} sx={{px: 3}}>
                            <Typography sx={summaryTypographySx}>Rating</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{px: 3, pt: 0}}>
                            <Stack direction="row" spacing={1.5} alignItems="center">
                                <Rating
                                    value={filters.rating || 0}
                                    onChange={handleRatingChange}
                                    precision={1}
                                    sx={{
                                        '& .MuiRating-iconFilled': {color: 'secondary.main'},
                                        '& .MuiRating-iconEmpty': {color: 'text.disabled'},
                                    }}
                                />
                                <Typography variant="body2" sx={{color: 'text.secondary', textTransform: 'none'}}>
                                    & up
                                </Typography>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded disableGutters sx={accordionSx}>
                        <AccordionSummary expandIcon={<ExpandMore sx={{color: 'text.secondary'}}/>} sx={{px: 3}}>
                            <Typography sx={summaryTypographySx}>Availability</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{px: 3, pt: 0}}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={filters.inStockOnly || false}
                                        onChange={handleSwitchChange('inStockOnly')}
                                        color="secondary"
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{color: 'text.primary', textTransform: 'none'}}>
                                        In Stock Only
                                    </Typography>
                                }
                            />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion defaultExpanded disableGutters sx={accordionSx}>
                        <AccordionSummary expandIcon={<ExpandMore sx={{color: 'text.secondary'}}/>} sx={{px: 3}}>
                            <Typography sx={summaryTypographySx}>On Sale</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{px: 3, pt: 0}}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={filters.onSale || false}
                                        onChange={handleSwitchChange('onSale')}
                                        color="secondary"
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{color: 'text.primary', textTransform: 'none'}}>
                                        Show Sale Items Only
                                    </Typography>
                                }
                            />
                        </AccordionDetails>
                    </Accordion>
                </Box>

                <Box sx={{px: 3, py: 2.5, borderTop: '1px solid', borderColor: 'divider'}}>
                    <Stack spacing={1.5}>
                        <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={onApply}
                            sx={{
                                textTransform: 'none',
                                fontWeight: 600,
                                py: 1.2,
                                borderRadius: 2,
                            }}
                        >
                            Apply Filters
                        </Button>
                        <Button
                            variant="text"
                            fullWidth
                            onClick={handleClearAll}
                            sx={{
                                textTransform: 'none',
                                color: 'text.secondary',
                                fontWeight: 500,
                                '&:hover': {color: 'secondary.main'},
                            }}
                        >
                            Clear All
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </SwipeableDrawer>
    );
};

export default FilterDrawer;
