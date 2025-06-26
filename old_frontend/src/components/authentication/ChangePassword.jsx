import * as React from "react";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import useIsMobileView from "../../hooks/useIsMobileView";
import api from '../../services/api'
import { showVerifyEmail } from "../../app/features/resetPassword/resetpasswordSlice";

export default function ChangePassword() {
  const { otpVerifiedUser } = useSelector((state) => state.resetPassword)
  const navigate = useNavigate()
  const isMobileView = useIsMobileView();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    password: "",
    confirmPassword: ""
  })
  const dispatch = useDispatch()

  const handleClickShowPassword = () => {
    console.log(2, otpVerifiedUser)
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
    const {name, value} = e.target
    console.log(name, value)
    setFormData({...formData, [name]: value})
    console.log(formData)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const password = formData.password
    const confirmPassword = formData.confirmPassword

    if (password !== confirmPassword) {
        console.log("Password is not matching");
        return;
      }

    const resetPasswordObj = {
    userId: otpVerifiedUser.payload,
    newPassword: password
    }
    console.log({"resetPasswordObj":resetPasswordObj})

    try {
      const response = await api.post("/users/reset-password", resetPasswordObj)
      console.log(response)
      dispatch(showVerifyEmail())
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {/* <Header /> */}
      {/* <Container component="main" maxWidth="xs">
        <Box
          marginTop={isMobileView ? 0 : 6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > */}
          <Box component="form" noValidate sx={{ mt: 15 }} onSubmit={(e)=> handleSubmit(e)}>
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
                  onChange={(e)=>handleChange(e)}
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
                  onChange={(e)=>handleChange(e)}
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
                  Change Password
                </Button>
              </Grid>
            </Grid>
          </Box>
        {/* </Box>
      </Container> */}
    </>
  );
}
