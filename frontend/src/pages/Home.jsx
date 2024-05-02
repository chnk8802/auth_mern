import * as React from "react";
import Header from "../components/Header";
import { Box, Container, Grid, Typography } from "@mui/material";
import GlitchText from "../components/misc/GlitchText";
import Footer from "../components/Footer";

export default function Home() {
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
          <Grid container justifyContent="center">
            <Grid item xs={12} container justifyContent="center">
              {/* <GlitchText/> */}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Whatchu Gonna Do?</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Footer />
      {/* {showLogin && <Login/>}
            {showSignup && <Signup/>} */}
    </>
  );
}
