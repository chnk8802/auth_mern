import * as React from 'react'
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from 'react-router-dom';
import {Visibility, VisibilityOff} from '@mui/icons-material'; 
import useIsMobileView from '../../hooks/useIsMobileView';
import Header from '../Header';

function Signup() {
  const isMobileView = useIsMobileView()
    const [showPassword, setShowPassword] = React.useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
    const handleClickShowPassword = () => {
        setShowPassword(showPassword => !showPassword)
    }
    const handleMouseClickShowPassword = (event) =>  {
        event.preventDefault()
    }

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(showConfirmPassword => !showConfirmPassword)
    }
    const handleMouseClickShowConfirmPassword = (event) =>  {
        event.preventDefault()
    }
  return (
    <>
    <Header/>
    <Container component="main" maxWidth="xs">
      <Box
      marginTop={isMobileView ? 0 : 6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 15 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                id="username"
                label="Username"
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                id="Signup-email"
                label="Email Address"
                variant="outlined"
                required
                fullWidth
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                id="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                autoComplete="new-password"
                required
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseClickShowPassword}
                            edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                variant="outlined"
                autoComplete="new-password"
                required
                fullWidth
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="start">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseClickShowConfirmPassword}
                            edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Create account
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Link to="/login"><Typography variant="body2">Already have an account? Login here.</Typography></Link>
      </Box>
    </Container>
    </>
  );
}

export default Signup;
