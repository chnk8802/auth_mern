import React, { useRef, useState } from "react";
import { Box, Button, Container, Grid, TextField } from "@mui/material";
import useIsMobileView from "../../hooks/useIsMobileView";
import Header from "../Header";

const OtpInput = () => {
  const isMobileView = useIsMobileView();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef();

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (/^\d{0,1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      // Move focus to the previous input field on Backspace press
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };
  const handleInput = (e, index) => {
    const currentValue = e.target.value;
    if (/^\d$/.test(currentValue) && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <>
      {/* <Header /> */}
      {/* <Container component="main" maxWidth="lg">
        <Box
          marginTop={isMobileView ? 0 : 6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        > */}
          <Box component="form" noValidate sx={{ mt: 15 }}>
            <Grid container>
              <Grid item xs={12} container spacing={1} justifyContent="center">
                {otp.map((digit, index) => (
                  <Grid item id={`otp-input-container-${index}`}>
                    <TextField
                      key={index}
                      id={`otp-input-${index}`}
                      type="number"
                      variant="standard"
                      placeholder="○"
                      autoComplete=""
                      value={digit}
                      sx={{
                        width: "3rem",
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                          {
                            display: "none",
                          },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                      }}
                      inputProps={{
                        style: { textAlign: "center" },
                      }}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onInput={(e) => handleInput(e, index)}
                    />
                  </Grid>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ mt: 3, mb: 2 }}
                >
                  Continue
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="outlined" fullWidth sx={{ mt: 3, mb: 2 }}>
                  Resend OTP in 1:59 mins
                </Button>
              </Grid>
            </Grid>
          </Box>
        {/* </Box>
      </Container> */}
    </>
  );
};

export default OtpInput;
