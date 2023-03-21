import {createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#0084ff',
        },
        secondary: {
            main: '#ff4d4f',
        },
        background: {
            default: '#fff',
        },
    },
    spacing: 8,
    typography: {
        fontFamily: 'Poppins, sans-serif',
        fontSize: '16',
        h1: {
            fontFamily: 'acumin-pro',
            fontWeight: '500',
            fontStyle: 'normal',
            letterSpacing: '0em',
            textTransform: 'none',
            lineHeight: '1.4em',
            fontSize: 'calc(1.5rem + 0.5vw)',
            '@media (min-width:600px)': {
                fontSize: 'calc(2rem + 1vw)',
            },
            '@media (min-width:960px)': {
                fontSize: 'calc(3rem + 1.5vw)',
            },
        },
        h2: {
            fontFamily: 'acumin-pro',
            fontWeight: '500',
            fontStyle: 'normal',
            letterSpacing: '0em',
            textTransform: 'none',
            lineHeight: '1.4em',
            fontSize: 'calc(1.3rem + 0.5vw)',
            '@media (min-width:600px)': {
                fontSize: 'calc(1.8rem + 1vw)',
            },
            '@media (min-width:960px)': {
                fontSize: 'calc(2.2rem + 1.1vw)',
            },
        },
        h4: {
            fontWeight: '300',
            fontStyle: 'normal',
            letterSpacing: '0em',
            textTransform: 'none',
            lineHeight: '1.8em',
            fontSize: 'calc(1.2rem + 0.3vw)',
            '@media (min-width:600px)': {
                fontSize: 'calc(1.4rem + 0.6vw)',
            },
            '@media (min-width:960px)': {
                fontSize: 'calc(1.8rem + 0.8vw)',
            },
        },
        h5: {
            fontWeight: '300',
            fontStyle: 'normal',
            letterSpacing: '0em',
            textTransform: 'none',
            lineHeight: '1.4em',
            fontSize: 'calc(1.1rem + 0.3vw)',
            '@media (min-width:600px)': {
                fontSize: 'calc(1.3rem + 0.8vw)',
            },
            '@media (min-width:960px)': {
                fontSize: 'calc(2.2rem + 1.2vw)',
            },
        },
        h6: {
            fontWeight: '400',
            textShadow: '2px 2px 2px #f5f5f5',
            letterSpacing: '0em',
            lineHeight: '1.4em',
            fontSize: 'calc(1rem + 0.2vw)',
            '@media (min-width:600px)': {
                fontSize: 'calc(1.3rem + 1vw)',
            },
            '@media (min-width:900px)': {
                fontSize: 'calc(1.3rem + .5vw)',
            },
        },
        p: {
            fontWeight: '200',
            fontStyle: 'normal',
            letterSpacing: '0em',
            textTransform: 'none',
            lineHeight: '1.2em',
            paddingTop: '0.3rem',
            fontSize: 'calc(0.8rem + 0.2vw)',
            '@media (min-width:600px)': {
                fontSize: 'calc(0.9rem + 0.6vw)',
            },
            '@media (min-width:960px)': {
                fontSize: 'calc(1rem + 1.2vw)',
            },
        },

        body1: {
            fontSize: 16,
            lineHeight: 1.5,
            marginBottom: 8,
        },
        caption: {
            fontSize: 12,
            color: '#999',
        },
    },
    overrides: {
        MuiButton: {
            root: {
                borderRadius: 0,
            },
            containedPrimary: {
                color: '#fff',
            },
        },
        MuiGrid: {
            root: {
                margin: 0,
            },
            container: {
                margin: 0,
            },
        },
        MuiRoutes: {
            root: {
                marginTop: '5vh'
            }
        },
        MuiInputLabel: {
            root: {
                fontWeight: 'bold',
                color: '#333',
            },
        },
        MuiInput: {
            root: {
                borderRadius: 0,
            },
            input: {
                padding: '12px 16px',
            },
        },


    },
});

export default theme;
