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
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import useIsMobileView from "../../hooks/useIsMobileView";
import Footer2 from "../Footer2";
import api from "../../services/api";
import { ErrorMessage, SuccessMessage } from "../misc/AlertMessage";
import BackdropLoader from "../BackdropLoader";
import { useDispatch } from "react-redux";
import { login } from "../../app/features/verifyLogin/verifyLoginSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobileView = useIsMobileView();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleMouseClickShowPassword = (event) => {
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
      const response = await api.post("/users/login", formData);
      console.log(response);
      setErrorMessage("");
      setFormData({
        email: "",
        password: "",
      });
      setSuccessMessage(`Success: Login Successfull`);
      setIsLoading(false);

      // Store in redux instead of localStorage
      dispatch(login(response.data))
      // localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      setSuccessMessage(``);
      if ((error.response.data.error = "Invalid password")) {
        setPasswordError(true);
      }
      setErrorMessage(`Error: ${error.response.data.error}`);
      setIsLoading(false);
    }       
  };

  return (
    <>
      <Header />
      {isLoading && <BackdropLoader />}
      <Container component="main" maxWidth="xs" sx={{ height: "60vh" }}>
        <Box
          sx={{
            my: 30,
            display: "flex",
            flexDirection: "column",
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
          <Box component="form" noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="email"
                  id="login-email"
                  label="Email Address"
                  variant="outlined"
                  required
                  fullWidth
                  autoComplete="off"
                  value={formData.email}
                  onChange={(e) => {
                    handleChange(e);
                    setEmailError(false);
                    setErrorMessage("");
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
                  required
                  fullWidth
                  autoComplete="off"
                  error={passwordError}
                  value={formData.password}
                  onChange={(e) => {
                    handleChange(e);
                    setPasswordError(false);
                    setErrorMessage("");
                  }}
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
          <Grid
            container
            item
            xs={12}
            justifyContent="center"
            mt={isMobileView ? 16 : 0}
          >
            <Typography variant="body2">
              Don't have an account?&nbsp;&nbsp;
            </Typography>
            <Link to="/register">
              <Typography variant="body2">Create an account</Typography>
            </Link>
          </Grid>
        </Box>
      </Container>
      <Footer2 />
    </>
  );
}

export default Login;
