import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { ThemeProvider } from '@mui/material';
import theme from './Components/theme.js';
// our app below
ReactDOM.render(
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>,
  document.getElementById('root')
);
