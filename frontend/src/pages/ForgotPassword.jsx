import { Box, Container, Typography } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import VerifyEmail from "../components/authentication/VerifyEmail";
import OtpInput from "../components/authentication/OtpInput";
import ChangePassword from "../components/authentication/ChangePassword";
import MainComponent from "../components/MainComponent";

export default function ForgotPassword() {
  const { showVerifyEmail, showOtpInput, showChangePassword } = useSelector(
    (state) => state.resetPassword
  );
  return (
    <MainComponent>
      {showVerifyEmail && <VerifyEmail />}
      {showOtpInput && <OtpInput />}
      {showChangePassword && <ChangePassword />}
      <Link to="/login">
        <Typography variant="body2">Back to login</Typography>
      </Link>
    </MainComponent>
  );
}
