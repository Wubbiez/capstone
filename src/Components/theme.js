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
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 12,
    },
    h4: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    p: {
      fontSize: '16px',
      marginBottom: '10px',
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
