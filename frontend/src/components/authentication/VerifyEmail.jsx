import { Box, Button, Container, Grid, TextField } from "@mui/material";
import * as React from "react";
import useIsMobileView from "../../hooks/useIsMobileView";

export default function VerifyEmail() {
  const isMobileView = useIsMobileView()
  return (
    <Container component="main" maxWidth="xs">
      <Box
        marginTop={isMobileView ? 0 : 6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
      </Box>
    </Container>
  );
}
