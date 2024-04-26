import { AppBar, Grid, Button, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {showLogin, showSignup} from '../app/features/renderLoginSignup/renderLoginSignup'

function Header() {
  const dispatch = useDispatch();
  return (
    <AppBar elevation={3} position="fixed" color="transparent" sx={{ p: 1.5 }}>
      <Grid container>
        <Grid
          container
          item
          xs
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h4">Google Workspace</Typography>
        </Grid>

        <Grid item xs={6}></Grid>

        <Grid
          container
          item
          xs={3}
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          columnGap={2}
        >
          <Grid item>
            <Button
              variant="outlined"
              size="large"
              sx={{ px: 6 }}
              onClick={dispatch(showLogin())}
            >
              Log In
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              size="large"
              onClick={dispatch(showSignup())}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Header;
