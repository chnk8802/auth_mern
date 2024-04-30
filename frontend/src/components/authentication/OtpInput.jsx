import React, { useRef, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import useIsMobileView from "../../hooks/useIsMobileView";

const OtpInput = () => {
  const isMobileView = useIsMobileView();
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const inputRefs = useRef()

  const handleChange = (index, value) => {
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
    // else if (/^\d$/.test(e.key) && index < otp.length - 1) {
    //   document.getElementById(`otp-input-${index + 1}`).focus();
    // }
  };
  const handleKeyUp = (e, index) => {
    if (/^\d$/.test(e.key) && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  return (
    <Grid container justifyContent="space-between" maxWidth="xs" mt={20}>
      {otp.map((digit, index) => (
        <TextField
          key={index}
          id={`otp-input-${index}`}
          type="number"
          variant="standard"
          placeholder="○"
          value={digit}
          sx={{ width: "3rem" }}
          inputProps={{
            style: { textAlign: "center" }
          }}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onKeyUp={(e) => handleKeyUp(e, index)}
        />
      ))}
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
        <Button variant="outlined" disabled fullWidth sx={{ mt: 3, mb: 2 }}>
          Resend OTP
        </Button>
      </Grid>
    </Grid>
  );
};

export default OtpInput;
