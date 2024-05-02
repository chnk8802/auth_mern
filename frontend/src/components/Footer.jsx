import {
  Email,
  Instagram,
  LocationOn,
  Phone,
  Public,
  Twitter,
  X,
} from "@mui/icons-material";
import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import * as React from "react";
import useIsMobileView from "../hooks/useIsMobileView";

export default function Footer() {
  const isMobileView = useIsMobileView();
  return (
    <Container maxWidth="xl" sx={{position: "absolute", bottom: 0}}>
      <Box
        sx={{
          marginTop: 8.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={3} pt={isMobileView ? 2 : 0} px={2}>
            <Box
              display={isMobileView ? "flex" : "block"}
              justifyContent="center"
            >
              <Box
                component="img"
                maxWidth={isMobileView ? "15rem" : "15rem"}
                maxHeight={isMobileView ? "15rem" : "15rem"}
                sx={{
                  width: "100%",
                  height: "auto",
                }}
                alt="The house from the offer."
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
              />
            </Box>

            <Typography py={2} variant="h5">
              Who are we?
            </Typography>
            <Typography xs={1}>
              We are XYZ company, dedicated to providing the best service to our
              customers.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3} pt={isMobileView ? 4 : 0} px={2} container direction="column"
          >
            <Typography pb={2} variant="h5" textAlign="center">
              Navigate
            </Typography>

            <Box>
              <Typography>Home</Typography>
              <Typography>Shop</Typography>
              <Typography>Blog</Typography>
              <Typography>About Us</Typography>
              <Typography>Contact Us</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} pt={isMobileView ? 4 : 0} px={2}>
            <Typography pb={2} variant="h5" textAlign="center">
              Contact Us
            </Typography>

            <Grid container pb={1} spacing={2}>
              <Grid item>
                <LocationOn />
              </Grid>
              <Grid item xs>
                <Typography>
                  Address: 10 Downing Street, Washington DC, Faridabad, Patna,
                  J&K 987654
                </Typography>
              </Grid>
            </Grid>
            <Grid container pb={1} spacing={2}>
              <Grid item>
                <Public />
              </Grid>
              <Grid item xs>
                <Typography>Website: www.google.com</Typography>
              </Grid>
            </Grid>
            <Grid container pb={1} spacing={2}>
              <Grid item>
                <Email />
              </Grid>
              <Grid item xs>
                <Typography>Email: support@email.com</Typography>
              </Grid>
            </Grid>
            <Grid container pb={1} spacing={2}>
              <Grid item>
                <Phone />
              </Grid>
              <Grid item xs>
                <Typography>Phone: +420 98765 43210</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={3} py={isMobileView ? 4 : 0} px={2}>
            <Typography pb={2} textAlign="center" variant="h5">
              Follow Us
            </Typography>

            <Grid container item xs={12} spacing={2} justifyContent="center" >
              <Grid item>
                <Twitter />
              </Grid>
              <Grid item>
                <Instagram />
              </Grid>
              <Grid item>
                <X />
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
