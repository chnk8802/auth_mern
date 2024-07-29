import * as React from "react";
import Header from "../components/Header";
import { Box, Button, Container, Grid, IconButton, Typography } from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ReportHeader from "../components/ReportHeader";

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
              <ReportHeader/>
              <Link to="/all-users">
                <Button variant="primary">Users <ArrowOutwardIcon/></Button>
              </Link>
              <Link to="/helllo">
                <Button variant="primary">helllo <ArrowOutwardIcon/></Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box display="flex" justifyContent="center"><Footer /></Box>
      {/* {showLogin && <Login/>}
            {showSignup && <Signup/>} */}
    </>
  );
}
