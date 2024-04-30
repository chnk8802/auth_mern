import { Grid, Button } from "@mui/material";
import * as React from "react";
import useIsMobileView from "../hooks/useIsMobileView";
import { Link } from "react-router-dom";

export function LoginSignupButtons() {
  const isMobileView = useIsMobileView()

  return (
    <Grid
      container
      direction={isMobileView ? "column" : "row"}
      spacing={2}
      alignItems="center"
    >
      <Grid item>
        <Link to="/login">
          <Button
            variant="outlined"
            size={isMobileView ? "small" : "large"}
          >
            Log In
          </Button>
        </Link>
      </Grid>

      <Grid item>
        <Link to="/register">
          <Button
            variant="contained"
            size={isMobileView ? "small" : "large"}
          >
            Get Started
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
