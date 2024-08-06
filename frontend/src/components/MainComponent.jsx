import * as React from "react";
import Header from "./Header";
import { Box, Container, Grid } from "@mui/material";
import Footer2 from "./Footer2";
import SubHeader from "./SubHeader";

export default function MainComponent({ children }) {
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 8.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container justifyContent="center" mb={5}>
            <Grid item xs={12} container justifyContent="center">
              <SubHeader />
            </Grid>
            <Grid container item>
              {children}
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box display="flex" justifyContent="center">
        <Footer2 />
      </Box>
    </>
  );
}
