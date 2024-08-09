import * as React from "react";
import Header from "./Header";
import { Box, Container, Grid } from "@mui/material";
import Footer2 from "./Footer2";
import SubHeader from "./SubHeader";
import { useSelector } from "react-redux";

export default function MainComponent({ children }) {
  const {isReport} = useSelector(state => state.currentPage)
  return (
    <>
      <Header />
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 1.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container justifyContent="center" mb={1}>
            <Grid item xs={12} container justifyContent="center">
              {/* <SubHeader /> */}
            </Grid>
            <Grid container item>
              {children}
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* <Box display="flex" justifyContent="center">
        {!isReport && <Footer2 />}
      </Box> */}
    </>
  );
}
