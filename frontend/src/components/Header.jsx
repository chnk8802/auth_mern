import * as React from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" elevation={4}>
      <Toolbar sx={{ backgroundColor: "#fff" }}>
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>
          <Grid item xs={8}>
            <Typography
              variant="h6"
              color="primary"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Your App Name
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              color="primary"
              variant="text"
              disableElevation={true}
              size="large"
            >
              Create an account
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              color="primary"
              variant="contained"
              disableElevation={true}
              size="large"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
