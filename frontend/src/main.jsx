import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";
import "./index.css";
import App from "./App.jsx";
import Notification from "./components/Notification.jsx";

const theme = createTheme({
  palette:{
    mode: 'light',
  },
  typography: {
    button: {
      textTransform: "none",
    },
    fontFamily: "Poppins , sans-serif"
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
          <Notification />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
