import * as React from "react";
import { Instagram, X, YouTube } from "@mui/icons-material";
import { Box, Container, Grid, Link, Typography } from "@mui/material";
import useIsMobileView from "../hooks/useIsMobileView";
import demoLogo from '../assets/demo_logo.png'

export default function Footer2() {
  const isMobileView = useIsMobileView();
  return (
    <Container maxWidth="xl" sx={{ position: "static", bottom: 0, borderTop: "1px solid #d2d2d2"}}>
      <Box
        sx={{
          marginTop: 8.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container >
          <Grid item xs={12} display="flex" justifyContent="center">
              <Box
                component="img"
                maxWidth="15rem"
                maxHeight="15rem"
                sx={{
                  width: "100%",
                  height: "auto",
                }}
                alt="The house from the offer."
                src={demoLogo}
              />
          </Grid>

          <Grid item xs={12} py={isMobileView ? 4 : 2}>
            <Typography pb={2} textAlign="center" variant="h5">
              Follow Us
            </Typography>

            <Grid container item xs={12} spacing={2} display="flex" justifyContent="center">
              <Grid item>
                <Link href="https://youtube.com" sx={{color:"red"}}><YouTube /></Link>
              </Grid>
              <Grid item>
              <Link href="https://youtube.com" sx={{color:"magenta"}}><Instagram /></Link>
              </Grid>
              <Grid item>
              <Link href="https://youtube.com" sx={{color:"black"}}><X /></Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box pt={4}>
              <Typography
                py={3}
                borderTop="1px solid #d2d2d2"
                textAlign="center"
                color="#636363"
              >
                Copyright © Tamato Tomato Inc.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
