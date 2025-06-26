import * as React from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import useIsMobileView from "../../hooks/useIsMobileView";
import api from '../../services/api'
import { useDispatch, useSelector } from "react-redux";
import { showVerifyEmail, showOtpInput, showChangePassword } from "../../app/features/resetPassword/resetpasswordSlice";

export default function VerifyEmail() {
  const [formData, setFormData] = React.useState({
    email: ""
  });
  const isMobileView = useIsMobileView()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.post("/users/forgot-password", formData);
      console.log(response.data.message)
      dispatch(showOtpInput(response.data.message.verfiedUser))
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    // <Container component="main" maxWidth="xs">
    //   <Box
    //     marginTop={isMobileView ? 0 : 6}
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //     }}
    //   >
        <Box component="form" noValidate sx={{ mt: 20 }} onSubmit={(e) => {handleSubmit(e)}}>
          <Grid container spacing={2}>
            <Grid item xs>
              <TextField
                name="email"
                id="forgot-password-email"
                label="Email Address"
                variant="outlined"
                required
                fullWidth
                autoComplete="email"
                onChange={(e)=> handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
              >
                Verify Email
              </Button>
            </Grid>
          </Grid>
        </Box>
    //   </Box>
    // </Container>
  );
}
