import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

// Need Some kind of global Object To store current docname, isReport so that page name and other subheader option can be shown accordingly
export default function SubHeader({ docName, isReport = false }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => navigate(-1)}
            >
              <KeyboardBackspaceIcon />
            </IconButton>
          </Box>
          <Box>
            <Typography variant="h5">{docName}</Typography>
          </Box>
          <Box>
            {isReport && (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="error"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <Delete />
                </IconButton>
                <IconButton
                  size="large"
                  edge="start"
                  color="primary"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <Edit />
                </IconButton>
                <Button color="primary" variant="contained">
                  {"Add " + docName}
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
