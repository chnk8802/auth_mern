import * as React from "react";
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
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Header from "../Header";
import useIsMobileView from "../../hooks/useIsMobileView";

function Login() {
  const isMobileView = useIsMobileView()
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseClickShowPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate sx={{ mt: 15 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  id="login-email"
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
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  required
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid container item xs={12} justifyContent="flex-end">
                <Link to="/forgot-password">
                  <Typography variant="body2">Forgot Password?</Typography>
                </Link>
              </Grid>
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
          <Grid container item xs={12} justifyContent="center" mt={isMobileView ? 16 : 0}>
            <Link to="/register">
              <Typography variant="body2">
                Don't have an account? Create one.
              </Typography>
            </Link>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Login;
