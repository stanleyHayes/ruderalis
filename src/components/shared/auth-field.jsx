import {Box, IconButton, InputAdornment, Stack, TextField, Typography} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const AuthField = ({name, label, placeholder, icon, type = 'text', formik, gridSize, showToggle, showPassword, onTogglePassword, ...rest}) => {
    const hasError = formik.touched[name] && formik.errors[name];

    return (
        <Box>
            <Stack direction="row" spacing={1} alignItems="center" sx={{mb: 0.75}}>
                {icon && <Box sx={{color: hasError ? 'error.main' : 'text.disabled', display: 'flex', fontSize: 18}}>{icon}</Box>}
                <Typography variant="caption" sx={{
                    fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
                    color: hasError ? 'error.main' : 'text.secondary',
                }}>
                    {label}
                </Typography>
            </Stack>
            <TextField
                fullWidth
                id={name}
                name={name}
                type={showToggle ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(hasError)}
                helperText={hasError ? formik.errors[name] : ''}
                color="secondary"
                variant="outlined"
                slotProps={{
                    input: {
                        endAdornment: showToggle ? (
                            <InputAdornment position="end">
                                <IconButton onClick={onTogglePassword} edge="end" size="small"
                                    sx={{color: 'text.secondary', '&:hover': {color: 'secondary.main'}}}>
                                    {showPassword
                                        ? <VisibilityOff sx={{fontSize: 20}}/>
                                        : <Visibility sx={{fontSize: 20}}/>}
                                </IconButton>
                            </InputAdornment>
                        ) : undefined,
                    },
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 2.5,
                        bgcolor: 'action.hover',
                        transition: 'all 0.2s ease',
                        '& fieldset': {borderColor: 'transparent'},
                        '&:hover fieldset': {borderColor: 'divider'},
                        '&.Mui-focused': {
                            bgcolor: 'transparent',
                            '& fieldset': {borderColor: 'secondary.main', borderWidth: 1.5},
                        },
                        '&.Mui-error fieldset': {borderColor: 'error.main'},
                    },
                    '& .MuiOutlinedInput-input': {
                        py: 1.75, px: 2,
                        fontSize: '0.95rem',
                        '&::placeholder': {color: 'text.disabled', opacity: 1},
                    },
                }}
                {...rest}
            />
        </Box>
    );
};

export default AuthField;
