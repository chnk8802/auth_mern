import * as React from "react"
import Header from '../components/Header'
import ReportHeader from '../components/ReportHeader'
import {Container, Box, Grid, Typography} from "@mui/material"
import { useSelector } from "react-redux"
export default function UserProfile() {
    const loggedInUser = useSelector(state => state.auth.loggedInUser)
  return (
    <>
    <Header />
      <Container component="main" maxWidth="xl">
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2}>
            <ReportHeader />
            <Grid item xs={12}>
            <Typography variant="subtitle1" >Username</Typography>
            <Typography variant="body2">{loggedInUser.username}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Email</Typography>
              <Typography variant="body2" >{loggedInUser.email}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
