import {Box, IconButton, Stack} from "@mui/material";
import {ChevronLeftOutlined, ChevronRightOutlined} from "@mui/icons-material";
import {useRef} from "react";

const ScrollCarousel = ({children, cardWidth = 280, gap = 16}) => {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (scrollRef.current) {
            const amount = cardWidth * 2 + gap * 2;
            scrollRef.current.scrollBy({left: dir === 'left' ? -amount : amount, behavior: 'smooth'});
        }
    };

    return (
        <Box sx={{position: 'relative'}}>
            {/* Scroll buttons */}
            <IconButton onClick={() => scroll('left')} size="small" sx={{
                position: 'absolute', left: -16, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
                bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: 36, height: 36,
                display: {xs: 'none', md: 'flex'},
                '&:hover': {bgcolor: 'background.paper', borderColor: 'secondary.main'},
            }}>
                <ChevronLeftOutlined sx={{fontSize: 20}}/>
            </IconButton>
            <IconButton onClick={() => scroll('right')} size="small" sx={{
                position: 'absolute', right: -16, top: '50%', transform: 'translateY(-50%)', zIndex: 2,
                bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', width: 36, height: 36,
                display: {xs: 'none', md: 'flex'},
                '&:hover': {bgcolor: 'background.paper', borderColor: 'secondary.main'},
            }}>
                <ChevronRightOutlined sx={{fontSize: 20}}/>
            </IconButton>

            {/* Scrollable track */}
            <Box ref={scrollRef} sx={{
                display: 'flex',
                gap: `${gap}px`,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {display: 'none'},
                px: 0.5, py: 1,
            }}>
                {Array.isArray(children) ? children.map((child, i) => (
                    <Box key={i} sx={{
                        flex: `0 0 ${cardWidth}px`,
                        scrollSnapAlign: 'start',
                        minWidth: cardWidth,
                        maxWidth: cardWidth,
                    }}>
                        {child}
                    </Box>
                )) : children}
            </Box>
        </Box>
    );
};

export default ScrollCarousel;
