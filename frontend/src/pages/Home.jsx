import * as React from "react";
import Header from "../components/Header";
import {
  Box,
  Button,
  Container,
  Grid,
} from "@mui/material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Footer2 from "../components/Footer2";
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
          <Grid container justifyContent="center" mb={5}>
            <Grid
              item
              xs={12}
              container
              justifyContent="center"
            >
              <ReportHeader />
            </Grid>
            <Grid container item>
              <Grid item xs={6}>
                <Link to="/all-users">
                  <Button variant="primary">
                    Users <ArrowOutwardIcon />
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Link to="/helllo">
                  <Button variant="primary">
                    helllo <ArrowOutwardIcon />
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box display="flex" justifyContent="center">
        <Footer2 />
      </Box>
      {/* {showLogin && <Login/>}
            {showSignup && <Signup/>} */}
    </>
  );
}
