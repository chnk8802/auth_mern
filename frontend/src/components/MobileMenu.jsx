import * as React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Grid,
  Box,
  IconButton,
  Button,
  Link,
  Tooltip,
  Divider,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/authentication/authenticationSlice";
import "../App.css";

export default function MobileMenu() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const toggleDrawer = (event) => {
    // if ( event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift') ) {
    //     return;
    // }
    setOpenDrawer((open) => !open);
  };

  return (
    <Box>
      <IconButton onClick={() => toggleDrawer()}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        open={openDrawer}
        onClose={() => toggleDrawer()}
        onOpen={() => toggleDrawer()}
      >
        {isLoggedIn ? (
          <Grid container mt={5}>
            <Grid item xs={12}>
              <Divider />
              <Button variant="text" fullWidth href="/all-users">
                Users
              </Button>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Button variant="text" fullWidth href="/logasdain">
                Hello
              </Button>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Button variant="text" fullWidth href="/my-profile">
                My Profile
              </Button>
              <Divider />
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Tooltip title="Logout">
                <IconButton
                  variant="outlined"
                  size="large"
                  color="error"
                  href="/login"
                  onClick={() => dispatch(logout())}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        ) : (
          <Grid container mt={5}>
            <Grid item xs={12}>
              <Divider />
              <Button variant="text" fullWidth href="/login" sx={{ px: 6 }}>
                Log In
              </Button>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="text"
                fullWidth
                href="/register"
                sx={{ px: 6 }}
                onClick={() => dispatch(showSignup())}
              >
                Register
              </Button>
              <Divider />
            </Grid>
          </Grid>
        )}
        {/* <LoginSignupButtons/> */}
      </SwipeableDrawer>
    </Box>
  );
}
