import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#0084ff',
    },
    secondary: {
      main: '#ff4d4f',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  spacing: 8,
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14,
    h1: {
      fontFamily: 'acumin-pro',
      fontWeight: '500',
      fontStyle: 'normal',
      letterSpacing: '0em',
      textTransform: 'none',
      lineHeight: '1.4em',
      fontSize: '2.8rem'
    },
    h2: {
      fontFamily: 'acumin-pro',
      fontWeight: '500',
      fontStyle: 'normal',
      letterSpacing: '0em',
      textTransform: 'none',
      lineHeight: '1.4em',
      fontSize: '2rem'
    },
    h4: {
      fontfamily: 'Poppins',
      fontWeight: '300',
      fontStyle: 'normal',
      letterSpacing: '0em',
      textTransform: 'none',
      lineHeight: '1.8em',
      fontSize: '1.5rem'
    },
    h5: {
      fontfamily: 'Poppins',
      fontWeight: '300',
      fontStyle: 'normal',
      letterSpacing: '0em',
      textTransform: 'none',
      lineHeight: '1.4em',
      fontSize: '1.2rem'
    },
    p: {
      fontfamily: 'Poppins',
      fontWeight: '200',
      fontStyle: 'normal',
      letterSpacing: '0em',
      textTransform: 'none',
      lineHeight: '1.2em',
      fontSize: '1rem',
      paddingTop: '0.3rem'
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
