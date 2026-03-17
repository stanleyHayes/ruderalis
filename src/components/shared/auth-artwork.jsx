import {Box, Typography} from "@mui/material";
import {motion} from "framer-motion";

const float = (delay = 0, duration = 6) => ({
    animate: {y: [0, -20, 0], rotate: [0, 5, -5, 0]},
    transition: {duration, repeat: Infinity, ease: 'easeInOut', delay},
});

const pulse = (delay = 0) => ({
    animate: {scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6]},
    transition: {duration: 4, repeat: Infinity, ease: 'easeInOut', delay},
});

const variants = {
    login: {
        bg: 'linear-gradient(135deg, #0a1a0f 0%, #0d2818 30%, #14532d 60%, #052e16 100%)',
        shapes: [
            {type: 'circle', size: 300, top: '-5%', left: '-8%', bg: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)', ...float(0)},
            {type: 'circle', size: 200, bottom: '10%', right: '-5%', bg: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', ...float(1.5)},
            {type: 'ring', size: 180, top: '20%', right: '15%', ...float(0.8, 8)},
            {type: 'ring', size: 120, bottom: '25%', left: '10%', ...float(2, 7)},
            {type: 'dot-grid', top: '5%', right: '5%'},
            {type: 'leaf', top: '60%', left: '20%', ...float(1, 9)},
            {type: 'hexagon', size: 80, top: '35%', left: '5%', ...float(3, 8)},
            {type: 'line', top: '45%', right: '10%', angle: 45},
            {type: 'line', bottom: '15%', left: '25%', angle: -30},
        ],
        title: ['Your wellness journey', 'starts here'],
        subtitle: 'Premium medical cannabis, curated for quality and delivered with care.',
    },
    register: {
        bg: 'linear-gradient(150deg, #0c1220 0%, #0f2027 25%, #1a3a2a 50%, #0d3320 100%)',
        shapes: [
            {type: 'circle', size: 350, top: '-10%', right: '-10%', bg: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', ...float(0, 7)},
            {type: 'circle', size: 250, bottom: '-5%', left: '-8%', bg: 'radial-gradient(circle, rgba(201,169,110,0.1) 0%, transparent 70%)', ...float(2, 8)},
            {type: 'cross', size: 40, top: '15%', left: '20%', ...float(1)},
            {type: 'cross', size: 25, bottom: '30%', right: '25%', ...float(2.5)},
            {type: 'ring', size: 200, top: '30%', left: '-5%', ...float(0.5, 9)},
            {type: 'diamond', size: 60, top: '20%', right: '20%', ...float(1.5, 7)},
            {type: 'diamond', size: 35, bottom: '20%', left: '30%', ...float(3, 6)},
            {type: 'dot-grid', bottom: '10%', right: '8%'},
            {type: 'wave', bottom: '0%'},
        ],
        title: ['Join the', 'community'],
        subtitle: 'Create your account and start your wellness journey today.',
    },
    forgot: {
        bg: 'linear-gradient(160deg, #0f172a 0%, #1e293b 30%, #14532d 70%, #0c1f17 100%)',
        shapes: [
            {type: 'circle', size: 280, top: '10%', left: '-10%', bg: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)', ...float(0)},
            {type: 'circle', size: 220, bottom: '5%', right: '-5%', bg: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 70%)', ...float(1.5)},
            {type: 'ring', size: 160, top: '40%', right: '10%', ...float(1, 8)},
            {type: 'shield', top: '15%', right: '20%', ...float(0.5, 7)},
            {type: 'dot-grid', top: '8%', left: '8%'},
            {type: 'hexagon', size: 60, bottom: '30%', left: '15%', ...float(2, 6)},
            {type: 'line', top: '55%', left: '10%', angle: 60},
        ],
        title: ["We've got you", 'covered'],
        subtitle: 'We will send you a secure link to reset your password.',
    },
    reset: {
        bg: 'linear-gradient(140deg, #0a1628 0%, #132a13 40%, #1a3a1a 70%, #0d1117 100%)',
        shapes: [
            {type: 'circle', size: 320, bottom: '-8%', left: '-10%', bg: 'radial-gradient(circle, rgba(34,197,94,0.13) 0%, transparent 70%)', ...float(0, 8)},
            {type: 'ring', size: 220, top: '5%', right: '-5%', ...float(0.5, 9)},
            {type: 'ring', size: 100, bottom: '35%', right: '20%', ...float(2, 7)},
            {type: 'lock', top: '20%', left: '20%', ...pulse(0)},
            {type: 'cross', size: 30, top: '60%', right: '15%', ...float(1.5)},
            {type: 'cross', size: 20, top: '12%', left: '40%', ...float(3)},
            {type: 'dot-grid', bottom: '5%', left: '5%'},
        ],
        title: ['Secure your', 'account'],
        subtitle: 'Choose a strong password to keep your account protected.',
    },
    otp: {
        bg: 'linear-gradient(135deg, #0c1220 0%, #1a1a2e 30%, #16213e 60%, #0f3d2a 100%)',
        shapes: [
            {type: 'circle', size: 260, top: '-5%', right: '-8%', bg: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', ...float(0)},
            {type: 'circle', size: 200, bottom: '10%', left: '-5%', bg: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', ...float(2)},
            {type: 'ring', size: 150, top: '35%', left: '10%', ...float(1, 8)},
            {type: 'keyhole', top: '18%', right: '18%', ...pulse(0.5)},
            {type: 'diamond', size: 45, bottom: '25%', right: '30%', ...float(1.5, 6)},
            {type: 'dot-grid', top: '5%', left: '5%'},
            {type: 'hexagon', size: 50, bottom: '15%', left: '25%', ...float(2.5, 7)},
        ],
        title: ['Almost', 'there'],
        subtitle: 'Verify your identity with the one-time code sent to your email.',
    },
    verify: {
        bg: 'linear-gradient(145deg, #0d1117 0%, #0f2b1d 35%, #1a4731 65%, #0a1a0f 100%)',
        shapes: [
            {type: 'circle', size: 300, top: '5%', left: '-10%', bg: 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)', ...float(0, 7)},
            {type: 'circle', size: 180, bottom: '5%', right: '-5%', bg: 'radial-gradient(circle, rgba(201,169,110,0.08) 0%, transparent 70%)', ...float(1.5)},
            {type: 'checkmark', top: '20%', right: '20%', ...pulse(0)},
            {type: 'ring', size: 140, bottom: '30%', left: '5%', ...float(1, 8)},
            {type: 'cross', size: 35, top: '55%', right: '10%', ...float(2)},
            {type: 'dot-grid', bottom: '8%', right: '5%'},
            {type: 'hexagon', size: 70, top: '10%', right: '5%', ...float(3, 9)},
        ],
        title: ['One more', 'step'],
        subtitle: 'Verify your account to unlock full access to premium medical cannabis products.',
    },
    resend: {
        bg: 'linear-gradient(155deg, #0c1220 0%, #0d2818 40%, #1a3a2a 70%, #1a1a2e 100%)',
        shapes: [
            {type: 'circle', size: 280, bottom: '-5%', right: '-8%', bg: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)', ...float(0, 8)},
            {type: 'circle', size: 220, top: '-5%', left: '-5%', bg: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)', ...float(2)},
            {type: 'ring', size: 170, top: '25%', right: '5%', ...float(0.5, 9)},
            {type: 'ring', size: 90, bottom: '20%', left: '15%', ...float(2.5, 6)},
            {type: 'mail', top: '18%', left: '22%', ...pulse(1)},
            {type: 'diamond', size: 40, top: '60%', right: '25%', ...float(1.5)},
            {type: 'dot-grid', top: '5%', right: '8%'},
        ],
        title: ['Need a new', 'code?'],
        subtitle: 'We will send a fresh verification code to your registered email.',
    },
};

const renderShape = (shape, i) => {
    const {type, size, bg, top, left, right, bottom, angle, animate, transition} = shape;
    const pos = {position: 'absolute', top, left, right, bottom};
    const MotionBox = motion(Box);

    const motionProps = animate ? {animate, transition} : {};

    switch (type) {
        case 'circle':
            return <MotionBox key={i} sx={{...pos, width: size, height: size, borderRadius: '50%', background: bg}} {...motionProps}/>;
        case 'ring':
            return <MotionBox key={i} sx={{...pos, width: size, height: size, borderRadius: '50%', border: '1.5px solid rgba(34,197,94,0.15)'}} {...motionProps}/>;
        case 'dot-grid':
            return (
                <Box key={i} sx={{...pos, width: 120, height: 120, opacity: 0.3}}>
                    {Array.from({length: 25}).map((_, j) => (
                        <Box key={j} sx={{
                            width: 3, height: 3, borderRadius: '50%', bgcolor: 'rgba(34,197,94,0.4)',
                            position: 'absolute',
                            left: (j % 5) * 28, top: Math.floor(j / 5) * 28,
                        }}/>
                    ))}
                </Box>
            );
        case 'diamond':
            return <MotionBox key={i} sx={{...pos, width: size, height: size, border: '1.5px solid rgba(34,197,94,0.2)', transform: 'rotate(45deg)'}} {...motionProps}/>;
        case 'hexagon':
            return (
                <MotionBox key={i} sx={{
                    ...pos, width: size, height: size * 0.577,
                    background: 'rgba(34,197,94,0.06)',
                    clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                }} {...motionProps}/>
            );
        case 'cross':
            return (
                <MotionBox key={i} sx={{...pos, width: size, height: size}} {...motionProps}>
                    <Box sx={{position: 'absolute', top: '50%', left: 0, right: 0, height: 1.5, bgcolor: 'rgba(34,197,94,0.2)', transform: 'translateY(-50%)'}}/>
                    <Box sx={{position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1.5, bgcolor: 'rgba(34,197,94,0.2)', transform: 'translateX(-50%)'}}/>
                </MotionBox>
            );
        case 'line':
            return <Box key={i} sx={{...pos, width: 100, height: 1.5, bgcolor: 'rgba(34,197,94,0.12)', transform: `rotate(${angle || 0}deg)`}}/>;
        case 'wave':
            return (
                <Box key={i} sx={{...pos, left: 0, right: 0, height: 120, overflow: 'hidden', opacity: 0.08}}>
                    <svg width="100%" height="120" viewBox="0 0 600 120" preserveAspectRatio="none">
                        <path d="M0,60 C150,120 350,0 600,60 L600,120 L0,120 Z" fill="#22c55e"/>
                    </svg>
                </Box>
            );
        case 'leaf':
            return (
                <MotionBox key={i} sx={{...pos, width: 60, height: 60, opacity: 0.15}} {...motionProps}>
                    <svg viewBox="0 0 60 60" fill="none">
                        <path d="M30 5C30 5 50 20 50 35C50 50 40 55 30 55C20 55 10 50 10 35C10 20 30 5 30 5Z" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.1)"/>
                        <path d="M30 15V50" stroke="#22c55e" strokeWidth="1" opacity="0.5"/>
                    </svg>
                </MotionBox>
            );
        case 'shield':
            return (
                <MotionBox key={i} sx={{...pos, width: 60, height: 70, opacity: 0.2}} {...motionProps}>
                    <svg viewBox="0 0 60 70" fill="none">
                        <path d="M30 5L55 18V40C55 55 30 65 30 65C30 65 5 55 5 40V18L30 5Z" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.05)"/>
                    </svg>
                </MotionBox>
            );
        case 'lock':
            return (
                <MotionBox key={i} sx={{...pos, width: 50, height: 60, opacity: 0.2}} {...motionProps}>
                    <svg viewBox="0 0 50 60" fill="none">
                        <rect x="8" y="25" width="34" height="30" rx="4" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.05)"/>
                        <path d="M15 25V18C15 10 25 5 35 18V25" stroke="#22c55e" strokeWidth="1.5" fill="none"/>
                        <circle cx="25" cy="40" r="4" fill="#22c55e" opacity="0.3"/>
                    </svg>
                </MotionBox>
            );
        case 'keyhole':
            return (
                <MotionBox key={i} sx={{...pos, width: 50, height: 65, opacity: 0.2}} {...motionProps}>
                    <svg viewBox="0 0 50 65" fill="none">
                        <circle cx="25" cy="22" r="17" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.05)"/>
                        <path d="M20 35L17 58H33L30 35" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.05)"/>
                    </svg>
                </MotionBox>
            );
        case 'checkmark':
            return (
                <MotionBox key={i} sx={{...pos, width: 60, height: 60, opacity: 0.2}} {...motionProps}>
                    <svg viewBox="0 0 60 60" fill="none">
                        <circle cx="30" cy="30" r="25" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.05)"/>
                        <path d="M18 30L26 38L42 22" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </MotionBox>
            );
        case 'mail':
            return (
                <MotionBox key={i} sx={{...pos, width: 60, height: 45, opacity: 0.2}} {...motionProps}>
                    <svg viewBox="0 0 60 45" fill="none">
                        <rect x="3" y="3" width="54" height="39" rx="4" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.05)"/>
                        <path d="M3 8L30 26L57 8" stroke="#22c55e" strokeWidth="1.5"/>
                    </svg>
                </MotionBox>
            );
        default:
            return null;
    }
};

