import React, { useState } from 'react';
import { TextField } from '@mui/material';

const OtpInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']); // State to store OTP digits

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && !otp[index]) {
      // Move focus to the previous input field on Backspace press
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div>
      {otp.map((digit, index) => (
        <TextField
          key={index}
          id={`otp-input-${index}`}
          type="text"
          variant="outlined"
          value={digit}
          inputProps={{
            maxLength: 1,
            style: { textAlign: 'center' },
          }}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OtpInput;