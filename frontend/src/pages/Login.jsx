import * as React from 'react'
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {Visibility, VisibilityOff} from '@mui/icons-material'; 

function Login() {
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" noValidate sx={{ mt: 20 }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <TextField
                autoComplete=""
                name="fullname"
                id="fullname"
                label="Full Name"
                variant="outlined"
                fullWidth
              />
            </Grid> */}
            {/* <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="username"
                id="username"
                label="Username"
                variant="outlined"
                required
                fullWidth
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                name="email"
                id="email"
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
            {/* <Grid item xs={12}>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
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
            </Grid> */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
