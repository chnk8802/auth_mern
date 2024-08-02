import * as React from "react";
import Header from "../components/Header";
import ReportHeader from "../components/ReportHeader";
import { Container, Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Footer2 from "../components/Footer2";
import api from "../services/api";
export default function UserProfile() {
  const [user, setUser] = React.useState({});
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  React.useEffect(() => {
    const getUser = async () => {
      try {
        const response = await api.get(`/users/${loggedInUser._id}`);
        setUser(response.data.user)
      } catch (error) {
        console.error(
          "Error fetching users:",
          error.response ? error.response.data : error.message
        );
      }
    };
    getUser();
  }, [loggedInUser]);
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
              <Typography variant="subtitle1">Username</Typography>
              <Typography variant="body2">{user.username}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Email</Typography>
              <Typography variant="body2">{user.email}</Typography>
            </Grid>
          </Grid>
        </Box>
        <Footer2 />
      </Container>
    </>
  );
}
