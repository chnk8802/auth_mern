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
import useIsMobileView from "../../hooks/useIsMobileView";
import Header from "../Header";
import Footer2 from "../Footer2";
import api from "../../services/api";
import BackdropLoader from "../BackdropLoader";
import { ErrorMessage, SuccessMessage } from "../misc/AlertMessage";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const isMobileView = useIsMobileView();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [usernameError, setUsernameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

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
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    
    try {
      if (
        !formData.username ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setErrorMessage("Error: Mandatory fields missing");
        setUsernameError(true);
        setEmailError(true);
        setPasswordError(true);
        setConfirmPasswordError(true);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Error: Confirm Password does not match with password");
        setConfirmPasswordError(true);
        return;
      } else {
        setConfirmPasswordError(false);
      }
      const response = await api.post("/users/register", formData);

      setErrorMessage("");
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      setSuccessMessage(`Success: Registration Successfull`);
      setIsLoading(false);
      // Store in redux instead of localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setSuccessMessage(``);

      if (error.code === "ERR_NETWORK") {
        setErrorMessage(`Error: ${error.message}`);
        setIsLoading(false);
        return;
      }

      if (error.response.data.error === "Username & email already exists") {
        setUsernameError(true);
        setEmailError(true);
      }
      
      if (error.response.data.error === "Username already exists") {
        setUsernameError(true);
      }
      
      if (error.response.data.error === "Email already exists") {
        setEmailError(true);
      }
      
      setErrorMessage(`Error: ${error.response.data.error}`);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      {isLoading && <BackdropLoader />}

      <Container component="main" maxWidth="xs" sx={{ height: "92vh" }}>
        <Box
          marginTop={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {successMessage && (
            <SuccessMessage
              successMessage={successMessage}
              setSuccessMessage={setSuccessMessage}
            />
          )}
          {errorMessage && (
            <ErrorMessage
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
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
                  autoComplete="off"
                  name="username"
                  id="username"
                  label="Username"
                  variant="outlined"
                  required
                  fullWidth
                  error={usernameError}
                  value={formData.username}
                  onChange={(e) => {
                    handleChange(e);
                    setUsernameError(false);
                  }}
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
                  autoComplete="off"
                  error={emailError}
                  value={formData.email}
                  onChange={(e) => {
                    handleChange(e);
                    setEmailError(false);
                  }}
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
                  error={passwordError}
                  value={formData.password}
                  onChange={(e) => {
                    handleChange(e);
                    setPasswordError(false);
                  }}
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
                  error={confirmPasswordError}
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    handleChange(e);
                    setConfirmPasswordError(false);
                  }}
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
