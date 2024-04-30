import * as React from "react"
import Header from "../components/Header"
import { Container, Grid, Typography } from "@mui/material"

export default function Home() {
  return (
    <>
      <Header />
      <Container
      component="main"
        maxWidth="xl"
        mt={8}
      >
        <Grid container>
        <Grid item xs={12} border="1px solid green">
          <Typography variant="h1">Home Page</Typography>
        </Grid>
        <Grid item xs={12} border="1px solid blue">
          <Typography variant="h6">Whatchu Gonna Do?</Typography>
        </Grid>
        </Grid>
      </Container>
      {/* {showLogin && <Login/>}
            {showSignup && <Signup/>} */}
    </>
  );
}
