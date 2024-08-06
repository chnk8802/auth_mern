import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import GlitchText from "../components/misc/GlitchText";
import Header from "../components/Header";
import MainComponent from "../components/MainComponent";

export default function NotFound() {
    const style={display:'flex', justifyContent:"center"}
  return (
    <MainComponent>
      <Grid item xs={12}>
        <Typography
          variant="h1"
          component="h2"
          sx={{ fontSize: "5rem", color: "#f44336" }}
        >
          <GlitchText text="404" />
        </Typography>
      </Grid>
      <Grid item xs={12} sx={style}>
        <Typography variant="h5" component="h2">
          Page Not Found
        </Typography>
      </Grid>
      <Grid item xs={12} sx={style}>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
          Sorry, the page you are looking for does not exist.
        </Typography>
      </Grid>
      <Grid item xs={12} sx={style}>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go to Home
        </Button>
      </Grid>
    </MainComponent>
  );
}
