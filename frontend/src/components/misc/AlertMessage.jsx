import { Close } from "@mui/icons-material";
import { Alert, IconButton, Snackbar } from "@mui/material";
import * as React from "react";

function ErrorMessage({errorMessage, setErrorMessage }) {
  
  const handleClose = (event, reason) => {
    if(reason === "clickaway") {
      return;
    }
    setErrorMessage("")
  }

  return (
    <Snackbar
      open={!!errorMessage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        severity="error"
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setErrorMessage("");
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        {errorMessage}
      </Alert>
    </Snackbar>
  );
}
function SuccessMessage({ successMessage, setSuccessMessage }) {
  const handleClose = (event, reason) => {
    if(reason === "clickaway") {
      return;
    }
    setSuccessMessage("")
  }
  return (
    <Snackbar
      open={!!successMessage}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        severity="success"
        variant="filled"
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setSuccessMessage("");
            }}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
      >
        {successMessage}
      </Alert>
    </Snackbar>
  );
}

export { ErrorMessage, SuccessMessage };
