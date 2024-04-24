import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const myTheme = createTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none'
      }
    }
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={myTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
