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
  Alert,
  Slide,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";
import useIsMobileView from "../../hooks/useIsMobileView";
import Header from "../Header";
import Footer2 from "../Footer2";
import api from "../../services/api";

function Signup() {
  const isMobileView = useIsMobileView();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/register", formData);
      console.log(response);
    } catch (error) {
      setErrorMessage(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs" sx={{ height: "92vh" }}>
        <Box
          marginTop={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {errorMessage && (
            <Box
              sx={{
                position: "fixed",
                top: 20,
                left: 0,
                right: 0,
                zIndex: 9999,
                
              }}
            >
              <Slide
                in={errorMessage ? true : false}
                direction="down"
                mountOnEnter
                unmountOnExit
                timeout={200}
              >
                <Alert
                  variant="filled"
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setErrorMessage("");
                      }}
                    >
                      <Close fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errorMessage}
                </Alert>
              </Slide>
            </Box>
          )}
          <Box
            component="form"
            noValidate
            sx={{ mt: 15 }}
            onSubmit={handleSubmit}
          >
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
                  value={formData.username}
                  onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  id="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  autoComplete="new-password"
                  required
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
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
          <Typography variant="body2">
            Already have an account?&nbsp;&nbsp;
          </Typography>
          <Link to="/login">
            <Typography variant="body2">Login</Typography>
          </Link>
        </Box>
      </Container>
      <Footer2 />
    </>
  );
}

export default Signup;
