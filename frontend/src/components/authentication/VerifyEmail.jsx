import { Box, Button, Grid, TextField } from "@mui/material";
import * as React from "react";

export default function VerifyEmail() {
  return (
    <Box component="form" noValidate sx={{ mt: 20 }}>
          <Grid container spacing={2}>
            <Grid item xs>
              <TextField
                name="email"
                id="forgot-password-email"
                label="Email Address"
                variant="outlined"
                required
                fullWidth
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Verify Email
              </Button>
            </Grid>
          </Grid>
        </Box>
  );
}
