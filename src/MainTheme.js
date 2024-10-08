import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h1: {
            fontSize: '2.5rem', // 40px
            fontWeight: 700,    // Bold
        },
        h2: {
            fontSize: '2rem',   // 32px
            fontWeight: 700,    // Bold
        },
        h3: {
            fontSize: '1.75rem', // 28px
            fontWeight: 700,     // Bold
        },
        h4: {
            fontSize: '1.5rem',  // 24px
            fontWeight: 700,     // Bold
        },
        h5: {
            fontSize: '1.25rem', // 20px
            fontWeight: 700,     // Bold
        },
        h6: {
            fontSize: '1rem',    // 16px
            fontWeight: 700,     // Bold
        },
        body1: {
            fontSize: '1rem',    // 16px
            fontWeight: 400,     // Regular
        },
        body2: {
            fontSize: '0.875rem', // 14px
            fontWeight: 400,      // Regular
        },
        subtitle1: {
            fontSize: '1rem',    // 16px
            fontWeight: 400,     // Regular
        },
        subtitle2: {
            fontSize: '0.875rem', // 14px
            fontWeight: 400,      // Regular
        },
        button: {
            fontSize: '0.875rem', // 14px
            fontWeight: 500,      // Medium
            textTransform: 'uppercase',
        },
        caption: {
            fontSize: '0.75rem', // 12px
            fontWeight: 400,     // Regular
        },
        overline: {
            fontSize: '0.75rem', // 12px
            fontWeight: 400,     // Regular
            textTransform: 'uppercase',
        },
    },
});

export default theme;
