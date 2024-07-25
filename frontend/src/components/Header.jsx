import { AppBar, Grid, Button, Typography, useMediaQuery } from "@mui/material"
import {
  showLogin,
  showSignup,
} from "../app/features/renderLoginSignup/renderLoginSignup"
import MobileMenu from "./MobileMenu"
import useIsMobileView from "../hooks/useIsMobileView"
import { Link } from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { logout } from "../app/features/verifyLogin/verifyLoginSlice"

function Header() {
  const isMobileView = useIsMobileView()
  const dispatch = useDispatch()
  const {isLoggedIn} = useSelector((state) => state.verifyLogin)
  return (
    <AppBar
      elevation={0}
      position="fixed"
      color="inherit"
      sx={{ p: 1.5, borderBottom: "1px solid #d2d2d2" }}
    >
      <Grid container>
        <Grid container item xs direction="row" alignItems="center">
          <Typography variant={isMobileView ? "h5" : "h4"}>
            <Link style={{ textDecoration: "none", color: "#000" }} to="/">
              Scooby
            </Link>
          </Typography>
        </Grid>

        {isMobileView ? (
          <MobileMenu />
        ) : (
          <Grid
            container
            item
            xs={6}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            columnGap={1}
          >
            {isLoggedIn ?  
            <>
            <Grid item>
              <Link to="/login">
                <Button
                  variant="outlined"
                  size="large"
                  color="error"
                  sx={{ px: 6 }}
                  onClick={() => dispatch(logout())}
                >
                  Logout
                </Button>
              </Link>
            </Grid>
            </> : 
            <>
            <Grid item>
              <Link to="/login">
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ px: 6 }}
                  onClick={() => dispatch(showLogin())}
                >
                  Log In
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register">
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => dispatch(showSignup())}
                >
                  Get Started
                </Button>
              </Link>
            </Grid>
            </>
            }

          </Grid>
        )}
      </Grid>
    </AppBar>
  );
}

export default Header;
