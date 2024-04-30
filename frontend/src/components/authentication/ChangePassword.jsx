import * as React from "react";
import Header from "../Header";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useIsMobileView from "../../hooks/useIsMobileView";

export default function ChangePassword() {
  const isMobileView = useIsMobileView();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };
  const handleMouseClickShowPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((showConfirmPassword) => !showConfirmPassword);
  };
  const handleMouseClickShowConfirmPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {/* <Header /> */}
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
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  autoComplete="off"
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
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="confirmPassword"
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="outlined"
                  autoComplete="off"
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
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
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
        </Box>
      </Container>
    </>
  );
}
