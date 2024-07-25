import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {Menu} from '@mui/icons-material/';
import { Grid, Box, IconButton, Link, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../app/features/verifyLogin/verifyLoginSlice'
import { LoginSignupButtons } from './LoginSignupButtons';
import {
  showLogin,
  showSignup,
} from "../app/features/renderLoginSignup/renderLoginSignup"

export default function MobileMenu() {
  const dispatch = useDispatch()
  const {isLoggedIn} = useSelector((state) => state.verifyLogin)
  const [openDrawer, setOpenDrawer] = React.useState(false)
  const toggleDrawer = (event) => {
    // if ( event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift') ) {
      //     return;
      // }
      setOpenDrawer(open=> !open)
    };
    
  return (
        <Box>
          <IconButton onClick={() => toggleDrawer()}><Menu /></IconButton>
          <SwipeableDrawer
            open={openDrawer}
            onClose={() => toggleDrawer()}
            onOpen={() => toggleDrawer()}
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
            {/* <LoginSignupButtons/> */}
          </SwipeableDrawer>
        </Box>
  )
}
