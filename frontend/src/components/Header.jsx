import * as React from "react";
import { AppBar, Toolbar, Typography, Grid, Button } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" elevation={4}>
      <Toolbar sx={{ backgroundColor: "#fff" }}>
        <Typography
          variant="h6"
          color="primary"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Your App Name
        </Typography>
        <Grid spacing={2}>
          <Button
            color="primary"
            variant="text"
            disableElevation={true}
            size="large"
          >
            Create an account
          </Button>
          <Button
            color="primary"
            variant="contained"
            disableElevation={true}
            size="large"
          >
            Login
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