const AuthArtwork = ({variant = 'login'}) => {
    const config = variants[variant] || variants.login;

    return (
        <Box sx={{
            display: {xs: 'none', lg: 'flex'}, flex: 1, position: 'relative',
            overflow: 'hidden', background: config.bg,
        }}>
            {/* Noise texture overlay */}
            <Box sx={{
                position: 'absolute', inset: 0, opacity: 0.03,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: '128px 128px',
            }}/>

            {/* Shapes */}
            {config.shapes.map((shape, i) => renderShape(shape, i))}

            {/* Text overlay */}
            <Box sx={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', p: {xs: 4, md: 6}, textAlign: 'center',
                zIndex: 2,
            }}>
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: 0.2}}>
                    <Typography variant="h2" sx={{color: 'common.white', fontWeight: 800, mb: 1}}>
                        {config.title[0]}{' '}
                        <Box component="span" sx={{color: 'secondary.main'}}>{config.title[1]}</Box>
                    </Typography>
                </motion.div>
                <motion.div initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{duration: 0.8, delay: 0.5}}>
                    <Typography variant="h6" sx={{color: 'rgba(255,255,255,0.7)', fontWeight: 400, maxWidth: 420}}>
                        {config.subtitle}
                    </Typography>
                </motion.div>
            </Box>
        </Box>
    );
};

export default AuthArtwork;
