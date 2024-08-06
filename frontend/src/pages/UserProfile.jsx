import * as React from "react";
import Header from "../components/Header";
import SubHeader from "../components/SubHeader";
import { Container, Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Footer2 from "../components/Footer2";
import api from "../services/api";
import MainComponent from "../components/MainComponent";
export default function UserProfile() {
  const [user, setUser] = React.useState({});
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const getUser = async () => {
    try {
      const response = await api.get(`/users/${loggedInUser._id}`);
      setUser(response.data.user);
    } catch (error) {
      console.error(
        "Error fetching users:",
        error.response ? error.response.data : error.message
      );
    }
  };
  React.useEffect(() => {
    if (loggedInUser) {
      getUser();
    }
  }, [loggedInUser]);
  return (
    <MainComponent>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Username</Typography>
        <Typography variant="body2">{user.username}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Email</Typography>
        <Typography variant="body2">{user.email}</Typography>
      </Grid>
    </MainComponent>
  );
}
